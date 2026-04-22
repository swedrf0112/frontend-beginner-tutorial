import fs from 'node:fs'
import path from 'node:path'
import { convertMarkdown, wrapHtml } from './markdown-to-html.js'

const rootDir = path.resolve(process.cwd())
const tutorialsDir = path.join(rootDir, 'docs', 'tutorials')

const appendixFiles = [
  'package.json',
  'next.config.mjs',
  'postcss.config.mjs',
  'app/layout.js',
  'app/page.js',
  'app/quality/page.js',
  'app/admissions/page.js',
  'app/events/page.js',
  'app/globals.css',
  'src/components/site-provider.jsx',
  'src/components/site-chrome.jsx',
  'src/components/header.jsx',
  'src/components/footer.jsx',
  'src/components/reveal-section.jsx',
  'src/lib/site-content.js',
  'test/app.test.jsx',
]

function codeBlock(language, code) {
  return `\`\`\`${language}\n${code.trim()}\n\`\`\``
}

function fileCodeBlock(relativePath) {
  const absolutePath = path.join(rootDir, relativePath)
  const code = fs.readFileSync(absolutePath, 'utf8').replace(/\r\n/g, '\n')
  const extension = path.extname(relativePath).slice(1) || 'text'
  return `### ${relativePath}\n\n${codeBlock(extension === 'mjs' ? 'js' : extension, code)}`
}

function syntaxBox() {
  return `## 新手先補這個：幾個最容易看不懂的 JavaScript 寫法

### 1. \`() => {}\` 是什麼

這叫做箭頭函式。

你可以先把它翻成：

> 這裡在定義一個小功能，等一下再執行。

例如：

${codeBlock('js', `
() => {
  console.log('hello')
}
`)}

意思不是「現在立刻印出 hello」。

意思是：

> 先做出一個函式，裡面要印出 hello，等有人呼叫它時才執行。

### 2. \`(() => setOpen(true))\` 到底在寫什麼

你可以拆成兩步看：

${codeBlock('js', `
const handleOpen = () => {
  setOpen(true)
}
`)}

如果把它直接寫在 JSX 裡，常會看到：

${codeBlock('jsx', `
<button onClick={() => setOpen(true)}>
  打開
</button>
`)}

白話翻譯：

- \`onClick\`：按鈕被點擊時要做什麼
- \`() => ...\`：先定義一個點擊時才執行的函式
- \`setOpen(true)\`：把 open 這個狀態改成 true

### 3. 為什麼不能直接寫 \`onClick={setOpen(true)}\`

因為這樣代表：

> 頁面一渲染就立刻執行

而不是等使用者點擊。

所以 React 很常寫成：

${codeBlock('jsx', `
onClick={() => setOpen(true)}
`)}

### 4. \`const [theme, setTheme] = useState('light')\` 是什麼

這是 React state 的固定寫法。

你可以先這樣記：

- \`theme\`：目前值
- \`setTheme\`：修改值的工具

所以：

${codeBlock('jsx', `
const [theme, setTheme] = useState('light')
`)}

白話就是：

> 我現在有一個叫 theme 的狀態，一開始是 light。之後如果要改它，要用 setTheme。

### 5. \`map()\` 又是在做什麼

當你有一串資料，想把每一筆資料都變成畫面時，很常看到：

${codeBlock('jsx', `
items.map((item) => (
  <li key={item.id}>{item.title}</li>
))
`)}

白話翻譯：

> 把 items 裡的每一筆資料都拿出來，做成一個 \`<li>\`。

你現在先不用把所有 JavaScript 都學完，只要先知道：

- \`() => {}\` 很常是「晚點要執行的函式」
- \`setSomething\` 很常是「修改狀態的工具」
- \`map()\` 很常是「把資料變成畫面」
`
}

