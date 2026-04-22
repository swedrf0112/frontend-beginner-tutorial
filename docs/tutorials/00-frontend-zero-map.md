# 00. 還沒開始寫之前：你現在到底在用什麼

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

- `Node.js`：讓你可以在電腦上跑開發工具
- `React`：把畫面拆成元件
- `Next.js`：建立在 React 上的網站框架
- `Tailwind CSS`：快速寫樣式

## 把它們排成一條線

你可以先這樣記：

1. 先用 Node.js 跑指令
2. Next.js 幫你建立整個網站骨架
3. React 幫你寫每一塊畫面
4. Tailwind CSS 幫你做樣式

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


## 這篇結束後你只要記住這件事

> 這次不是在學四個互相競爭的東西，而是在學一組一起合作的工具。

下一篇才開始真的把專案跑起來。
