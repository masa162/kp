/** @jsxImportSource hono/jsx */

import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import type { Bindings, Variables } from './types/bindings'
import { Database } from './lib/db'
import { HomePage } from './views/home'
import { TextDetailPage } from './views/text-detail'

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>()

// 静的ファイル配信
app.get('/styles.css', serveStatic({ path: './styles.css' }))

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
  const chapterId = c.req.param('chapterId')
  const db = new Database(c.env.DB)

  const chapter = await db.getChapterById(chapterId)
  if (!chapter) {
    return c.text('章が見つかりません', 404)
  }

  return c.html(
    <div>
      <h1>{chapter.title_jp}</h1>
      {chapter.audio_url && (
        <audio controls src={chapter.audio_url}>
          お使いのブラウザは音声再生に対応していません
        </audio>
      )}
      <div>{chapter.content_jp}</div>
    </div>
  )
})

// ヘルスチェック
app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

export default app
