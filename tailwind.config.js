/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // 古医術・東洋医学テーマカラー
        sumi: '#2c2c2c',           // 墨色 - メインテキスト
        matcha: {
          DEFAULT: '#7a9b76',       // 抹茶色 - アクセント
          light: '#a8c5a3',         // 抹茶色（明）
          dark: '#5d7a5a',          // 抹茶色（暗）
        },
        shu: {
          DEFAULT: '#c8573d',       // 朱色 - 強調・ホバー
          light: '#d97a66',         // 朱色（明）
        },
        washi: {
          DEFAULT: '#f8f6f1',       // 和紙色 - 背景
          dark: '#ebe8df',          // 和紙色（暗）
        },
        kinari: '#f5f1e8',          // 生成り色 - カード背景
        take: '#6b9080',            // 竹色 - サブアクセント
        gold: '#c9a961',            // 金色アクセント
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', 'sans-serif'],
        serif: ['"Noto Serif JP"', 'serif'],
      },
    },
  },
  plugins: [],
}
