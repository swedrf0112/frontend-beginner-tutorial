# 02. 先做一個最小首頁：只放標題、說明、按鈕

## 這篇目標

你先不要做完整官網。

先做出一個很小、但真的能看到成果的首頁。只需要三樣東西：

- 標題
- 介紹文字
- 按鈕

## 先把首頁想成普通函式

在 React 裡，一個頁面常常長這樣：

```jsx
export default function HomePage() {
  return <div>首頁</div>
}
```

白話翻譯：

- `function HomePage()`：建立一個元件
- `return`：把畫面交出去
- `<div>首頁</div>`：這就是畫面內容

## 建議你先做成這樣

```jsx
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
```

## 語法拆解

### `className` 是什麼

在 React 裡不是寫 `class`，而是寫 `className`。

因為 `class` 在 JavaScript 裡本身就有其他用途。

### 為什麼畫面裡可以寫很多標籤

因為 JSX 讓你可以在 JavaScript 裡寫長得像 HTML 的語法。

### 為什麼外面包 `()`

因為多行 JSX 通常會包在括號裡，方便閱讀。

## 完成後你應該看到什麼

你會先得到一個深色大區塊，裡面有品牌名、標題、說明和按鈕。這不是最終站，但它會讓你第一次清楚看到：

> 原來我真的有在改畫面。
