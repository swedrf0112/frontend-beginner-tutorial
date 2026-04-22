# 06. JavaScript / JSX 語法翻譯表：這些看不懂很正常

## 這篇目標

這一篇不是要你背語法定義。

這一篇是把專案裡真的會看到的寫法，全部翻譯成人話。你之後看到不懂的語法，可以先回來查。

## 1. import

```js
import Link from 'next/link'
```

白話翻譯：

> 我要把別的地方已經寫好的工具拿進來用。

## 2. export default function

```jsx
export default function HomePage() {
  return <div>首頁</div>
}
```

白話翻譯：

> 我現在定義一個元件，並把它當成這個檔案最主要輸出的內容。

## 3. return

在 React 元件裡，`return` 幾乎可以先翻成：

> 這個元件最後要交出去的畫面。

## 4. const

```js
const title = 'Learning Studio'
```

白話翻譯：

> 我現在建立一個名稱叫 title 的變數。

## 5. 物件 object

```js
const item = {
  title: '課程介紹',
  href: '/quality',
}
```

白話翻譯：

> 我把相關資料包成一包，裡面有 title 和 href。

## 6. 陣列 array

```js
const items = ['首頁', '課程介紹', '活動']
```

白話翻譯：

> 我把很多筆資料排成一串。

## 7. props

```jsx
function Card({ title, description }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}
```

白話翻譯：

> 這個元件需要外面傳進來的資料。這裡傳進來的是 title 和 description。

## 8. 大括號 `{ }` 在 JSX 裡是什麼

在 JSX 裡，大括號通常表示：

> 我要在 HTML 外觀裡插入 JavaScript 值。

例如：

```jsx
<h1>{title}</h1>
```

## 9. 三元運算子 `條件 ? A : B`

```jsx
const label = dark ? 'Dark' : 'Light'
```

白話翻譯：

> 如果 dark 是 true，就用 Dark；不然用 Light。

## 10. `() => {}`

這是箭頭函式。

可以先翻成：

> 先定義一個稍後才會執行的小功能。

## 11. `onClick={() => ...}`

```jsx
<button onClick={() => setOpen(true)}>
  打開
</button>
```

白話翻譯：

> 當按鈕被點擊時，執行裡面的程式。

## 12. `useState`

```jsx
const [open, setOpen] = useState(false)
```

白話翻譯：

> 我現在有一個叫 open 的狀態，一開始是 false。之後如果要改它，用 setOpen。

## 13. `useEffect`

```jsx
useEffect(() => {
  localStorage.setItem('theme', theme)
}, [theme])
```

白話翻譯：

> 當 theme 改變後，執行這段程式。

## 14. `map()`

```jsx
items.map((item) => (
  <li key={item.id}>{item.title}</li>
))
```

白話翻譯：

> 把 items 裡每一筆資料都做成一個畫面區塊。

## 15. `key`

在 React 裡，當你用 `map()` 產生多個元素時，通常要給 `key`。

白話翻譯：

> 這個 key 是 React 用來分辨每一個項目的 id。

## 16. template string

```js
const message = `目前主題是 ${theme}`
```

白話翻譯：

> 這是一種把變數塞進字串裡的寫法。

## 17. 條件 className

```jsx
className={dark ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}
```

白話翻譯：

> 如果 dark 是 true，用前面那組 class；不然用後面那組。

## 18. children

在 layout 或共用容器裡，常會看到 `children`。

白話翻譯：

> 被包在元件裡面的內容。

## 現在你要先接受一件事

看不懂這些語法很正常。

真正有用的學法不是一次背完，而是：

1. 先知道它大概在幹嘛
2. 在專案裡反覆看到
3. 每次多懂一點
