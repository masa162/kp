/** @jsxImportSource hono/jsx */

import { Layout } from './layout'
import type { MedicalText } from '../types/bindings'

export const HomePage = ({ texts }: { texts: MedicalText[] }) => {
  return (
    <Layout title="ホーム">
      {/* ヒーローセクション */}
      <div class="bg-gradient-to-br from-washi via-kinari to-washi border-b-4 border-matcha">
        <div class="container mx-auto px-4 py-16 max-w-6xl">
          <div class="text-center">
            <h1 class="text-6xl md:text-7xl font-bold font-serif text-sumi mb-6 leading-tight">
              古医術研究所
            </h1>
            <p class="text-xl md:text-2xl text-matcha-dark font-medium mb-4">
              東洋医学の古典を学ぶ
            </p>
            <p class="text-base md:text-lg text-sumi opacity-70 max-w-2xl mx-auto leading-relaxed">
              傷寒論・金匱要略・黄帝内経など、千年以上受け継がれてきた東洋医学の叡智を、現代に活かすための学習プラットフォームです。
            </p>
          </div>
        </div>
      </div>

      <div class="container mx-auto px-4 py-16 max-w-6xl">
        <h2 class="text-4xl font-bold mb-12 font-serif text-sumi border-l-4 border-matcha pl-4 inline-block">
          古典一覧
        </h2>

        {texts.length === 0 ? (
          <div class="text-center py-16 bg-washi rounded-lg">
            <p class="text-gray-500 mb-4 text-lg">古典が登録されていません</p>
          </div>
        ) : (
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {texts.map((text, index) => (
              <a
                key={text.id}
                href={`/texts/${text.slug}`}
                class="group block relative bg-gradient-to-br from-kinari to-washi border-2 border-matcha-light p-10 rounded-2xl hover:shadow-2xl hover:scale-[1.05] transition-all duration-500 hover:border-matcha overflow-hidden"
              >
                {/* 背景装飾 */}
                <div class="absolute top-0 right-0 w-32 h-32 bg-matcha/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                <div class="absolute bottom-0 left-0 w-24 h-24 bg-shu/5 rounded-full -ml-12 -mb-12 group-hover:scale-150 transition-transform duration-700"></div>

                {/* 装飾的なコーナー */}
                <div class="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-gold rounded-tl-2xl opacity-40 group-hover:opacity-70 transition-opacity"></div>
                <div class="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-gold rounded-br-2xl opacity-40 group-hover:opacity-70 transition-opacity"></div>

                {/* 番号バッジ */}
                <div class="absolute top-4 right-4 w-12 h-12 rounded-full bg-matcha/10 flex items-center justify-center group-hover:bg-matcha/20 transition-colors">
                  <span class="text-xl font-bold text-matcha">{index + 1}</span>
                </div>

                <div class="relative">
                  <h3 class="text-3xl font-bold mb-5 font-serif text-sumi group-hover:text-shu transition-colors duration-300 leading-tight">
                    {text.title_jp}
                  </h3>
                  {text.title_en && (
                    <p class="text-sm text-matcha-dark opacity-70 mb-4 font-medium tracking-wide">
                      {text.title_en}
                    </p>
                  )}
                  {text.description_jp && (
                    <p class="text-sumi text-base leading-relaxed opacity-80 line-clamp-4 mb-6">
                      {text.description_jp}
                    </p>
                  )}

                  {/* 読み進めるボタン */}
                  <div class="mt-8 flex items-center justify-between">
                    <span class="text-sm font-bold text-matcha group-hover:text-shu transition-colors">詳しく見る</span>
                    <svg class="w-6 h-6 text-matcha group-hover:text-shu group-hover:translate-x-2 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}
