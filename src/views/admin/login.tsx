/** @jsxImportSource hono/jsx */

export interface LoginPageProps {
  error?: string
}

export const LoginPage = ({ error }: LoginPageProps) => {
  return (
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>ログイン - 管理パネル - 古医術研究所</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=Noto+Serif+JP:wght@400;600;700;900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body class="min-h-screen flex items-center justify-center bg-gradient-to-br from-washi via-kinari to-washi">
        <div class="w-full max-w-md">
          {/* ロゴ・タイトル */}
          <div class="text-center mb-8">
            <h1 class="text-4xl font-bold font-serif text-sumi mb-2">
              古医術研究所
            </h1>
            <p class="text-lg text-matcha-dark font-medium">管理者ログイン</p>
          </div>

          {/* ログインカード */}
          <div class="bg-white rounded-2xl shadow-2xl p-8 border-2 border-matcha-light">
            {error && (
              <div class="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                <p class="text-sm text-red-700 font-medium flex items-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </p>
              </div>
            )}

            <form action="/admin/login" method="POST" class="space-y-6">
              <div>
                <label for="userId" class="block text-sm font-medium text-sumi mb-2">
                  ユーザーID
                </label>
                <input
                  type="text"
                  id="userId"
                  name="userId"
                  required
                  autocomplete="username"
                  class="w-full px-4 py-3 border-2 border-matcha-light rounded-lg focus:outline-none focus:border-matcha transition-colors text-sumi"
                  placeholder="ユーザーIDを入力"
                />
              </div>

              <div>
                <label for="password" class="block text-sm font-medium text-sumi mb-2">
                  パスワード
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  autocomplete="current-password"
                  class="w-full px-4 py-3 border-2 border-matcha-light rounded-lg focus:outline-none focus:border-matcha transition-colors text-sumi"
                  placeholder="パスワードを入力"
                />
              </div>

              <button
                type="submit"
                class="w-full px-6 py-4 bg-gradient-to-r from-matcha to-matcha-dark text-white font-bold rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                ログイン
              </button>
            </form>

            <div class="mt-6 pt-6 border-t border-matcha/10">
              <a
                href="/"
                class="text-sm text-matcha-dark hover:text-matcha transition-colors flex items-center justify-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                サイトに戻る
              </a>
            </div>
          </div>

          <div class="mt-6 text-center">
            <p class="text-sm text-sumi opacity-60">
              © 2025 古医術研究所 管理パネル
            </p>
          </div>
        </div>
      </body>
    </html>
  )
}
