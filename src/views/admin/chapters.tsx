/** @jsxImportSource hono/jsx */

import { AdminLayout } from './layout'
import type { MedicalText, Chapter } from '../../types/db'

interface ChaptersPageProps {
  texts: MedicalText[]
  chapters?: Chapter[]
  selectedText?: MedicalText
  error?: string
  success?: string
}

export function ChaptersPage({ texts, chapters, selectedText, error, success }: ChaptersPageProps) {
  return (
    <AdminLayout>
      <div class="max-w-6xl mx-auto">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900">章の管理</h1>
          {selectedText && (
            <a
              href={`/admin/chapters/new?text_id=${selectedText.id}`}
              class="bg-amber-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
            >
              + 新しい章を追加
            </a>
          )}
        </div>

        {error && (
          <div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-red-800">{error}</p>
          </div>
        )}

        {success && (
          <div class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p class="text-green-800">{success}</p>
          </div>
        )}

        {/* 古典選択 */}
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 class="text-xl font-semibold mb-4 text-gray-800">古典を選択</h2>

          <form method="GET" action="/admin/chapters" class="space-y-4">
            <div>
              <select
                name="text_id"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                onchange="this.form.submit()"
              >
                <option value="">-- 古典を選択 --</option>
                {texts.map(text => (
                  <option value={text.id} selected={selectedText?.id === text.id}>
                    {text.title_jp} ({text.title_en})
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>

        {/* 章一覧 */}
        {chapters && chapters.length > 0 && selectedText && (
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="p-6 border-b border-gray-200">
              <h2 class="text-xl font-semibold text-gray-800">
                {selectedText.title_jp} の章一覧
              </h2>
              <p class="text-sm text-gray-600 mt-1">全{chapters.length}章</p>
            </div>

            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      順序
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      タイトル
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      音声
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      更新日時
                    </th>
                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  {chapters.map(chapter => (
                    <tr class="hover:bg-gray-50">
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {chapter.chapter_order}
                      </td>
                      <td class="px-6 py-4">
                        <div class="text-sm font-medium text-gray-900">{chapter.title_jp}</div>
                        <div class="text-sm text-gray-500">{chapter.title_en}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {chapter.audio_url ? (
                          <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            ✓ あり
                          </span>
                        ) : (
                          <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            なし
                          </span>
                        )}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(chapter.updated_at * 1000).toLocaleDateString('ja-JP')}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <a
                          href={`/admin/chapters/edit/${chapter.id}`}
                          class="text-amber-600 hover:text-amber-900 hover:underline cursor-pointer font-semibold"
                        >
                          編集
                        </a>
                        <form
                          method="POST"
                          action={`/admin/chapters/delete/${chapter.id}`}
                          style="display: inline;"
                          onSubmit="return confirm('本当に削除しますか？')"
                        >
                          <button
                            type="submit"
                            class="text-red-600 hover:text-red-900 cursor-pointer"
                          >
                            削除
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 章がない場合 */}
        {selectedText && (!chapters || chapters.length === 0) && (
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <p class="text-yellow-800 mb-4">この古典にはまだ章が登録されていません。</p>
            <a
              href={`/admin/chapters/new?text_id=${selectedText.id}`}
              class="inline-block bg-amber-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
            >
              最初の章を追加する
            </a>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
