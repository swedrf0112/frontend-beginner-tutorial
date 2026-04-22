# 11. 先建立前端地圖：Node.js、React、Next.js、Tailwind CSS 彼此的關係

## 這篇要解決什麼

完全沒學過前端的人，最常卡住的不是語法，而是根本不知道這些名詞在同一個專案裡各自扮演什麼角色。

你現在先不要急著寫畫面，先把這四個東西的關係排好：

- Node.js
- React
- Next.js
- Tailwind CSS

## 先講最白話版本

- `Node.js`：讓你可以在電腦上跑前端開發工具
- `React`：負責把畫面拆成元件
- `Next.js`：建立在 React 之上的網站框架，幫你處理路由、版面與專案結構
- `Tailwind CSS`：幫你快速寫樣式

## 它們不是同一層的東西

### 1. Node.js 不是拿來畫畫面

很多新手第一次看到 `npm install` 會誤以為 Node.js 本身就是前端框架。

不是。

在這個專案裡，Node.js 的工作比較像是：

- 幫你安裝套件
- 幫你啟動開發伺服器
- 幫你執行 build
- 幫你執行測試

你看到的指令像這樣：

```bash
npm install
npm run dev
npm run build
npm test
```

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

```jsx
<div className="rounded-3xl bg-white p-6 shadow-lg">
  這是一張卡片
</div>
```

## 新手先補這個：幾個最容易看不懂的 JavaScript 寫法

### 1. `() => {}` 是什麼

這叫做箭頭函式。

你可以先把它翻成：

> 這裡在定義一個小功能，等一下再執行。

例如：

```js
() => {
  console.log('hello')
}
```

意思不是「現在立刻印出 hello」。

意思是：

> 先做出一個函式，裡面要印出 hello，等有人呼叫它時才執行。

### 2. `(() => setOpen(true))` 到底在寫什麼

你可以拆成兩步看：

```js
const handleOpen = () => {
  setOpen(true)
}
```

如果把它直接寫在 JSX 裡，常會看到：

```jsx
<button onClick={() => setOpen(true)}>
  打開
</button>
```

白話翻譯：

- `onClick`：按鈕被點擊時要做什麼
- `() => ...`：先定義一個點擊時才執行的函式
- `setOpen(true)`：把 open 這個狀態改成 true

### 3. 為什麼不能直接寫 `onClick={setOpen(true)}`

因為這樣代表：

> 頁面一渲染就立刻執行

而不是等使用者點擊。

所以 React 很常寫成：

```jsx
onClick={() => setOpen(true)}
```

### 4. `const [theme, setTheme] = useState('light')` 是什麼

這是 React state 的固定寫法。

你可以先這樣記：

- `theme`：目前值
- `setTheme`：修改值的工具

所以：

```jsx
const [theme, setTheme] = useState('light')
```

白話就是：

> 我現在有一個叫 theme 的狀態，一開始是 light。之後如果要改它，要用 setTheme。

### 5. `map()` 又是在做什麼

當你有一串資料，想把每一筆資料都變成畫面時，很常看到：

```jsx
items.map((item) => (
  <li key={item.id}>{item.title}</li>
))
```

白話翻譯：

> 把 items 裡的每一筆資料都拿出來，做成一個 `<li>`。

你現在先不用把所有 JavaScript 都學完，只要先知道：

- `() => {}` 很常是「晚點要執行的函式」
- `setSomething` 很常是「修改狀態的工具」
- `map()` 很常是「把資料變成畫面」


## 最後把四者關係串起來

> 用 Node.js 跑開發工具，用 Next.js 建網站骨架，用 React 寫元件，用 Tailwind CSS 把畫面做漂亮。
