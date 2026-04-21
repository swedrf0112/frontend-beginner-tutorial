# 文教品牌四頁網站 Step by Step 教學

這份文件對應目前 `website-build` 的 local 實作。
你可以把它當成兩份東西一起看：

- 前半段：真正的 step by step 教學
- 後半段：完整原始碼附錄

目標不是背理論，而是看著文件把網站做出來。

## 最終會做出什麼

- 四頁網站：首頁、教學品質、報名流程、教育活動
- 中文 / English 切換
- Light / Dark mode 切換
- Header dropdown 導覽
- 頁面進場動畫

## 先理解最小必要觀念

### 1. HTML 是什麼

HTML 可以理解成網頁的骨架。
例如標題、段落、按鈕、清單，先用 HTML 把結構放出來。

```html
<h1>課程介紹</h1>
<p>這裡是課程說明。</p>
<button>立即報名</button>
```

### 2. CSS 是什麼

CSS 負責讓骨架變好看。
字體、顏色、間距、陰影、圓角、動畫，都是 CSS 管的。

### 3. JavaScript 是什麼

JavaScript 負責互動。
像是點按鈕切換語言、切 dark mode、打開 dropdown，都需要 JavaScript。

### 4. React 是什麼

React 讓你把畫面拆成一塊一塊元件。
例如 Header 是一個元件，首頁是一個元件，活動列表又是一個元件。

### 5. Tailwind CSS 是什麼

Tailwind 是一種快速寫樣式的方法。
你不用先自己命名很多 class，而是直接把樣式寫在 className 裡。

```jsx
<div className="rounded-2xl bg-white p-6 shadow-lg">卡片內容</div>
```

### 6. Node.js 在這份專案裡做什麼

這裡的 Node.js 不是拿來寫後端，而是用來跑前端開發工具。
像 `npm install`、`npm run dev`、`npm run build` 都要靠它。

## 第 1 步：建立專案

先在專案資料夾安裝依賴套件。

```bash
npm install
```

你會拿到這幾個核心套件：

- `react`：做元件
- `react-dom`：把 React 畫到瀏覽器
- `react-router-dom`：做四頁路由
- `vite`：本地開發與打包
- `tailwindcss`：快速寫樣式
- `vitest`：做基本測試

## 第 2 步：建立最小入口

先讓 React 能真正跑起來。

檔案：`index.html`

```html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Education Brand Website Build</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

檔案：`src/main.jsx`

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './main.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
```

做到這裡時，你的 React 專案已經有入口了。

## 第 3 步：先把全站骨架做出來

現在不要急著先做四頁。先把「全站共用的東西」建立好：

- 語言狀態
- 主題狀態
- Header
- Footer
- 路由

檔案：`src/App.jsx`

先看最重要的幾段。

```jsx
const [language, setLanguage] = useState(() => localStorage.getItem('site-language') || 'zh')
const [theme, setTheme] = useState(() => localStorage.getItem('site-theme') || 'light')

useEffect(() => {
  localStorage.setItem('site-language', language)
}, [language])

useEffect(() => {
  localStorage.setItem('site-theme', theme)
  document.documentElement.classList.toggle('dark', theme === 'dark')
}, [theme])
```

這段的意思是：

- `language` 控制中英切換
- `theme` 控制 light / dark
- 切換後會存進 `localStorage`，所以重整頁面不會消失

接著把四個頁面路由接上。

```jsx
<Routes>
  <Route path="/" element={<HomePage content={content} />} />
  <Route path="/quality" element={<LearningQualityPage content={content} />} />
  <Route path="/admissions" element={<AdmissionsPage content={content} />} />
  <Route path="/events" element={<EventsPage content={content} />} />
</Routes>
```

做到這裡時，網站的導航骨架已經成立。

## 第 4 步：把文案集中管理

初學者很容易把字直接寫死在每個元件裡，之後要改語言就會很痛。
這裡正確做法是把資料集中在 `content.js`。

檔案：`src/data/content.js`

先建立最基本的雙語資料結構。

```jsx
export const siteContent = {
  zh: {
    introTitle: '文教品牌四頁網站',
    buildSummaryTitle: '這個本地版本包含',
  },
  en: {
    introTitle: 'Four-page education brand website',
    buildSummaryTitle: 'What is included in this local build',
  },
}
```

這樣 `App.jsx` 就只要根據 `language` 取資料，不需要在畫面裡寫很多 if/else。

## 第 5 步：先完成 Header

Header 是整站最重要的共用元件，因為它同時牽涉：

- 品牌字樣
- 主導覽
- dropdown
- 語言切換
- 主題切換

檔案：`src/components/Header.jsx`

先做最基本的導覽列：

```jsx
<header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/85 backdrop-blur">
  <div className="site-frame grid grid-cols-1 gap-4 py-5 lg:grid-cols-[auto_1fr_auto] lg:items-center">
    <div className="text-[34px] font-extrabold tracking-wide text-red-800">Asteron</div>
    <nav className="flex flex-wrap gap-2 text-sm font-semibold">...</nav>
    <div className="flex items-center gap-3">...</div>
  </div>
</header>
```

