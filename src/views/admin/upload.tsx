/** @jsxImportSource hono/jsx */

import { AdminLayout } from './layout'
import type { MedicalText, Chapter } from '../../types/db'

interface UploadPageProps {
  texts: MedicalText[]
  chapters?: Chapter[]
  selectedTextId?: string
  error?: string
  success?: string
}

export function UploadPage({ texts, chapters, selectedTextId, error, success }: UploadPageProps) {
  return (
    <AdminLayout>
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">音声ファイルアップロード</h1>

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

        {/* ステップ1: 古典を選択 */}
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 class="text-xl font-semibold mb-4 text-gray-800">ステップ1: 古典を選択</h2>

          <form method="GET" action="/admin/upload" class="space-y-4">
            <div>
              <label for="text_id" class="block text-sm font-medium text-gray-700 mb-2">
                古典を選択してください
              </label>
              <select
                id="text_id"
                name="text_id"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                onchange="this.form.submit()"
              >
                <option value="">-- 古典を選択 --</option>
                {texts.map(text => (
                  <option value={text.id} selected={selectedTextId === text.id}>
                    {text.title_jp} ({text.title_en})
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>

        {/* ステップ2: 章を選択してアップロード */}
        {chapters && chapters.length > 0 && (
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold mb-4 text-gray-800">ステップ2: 章を選択して音声をアップロード</h2>

            <form
              method="POST"
              action="/admin/upload"
              enctype="multipart/form-data"
              class="space-y-6"
            >
              <input type="hidden" name="text_id" value={selectedTextId} />

              <div>
                <label for="chapter_id" class="block text-sm font-medium text-gray-700 mb-2">
                  章を選択
                </label>
                <select
                  id="chapter_id"
                  name="chapter_id"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="">-- 章を選択 --</option>
                  {chapters.map(chapter => (
                    <option value={chapter.id}>
                      {chapter.title_jp} ({chapter.title_en})
                      {chapter.audio_url ? ' ✓ 音声あり' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label for="audio_file" class="block text-sm font-medium text-gray-700 mb-2">
                  音声ファイル（MP3/M4A/WAV、最大50MB）
                </label>
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-amber-500 transition-colors">
                  <input
                    type="file"
                    id="audio_file"
                    name="audio_file"
                    accept=".mp3,.m4a,.wav,audio/mpeg,audio/mp4,audio/x-m4a,audio/wav"
                    required
                    class="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-amber-50 file:text-amber-700
                      hover:file:bg-amber-100
                      cursor-pointer"
                  />
                  <p class="mt-2 text-sm text-gray-500">
                    ファイルを選択するか、ドラッグ&ドロップしてください
                  </p>
                </div>
              </div>

              <div class="flex gap-4">
                <button
                  type="submit"
                  class="flex-1 bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
                >
                  アップロード
                </button>
                <a
                  href="/admin"
                  class="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-center"
                >
                  キャンセル
                </a>
              </div>
            </form>
          </div>
        )}

        {/* 章が選択されていない場合 */}
        {selectedTextId && (!chapters || chapters.length === 0) && (
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <p class="text-yellow-800">この古典にはまだ章が登録されていません。</p>
            <a href="/admin/chapters" class="text-amber-600 hover:text-amber-700 font-semibold mt-2 inline-block">
              章を追加する →
            </a>
          </div>
        )}

        {/* 使い方ガイド */}
        <div class="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 class="font-semibold text-gray-900 mb-3">📌 使い方</h3>
          <ol class="list-decimal list-inside space-y-2 text-sm text-gray-700">
            <li>まず古典を選択してください</li>
            <li>次に音声を追加したい章を選択します</li>
            <li>音声ファイル（MP3/M4A/WAV形式）を選択してアップロードします</li>
            <li>既に音声が登録されている章は「✓ 音声あり」と表示されます</li>
            <li>アップロードすると既存の音声は上書きされます</li>
          </ol>
        </div>
      </div>
    </AdminLayout>
  )
}
