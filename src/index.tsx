/** @jsxImportSource hono/jsx */

import { Hono } from 'hono'
import { getAssetFromKV } from '@cloudflare/kv-asset-handler'
import { getCookie, setCookie, deleteCookie } from 'hono/cookie'
import type { Bindings, Variables } from './types/bindings'
import { Database } from './lib/db'
import { HomePage } from './views/home'
import { TextDetailPage } from './views/text-detail'
import { ChapterDetailPage } from './views/chapter-detail'
import { LoginPage } from './views/admin/login'
import { DashboardPage } from './views/admin/dashboard'
import { UploadPage } from './views/admin/upload'
import { ChaptersPage } from './views/admin/chapters'
import { ChapterFormPage } from './views/admin/chapter-form'
import { adminAuth, verifyPassword, generateToken } from './lib/auth'
import { uploadAudioToR2 } from './lib/upload'
import { validateAudioFile } from './lib/validators'
import manifestJSON from '__STATIC_CONTENT_MANIFEST'

const assetManifest = JSON.parse(manifestJSON)

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>()

// 静的ファイル配信（Workers Sites KV）
app.get('/styles.css', async (c) => {
  try {
    return await getAssetFromKV(
      {
        request: c.req.raw,
        waitUntil: c.executionCtx.waitUntil.bind(c.executionCtx),
      },
      {
        ASSET_NAMESPACE: c.env.__STATIC_CONTENT,
        ASSET_MANIFEST: assetManifest,
      }
    )
  } catch (e) {
    return c.text('File not found', 404)
  }
})

// ホームページ
app.get('/', async (c) => {
  const db = new Database(c.env.DB)
  const texts = await db.getMedicalTexts()

  return c.html(<HomePage texts={texts} />)
})

// テキスト詳細ページ（章一覧）
app.get('/texts/:slug', async (c) => {
  const slug = c.req.param('slug')
  const db = new Database(c.env.DB)

  const text = await db.getMedicalTextBySlug(slug)
  if (!text) {
    return c.text('テキストが見つかりません', 404)
  }

  const chapters = await db.getChaptersByTextId(text.id)

  return c.html(<TextDetailPage text={text} chapters={chapters} />)
})

// 章詳細ページ
app.get('/texts/:slug/chapters/:chapterId', async (c) => {
  const slug = c.req.param('slug')
  const chapterId = c.req.param('chapterId')
  const db = new Database(c.env.DB)

  const chapter = await db.getChapterById(chapterId)
  if (!chapter) {
    return c.text('章が見つかりません', 404)
  }

  const text = await db.getMedicalTextBySlug(slug)
  if (!text) {
    return c.text('テキストが見つかりません', 404)
  }

  return c.html(<ChapterDetailPage chapter={chapter} text={text} slug={slug} />)
})

// ヘルスチェック
app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// 管理画面ログインページ
app.get('/admin/login', (c) => {
  return c.html(<LoginPage />)
})

// ログイン処理
app.post('/admin/login', async (c) => {
  const { userId, password } = await c.req.parseBody()

  // 環境変数から認証情報を取得
  const adminUserId = c.env.ADMIN_USER_ID
  const adminPasswordHash = c.env.ADMIN_PASSWORD_HASH

  if (userId !== adminUserId) {
    return c.html(<LoginPage error="ユーザーIDまたはパスワードが正しくありません" />)
  }

  const isValid = await verifyPassword(password as string, adminPasswordHash)

  if (!isValid) {
    return c.html(<LoginPage error="ユーザーIDまたはパスワードが正しくありません" />)
  }

  const token = await generateToken(userId as string, c.env.JWT_SECRET)
  setCookie(c, 'admin_token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    maxAge: 86400, // 24時間
    path: '/admin'
  })

  return c.redirect('/admin')
})

// ログアウト処理
app.post('/admin/logout', (c) => {
  deleteCookie(c, 'admin_token', { path: '/admin' })
  return c.redirect('/admin/login')
})