function quickStartSeries() {
  return [
    {
      slug: '00-frontend-zero-map',
      title: '00. 還沒開始寫之前：你現在到底在用什麼',
      body: `# 00. 還沒開始寫之前：你現在到底在用什麼

## 這篇目標

你現在先不要急著記語法。

完全沒學過前端的人，最先需要的不是程式碼，而是：

> 你現在到底在用哪些東西，它們彼此是什麼關係。

這次專案裡最重要的 4 個名字是：

- Node.js
- React
- Next.js
- Tailwind CSS

## 最白話版

- \`Node.js\`：讓你可以在電腦上跑開發工具
- \`React\`：把畫面拆成元件
- \`Next.js\`：建立在 React 上的網站框架
- \`Tailwind CSS\`：快速寫樣式

## 把它們排成一條線

你可以先這樣記：

1. 先用 Node.js 跑指令
2. Next.js 幫你建立整個網站骨架
3. React 幫你寫每一塊畫面
4. Tailwind CSS 幫你做樣式

${syntaxBox()}

## 這篇結束後你只要記住這件事

> 這次不是在學四個互相競爭的東西，而是在學一組一起合作的工具。

下一篇才開始真的把專案跑起來。
`,
    },
    {
      slug: '01-run-project-fast',
      title: '01. 先把專案跑起來：不要先背全部資料夾',
      body: `# 01. 先把專案跑起來：不要先背全部資料夾

## 這篇目標

先看到網站跑起來。

很多新手一開始就去研究所有檔案，結果直接淹死。這一篇先只管：

- 專案怎麼啟動
- 首頁是哪個檔案
- 改哪裡會立刻看到畫面變化

## 先做這三件事

${codeBlock('bash', `
npm install
npm run dev
`)}

接著打開瀏覽器看本地網址。

## 先認最重要的兩個位置

### 1. package.json

` + fileCodeBlock('package.json') + `

你現在先只看 scripts：

- \`npm run dev\`：開發時最常用
- \`npm run build\`：檢查正式版能不能打包
- \`npm run start\`：跑正式站

### 2. app/page.js

` + fileCodeBlock('app/page.js') + `

在 Next.js App Router 裡：

- \`app/page.js\` 就是首頁
- 你改這個檔案，首頁就會變

## 先不要研究全部，只記這件事

如果你只想先試著改東西，先改：

- \`app/page.js\`
- \`app/globals.css\`

這樣就夠了。

## 完成後你應該看到什麼

1. 開發伺服器能跑起來
2. 首頁能打開
3. 你知道首頁主要來自 \`app/page.js\`
`,
    },
    {
      slug: '02-build-mini-home',
      title: '02. 先做一個最小首頁：只放標題、說明、按鈕',
      body: `# 02. 先做一個最小首頁：只放標題、說明、按鈕

## 這篇目標

你先不要做完整官網。

先做出一個很小、但真的能看到成果的首頁。只需要三樣東西：

- 標題
- 介紹文字
- 按鈕

## 先把首頁想成普通函式

在 React 裡，一個頁面常常長這樣：

${codeBlock('jsx', `
export default function HomePage() {
  return <div>首頁</div>
}
`)}

白話翻譯：

- \`function HomePage()\`：建立一個元件
- \`return\`：把畫面交出去
- \`<div>首頁</div>\`：這就是畫面內容

## 建議你先做成這樣

${codeBlock('jsx', `
export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <section className="rounded-3xl bg-slate-900 p-10 text-white">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-200">
          Learning Studio
        </p>
        <h1 className="mt-4 text-4xl font-semibold">
          用最簡單的方式開始學前端
        </h1>
        <p className="mt-4 max-w-2xl text-base text-slate-200">
          先做出一個能看的首頁，再慢慢升級成完整網站。
        </p>
        <button className="mt-8 rounded-full bg-sky-400 px-6 py-3 font-medium text-slate-950">
          開始閱讀
        </button>
      </section>
    </main>
  )
}
`)}

## 語法拆解

### \`className\` 是什麼

在 React 裡不是寫 \`class\`，而是寫 \`className\`。

因為 \`class\` 在 JavaScript 裡本身就有其他用途。

### 為什麼畫面裡可以寫很多標籤

因為 JSX 讓你可以在 JavaScript 裡寫長得像 HTML 的語法。

### 為什麼外面包 \`()\`

因為多行 JSX 通常會包在括號裡，方便閱讀。

## 完成後你應該看到什麼

你會先得到一個深色大區塊，裡面有品牌名、標題、說明和按鈕。這不是最終站，但它會讓你第一次清楚看到：

> 原來我真的有在改畫面。
`,
    },
    {
      slug: '03-add-second-page',
      title: '03. 加第二頁與最小導覽：先理解路由，不先做 dropdown',
      body: `# 03. 加第二頁與最小導覽：先理解路由，不先做 dropdown

## 這篇目標

先學會最簡單的切頁。

這一篇故意不先做 dropdown，因為你現在更需要先理解：

> 在 Next.js 裡，資料夾就是路由。

## 第一步：新增第二頁

你可以新增：

${codeBlock('text', `
app/about/page.js
`)}

內容先保持最簡單：

${codeBlock('jsx', `
export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-semibold text-slate-900">關於這個課程</h1>
      <p className="mt-4 text-slate-600">
        這一頁只是先練習路由切換。
      </p>
    </main>
  )
}
`)}

## 第二步：在首頁放連結

${codeBlock('jsx', `
import Link from 'next/link'

