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
      {/* ヘッダーセクション */}
      <div class="bg-gradient-to-br from-washi via-kinari to-washi border-b-4 border-matcha">
        <div class="container mx-auto px-4 py-10 max-w-4xl">
          {/* パンくずナビゲーション */}
          <nav class="mb-6 text-sm flex items-center gap-2 flex-wrap">
            <a href="/" class="inline-flex items-center gap-1 text-matcha hover:text-matcha-dark transition-colors font-medium">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              古典一覧
            </a>
            <svg class="w-4 h-4 text-sumi/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <a href={`/texts/${slug}`} class="text-matcha hover:text-matcha-dark transition-colors font-medium">
              {text.title_jp}
            </a>
            <svg class="w-4 h-4 text-sumi/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <span class="text-sumi/70 font-medium">{chapter.title_jp}</span>
          </nav>

          {/* 章タイトル */}
          <div class="flex items-start gap-5">
            <span class="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-matcha to-matcha-dark text-white font-bold text-2xl shadow-xl flex-shrink-0">
              {chapter.chapter_order}
            </span>
            <div class="flex-1">
              <h1 class="text-4xl md:text-5xl font-bold font-serif text-sumi leading-tight mb-3">
                {chapter.title_jp}
              </h1>
              {chapter.title_en && (
                <p class="text-lg text-matcha-dark opacity-80 font-medium">{chapter.title_en}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div class="container mx-auto px-4 py-12 max-w-4xl">

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
        <div class="bg-gradient-to-br from-white to-kinari/20 border-2 border-matcha-light rounded-2xl p-10 shadow-xl">
          <div class="flex items-center gap-3 mb-8 pb-6 border-b-2 border-matcha/20">
            <div class="p-2 bg-matcha/10 rounded-lg">
              <svg class="w-7 h-7 text-matcha" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
            </div>
            <h2 class="text-3xl font-bold text-sumi font-serif">本文</h2>
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
        <div class="mt-16 flex justify-center">
          <a
            href={`/texts/${slug}`}
            class="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-matcha to-matcha-dark text-white font-bold rounded-2xl hover:shadow-2xl transition-all duration-500 hover:scale-110 shadow-xl"
          >
            <svg class="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/>
            </svg>
            <span class="text-lg">章一覧に戻る</span>
          </a>
        </div>
      </div>
    </Layout>
  )
}