// 管理画面ダッシュボード
app.get('/admin', adminAuth, async (c) => {
  const db = new Database(c.env.DB)

  // 統計情報を取得
  const texts = await db.getMedicalTexts()

  // 全章を取得して統計を計算
  let totalChapters = 0
  let chaptersWithAudio = 0
  const recentUpdates: Array<{
    title: string
    updatedAt: string
    type: 'chapter' | 'audio'
  }> = []

  for (const text of texts) {
    const chapters = await db.getChaptersByTextId(text.id)
    totalChapters += chapters.length

    for (const chapter of chapters) {
      if (chapter.audio_url) {
        chaptersWithAudio++
      }

      // 最近更新された章を追加（最新5件）
      if (recentUpdates.length < 5) {
        recentUpdates.push({
          title: `${text.title_jp} - ${chapter.title_jp}`,
          updatedAt: new Date(chapter.updated_at * 1000).toLocaleDateString('ja-JP'),
          type: chapter.audio_url ? 'audio' : 'chapter'
        })
      }
    }
  }

  // 更新日時でソート
  recentUpdates.sort((a, b) =>
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  )

  const stats = {
    totalChapters,
    chaptersWithAudio,
    totalTexts: texts.length,
    recentUpdates: recentUpdates.slice(0, 5)
  }

  return c.html(<DashboardPage stats={stats} />)
})

// 音声アップロードページ（GET）
app.get('/admin/upload', adminAuth, async (c) => {
  const db = new Database(c.env.DB)
  const texts = await db.getMedicalTexts()

  const textIdParam = c.req.query('text_id')
  const selectedTextId = textIdParam || undefined

  let chapters
  if (selectedTextId) {
    chapters = await db.getChaptersByTextId(selectedTextId)
  }

  return c.html(<UploadPage texts={texts} chapters={chapters} selectedTextId={selectedTextId} />)
})

// 音声アップロード処理（POST）
app.post('/admin/upload', adminAuth, async (c) => {
  const db = new Database(c.env.DB)

  try {
    const formData = await c.req.formData()
    const textId = formData.get('text_id') as string
    const chapterId = formData.get('chapter_id') as string
    const audioFile = formData.get('audio_file') as File

    // バリデーション
    if (!textId || !chapterId || !audioFile) {
      const texts = await db.getMedicalTexts()
      const chapters = await db.getChaptersByTextId(textId)
      return c.html(
        <UploadPage
          texts={texts}
          chapters={chapters}
          selectedTextId={textId}
          error="すべての項目を入力してください。"
        />
      )
    }

    // ファイルバリデーション
    const validation = validateAudioFile(audioFile)
    if (!validation.valid) {
      const texts = await db.getMedicalTexts()
      const chapters = await db.getChaptersByTextId(textId)
      return c.html(
        <UploadPage
          texts={texts}
          chapters={chapters}
          selectedTextId={textId}
          error={validation.error}
        />
      )
    }

    // R2にアップロード
    const uploadResult = await uploadAudioToR2(c.env.R2, audioFile, parseInt(chapterId))

    if (!uploadResult.success) {
      const texts = await db.getMedicalTexts()
      const chapters = await db.getChaptersByTextId(textId)
      return c.html(
        <UploadPage
          texts={texts}
          chapters={chapters}
          selectedTextId={textId}
          error={uploadResult.error || 'アップロードに失敗しました。'}
        />
      )
    }

    // データベース更新
    await db.updateChapter(chapterId, {
      audio_url: uploadResult.url
    })

    // 成功時は一覧にリダイレクト
    return c.redirect('/admin?success=audio_uploaded')

  } catch (error) {
    console.error('Upload error:', error)
    const texts = await db.getMedicalTexts()
    return c.html(
      <UploadPage
        texts={texts}
        error="予期しないエラーが発生しました。"
      />
    )
  }
})

// 章管理ページ（GET）
app.get('/admin/chapters', adminAuth, async (c) => {
  const db = new Database(c.env.DB)
  const texts = await db.getMedicalTexts()

  const textIdParam = c.req.query('text_id')
  const selectedTextId = textIdParam || undefined

  let chapters
  let selectedText
  if (selectedTextId) {
    chapters = await db.getChaptersByTextId(selectedTextId)
    selectedText = texts.find(t => t.id === selectedTextId)
  }

  return c.html(<ChaptersPage texts={texts} chapters={chapters} selectedText={selectedText} />)
})

// 新規章追加ページ（GET）
app.get('/admin/chapters/new', adminAuth, async (c) => {
  const db = new Database(c.env.DB)
  const texts = await db.getMedicalTexts()

  const textIdParam = c.req.query('text_id')
  const selectedTextId = textIdParam || undefined
  const selectedText = selectedTextId ? texts.find(t => t.id === selectedTextId) : undefined

  return c.html(<ChapterFormPage texts={texts} selectedText={selectedText} isEdit={false} />)
})