這時候先確認一件事：你的 Header 要先「穩定出現」，再來才談 dropdown 跟動畫。

## 第 6 步：做滑塊式切換按鈕

你提到要有左右滑動視覺效果，所以語言與主題切換都不是普通按鈕，而是滑塊。

檔案：`src/components/Header.jsx`

```jsx
<button
  type="button"
  aria-label="toggle language"
  onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
  className="toggle-pill"
>
  <span className={`toggle-knob ${isEnglish ? 'translate-x-[30px]' : 'translate-x-0'}`} />
  <span className="toggle-label">中文</span>
  <span className="toggle-label">EN</span>
</button>
```

檔案：`src/main.css`

```css
.toggle-pill {
  @apply relative inline-flex h-[42px] w-[84px] items-center rounded-full border border-slate-300 bg-white px-[9px];
}

.toggle-knob {
  @apply absolute left-[6px] h-[28px] w-[42px] rounded-full bg-slate-950 transition-transform duration-300 ease-out;
}
```

重點是 `translate-x` 搭配 `transition-transform`。這樣按下去時才會看到左右滑動，而不是瞬間跳位。

## 第 7 步：把 dropdown 導覽補上

dropdown 不要一開始就用複雜狀態管理。這一版先用 CSS hover / focus-within 做出穩定版本。

檔案：`src/components/Header.jsx`

```jsx
<div className="nav-dropdown group relative">
  <NavLink to={link.path} className={(navState) => `${navClass(navState)} flex items-center gap-2 rounded-full px-3 py-2`}>
    {link.label[language]}
    <span>▾</span>
  </NavLink>

  <div className="nav-dropdown-panel">
    <div className="nav-dropdown-title">{link.dropdownTitle[language]}</div>
    <div className="grid gap-2">...</div>
  </div>
</div>
```

檔案：`src/main.css`

```css
.nav-dropdown-panel {
  position: absolute;
  top: calc(100% + 12px);
  left: 0;
  opacity: 0;
  transform: translateY(10px);
  pointer-events: none;
  transition: opacity 0.22s ease, transform 0.22s ease;
}

.nav-dropdown:hover .nav-dropdown-panel,
.nav-dropdown:focus-within .nav-dropdown-panel {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
```

這樣就會有真的 dropdown，而不是只有假按鈕。

## 第 8 步：先做首頁

首頁是最適合先完成的頁面，因為它會幫你確定整個網站的視覺方向。

檔案：`src/pages/HomePage.jsx`

首頁最重要的三塊：

- 深色 hero
- 右側快速入口卡片
- 下方 News / Highlights 模組

```jsx
<section className="glass-panel page-enter hero-gradient overflow-hidden">
  <div className="grid gap-8 px-6 py-8 text-white xl:grid-cols-[1.3fr_0.95fr]">
    <div className="space-y-5">...</div>
    <div className="grid gap-4 self-center sm:grid-cols-2">...</div>
  </div>
</section>
```

做到這一步時，你應該先看到首頁已經有正式感，先不要急著把所有頁面同時做完。

## 第 9 步：做閱讀型頁面

教學品質頁是閱讀型頁面，重點不是視覺衝擊，而是資訊可讀性。

檔案：`src/pages/LearningQualityPage.jsx`

```jsx
<div className="grid gap-0 lg:grid-cols-[250px_1fr]">
  <aside className="border-b border-slate-200 bg-slate-50 px-5 py-6 lg:border-b-0 lg:border-r">...</aside>
  <article className="p-6 md:p-9">...</article>
</div>
```

這裡你要學會的是兩欄版型：左邊導覽、右邊正文。

## 第 10 步：做流程型頁面

報名流程頁的關鍵是「步驟感」。

檔案：`src/pages/AdmissionsPage.jsx`

```jsx
<div className="grid gap-4 md:grid-cols-5">
  {content.careers.steps.map((step, index) => (
    <div key={step.title} className="rounded-[24px] border border-slate-200 bg-white p-5">...</div>
  ))}
</div>
```

這一步學的是：同一個資料陣列，可以被畫成步驟卡片，也可以畫成下方詳細說明。

## 第 11 步：做活動列表頁

教育活動頁的重點不是大圖，而是清楚的資訊列表。

檔案：`src/pages/EventsPage.jsx`

```jsx
<div className="space-y-2">
  {content.research.events.map((event) => (
    <div
      key={event.title}
      className="grid gap-4 rounded-[24px] border border-slate-200 bg-slate-50 px-5 py-5 md:grid-cols-[1fr_180px_90px]"
    >
      ...
    </div>
  ))}
</div>
```

這種列表頁很適合練習資料驅動的排版。

## 第 12 步：補上不會卡住的進場動畫

前一版會卡住，是因為先把內容隱藏，再等 `IntersectionObserver` 顯示。
只要 observer 沒觸發，整頁就像壞掉。

現在改成安全版本：內容預設就是可見，只在載入時做一次淡入上移。

檔案：`src/main.css`

