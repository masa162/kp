/** @jsxImportSource hono/jsx */

export interface LayoutProps {
  title: string
  children: any
  lang?: 'ja' | 'en'
}

export const Layout = ({ title, children, lang = 'ja' }: LayoutProps) => {
  return (
    <html lang={lang}>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title} - 古医術研究所</title>
        <meta name="description" content="傷寒論・金匱要略・黄帝内経など、東洋医学の古典を学ぶための学習プラットフォーム" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=Noto+Serif+JP:wght@400;600;700;900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/styles.css" />
        <script src="https://unpkg.com/htmx.org@2.0.3"></script>
      </head>
      <body class="min-h-screen flex flex-col bg-white">
        {/* モバイルヘッダー */}
        <header class="lg:hidden border-b-2 border-matcha-light bg-washi sticky top-0 z-50 shadow-sm">
          <div class="flex items-center justify-between px-4 py-3">
            <button
              class="p-2 hover:bg-washi-dark rounded-lg transition-colors text-sumi"
              hx-get="/menu"
              hx-target="#mobile-menu"
              hx-swap="innerHTML"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 class="text-lg font-bold font-serif text-sumi">古医術研究所</h1>
            <div class="w-10"></div>
          </div>
        </header>

        {/* モバイルメニュー */}
        <div id="mobile-menu" class="lg:hidden"></div>

        <div class="flex flex-1">
          {/* デスクトップサイドバー */}
          <aside class="hidden lg:block w-64 bg-washi sticky top-0 h-screen overflow-y-auto border-r-2 border-matcha">
            <div class="p-6 border-b-2 border-matcha-light bg-gradient-to-b from-washi to-washi-dark">
              <a href="/">
                <h1 class="text-2xl font-bold font-serif mb-2 text-sumi hover:text-matcha-dark transition-colors">
                  古医術研究所
                </h1>
                <p class="text-sm text-matcha-dark font-medium">
                  東洋医学の古典
                </p>
              </a>
            </div>

            <nav class="p-4">
              <a
                href="/"
                class="block px-4 py-3 rounded-lg transition-all duration-200 mb-2 font-medium hover:bg-washi-dark hover:text-shu hover:pl-6 text-sumi"
              >
                ホーム
              </a>
              <a
                href="/texts/shanghan-lun"
                class="block px-4 py-3 rounded-lg transition-all duration-200 mb-2 font-medium hover:bg-washi-dark hover:text-shu hover:pl-6 text-sumi"
              >
                傷寒論
              </a>
              <a
                href="/texts/jingui-yaolue"
                class="block px-4 py-3 rounded-lg transition-all duration-200 mb-2 font-medium hover:bg-washi-dark hover:text-shu hover:pl-6 text-sumi"
              >
                金匱要略
              </a>
              <a
                href="/texts/huangdi-neijing"
                class="block px-4 py-3 rounded-lg transition-all duration-200 mb-2 font-medium hover:bg-washi-dark hover:text-shu hover:pl-6 text-sumi"
              >
                黄帝内経
              </a>
            </nav>

            <div class="p-4 text-xs text-sumi opacity-70">
              <p>&copy; 2025 古医術研究所</p>
              <p class="mt-1">運営: 中山正之（薬剤師）</p>
            </div>
          </aside>

          {/* メインコンテンツ */}
          <main class="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>

        {/* フッター */}
        <footer class="bg-sumi text-white p-4 text-center border-t-4 border-matcha">
          <p class="text-sm">&copy; 2025 古医術研究所</p>
          <p class="text-xs text-gray-400 mt-1">運営: 中山正之（薬剤師）</p>
        </footer>
      </body>
    </html>
  )
}