<Link
  href="/about"
  className="inline-flex rounded-full bg-slate-200 px-5 py-3 font-medium text-slate-900"
>
  看課程介紹
</Link>
`)}

## 新手最容易卡的點

### 為什麼不是 \`<a href="/about">\`

在 Next.js 裡，站內切換建議用 \`Link\`。

因為它是框架提供的路由元件。

### \`href="/about"\` 是什麼

就是在說：

> 這個連結要帶你去 \`/about\`

### \`import Link from 'next/link'\` 又是什麼

白話翻譯：

> 我要把 Next.js 內建的 Link 元件拿進來用。

## 完成後你應該看到什麼

1. 首頁有一個連到第二頁的按鈕
2. 點下去可以切到 \`/about\`
3. 你開始知道 Next.js 的路由其實是靠資料夾決定的
`,
    },
    {
      slug: '04-basic-style-and-toggle',
      title: '04. 先加一點樣式與互動：最小 dark mode 與按鈕切換',
      body: `# 04. 先加一點樣式與互動：最小 dark mode 與按鈕切換

## 這篇目標

先做一個最小互動，不直接跳到完整 Header。

這篇只想讓你理解兩件事：

1. React state 是什麼
2. 點一下按鈕，畫面為什麼會跟著改

## 最小例子

${codeBlock('jsx', `
'use client'

import { useState } from 'react'

export default function MiniThemeDemo() {
  const [dark, setDark] = useState(false)

  return (
    <section className={dark ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}>
      <button onClick={() => setDark(!dark)}>
        切換模式
      </button>
    </section>
  )
}
`)}

## 超白話拆解

### \`'use client'\` 是什麼

在 Next.js App Router 裡，如果你要用：

- \`useState\`
- \`onClick\`
- 瀏覽器互動

通常這個檔案就要先標記 \`'use client'\`。

### \`const [dark, setDark] = useState(false)\`

這一行可以直接翻成：

> 我現在有一個叫 dark 的狀態，一開始是 false。以後如果要改它，用 setDark。

### \`setDark(!dark)\`

這行的意思是：

> 如果原本是 true，就改成 false；如果原本是 false，就改成 true。

### \`onClick={() => setDark(!dark)}\`

這一行最容易讓新手頭痛，所以直接翻譯：

> 當按鈕被點擊的時候，執行 setDark(!dark)。

不是現在執行，是點擊的時候才執行。

## 完成後你應該看到什麼

你點按鈕之後，背景與文字顏色會切換。這就是最小互動版的 dark mode。
`,
    },
    {
      slug: '05-upgrade-to-full-site',
      title: '05. 從超簡單版升級到完整網站：你等一下會多學到什麼',
      body: `# 05. 從超簡單版升級到完整網站：你等一下會多學到什麼

## 這篇目標

你現在已經做過：

- 最小首頁
- 最小第二頁
- 最小按鈕互動

接下來才要升級到真正的專案版本。

## 下一階段會多什麼

完整版會多出這些東西：

- 全站共用 layout
- 共用 Header / Footer
- 四個正式頁面
- 語言切換
- dark mode 狀態同步
- dropdown 導覽
- 區塊進場動畫
- 更完整的內容資料結構

## 你要先知道一件事

現在的正式專案不是「突然變複雜」，而是把你剛剛學過的東西放大：

- 一個頁面，變成四個頁面
- 一個按鈕狀態，變成全站共用狀態
- 一個小區塊，變成整個 Header

## 升級地圖

1. 先看 Next.js 專案結構
2. 再看 layout 與 globals.css
3. 再看 Header / Footer
4. 再看語言與主題切換
5. 最後再看 dropdown 和動畫

這樣順序才不會炸掉。

下一篇開始就是完整版系列。
`,
    },
    {
      slug: '06-javascript-syntax-translator',
      title: '06. JavaScript / JSX 語法翻譯表：這些看不懂很正常',
      body: `# 06. JavaScript / JSX 語法翻譯表：這些看不懂很正常

## 這篇目標

這一篇不是要你背語法定義。

這一篇是把專案裡真的會看到的寫法，全部翻譯成人話。你之後看到不懂的語法，可以先回來查。

## 1. import

${codeBlock('js', `
import Link from 'next/link'
`)}

白話翻譯：

> 我要把別的地方已經寫好的工具拿進來用。

## 2. export default function

${codeBlock('jsx', `
export default function HomePage() {
  return <div>首頁</div>
}
`)}

白話翻譯：

> 我現在定義一個元件，並把它當成這個檔案最主要輸出的內容。

## 3. return

在 React 元件裡，\`return\` 幾乎可以先翻成：

> 這個元件最後要交出去的畫面。

## 4. const

${codeBlock('js', `
const title = 'Learning Studio'
`)}

白話翻譯：

> 我現在建立一個名稱叫 title 的變數。

## 5. 物件 object

${codeBlock('js', `
const item = {
  title: '課程介紹',
  href: '/quality',
}
`)}

白話翻譯：

> 我把相關資料包成一包，裡面有 title 和 href。

## 6. 陣列 array

${codeBlock('js', `
const items = ['首頁', '課程介紹', '活動']
`)}

白話翻譯：

> 我把很多筆資料排成一串。

## 7. props

${codeBlock('jsx', `
function Card({ title, description }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}
`)}

白話翻譯：

> 這個元件需要外面傳進來的資料。這裡傳進來的是 title 和 description。

## 8. 大括號 \`{ }\` 在 JSX 裡是什麼

在 JSX 裡，大括號通常表示：

> 我要在 HTML 外觀裡插入 JavaScript 值。

例如：

${codeBlock('jsx', `
<h1>{title}</h1>
`)}

## 9. 三元運算子 \`條件 ? A : B\`

${codeBlock('jsx', `
const label = dark ? 'Dark' : 'Light'
`)}

白話翻譯：

> 如果 dark 是 true，就用 Dark；不然用 Light。

## 10. \`() => {}\`

這是箭頭函式。

可以先翻成：

> 先定義一個稍後才會執行的小功能。

## 11. \`onClick={() => ...}\`

${codeBlock('jsx', `
<button onClick={() => setOpen(true)}>
  打開
</button>
`)}

白話翻譯：

> 當按鈕被點擊時，執行裡面的程式。

## 12. \`useState\`

${codeBlock('jsx', `
const [open, setOpen] = useState(false)
`)}

白話翻譯：

> 我現在有一個叫 open 的狀態，一開始是 false。之後如果要改它，用 setOpen。

## 13. \`useEffect\`

${codeBlock('jsx', `
useEffect(() => {
  localStorage.setItem('theme', theme)
}, [theme])
`)}

白話翻譯：

> 當 theme 改變後，執行這段程式。

## 14. \`map()\`

${codeBlock('jsx', `
items.map((item) => (
  <li key={item.id}>{item.title}</li>
))
`)}

白話翻譯：

> 把 items 裡每一筆資料都做成一個畫面區塊。

## 15. \`key\`

在 React 裡，當你用 \`map()\` 產生多個元素時，通常要給 \`key\`。

白話翻譯：

> 這個 key 是 React 用來分辨每一個項目的 id。

## 16. template string

${codeBlock('js', `
const message = ` + "`目前主題是 ${theme}`" + `
`)}

白話翻譯：

> 這是一種把變數塞進字串裡的寫法。

## 17. 條件 className

${codeBlock('jsx', `
className={dark ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}
`)}

白話翻譯：

> 如果 dark 是 true，用前面那組 class；不然用後面那組。

## 18. children

在 layout 或共用容器裡，常會看到 \`children\`。

白話翻譯：

> 被包在元件裡面的內容。

## 現在你要先接受一件事

看不懂這些語法很正常。

真正有用的學法不是一次背完，而是：

1. 先知道它大概在幹嘛
2. 在專案裡反覆看到
3. 每次多懂一點
`,
    },
  ]
}

