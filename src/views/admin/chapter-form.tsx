/** @jsxImportSource hono/jsx */

import { AdminLayout } from './layout'
import type { MedicalText, Chapter } from '../../types/db'

interface ChapterFormPageProps {
  texts: MedicalText[]
  chapter?: Chapter
  selectedText?: MedicalText
  isEdit?: boolean
  error?: string
}

export function ChapterFormPage({ texts, chapter, selectedText, isEdit = false, error }: ChapterFormPageProps) {
  const title = isEdit ? '章の編集' : '新しい章を追加'
  const submitUrl = isEdit ? `/admin/chapters/edit/${chapter?.id}` : '/admin/chapters/new'

  return (
    <AdminLayout>
      <div class="max-w-4xl mx-auto">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900">{title}</h1>
          <a
            href="/admin/chapters"
            class="text-gray-600 hover:text-gray-900 font-semibold"
          >
            ← 一覧に戻る
          </a>
        </div>

        {error && (
          <div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-red-800">{error}</p>
          </div>
        )}

        <form method="POST" action={submitUrl} class="bg-white rounded-lg shadow-md p-6 space-y-6">
          {/* 古典選択（新規作成時のみ） */}
          {!isEdit && (
            <div>
              <label for="text_id" class="block text-sm font-medium text-gray-700 mb-2">
                古典 <span class="text-red-500">*</span>
              </label>
              <select
                id="text_id"
                name="text_id"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="">-- 古典を選択 --</option>
                {texts.map(text => (
                  <option value={text.id} selected={selectedText?.id === text.id}>
                    {text.title_jp} ({text.title_en})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* 章番号 */}
          <div>
            <label for="chapter_order" class="block text-sm font-medium text-gray-700 mb-2">
              章番号 <span class="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="chapter_order"
              name="chapter_order"
              min="1"
              required
              value={chapter?.chapter_order || ''}
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="1"
            />
            <p class="mt-1 text-sm text-gray-500">章の表示順序を数字で指定してください</p>
          </div>

          {/* タイトル（日本語） */}
          <div>
            <label for="title_jp" class="block text-sm font-medium text-gray-700 mb-2">
              タイトル（日本語） <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title_jp"
              name="title_jp"
              required
              value={chapter?.title_jp || ''}
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="太陽病篇"
            />
          </div>

          {/* タイトル（英語） */}
          <div>
            <label for="title_en" class="block text-sm font-medium text-gray-700 mb-2">
              タイトル（英語） <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title_en"
              name="title_en"
              required
              value={chapter?.title_en || ''}
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Greater Yang Disease"
            />
          </div>

          {/* 本文（日本語） */}
          <div>
            <label for="content_jp" class="block text-sm font-medium text-gray-700 mb-2">
              本文（日本語） <span class="text-red-500">*</span>
            </label>
            <textarea
              id="content_jp"
              name="content_jp"
              required
              rows="10"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent font-mono"
              placeholder="章の本文を入力してください..."
            >{chapter?.content_jp || ''}</textarea>
          </div>

          {/* 本文（英語） */}
          <div>
            <label for="content_en" class="block text-sm font-medium text-gray-700 mb-2">
              本文（英語） <span class="text-red-500">*</span>
            </label>
            <textarea
              id="content_en"
              name="content_en"
              required
              rows="10"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent font-mono"
              placeholder="Enter chapter content in English..."
            >{chapter?.content_en || ''}</textarea>
          </div>

          {/* 音声URL（編集時のみ表示） */}
          {isEdit && chapter?.audio_url && (
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                音声ファイル
              </label>
              <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <span class="text-green-600">✓ 音声ファイルが登録されています</span>
                <audio controls src={chapter.audio_url} class="flex-1">
                  お使いのブラウザは音声再生に対応していません。
                </audio>
              </div>
              <p class="mt-2 text-sm text-gray-500">
                音声ファイルを変更する場合は
                <a href="/admin/upload" class="text-amber-600 hover:text-amber-700 font-semibold"> アップロードページ </a>
                から行ってください。
              </p>
            </div>
          )}

          {/* ボタン */}
          <div class="flex gap-4 pt-4">
            <button
              type="submit"
              class="flex-1 bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
            >
              {isEdit ? '更新する' : '追加する'}
            </button>
            <a
              href="/admin/chapters"
              class="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-center"
            >
              キャンセル
            </a>
          </div>
        </form>

        {/* ヘルプ */}
        <div class="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 class="font-semibold text-gray-900 mb-3">📌 入力ガイド</h3>
          <ul class="list-disc list-inside space-y-2 text-sm text-gray-700">
            <li>章番号は表示順序を決定します（同じ番号は避けてください）</li>
            <li>タイトルと本文は日本語・英語の両方が必須です</li>
            <li>本文内で改行は保持されます</li>
            <li>音声ファイルは別途アップロードページから登録してください</li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  )
}
