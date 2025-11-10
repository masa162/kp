// D1 データベース操作

import type { D1Database } from '@cloudflare/workers-types'
import type { MedicalText, Chapter } from '../types/bindings'

export class Database {
  constructor(private db: D1Database) {}

  // 古典テキスト取得
  async getMedicalTexts(): Promise<MedicalText[]> {
    const { results } = await this.db
      .prepare('SELECT * FROM medical_texts ORDER BY order_index ASC')
      .all<MedicalText>()
    return results || []
  }

  async getMedicalTextBySlug(slug: string): Promise<MedicalText | null> {
    const result = await this.db
      .prepare('SELECT * FROM medical_texts WHERE slug = ?')
      .bind(slug)
      .first<MedicalText>()
    return result
  }

  // 章取得
  async getChaptersByTextId(textId: string): Promise<Chapter[]> {
    const { results } = await this.db
      .prepare('SELECT * FROM chapters WHERE text_id = ? ORDER BY chapter_order ASC')
      .bind(textId)
      .all<Chapter>()
    return results || []
  }

  async getChapterById(id: string): Promise<Chapter | null> {
    const result = await this.db
      .prepare('SELECT * FROM chapters WHERE id = ?')
      .bind(id)
      .first<Chapter>()
    return result
  }

  // 章の作成
  async createChapter(chapter: Omit<Chapter, 'created_at' | 'updated_at'>): Promise<void> {
    await this.db
      .prepare(`
        INSERT INTO chapters (id, text_id, chapter_order, title_jp, title_en, content_jp, content_en, audio_url, duration_seconds)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
      .bind(
        chapter.id,
        chapter.text_id,
        chapter.chapter_order,
        chapter.title_jp,
        chapter.title_en,
        chapter.content_jp,
        chapter.content_en,
        chapter.audio_url,
        chapter.duration_seconds
      )
      .run()
  }

  // 章の更新
  async updateChapter(id: string, chapter: Partial<Chapter>): Promise<void> {
    const fields: string[] = []
    const values: any[] = []

    if (chapter.title_jp !== undefined) {
      fields.push('title_jp = ?')
      values.push(chapter.title_jp)
    }
    if (chapter.title_en !== undefined) {
      fields.push('title_en = ?')
      values.push(chapter.title_en)
    }
    if (chapter.content_jp !== undefined) {
      fields.push('content_jp = ?')
      values.push(chapter.content_jp)
    }
    if (chapter.content_en !== undefined) {
      fields.push('content_en = ?')
      values.push(chapter.content_en)
    }
    if (chapter.audio_url !== undefined) {
      fields.push('audio_url = ?')
      values.push(chapter.audio_url)
    }
    if (chapter.duration_seconds !== undefined) {
      fields.push('duration_seconds = ?')
      values.push(chapter.duration_seconds)
    }

    if (fields.length === 0) return

    fields.push('updated_at = unixepoch()')
    values.push(id)

    await this.db
      .prepare(`UPDATE chapters SET ${fields.join(', ')} WHERE id = ?`)
      .bind(...values)
      .run()
  }

  // 章の削除
  async deleteChapter(id: string): Promise<void> {
    await this.db
      .prepare('DELETE FROM chapters WHERE id = ?')
      .bind(id)
      .run()
  }
}