function coreSeries() {
  return [
    {
      slug: '11-frontend-map',
      title: '11. 先建立前端地圖：Node.js、React、Next.js、Tailwind CSS 彼此的關係',
      body: `# 11. 先建立前端地圖：Node.js、React、Next.js、Tailwind CSS 彼此的關係

## 這篇要解決什麼

完全沒學過前端的人，最常卡住的不是語法，而是根本不知道這些名詞在同一個專案裡各自扮演什麼角色。

你現在先不要急著寫畫面，先把這四個東西的關係排好：

- Node.js
- React
- Next.js
- Tailwind CSS

## 先講最白話版本

- \`Node.js\`：讓你可以在電腦上跑前端開發工具
- \`React\`：負責把畫面拆成元件
- \`Next.js\`：建立在 React 之上的網站框架，幫你處理路由、版面與專案結構
- \`Tailwind CSS\`：幫你快速寫樣式

## 它們不是同一層的東西

### 1. Node.js 不是拿來畫畫面

很多新手第一次看到 \`npm install\` 會誤以為 Node.js 本身就是前端框架。

不是。

在這個專案裡，Node.js 的工作比較像是：

- 幫你安裝套件
- 幫你啟動開發伺服器
- 幫你執行 build
- 幫你執行測試

你看到的指令像這樣：

${codeBlock('bash', `
npm install
npm run dev
npm run build
npm test
`)}

### 2. React 是畫面的基礎

React 負責把網站拆成很多元件。

例如：

- Header
- Footer
- 首頁 Hero
- 報名流程步驟卡
- 活動列表

### 3. Next.js 是把 React 變成一個完整網站

只有 React，你還是得自己處理很多網站層級的事情。

Next.js 幫你補上：

- 路由
- layout
- 頁面檔案結構
- 開發伺服器
- build

### 4. Tailwind CSS 負責樣式

Tailwind CSS 是 CSS 工具，不是框架替代品。

它不負責路由，也不負責元件邏輯。

它只幫你更快把樣式寫出來。

例如：

${codeBlock('jsx', `
<div className="rounded-3xl bg-white p-6 shadow-lg">
  這是一張卡片
</div>
`)}

${syntaxBox()}

## 最後把四者關係串起來

> 用 Node.js 跑開發工具，用 Next.js 建網站骨架，用 React 寫元件，用 Tailwind CSS 把畫面做漂亮。
`,
    },
    {
      slug: '12-next-project-setup',
      title: '12. 建立 Next.js 專案：先認識 package.json、app 資料夾與 scripts',
      body: `# 12. 建立 Next.js 專案：先認識 package.json、app 資料夾與 scripts

## 這篇要做什麼

你要先看懂一個 Next.js 專案最小會有哪些東西，不然後面每新增一個檔案都只會像背答案。

## 先看 package.json

` + fileCodeBlock('package.json') + `

## 初學者先看 3 個重點

### 1. scripts 是你最常用的入口

- \`npm run dev\`：開發時使用
- \`npm run build\`：打包檢查正式版本
- \`npm run start\`：啟動 build 後的正式伺服器
- \`npm test\`：跑測試

### 2. dependencies 是網站真正會用到的套件

這次最重要的是：

- \`next\`
- \`react\`
- \`react-dom\`

### 3. devDependencies 是開發輔助

像測試、Tailwind 與 Vitest 都屬於這層。

## 接著看 app 資料夾

在 Next.js App Router 裡，\`app/\` 很重要。

你可以把它理解成：

- \`layout.js\`：全站共用外殼
- \`page.js\`：某一路由真正的頁面

例如這次專案會有：

${codeBlock('text', `
app/
├─ layout.js
├─ page.js
├─ quality/page.js
├─ admissions/page.js
└─ events/page.js
`)}
`,
    },
    {
      slug: '13-layout-and-pages',
      title: '13. 先做全站骨架：layout、page、route 到底怎麼配合',
      body: `# 13. 先做全站骨架：layout、page、route 到底怎麼配合

## 這篇目標

先把全站骨架看懂。你現在不要想動畫，也不要想 dropdown。

## 先看全站入口：layout.js

` + fileCodeBlock('app/layout.js') + `

## layout.js 在做什麼

### 1. 引入全域 CSS

\`import './globals.css'\`

### 2. 包住 SiteProvider

\`SiteProvider\` 會管理：

- 語言
- dark mode
- 全站共用切換

### 3. 包住 SiteChrome

\`SiteChrome\` 可以把 Header、Footer、頁面內容放在共同外殼裡。

## 頁面怎麼對應路由

- \`app/page.js\` 對應首頁
- \`app/quality/page.js\` 對應 \`/quality\`
- \`app/admissions/page.js\` 對應 \`/admissions\`
- \`app/events/page.js\` 對應 \`/events\`
`,
    },
    {
      slug: '14-tailwind-and-global-style',
      title: '14. 全域樣式怎麼寫：先看 globals.css 與 Tailwind 思維',
      body: `# 14. 全域樣式怎麼寫：先看 globals.css 與 Tailwind 思維

## 先看全域樣式

` + fileCodeBlock('app/globals.css') + `

## Tailwind 的思維

Tailwind 不會幫你自動設計版面，它只是讓你用很多小 class 快速組合樣式。

例如：

${codeBlock('jsx', `
<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
  卡片
</div>
`)}

白話翻譯：

- \`rounded-3xl\`：圓角
- \`border\`：邊框
- \`bg-white\`：白底
- \`p-6\`：內距
- \`shadow-sm\`：淡陰影
`,
    },
    {
      slug: '15-build-chrome',
      title: '15. 建立全站外殼：Header、Footer、共用版面',
      body: `# 15. 建立全站外殼：Header、Footer、共用版面

## 先看 SiteChrome

` + fileCodeBlock('src/components/site-chrome.jsx') + `

## 再看 Header

` + fileCodeBlock('src/components/header.jsx') + `

## 再看 Footer

` + fileCodeBlock('src/components/footer.jsx') + `

## 這一步你要理解的事情

不是每個頁面都自己寫一份導覽列。

比較合理的做法是：

- layout 負責外框
- SiteChrome 負責共用殼
- Header / Footer 各自只管自己的內容
`,
    },
    {
      slug: '16-language-and-theme',
      title: '16. 把狀態提升到全站：語言切換與 dark mode 怎麼共用',
      body: `# 16. 把狀態提升到全站：語言切換與 dark mode 怎麼共用

## 先看 SiteProvider

` + fileCodeBlock('src/components/site-provider.jsx') + `

## 為什麼狀態不放在單一頁面

因為語言和主題不只影響首頁，而是整站都會用到。

所以這類狀態適合放在共用 provider。

## 這裡最容易卡的語法

### \`const value = { theme, setTheme, language, setLanguage }\`

這不是魔法，它只是把多個值包進一個物件，方便傳下去。

### \`useEffect(() => { ... }, [theme])\`

白話翻譯：

> 當 theme 改變後，執行這段程式。

### \`localStorage.setItem('site-theme', theme)\`

意思是把目前主題存進瀏覽器，重新整理後還能記住。
`,
    },
    {
      slug: '17-four-pages',
      title: '17. 把四個正式頁面補齊：內容資料與頁面元件怎麼分開',
      body: `# 17. 把四個正式頁面補齊：內容資料與頁面元件怎麼分開

## 先看內容資料

` + fileCodeBlock('src/lib/site-content.js') + `

## 再看各頁檔案

` + fileCodeBlock('app/page.js') + `

` + fileCodeBlock('app/quality/page.js') + `

` + fileCodeBlock('app/admissions/page.js') + `

` + fileCodeBlock('app/events/page.js') + `

## 為什麼要把文案抽出來

因為這次有：

- 中文
- 英文
- 四個頁面

如果全部硬寫在 JSX 裡，很快就會亂掉。
`,
    },
    {
      slug: '18-dropdown-and-motion',
      title: '18. 把網站做得更像正式成品：dropdown、切換、進場動畫',
      body: `# 18. 把網站做得更像正式成品：dropdown、切換、進場動畫

## 先看 Header 裡的互動

` + fileCodeBlock('src/components/header.jsx') + `

## 再看 RevealSection

` + fileCodeBlock('src/components/reveal-section.jsx') + `

## 這裡的學習順序

先理解三件事：

1. 哪些東西需要 state
2. 哪些互動只靠 CSS transition 就夠
3. 哪些區塊需要等滾動到畫面裡再顯示

## 新手最常看不懂的地方

### \`setMenuOpen((current) => !current)\`

這一行白話就是：

> 把 current 拿來看一下，如果原本是開的就關掉，如果原本是關的就打開。

### \`items.map((item) => ...)\`

這就是把多個導覽項目逐一轉成畫面。
`,
    },
    {
      slug: '19-company-ui-icons',
      title: '19. 公司內部 npm 套件要怎麼接：UI 元件與 icon 的接法',
      body: `# 19. 公司內部 npm 套件要怎麼接：UI 元件與 icon 的接法

## 這一篇不會直接綁死真實套件名稱

這次用代稱說明：

- \`@company/ui\`
- \`@company/icons\`

## 一般流程

${codeBlock('bash', `
npm install @company/ui @company/icons
`)}

## 匯入方式通常長這樣

${codeBlock('jsx', `
import { Button } from '@company/ui'
import { ChevronDown } from '@company/icons'
`)}

## 怎麼判斷要不要替換

適合先替換的地方：

- Button
- Icon
- 表單欄位

不建議一開始就全部替換，因為新手會失去對基礎 HTML / Tailwind 結構的理解。
`,
    },
    {
      slug: '20-final-review-and-source',
      title: '20. 最後總整理：完整原始碼、檔案結構與驗證',
      body: `# 20. 最後總整理：完整原始碼、檔案結構與驗證

## 最終檔案結構

${codeBlock('text', `
app/
src/
docs/tutorials/
tools/
`)}

## 驗證指令

${codeBlock('bash', `
npm test
npm run build
npm run dev
`)}

## 完整原始碼附錄

${appendixFiles.map((relativePath) => fileCodeBlock(relativePath)).join('\n\n')}
`,
    },
  ]
}

function buildDocuments() {
  const docs = [...quickStartSeries(), ...coreSeries()]

  fs.mkdirSync(tutorialsDir, { recursive: true })

  for (const fileName of fs.readdirSync(tutorialsDir)) {
    if (fileName.endsWith('.md') || fileName.endsWith('.html')) {
      fs.unlinkSync(path.join(tutorialsDir, fileName))
    }
  }

  docs.forEach((doc) => {
    const markdownPath = path.join(tutorialsDir, `${doc.slug}.md`)
    const htmlPath = path.join(tutorialsDir, `${doc.slug}.html`)
    const markdown = `${doc.body.trim()}\n`
    const html = wrapHtml(doc.title, convertMarkdown(markdown))

    fs.writeFileSync(markdownPath, markdown)
    fs.writeFileSync(htmlPath, html)
  })
}

buildDocuments()
