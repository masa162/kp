/** @jsxImportSource hono/jsx */

import { Layout } from './layout'
import type { Chapter, MedicalText } from '../types/bindings'

interface ChapterDetailProps {
  chapter: Chapter
  text: MedicalText
  slug: string
}

// 秒数をMM:SS形式に変換
const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export const ChapterDetailPage = ({ chapter, text, slug }: ChapterDetailProps) => {
  return (
    <Layout title={`${chapter.title_jp} - ${text.title_jp}`}>
      <div class="container mx-auto px-4 py-12 max-w-4xl">
        {/* パンくずナビゲーション */}
        <nav class="mb-8 text-sm">
          <a href="/" class="text-matcha hover:text-matcha-dark transition-colors">
            ← 古典一覧
          </a>
          <span class="mx-2 text-sumi/40">/</span>
          <a href={`/texts/${slug}`} class="text-matcha hover:text-matcha-dark transition-colors">
            {text.title_jp}
          </a>
          <span class="mx-2 text-sumi/40">/</span>
          <span class="text-sumi/60">{chapter.title_jp}</span>
        </nav>

        {/* 章タイトル */}
        <div class="mb-8">
          <div class="flex items-center gap-4 mb-4">
            <span class="flex items-center justify-center w-12 h-12 rounded-full bg-matcha text-white font-bold text-lg">
              {chapter.chapter_order}
            </span>
            <h1 class="text-4xl font-bold font-serif text-sumi">
              {chapter.title_jp}
            </h1>
          </div>
          {chapter.title_en && (
            <p class="text-lg text-sumi/60 ml-16">{chapter.title_en}</p>
          )}
        </div>

        {/* 音声プレーヤー */}
        {chapter.audio_url && (
          <div class="mb-12 bg-gradient-to-br from-kinari to-washi border-2 border-matcha-light rounded-xl p-8 shadow-lg">
            <div class="flex items-center gap-3 mb-6">
              <svg class="w-6 h-6 text-matcha" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
              </svg>
              <h2 class="text-2xl font-bold text-sumi font-serif">音声</h2>
              {chapter.duration_seconds > 0 && (
                <span class="ml-auto text-sm text-sumi/60 bg-white/60 px-3 py-1 rounded-full">
                  {formatDuration(chapter.duration_seconds)}
                </span>
              )}
            </div>

            <audio
              controls
              src={chapter.audio_url}
              class="w-full h-12 rounded-lg"
              style="filter: sepia(20%) saturate(70%) hue-rotate(80deg);"
            >
              お使いのブラウザは音声再生に対応していません
            </audio>

            <div class="mt-4 text-sm text-sumi/50 text-center">
              💡 再生速度の調整や巻き戻し・早送りは、プレーヤーの設定メニューから行えます
            </div>
          </div>
        )}

        {/* 本文 */}
        <div class="bg-white border-2 border-washi-dark rounded-xl p-8 shadow-sm">
          <div class="flex items-center gap-3 mb-6 pb-4 border-b-2 border-matcha/20">
            <svg class="w-6 h-6 text-matcha" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
            <h2 class="text-2xl font-bold text-sumi font-serif">本文</h2>
          </div>

          {chapter.content_jp ? (
            <div class="prose prose-lg max-w-none">
              <div class="text-sumi leading-relaxed whitespace-pre-wrap font-serif text-lg">
                {chapter.content_jp}
              </div>
            </div>
          ) : (
            <div class="text-center py-12 text-sumi/40">
              本文はまだ登録されていません
            </div>
          )}

          {/* 英訳がある場合 */}
          {chapter.content_en && (
            <>
              <div class="my-8 border-t-2 border-matcha/10"></div>
              <div class="flex items-center gap-3 mb-6">
                <svg class="w-6 h-6 text-take" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
                </svg>
                <h3 class="text-xl font-bold text-sumi/80">English Translation</h3>
              </div>
              <div class="text-sumi/70 leading-relaxed whitespace-pre-wrap text-base">
                {chapter.content_en}
              </div>
            </>
          )}
        </div>

        {/* ナビゲーションボタン */}
        <div class="mt-12 flex justify-center">
          <a
            href={`/texts/${slug}`}
            class="inline-flex items-center gap-2 px-8 py-4 bg-matcha text-white font-bold rounded-lg hover:bg-matcha-dark transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            章一覧に戻る
          </a>
        </div>
      </div>
    </Layout>
  )
}
