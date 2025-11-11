// R2音声ファイルアップロードライブラリ

export interface UploadResult {
  success: boolean
  url?: string
  error?: string
}

export interface AudioMetadata {
  originalName: string
  contentType: string
  size: number
  chapterId: number
  uploadedAt: number
}

// 音声ファイルをR2バケットにアップロード
export async function uploadAudioToR2(
  r2: R2Bucket,
  file: File,
  chapterId: number
): Promise<UploadResult> {
  try {
    // ファイル名を生成（タイムスタンプ + チャプターID + 元のファイル名）
    const timestamp = Date.now()
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const key = `audio/${chapterId}/${timestamp}-${sanitizedName}`

    // メタデータを準備
    const metadata: AudioMetadata = {
      originalName: file.name,
      contentType: file.type,
      size: file.size,
      chapterId: chapterId,
      uploadedAt: timestamp
    }

    // R2にアップロード
    await r2.put(key, file.stream(), {
      httpMetadata: {
        contentType: file.type,
      },
      customMetadata: {
        originalName: metadata.originalName,
        chapterId: String(metadata.chapterId),
        uploadedAt: String(metadata.uploadedAt)
      }
    })

    // 公開URLを生成（カスタムドメインまたはR2.dev URL）
    // 注: 実際のURLはR2の設定に依存します
    const publicUrl = `https://kj-audio.your-domain.com/${key}`

    return {
      success: true,
      url: publicUrl
    }
  } catch (error) {
    console.error('R2 upload error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'アップロードに失敗しました'
    }
  }
}

// R2から音声ファイルを削除
export async function deleteAudioFromR2(
  r2: R2Bucket,
  url: string
): Promise<boolean> {
  try {
    // URLからキーを抽出
    const urlParts = url.split('/')
    const key = urlParts.slice(3).join('/') // audio/... 部分を取得

    await r2.delete(key)
    return true
  } catch (error) {
    console.error('R2 delete error:', error)
    return false
  }
}

// R2から音声ファイルを取得（ストリーミング用）
export async function getAudioFromR2(
  r2: R2Bucket,
  key: string
): Promise<R2ObjectBody | null> {
  try {
    const object = await r2.get(key)
    return object
  } catch (error) {
    console.error('R2 get error:', error)
    return null
  }
}
