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
      <div class="container mx-auto px-4 py-12 max-w-5xl">
        {/* ヘッダー */}
        <div class="mb-8">
          <nav class="text-sm mb-4">
            <a href="/" class="text-matcha hover:text-matcha-dark transition-colors">
              ← 古典一覧に戻る
            </a>
          </nav>

          <h1 class="text-5xl font-bold mb-4 font-serif text-sumi border-l-4 border-matcha pl-4">
            {text.title_jp}
          </h1>

          {text.description_jp && (
            <p class="text-lg text-sumi leading-relaxed opacity-80 pl-5">
              {text.description_jp}
            </p>
          )}
        </div>

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
            <div class="space-y-3">
              {chapters.map((chapter, index) => (
                <a
                  key={chapter.id}
                  href={`/texts/${text.slug}/chapters/${chapter.id}`}
                  class="group block bg-white border-2 border-matcha-light hover:border-matcha rounded-lg p-5 transition-all duration-300 hover:shadow-lg hover:translate-x-2"
                >
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <div class="flex items-center gap-3 mb-2">
                        {/* 章番号バッジ */}
                        <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-matcha text-white text-sm font-bold">
                          {index + 1}
                        </span>

                        <h3 class="text-xl font-bold font-serif text-sumi group-hover:text-shu transition-colors">
                          {chapter.title_jp}
                        </h3>
                      </div>

                      {/* コンテンツプレビュー */}
                      {chapter.content_jp && (
                        <p class="text-sm text-sumi opacity-70 line-clamp-2 ml-11">
                          {chapter.content_jp.substring(0, 100)}...
                        </p>
                      )}
                    </div>

                    {/* 音声情報 & アイコン */}
                    <div class="flex flex-col items-end gap-2 ml-4">
                      {chapter.audio_url && (
                        <div class="flex items-center gap-2 text-sm text-matcha-dark">
                          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                          </svg>
                          {chapter.duration_seconds > 0 && (
                            <span>{Math.floor(chapter.duration_seconds / 60)}:{(chapter.duration_seconds % 60).toString().padStart(2, '0')}</span>
                          )}
                        </div>
                      )}

                      <svg class="w-6 h-6 text-matcha-dark group-hover:text-shu group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
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
          <div class="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
            <div class="bg-kinari rounded-lg p-4 text-center border border-matcha-light">
              <div class="text-3xl font-bold text-matcha">{chapters.length}</div>
              <div class="text-sm text-sumi opacity-70">章</div>
            </div>

            <div class="bg-kinari rounded-lg p-4 text-center border border-matcha-light">
              <div class="text-3xl font-bold text-matcha">
                {chapters.filter(c => c.audio_url).length}
              </div>
              <div class="text-sm text-sumi opacity-70">音声あり</div>
            </div>

            <div class="bg-kinari rounded-lg p-4 text-center border border-matcha-light">
              <div class="text-3xl font-bold text-matcha">
                {Math.floor(chapters.reduce((sum, c) => sum + c.duration_seconds, 0) / 60)}
              </div>
              <div class="text-sm text-sumi opacity-70">合計分数</div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