```css
.page-enter {
  animation: page-enter 0.72s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes page-enter {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

這種寫法的好處是：

- 有動畫
- 不會把內容藏起來
- 不依賴 viewport observer

## 第 13 步：公司內部 UI / icon 套件要怎麼接

如果公司內部有私有 npm 套件，做法通常像這樣：

```bash
npm install @company/ui @company/icons
```

```jsx
import { Button } from '@company/ui'
import { ChevronDownIcon } from '@company/icons'

<Button variant="ghost">
  更多資訊
  <ChevronDownIcon />
</Button>
```

這份教學主體先用純 React + Tailwind 寫，是因為這樣你會先看懂版型本身。
之後再把按鈕、icon 換成公司元件，成本會比較低。

## 第 14 步：怎麼驗收

先啟動本地開發站。

```bash
npm run dev
```

再跑基本驗證。

```bash
npm test
npm run build
```

驗收時至少要檢查：

- 首頁有沒有正常出現 hero、快速卡片、下方資訊模組
- 語言切換後導覽與主要文案有沒有一起切換
- dark mode 切換後文字對比是否仍然清楚
- dropdown 是否真的打得開
- 四個路由是否都能進入

## 第 15 步：最後看完整成品

現在你前面已經是一步一步做完了。
如果你想直接對照最終版本，就看下面的完整原始碼附錄。

## 完整原始碼附錄

前面的章節是教你一步一步做，這一段才是完整對照用的最終程式碼。

### package.json

```json
{
  "name": "website-build",
  "version": "1.0.0",
  "description": "Education brand React + Tailwind local website",
  "type": "module",
  "directories": {
    "doc": "docs"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.30.1"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.1.14",
    "@testing-library/dom": "^10.4.1",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.0",
    "@vitejs/plugin-react": "^4.7.0",
    "jsdom": "^25.0.1",
    "tailwindcss": "^4.1.14",
    "vite": "^5.4.19",
    "vitest": "^2.1.8"
  }
}

```

### index.html

```html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Education Brand Website Build</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

```

### vite.config.js

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})

```

### vitest.config.js

```js
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    setupFiles: './test/setup.js',
  },
})

```

### src/main.jsx

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './main.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)

