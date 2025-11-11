/** @jsxImportSource hono/jsx */

import { Layout } from './layout'
import type { MedicalText, Chapter } from '../types/bindings'

interface TextDetailProps {
  text: MedicalText
  chapters: Chapter[]
}

export const TextDetailPage = ({ text, chapters }: TextDetailProps) => {
  return (
    <Layout title={text.title_jp}>
      {/* ヘッダーセクション */}
      <div class="bg-gradient-to-br from-washi via-kinari to-washi border-b-4 border-matcha">
        <div class="container mx-auto px-4 py-12 max-w-5xl">
          <nav class="text-sm mb-6">
            <a href="/" class="inline-flex items-center gap-2 text-matcha hover:text-matcha-dark transition-colors font-medium">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              古典一覧に戻る
            </a>
          </nav>

          <div class="relative">
            <h1 class="text-5xl md:text-6xl font-bold mb-6 font-serif text-sumi leading-tight">
              {text.title_jp}
            </h1>
            {text.title_en && (
              <p class="text-xl text-matcha-dark opacity-80 mb-6 font-medium tracking-wide">
                {text.title_en}
              </p>
            )}
            {text.description_jp && (
              <p class="text-lg text-sumi leading-relaxed opacity-80 max-w-3xl">
                {text.description_jp}
              </p>
            )}
          </div>
        </div>
      </div>

      <div class="container mx-auto px-4 py-12 max-w-5xl">

        {/* 章一覧 */}
        <div class="bg-washi rounded-lg p-6">
          <h2 class="text-2xl font-bold mb-6 font-serif text-sumi flex items-center">
            <svg class="w-6 h-6 mr-2 text-matcha" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            章一覧
          </h2>

          {chapters.length === 0 ? (
            <div class="text-center py-12 text-gray-500">
              <p class="mb-2">まだ章が登録されていません</p>
              <p class="text-sm">準備中です</p>
            </div>
          ) : (
            <div class="space-y-4">
              {chapters.map((chapter, index) => (
                <a
                  key={chapter.id}
                  href={`/texts/${text.slug}/chapters/${chapter.id}`}
                  class="group block relative bg-gradient-to-r from-white to-kinari/30 border-2 border-matcha-light hover:border-matcha rounded-xl p-6 transition-all duration-500 hover:shadow-2xl hover:translate-x-3 overflow-hidden"
                >
                  {/* 背景装飾 */}
                  <div class="absolute top-0 right-0 w-32 h-32 bg-matcha/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>

                  <div class="flex items-start justify-between relative">
                    <div class="flex-1">
                      <div class="flex items-center gap-4 mb-3">
                        {/* 章番号バッジ */}
                        <span class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-matcha to-matcha-dark text-white text-lg font-bold shadow-lg group-hover:scale-110 transition-transform">
                          {chapter.chapter_order}
                        </span>

                        <div class="flex-1">
                          <h3 class="text-2xl font-bold font-serif text-sumi group-hover:text-shu transition-colors leading-tight mb-1">
                            {chapter.title_jp}
                          </h3>
                          {chapter.title_en && (
                            <p class="text-sm text-matcha-dark opacity-70 font-medium">
                              {chapter.title_en}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* コンテンツプレビュー */}
                      {chapter.content_jp && (
                        <p class="text-sm text-sumi opacity-70 line-clamp-2 ml-16 leading-relaxed">
                          {chapter.content_jp.substring(0, 150)}...
                        </p>
                      )}

                      {/* タグ */}
                      <div class="flex gap-2 mt-4 ml-16">
                        {chapter.audio_url && (
                          <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-matcha/10 text-matcha-dark rounded-full text-xs font-medium">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                            </svg>
                            音声あり
                            {chapter.duration_seconds > 0 && (
                              <span class="ml-1">{Math.floor(chapter.duration_seconds / 60)}:{(chapter.duration_seconds % 60).toString().padStart(2, '0')}</span>
                            )}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* 矢印アイコン */}
                    <div class="ml-6">
                      <svg class="w-8 h-8 text-matcha group-hover:text-shu group-hover:translate-x-2 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* 統計情報 */}
        {chapters.length > 0 && (
          <div class="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-gradient-to-br from-kinari to-washi rounded-2xl p-6 text-center border-2 border-matcha-light hover:border-matcha transition-all hover:shadow-xl group">
              <div class="text-5xl font-bold text-matcha mb-2 group-hover:scale-110 transition-transform">{chapters.length}</div>
              <div class="text-sm font-medium text-sumi opacity-70 uppercase tracking-wider">全章数</div>
            </div>

            <div class="bg-gradient-to-br from-kinari to-washi rounded-2xl p-6 text-center border-2 border-matcha-light hover:border-matcha transition-all hover:shadow-xl group">
              <div class="text-5xl font-bold text-matcha mb-2 group-hover:scale-110 transition-transform">
                {chapters.filter(c => c.audio_url).length}
              </div>
              <div class="text-sm font-medium text-sumi opacity-70 uppercase tracking-wider">音声収録済</div>
            </div>

            <div class="bg-gradient-to-br from-kinari to-washi rounded-2xl p-6 text-center border-2 border-matcha-light hover:border-matcha transition-all hover:shadow-xl group">
              <div class="text-5xl font-bold text-matcha mb-2 group-hover:scale-110 transition-transform">
                {Math.floor(chapters.reduce((sum, c) => sum + c.duration_seconds, 0) / 60)}
              </div>
              <div class="text-sm font-medium text-sumi opacity-70 uppercase tracking-wider">合計分数</div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