// 新規章追加処理（POST）
app.post('/admin/chapters/new', adminAuth, async (c) => {
  const db = new Database(c.env.DB)

  try {
    const formData = await c.req.parseBody()
    const textId = formData.text_id as string
    const chapterOrder = parseInt(formData.chapter_order as string)
    const titleJp = formData.title_jp as string
    const titleEn = formData.title_en as string
    const contentJp = formData.content_jp as string
    const contentEn = formData.content_en as string

    // バリデーション
    if (!textId || !chapterOrder || !titleJp || !titleEn || !contentJp || !contentEn) {
      const texts = await db.getMedicalTexts()
      return c.html(
        <ChapterFormPage
          texts={texts}
          isEdit={false}
          error="すべての必須項目を入力してください。"
        />
      )
    }

    // IDを生成
    const chapterId = `${textId}-${chapterOrder}`

    // 章を作成
    await db.createChapter({
      id: chapterId,
      text_id: textId,
      chapter_order: chapterOrder,
      title_jp: titleJp,
      title_en: titleEn,
      content_jp: contentJp,
      content_en: contentEn,
      audio_url: null,
      duration_seconds: null
    })

    return c.redirect(`/admin/chapters?text_id=${textId}`)

  } catch (error) {
    console.error('Create chapter error:', error)
    const texts = await db.getMedicalTexts()
    return c.html(
      <ChapterFormPage
        texts={texts}
        isEdit={false}
        error="章の作成に失敗しました。"
      />
    )
  }
})

// 章編集ページ（GET）
app.get('/admin/chapters/edit/:id', adminAuth, async (c) => {
  const db = new Database(c.env.DB)
  const chapterId = c.req.param('id')

  const chapter = await db.getChapterById(chapterId)

  if (!chapter) {
    return c.redirect('/admin/chapters')
  }

  const texts = await db.getMedicalTexts()

  return c.html(<ChapterFormPage texts={texts} chapter={chapter} isEdit={true} />)
})

// 章編集処理（POST）
app.post('/admin/chapters/edit/:id', adminAuth, async (c) => {
  const db = new Database(c.env.DB)
  const chapterId = c.req.param('id')

  try {
    const formData = await c.req.parseBody()
    const chapterOrder = parseInt(formData.chapter_order as string)
    const titleJp = formData.title_jp as string
    const titleEn = formData.title_en as string
    const contentJp = formData.content_jp as string
    const contentEn = formData.content_en as string

    const chapter = await db.getChapterById(chapterId)
    if (!chapter) {
      return c.redirect('/admin/chapters')
    }

    // バリデーション
    if (!chapterOrder || !titleJp || !titleEn || !contentJp || !contentEn) {
      const texts = await db.getMedicalTexts()
      return c.html(
        <ChapterFormPage
          texts={texts}
          chapter={chapter}
          isEdit={true}
          error="すべての必須項目を入力してください。"
        />
      )
    }

    // 章を更新
    await db.updateChapter(chapterId, {
      chapter_order: chapterOrder,
      title_jp: titleJp,
      title_en: titleEn,
      content_jp: contentJp,
      content_en: contentEn
    })

    return c.redirect(`/admin/chapters?text_id=${chapter.text_id}`)

  } catch (error) {
    console.error('Update chapter error:', error)
    const texts = await db.getMedicalTexts()
    const chapter = await db.getChapterById(chapterId)
    return c.html(
      <ChapterFormPage
        texts={texts}
        chapter={chapter || undefined}
        isEdit={true}
        error="章の更新に失敗しました。"
      />
    )
  }
})

// 章削除処理（POST）
app.post('/admin/chapters/delete/:id', adminAuth, async (c) => {
  const db = new Database(c.env.DB)
  const chapterId = c.req.param('id')

  try {
    const chapter = await db.getChapterById(chapterId)
    const textId = chapter?.text_id

    await db.deleteChapter(chapterId)

    return c.redirect(`/admin/chapters?text_id=${textId}`)

  } catch (error) {
    console.error('Delete chapter error:', error)
    return c.redirect('/admin/chapters')
  }
})

export default app
