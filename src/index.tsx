/** @jsxImportSource hono/jsx */

import { Hono } from 'hono'
import type { Bindings, Variables } from './types/bindings'
import { Database } from './lib/db'
import { HomePage } from './views/home'
import { TextDetailPage } from './views/text-detail'
import { ChapterDetailPage } from './views/chapter-detail'

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>()

// 静的ファイルはCloudflare Workers Assetsによって自動配信される

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

export default app
