-- 古医術研究所 データベーススキーマ

-- 古典テキストテーブル
CREATE TABLE IF NOT EXISTS medical_texts (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title_jp TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_jp TEXT,
  description_en TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);

-- 章テーブル
CREATE TABLE IF NOT EXISTS chapters (
  id TEXT PRIMARY KEY,
  text_id TEXT NOT NULL,
  chapter_order INTEGER NOT NULL,
  title_jp TEXT NOT NULL,
  title_en TEXT NOT NULL,
  content_jp TEXT,
  content_en TEXT,
  audio_url TEXT,
  duration_seconds INTEGER DEFAULT 0,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at INTEGER NOT NULL DEFAULT (unixepoch()),
  FOREIGN KEY (text_id) REFERENCES medical_texts(id) ON DELETE CASCADE
);

-- インデックス
CREATE INDEX IF NOT EXISTS idx_chapters_text_id ON chapters(text_id);
CREATE INDEX IF NOT EXISTS idx_chapters_order ON chapters(text_id, chapter_order);
CREATE INDEX IF NOT EXISTS idx_texts_order ON medical_texts(order_index);
