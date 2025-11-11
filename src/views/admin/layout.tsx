/** @jsxImportSource hono/jsx */

export interface AdminLayoutProps {
  title: string
  children: any
  currentPath?: string
}

export const AdminLayout = ({ title, children, currentPath = '' }: AdminLayoutProps) => {
  const isActive = (path: string) => currentPath.startsWith(path)

  return (
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title} - 管理パネル - 古医術研究所</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=Noto+Serif+JP:wght@400;600;700;900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/styles.css" />
        <script src="https://unpkg.com/htmx.org@2.0.3"></script>
      </head>
      <body class="min-h-screen flex bg-washi-dark">
        {/* サイドバー */}
        <aside class="w-64 bg-sumi text-white flex flex-col">
          <div class="p-6 border-b border-white/10">
            <h1 class="text-2xl font-bold font-serif mb-2">古医術研究所</h1>
            <p class="text-sm text-white/60">管理パネル</p>
          </div>

          <nav class="flex-1 p-4 space-y-2">
            <a
              href="/admin"
              class={`block px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                isActive('/admin') && currentPath === '/admin'
                  ? 'bg-matcha text-white'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                ダッシュボード
              </div>
            </a>

            <a
              href="/admin/chapters"
              class={`block px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                isActive('/admin/chapters')
                  ? 'bg-matcha text-white'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                章管理
              </div>
            </a>

            <a
              href="/admin/upload"
              class={`block px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                isActive('/admin/upload')
                  ? 'bg-matcha text-white'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
                音声アップロード
              </div>
            </a>

            <div class="pt-4 mt-4 border-t border-white/10">
              <a
                href="/"
                target="_blank"
                class="block px-4 py-3 rounded-lg transition-all duration-200 font-medium text-white/80 hover:bg-white/10 hover:text-white"
              >
                <div class="flex items-center gap-3">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  サイトを表示
                </div>
              </a>
            </div>
          </nav>

          <div class="p-4 border-t border-white/10">
            <form action="/admin/logout" method="POST">
              <button
                type="submit"
                class="w-full px-4 py-3 rounded-lg transition-all duration-200 font-medium text-white/80 hover:bg-red-600 hover:text-white flex items-center justify-center gap-3"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                ログアウト
              </button>
            </form>
            <p class="mt-4 text-xs text-white/40 text-center">管理者: mn</p>
          </div>
        </aside>

        {/* メインコンテンツ */}
        <main class="flex-1 overflow-y-auto">
          <div class="container mx-auto px-8 py-8 max-w-7xl">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
