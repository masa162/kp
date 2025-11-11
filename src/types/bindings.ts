// Cloudflare Workers バインディング型定義

export type Bindings = {
  DB: D1Database
  R2: R2Bucket
  __STATIC_CONTENT: KVNamespace
  JWT_SECRET: string // JWT署名用シークレット
  ADMIN_USER_ID: string // 管理者ユーザーID
  ADMIN_PASSWORD_HASH: string // 管理者パスワードハッシュ
}

export type Variables = {
  user?: string
  adminUser?: {
    sub: string
    role: string
    exp: number
  }
}

// データベーステーブル型
export interface MedicalText {
  id: string
  slug: string
  title_jp: string
  title_en: string
  description_jp: string | null
  description_en: string | null
  order_index: number
  created_at: number
  updated_at: number
}

export interface Chapter {
  id: string
  text_id: string
  chapter_order: number
  title_jp: string
  title_en: string
  content_jp: string | null
  content_en: string | null
  audio_url: string | null
  duration_seconds: number
  created_at: number
  updated_at: number
}