```

### src/App.jsx

```jsx
import { useEffect, useMemo, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { siteContent } from './data/content'
import { HomePage } from './pages/HomePage'
import { LearningQualityPage } from './pages/LearningQualityPage'
import { AdmissionsPage } from './pages/AdmissionsPage'
import { EventsPage } from './pages/EventsPage'

export default function App() {
  const [language, setLanguage] = useState(() => localStorage.getItem('site-language') || 'zh')
  const [theme, setTheme] = useState(() => localStorage.getItem('site-theme') || 'light')

  useEffect(() => {
    localStorage.setItem('site-language', language)
  }, [language])

  useEffect(() => {
    localStorage.setItem('site-theme', theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const content = useMemo(() => siteContent[language], [language])

  return (
    <div className="site-shell">
      <Header
        content={content}
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
      />

      <div className="site-frame pt-6">
        <section
          className="glass-panel page-enter grid gap-5 px-6 py-6 md:grid-cols-[1.2fr_0.8fr] md:px-8"
        >
          <div>
            <div className="section-title">Local Build</div>
            <h1 className="mb-4 text-4xl font-semibold leading-tight md:text-5xl">{content.introTitle}</h1>
            <p className="max-w-3xl text-sm leading-8 text-slate-500 dark:text-slate-400 md:text-base">
              {content.introText}
            </p>
          </div>
          <div className="rounded-[24px] bg-slate-950 px-6 py-6 text-slate-200 dark:bg-slate-900">
            <h2 className="mb-4 text-2xl font-semibold text-white">{content.buildSummaryTitle}</h2>
            <ul className="space-y-3 text-sm leading-7">
              {content.buildSummaryItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <Routes>
        <Route path="/" element={<HomePage content={content} />} />
        <Route path="/quality" element={<LearningQualityPage content={content} />} />
        <Route path="/admissions" element={<AdmissionsPage content={content} />} />
        <Route path="/events" element={<EventsPage content={content} />} />
      </Routes>

      <Footer />
    </div>
  )
}

```

### src/main.css

```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

:root {
  font-family: "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif;
  color: #182534;
  background: #eef3f7;
}

html,
body,
#root {
  min-height: 100%;
}

body {
  margin: 0;
  background:
    radial-gradient(circle at top, rgba(255, 255, 255, 0.95), transparent 42%),
    linear-gradient(180deg, #edf2f7 0%, #e5edf4 100%);
}

html.dark body {
  background:
    radial-gradient(circle at top, rgba(36, 78, 119, 0.28), transparent 38%),
    linear-gradient(180deg, #07111c 0%, #0d1724 100%);
}

.site-shell {
  @apply min-h-screen text-slate-800 dark:text-slate-100;
}

.site-frame {
  @apply mx-auto max-w-[1400px] px-4 pb-10 md:px-6 xl:px-8;
}

.glass-panel {
  @apply rounded-[28px] border border-white/50 bg-white/90 shadow-[0_20px_60px_rgba(16,37,63,0.12)] backdrop-blur;
}

.dark .glass-panel {
  @apply border-slate-800/80 bg-slate-900/85 shadow-[0_26px_60px_rgba(0,0,0,0.35)];
}

.hero-gradient {
  background: linear-gradient(120deg, #081320 0%, #123251 58%, #216598 100%);
}

.section-title {
  @apply mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400;
}

.page-enter {
  animation: page-enter 0.72s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes page-enter {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.mock-photo {
  background:
    linear-gradient(140deg, rgba(255,255,255,0.12), transparent 35%),
    linear-gradient(160deg, #0a1625 0%, #113250 55%, #1f628f 100%);
}

.research-photo {
  background:
    radial-gradient(circle at 20% 10%, rgba(255,255,255,0.15), transparent 30%),
    linear-gradient(160deg, #0f1c2d 0%, #213e5c 45%, #c2ccd8 100%);
}

.toggle-pill {
  @apply relative inline-flex h-[42px] w-[84px] items-center rounded-full border border-slate-300 bg-white px-[9px] text-[11px] font-semibold tracking-[0.08em] text-slate-600 transition-colors dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300;
}

.toggle-knob {
  @apply absolute left-[6px] h-[28px] w-[42px] rounded-full bg-slate-950 shadow-md transition-transform duration-300 ease-out dark:bg-slate-100;
}

.toggle-label {
  @apply relative z-[1] flex-1 text-center transition-colors duration-300;
}

.nav-dropdown-panel {
  position: absolute;
  top: calc(100% + 12px);
  left: 0;
  z-index: 40;
  min-width: 300px;
  border-radius: 22px;
  border: 1px solid rgba(226, 232, 240, 0.95);
  background: rgba(255, 255, 255, 0.98);
  padding: 16px;
  box-shadow: 0 28px 48px rgba(15, 23, 42, 0.16);
  opacity: 0;
  transform: translateY(10px);
  pointer-events: none;
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
}

.dark .nav-dropdown-panel {
  border-color: rgba(51, 65, 85, 0.95);
  background: rgba(2, 6, 23, 0.98);
  box-shadow: 0 24px 54px rgba(0, 0, 0, 0.42);
}

.nav-dropdown:hover .nav-dropdown-panel,
.nav-dropdown:focus-within .nav-dropdown-panel {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.nav-dropdown-title {
  @apply mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500;
}

.nav-dropdown-item {
  @apply rounded-2xl border border-slate-200/90 bg-slate-50/90 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/85;
}

```

### src/data/content.js

```js
export const pageLinks = [
  {
    label: { zh: '首頁', en: 'Home' },
    path: '/',
    dropdownTitle: { zh: '品牌入口', en: 'Brand Entry' },
    items: [
      { title: { zh: '品牌介紹', en: 'Brand Story' }, desc: { zh: '主視覺、核心理念與快速入口配置。', en: 'Hero direction, positioning, and quick entry structure.' } },
      { title: { zh: '課程導覽', en: 'Programs' }, desc: { zh: '不同學習方案與服務分類整理。', en: 'Program categories and learning service structure.' } },
      { title: { zh: '最新資訊', en: 'News' }, desc: { zh: '公告、活動與重點內容模組。', en: 'Announcements, events, and highlight modules.' } },
    ],
  },
  {
    label: { zh: '教學品質', en: 'Quality' },
    path: '/quality',
    dropdownTitle: { zh: '品質制度', en: 'Quality System' },
    items: [
      { title: { zh: '教學理念', en: 'Teaching Vision' }, desc: { zh: '教學設計原則與學習陪伴方式。', en: 'How classes are designed and how learners are supported.' } },
      { title: { zh: '品質機制', en: 'Quality Flow' }, desc: { zh: '觀課、回饋、更新與追蹤流程。', en: 'Observation, feedback, update, and follow-up loops.' } },
      { title: { zh: '學習支持', en: 'Learning Support' }, desc: { zh: '學生與家長的支援服務整理。', en: 'Support touchpoints for students and families.' } },
    ],
  },
  {
    label: { zh: '報名流程', en: 'Admissions' },
    path: '/admissions',
    dropdownTitle: { zh: '報名與諮詢', en: 'Admissions Guide' },
    items: [
      { title: { zh: '報名前準備', en: 'Before You Apply' }, desc: { zh: '需求確認、資料填寫與課程建議。', en: 'Needs review, form input, and program matching.' } },
      { title: { zh: '試聽安排', en: 'Trial Session' }, desc: { zh: '諮詢、試聽、班級媒合與通知。', en: 'Consultation, trial setup, class matching, and notice.' } },
      { title: { zh: '常見問題', en: 'FAQ' }, desc: { zh: '時程、收費、補課與請假說明。', en: 'Schedule, pricing, make-up sessions, and leave policy.' } },
    ],
  },
  {
    label: { zh: '教育活動', en: 'Events' },
    path: '/events',
    dropdownTitle: { zh: '活動與合作', en: 'Events & Collaborations' },
    items: [
      { title: { zh: '講座活動', en: 'Talks' }, desc: { zh: '家長講座、公開課與社群論壇。', en: 'Parent talks, public classes, and community forums.' } },
      { title: { zh: '工作坊', en: 'Workshops' }, desc: { zh: '教師培訓、教案設計與實作活動。', en: 'Teacher training, lesson design, and practice sessions.' } },
      { title: { zh: '合作計畫', en: 'Collaborations' }, desc: { zh: '校園、社群與外部夥伴合作內容。', en: 'School, community, and external partnership projects.' } },
    ],
  },
]

export const siteContent = {
  zh: {
    topbar: '文教服務與學習體驗',
    introTitle: '文教品牌四頁網站',
    introText:
      '這是直接在 local 做出的 React + Tailwind 網站，不是靜態草圖。重點是先把四種頁型做出來，再讓教學文件對應這份實作。',
    buildSummaryTitle: '這個本地版本包含',
    buildSummaryItems: [
      '四種文教網站頁型',
      '中文 / English 內容切換',
      'Dark mode 切換',
      '本地 React + Tailwind 實作',
    ],
    nav: ['學習服務', '教學品質', '最新消息', '報名資訊', '教育活動'],
    home: {
      eyebrow: 'HOME PAGE',
      title: '打造更有溫度的學習體驗與教學場域',
      desc:
        '首頁重點是大面積視覺、清楚的主標題、右側快速入口，以及下方正式但不死板的資訊模組。',
      quickLinks: [
        { title: '課程特色', desc: '主題課程 / 分齡方案 / 學習方法' },
        { title: '教學空間', desc: '校區環境 / 教室設備 / 學習支持' },
        { title: '品牌故事', desc: '理念介紹 / 師資團隊 / 家長回饋' },
        { title: '報名資訊', desc: '開課時程 / 報名流程 / 常見問題' },
      ],
      news: ['最新課程消息 01', '校區公告 02', '師生活動 03'],
      highlights: ['本月活動', '教學品質', '報名資訊'],
    },
    audit: {
      breadcrumb: '首頁 / 教學品質 / 品質保證 / 教學品質',
      title: '教學品質',
      desc: '正式閱讀型頁面，重點是 breadcrumb、側欄、文章排版與深淺色可讀性。',
      menu: ['概述', '教學理念', '師資制度', '教學品質', '學習支持'],
      paragraphs: [
        '這個頁型的任務不是讓畫面花俏，而是讓內容穩定、正式、清楚。',
        '左邊的側欄提供品質主題定位，右邊的主內容負責呈現段落、條列與制度說明。',
      ],
      bullets: ['教學觀課與回饋制度', '課程更新與教師培訓流程', '學生與家長意見追蹤'],
    },
    careers: {
      breadcrumb: '首頁 / 報名資訊 / 報名流程',
      title: '報名流程',
      desc: '流程型頁面比文章頁更視覺化，重點在步驟感、卡片感與 FAQ/CTA 區塊節奏。',
      steps: [
        { title: '填寫資料', desc: '建立學生與家長資訊' },
        { title: '需求確認', desc: '確認年齡與課程需求' },
        { title: '體驗安排', desc: '安排試聽或諮詢' },
        { title: '完成報名', desc: '確認班級與時段' },
        { title: '開課準備', desc: '取得入班資訊' },
      ],
      support: ['FAQ', '聯絡課程顧問', '查看開課時程'],
    },
    research: {
      breadcrumb: '首頁 / 教育活動 / 合作計畫 / 活動',
      title: '活動總覽',
      filters: ['全部活動', '講座', '工作坊', '已結束', '即將開始'],
      events: [
        {
          title: '2026 暑期親子學習節',
          desc: '以三欄式列表呈現活動標題、摘要、日期與 CTA。',
          date: '2026/07/10 - 2026/07/16',
        },
        {
          title: '2026 教師教案設計工作坊',
          desc: '保留教育活動頁面較收斂的排版節奏。',
          date: '2026/06/14 - 2026/06/18',
        },
        {
          title: '2026 學習成長論壇',
          desc: '這種頁型重點不是大圖，而是資料排版秩序。',
          date: '2026/05/26 - 2026/05/29',
        },
      ],
    },
  },
  en: {
    topbar: 'Education services and learning experience',
    introTitle: 'Four-page education brand website',
    introText:
      'This is a real local React + Tailwind build, not a static mock. The goal is to build the four page types first and then align the tutorial document to this codebase.',
    buildSummaryTitle: 'What is included in this local build',
    buildSummaryItems: [
      'Four education website page types',
      'Chinese / English content toggle',
      'Dark mode toggle',
      'Local React + Tailwind implementation',
    ],
    nav: ['Learning Services', 'Quality', 'News', 'Admissions', 'Events'],
    home: {
      eyebrow: 'HOME PAGE',
      title: 'Build a warmer learning experience for every student',
      desc:
        'The home page focuses on a wide visual hero, a high-contrast headline, quick entry cards, and structured information modules below.',
      quickLinks: [
        { title: 'Programs', desc: 'Signature courses / Age groups / Learning methods' },
        { title: 'Campus Spaces', desc: 'Learning environments / Classrooms / Support' },
        { title: 'Our Story', desc: 'Mission / Teaching team / Parent feedback' },
        { title: 'Admissions', desc: 'Timelines / Application steps / FAQ' },
      ],
      news: ['Course update 01', 'Campus notice 02', 'Community event 03'],
      highlights: ['Upcoming events', 'Quality', 'Admissions'],
    },
    audit: {
      breadcrumb: 'Home / Quality / Assurance / Learning Quality',
      title: 'Learning Quality',
      desc: 'A formal reading page focused on breadcrumb structure, side navigation, article layout, and readable contrast.',
      menu: ['Overview', 'Teaching Vision', 'Faculty System', 'Learning Quality', 'Student Support'],
      paragraphs: [
        'This page should feel stable, formal, and easy to read.',
        'The side navigation anchors the quality topic while the main article handles paragraphs and bullet points.',
      ],
      bullets: ['Class observation and feedback process', 'Course review and teacher development', 'Student and parent feedback follow-up'],
    },
    careers: {
      breadcrumb: 'Home / Admissions / Admissions Process',
      title: 'Admissions Process',
      desc: 'This page is more visual than the article page. It relies on step rhythm, cards, and support blocks.',
      steps: [
        { title: 'Submit Form', desc: 'Provide student and parent details' },
        { title: 'Needs Review', desc: 'Match age and program needs' },
        { title: 'Trial Session', desc: 'Arrange a trial class or consultation' },
        { title: 'Confirm Enrollment', desc: 'Lock class and schedule' },
        { title: 'Prepare to Start', desc: 'Receive class information' },
      ],
      support: ['FAQ', 'Talk to an advisor', 'View class schedule'],
    },
    research: {
      breadcrumb: 'Home / Events / Collaborations / Programs',
      title: 'Events',
      filters: ['All Events', 'Talks', 'Workshops', 'Past', 'Upcoming'],
      events: [
        {
          title: '2026 Summer Family Learning Festival',
          desc: 'A three-column list showing title, summary, date, and CTA.',
          date: '2026/07/10 - 2026/07/16',
        },
        {
          title: '2026 Teacher Lesson Design Workshop',
          desc: 'The event page should feel more restrained and information-focused.',
          date: '2026/06/14 - 2026/06/18',
        },
        {
          title: '2026 Learning Growth Forum',
          desc: 'This page is about information order, not big visual storytelling.',
          date: '2026/05/26 - 2026/05/29',
        },
      ],
    },
  },
}

```

### src/components/Header.jsx

```jsx
import { NavLink } from 'react-router-dom'
import { pageLinks } from '../data/content'

function navClass({ isActive }) {
  return isActive
    ? 'text-sky-700 dark:text-sky-300'
    : 'text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white'
}

export function Header({ content, language, setLanguage, theme, setTheme }) {
  const isEnglish = language === 'en'
  const isDark = theme === 'dark'
  const languageLeftClass = isEnglish
    ? 'text-slate-500 dark:text-slate-500'
    : 'text-slate-950 dark:text-slate-950'
  const languageRightClass = isEnglish ? 'text-white dark:text-slate-950' : 'text-slate-500 dark:text-slate-500'
  const themeLeftClass = isDark
    ? 'text-slate-500 dark:text-slate-500'
    : 'text-slate-950 dark:text-slate-950'
  const themeRightClass = isDark ? 'text-white dark:text-slate-950' : 'text-slate-500 dark:text-slate-500'

  return (
    <>
      <div className="border-b border-slate-200/80 bg-white/70 text-xs text-slate-500 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/70 dark:text-slate-400">
        <div className="site-frame flex items-center justify-between py-3">
          <span>{content.topbar}</span>
          <span>English / 繁中 / 简中 / 日本語</span>
        </div>
      </div>

      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/85 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/85">
        <div className="site-frame grid grid-cols-1 gap-4 py-5 lg:grid-cols-[auto_1fr_auto] lg:items-center">
          <div className="text-[34px] font-extrabold tracking-wide text-red-800">Asteron</div>

          <nav className="flex flex-wrap gap-2 text-sm font-semibold">
            {pageLinks.map((link) => (
              <div key={link.path} className="nav-dropdown group relative">
                <NavLink
                  to={link.path}
                  className={(navState) =>
                    `${navClass(navState)} flex items-center gap-2 rounded-full px-3 py-2`
                  }
                >
                  {link.label[language]}
                  <span className="text-[10px] transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180">
                    ▾
                  </span>
                </NavLink>
                <div className="nav-dropdown-panel">
                  <div className="nav-dropdown-title">{link.dropdownTitle[language]}</div>
                  <div className="grid gap-2">
                    {link.items.map((item) => (
                      <div key={item.title.zh} className="nav-dropdown-item">
                        <div className="font-semibold text-slate-800 dark:text-slate-100">{item.title[language]}</div>
                        <div className="mt-1 text-xs leading-6 text-slate-500 dark:text-slate-400">
                          {item.desc[language]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3 justify-self-start lg:justify-self-end">
            <button
              type="button"
              aria-label="toggle language"
              onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
              className="toggle-pill"
            >
              <span className={`toggle-knob ${isEnglish ? 'translate-x-[30px]' : 'translate-x-0'}`} />
              <span className={`toggle-label ${languageLeftClass}`}>中文</span>
              <span className={`toggle-label ${languageRightClass}`}>EN</span>
            </button>
            <button
              type="button"
              aria-label="toggle theme"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="toggle-pill"
            >
              <span className={`toggle-knob ${isDark ? 'translate-x-[30px]' : 'translate-x-0'}`} />
              <span className={`toggle-label ${themeLeftClass}`}>Light</span>
              <span className={`toggle-label ${themeRightClass}`}>Dark</span>
            </button>
          </div>
        </div>
      </header>
    </>
  )
}

```

### src/components/Footer.jsx

```jsx
export function Footer() {
  return (
    <footer className="mt-10 border-t border-slate-200/80 bg-slate-950 text-slate-300 dark:border-slate-800">
      <div className="site-frame flex flex-col gap-2 py-8 text-sm md:flex-row md:items-center md:justify-between">
        <span className="font-semibold tracking-wide">Asteron</span>
        <span>Footer / 法規 / 聯絡我們 / 網站地圖</span>
      </div>
    </footer>
  )
}

```

### src/pages/HomePage.jsx

```jsx
function QuickCard({ item }) {
  return (
    <div className="rounded-[22px] border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
      <h3 className="mb-2 text-lg font-semibold text-white">{item.title}</h3>
      <p className="text-sm leading-7 text-slate-200">{item.desc}</p>
    </div>
  )
}

export function HomePage({ content }) {
  return (
    <main className="site-frame pt-7">
      <section className="glass-panel page-enter hero-gradient overflow-hidden">
        <div className="grid gap-8 px-6 py-8 text-white md:px-10 md:py-12 xl:grid-cols-[1.3fr_0.95fr]">
          <div className="space-y-5">
            <div className="section-title !text-slate-200">{content.home.eyebrow}</div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight md:text-5xl xl:text-6xl">
              {content.home.title}
            </h1>
            <p className="max-w-3xl text-sm leading-8 text-slate-200 md:text-base">
              {content.home.desc}
            </p>
            <div className="mock-photo relative mt-6 h-56 rounded-[26px] border border-white/10 p-6 md:h-72">
              <div className="absolute inset-x-6 top-6 flex items-center justify-between text-xs text-slate-300">
                <span>LEARNING PROGRAMS</span>
                <span>CAMPUS EXPERIENCE</span>
              </div>
              <div className="absolute inset-x-6 bottom-6 grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl bg-white/12 p-4 backdrop-blur-sm">Age-based Programs / Project Learning</div>
                <div className="rounded-2xl bg-white/12 p-4 backdrop-blur-sm">Campus Spaces / Student Support</div>
                <div className="rounded-2xl bg-white/12 p-4 backdrop-blur-sm">Parent Services / Community Events</div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 self-center sm:grid-cols-2 xl:grid-cols-2">
            {content.home.quickLinks.map((item) => (
              <QuickCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="glass-panel page-enter p-6 [animation-delay:120ms]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">News</h2>
            <span className="text-xs uppercase tracking-[0.22em] text-slate-400">Latest</span>
          </div>
          <div className="space-y-3">
            {content.home.news.map((item, index) => (
              <div
                key={item}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/60"
              >
                <span className="text-sm md:text-base">{item}</span>
                <span className="text-xs font-semibold text-sky-700 dark:text-sky-300">0{index + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel page-enter p-6 [animation-delay:200ms]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Highlights</h2>
            <span className="text-xs uppercase tracking-[0.22em] text-slate-400">Focus</span>
          </div>
          <div className="grid gap-3">
            {content.home.highlights.map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 px-4 py-4 dark:border-slate-800"
              >
                <span className="h-3.5 w-3.5 rounded-full bg-sky-700" />
                <span className="text-sm md:text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

```

### src/pages/LearningQualityPage.jsx

```jsx
export function LearningQualityPage({ content }) {
  return (
    <main className="site-frame pt-7">
      <section className="glass-panel page-enter overflow-hidden">
        <div className="grid gap-0 lg:grid-cols-[250px_1fr]">
          <aside className="border-b border-slate-200 bg-slate-50 px-5 py-6 dark:border-slate-800 dark:bg-slate-950/65 lg:border-b-0 lg:border-r">
            <div className="section-title">Quality</div>
            <div className="grid gap-2">
              {content.audit.menu.map((item) => (
                <div
                  key={item}
                  className={`rounded-2xl px-4 py-3 text-sm font-medium ${
                    item === content.audit.title
                      ? 'bg-slate-900 text-white dark:bg-sky-900'
                      : 'border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </aside>

          <article className="p-6 md:p-9">
            <div className="mb-4 text-xs text-slate-500 dark:text-slate-400">{content.audit.breadcrumb}</div>
            <h1 className="mb-3 text-4xl font-semibold">{content.audit.title}</h1>
            <p className="mb-8 max-w-3xl text-sm leading-8 text-slate-500 dark:text-slate-400 md:text-base">
              {content.audit.desc}
            </p>

            <div className="space-y-5">
              {content.audit.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-8 md:text-base">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 rounded-[24px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/60">
              <h2 className="mb-4 text-2xl font-semibold">Key Points</h2>
              <ul className="list-disc space-y-3 pl-5 text-sm leading-8 md:text-base">
                {content.audit.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}

```

### src/pages/AdmissionsPage.jsx

```jsx
export function AdmissionsPage({ content }) {
  return (
    <main className="site-frame pt-7">
      <section className="glass-panel page-enter overflow-hidden">
        <div className="border-b border-slate-200 bg-[linear-gradient(90deg,#e6edf5_0%,#f8fafc_100%)] px-6 py-8 dark:border-slate-800 dark:bg-[linear-gradient(90deg,#102234_0%,#16293b_100%)]">
          <div className="mb-3 text-xs text-slate-500 dark:text-slate-400">{content.careers.breadcrumb}</div>
          <h1 className="mb-3 text-4xl font-semibold">{content.careers.title}</h1>
          <p className="max-w-3xl text-sm leading-8 text-slate-500 dark:text-slate-400 md:text-base">
            {content.careers.desc}
          </p>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid gap-4 md:grid-cols-5">
            {content.careers.steps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-[24px] border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950/60"
              >
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white dark:bg-sky-900">
                  {index + 1}
                </div>
                <h2 className="mb-2 text-lg font-semibold">{step.title}</h2>
                <p className="text-sm leading-7 text-slate-500 dark:text-slate-400">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950/60">
              <h3 className="mb-4 text-2xl font-semibold">Process Detail</h3>
              <div className="space-y-3">
                {content.careers.steps.map((step) => (
                  <div key={step.title} className="rounded-2xl border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-900">
                    <div className="font-semibold">{step.title}</div>
                    <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{step.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950/60">
              <h3 className="mb-4 text-2xl font-semibold">Support</h3>
              <div className="research-photo h-52 rounded-[24px] border border-slate-200 p-5 text-sm text-white dark:border-slate-700">
                <div className="section-title !text-slate-200">Admissions</div>
                <div className="max-w-56 text-lg font-semibold">讓報名頁面同時清楚、正式，並保留適度的引導感與節奏。</div>
              </div>
              <div className="mt-5 space-y-3">
                {content.careers.support.map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm dark:border-slate-800 dark:bg-slate-900">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

```

### src/pages/EventsPage.jsx

```jsx
export function EventsPage({ content }) {
  return (
    <main className="site-frame pt-7">
      <section className="glass-panel page-enter overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-8 dark:border-slate-800">
          <div className="mb-3 text-xs text-slate-500 dark:text-slate-400">{content.research.breadcrumb}</div>
          <h1 className="mb-5 text-4xl font-semibold">{content.research.title}</h1>
          <div className="flex flex-wrap gap-2">
            {content.research.filters.map((filter) => (
              <span
                key={filter}
                className="rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
              >
                {filter}
              </span>
            ))}
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="research-photo mb-6 rounded-[28px] p-6 text-white">
            <div className="section-title !text-slate-200">Learning Community Events</div>
            <div className="max-w-2xl text-3xl font-semibold leading-tight">
              活動頁改用更密集的列表排版，重點是資訊秩序、閱讀節奏與清楚的操作入口。
            </div>
          </div>

          <div className="space-y-2">
            {content.research.events.map((event) => (
              <div
                key={event.title}
                className="grid gap-4 rounded-[24px] border border-slate-200 bg-slate-50 px-5 py-5 dark:border-slate-800 dark:bg-slate-950/60 md:grid-cols-[1fr_180px_90px]"
              >
                <div>
                  <h2 className="mb-2 text-xl font-semibold">{event.title}</h2>
                  <p className="text-sm leading-7 text-slate-500 dark:text-slate-400">{event.desc}</p>
                </div>
                <div className="text-sm font-medium text-slate-500 dark:text-slate-400">{event.date}</div>
                <div className="text-xs font-bold tracking-[0.22em] text-sky-700 dark:text-sky-300">SEE MORE</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

```

### test/setup.js

```js
import '@testing-library/jest-dom/vitest'

class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.IntersectionObserver = IntersectionObserverMock

```

### test/app.test.jsx

```jsx
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import App from '../src/App'

describe('education brand site', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  it('renders the home page title', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.getByText('文教品牌四頁網站')).toBeInTheDocument()
    expect(screen.getByText('打造更有溫度的學習體驗與教學場域')).toBeInTheDocument()
  })

  it('switches language to English', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getAllByRole('button', { name: 'toggle language' })[0])

    expect(screen.getByText('Four-page education brand website')).toBeInTheDocument()
    expect(screen.getByText('Build a warmer learning experience for every student')).toBeInTheDocument()
  })

  it('toggles dark mode class on the root element', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getAllByRole('button', { name: 'toggle theme' })[0])

    expect(document.documentElement).toHaveClass('dark')
  })

  it('renders the research events page', () => {
    render(
      <MemoryRouter initialEntries={['/events']}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.getByText('活動總覽')).toBeInTheDocument()
    expect(screen.getByText('2026 暑期親子學習節')).toBeInTheDocument()
    expect(screen.getAllByText('SEE MORE').length).toBeGreaterThan(0)
  })
})

```
