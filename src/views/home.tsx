/** @jsxImportSource hono/jsx */

import { Layout } from './layout'
import type { MedicalText } from '../types/bindings'

export const HomePage = ({ texts }: { texts: MedicalText[] }) => {
  return (
    <Layout title="ホーム">
      <div class="container mx-auto px-4 py-12 max-w-6xl">
        <h2 class="text-4xl font-bold mb-10 font-serif text-sumi border-l-4 border-matcha pl-4">
          古典一覧
        </h2>

        {texts.length === 0 ? (
          <div class="text-center py-16 bg-washi rounded-lg">
            <p class="text-gray-500 mb-4 text-lg">古典が登録されていません</p>
          </div>
        ) : (
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {texts.map((text) => (
              <a
                key={text.id}
                href={`/texts/${text.slug}`}
                class="group block relative bg-kinari border-2 border-matcha-light p-8 rounded-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 hover:border-matcha-dark"
              >
                {/* 装飾的なコーナー */}
                <div class="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-gold rounded-tl-lg opacity-30"></div>
                <div class="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-gold rounded-br-lg opacity-30"></div>

                <h3 class="text-2xl font-bold mb-4 font-serif text-sumi group-hover:text-shu transition-colors duration-300 leading-relaxed">
                  {text.title_jp}
                </h3>
                {text.description_jp && (
                  <p class="text-sumi text-base leading-relaxed opacity-80 line-clamp-4">
                    {text.description_jp}
                  </p>
                )}

                {/* 読み進めるアイコン */}
                <div class="mt-6 flex items-center text-matcha-dark group-hover:text-shu transition-colors">
                  <span class="text-sm font-medium">詳しく見る</span>
                  <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}
