// ファイルバリデーションライブラリ

export interface ValidationResult {
  valid: boolean
  error?: string
}

// 許可される音声ファイル形式
const ALLOWED_AUDIO_TYPES = [
  'audio/mpeg', // MP3
  'audio/mp4',  // M4A
  'audio/x-m4a', // M4A (alternative)
  'audio/wav',  // WAV
  'audio/wave', // WAV (alternative)
]

// 許可される拡張子
const ALLOWED_EXTENSIONS = ['.mp3', '.m4a', '.wav']

// 最大ファイルサイズ（50MB）
const MAX_FILE_SIZE = 50 * 1024 * 1024

/**
 * 音声ファイルの検証
 */
export function validateAudioFile(file: File): ValidationResult {
  // ファイルサイズチェック
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `ファイルサイズが大きすぎます。最大${MAX_FILE_SIZE / 1024 / 1024}MBまでです。`
    }
  }

  // ファイルサイズが0でないかチェック
  if (file.size === 0) {
    return {
      valid: false,
      error: 'ファイルが空です。'
    }
  }

  // MIMEタイプチェック
  if (!ALLOWED_AUDIO_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `許可されていないファイル形式です。MP3、M4A、WAVのいずれかをアップロードしてください。`
    }
  }

  // 拡張子チェック
  const fileName = file.name.toLowerCase()
  const hasValidExtension = ALLOWED_EXTENSIONS.some(ext => fileName.endsWith(ext))

  if (!hasValidExtension) {
    return {
      valid: false,
      error: `許可されていない拡張子です。.mp3、.m4a、.wavのいずれかをアップロードしてください。`
    }
  }

  return { valid: true }
}

/**
 * ファイルサイズを人間が読みやすい形式に変換
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

/**
 * ファイル名をサニタイズ（安全な文字のみ）
 */
export function sanitizeFileName(fileName: string): string {
  // 拡張子を保持
  const lastDotIndex = fileName.lastIndexOf('.')
  const name = lastDotIndex > 0 ? fileName.slice(0, lastDotIndex) : fileName
  const ext = lastDotIndex > 0 ? fileName.slice(lastDotIndex) : ''

  // 安全でない文字を置換
  const safeName = name
    .replace(/[^a-zA-Z0-9-_]/g, '_')
    .replace(/_+/g, '_')
    .slice(0, 100) // 最大100文字

  return safeName + ext
}
