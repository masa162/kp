/** @jsxImportSource hono/jsx */

import { AdminLayout } from './layout'

export interface DashboardProps {
  stats: {
    totalChapters: number
    chaptersWithAudio: number
    totalTexts: number
    recentUpdates: Array<{
      title: string
      updatedAt: string
      type: 'chapter' | 'audio'
    }>
  }
}

export const DashboardPage = ({ stats }: DashboardProps) => {
  return (
    <AdminLayout title="ダッシュボード" currentPath="/admin">
      <div class="space-y-8">
        {/* ヘッダー */}
        <div>
          <h1 class="text-4xl font-bold font-serif text-sumi mb-2">ダッシュボード</h1>
          <p class="text-lg text-sumi/60">古医術研究所 管理パネルへようこそ</p>
        </div>

        {/* 統計カード */}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white rounded-2xl p-6 border-2 border-matcha-light hover:border-matcha transition-all hover:shadow-xl">
            <div class="flex items-center justify-between mb-4">
              <div class="p-3 bg-matcha/10 rounded-lg">
                <svg class="w-8 h-8 text-matcha" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
            <div class="text-4xl font-bold text-matcha mb-2">{stats.totalChapters}</div>
            <div class="text-sm font-medium text-sumi/70">全章数</div>
          </div>

          <div class="bg-white rounded-2xl p-6 border-2 border-matcha-light hover:border-matcha transition-all hover:shadow-xl">
            <div class="flex items-center justify-between mb-4">
              <div class="p-3 bg-matcha/10 rounded-lg">
                <svg class="w-8 h-8 text-matcha" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
            </div>
            <div class="text-4xl font-bold text-matcha mb-2">{stats.chaptersWithAudio}</div>
            <div class="text-sm font-medium text-sumi/70">音声収録済</div>
          </div>

          <div class="bg-white rounded-2xl p-6 border-2 border-matcha-light hover:border-matcha transition-all hover:shadow-xl">
            <div class="flex items-center justify-between mb-4">
              <div class="p-3 bg-matcha/10 rounded-lg">
                <svg class="w-8 h-8 text-matcha" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
              </div>
            </div>
            <div class="text-4xl font-bold text-matcha mb-2">{stats.totalTexts}</div>
            <div class="text-sm font-medium text-sumi/70">古典数</div>
          </div>
        </div>

        {/* クイックアクション */}
        <div class="bg-white rounded-2xl p-6 border-2 border-matcha-light">
          <h2 class="text-2xl font-bold font-serif text-sumi mb-6">クイックアクション</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/admin/chapters/new"
              class="flex items-center gap-4 p-4 border-2 border-matcha-light rounded-lg hover:border-matcha hover:bg-kinari/50 transition-all group"
            >
              <div class="p-3 bg-matcha/10 rounded-lg group-hover:bg-matcha/20 transition-colors">
                <svg class="w-6 h-6 text-matcha" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <div class="font-bold text-sumi group-hover:text-shu transition-colors">新しい章を追加</div>
                <div class="text-sm text-sumi/60">章を作成して本文を入力</div>
              </div>
            </a>

            <a
              href="/admin/upload"
              class="flex items-center gap-4 p-4 border-2 border-matcha-light rounded-lg hover:border-matcha hover:bg-kinari/50 transition-all group"
            >
              <div class="p-3 bg-matcha/10 rounded-lg group-hover:bg-matcha/20 transition-colors">
                <svg class="w-6 h-6 text-matcha" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div>
                <div class="font-bold text-sumi group-hover:text-shu transition-colors">音声をアップロード</div>
                <div class="text-sm text-sumi/60">MP3/M4A/WAVファイル対応</div>
              </div>
            </a>
          </div>
        </div>

        {/* 最近の更新 */}
        {stats.recentUpdates.length > 0 && (
          <div class="bg-white rounded-2xl p-6 border-2 border-matcha-light">
            <h2 class="text-2xl font-bold font-serif text-sumi mb-6">最近の更新</h2>
            <div class="space-y-3">
              {stats.recentUpdates.map((update, index) => (
                <div key={index} class="flex items-center gap-4 p-4 bg-washi rounded-lg">
                  <div class={`p-2 rounded-lg ${
                    update.type === 'audio' ? 'bg-matcha/10' : 'bg-shu/10'
                  }`}>
                    {update.type === 'audio' ? (
                      <svg class="w-5 h-5 text-matcha" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                      </svg>
                    ) : (
                      <svg class="w-5 h-5 text-shu" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    )}
                  </div>
                  <div class="flex-1">
                    <div class="font-medium text-sumi">{update.title}</div>
                    <div class="text-sm text-sumi/60">{update.updatedAt}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
