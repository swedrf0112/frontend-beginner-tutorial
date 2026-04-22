# 03. 加第二頁與最小導覽：先理解路由，不先做 dropdown

## 這篇目標

先學會最簡單的切頁。

這一篇故意不先做 dropdown，因為你現在更需要先理解：

> 在 Next.js 裡，資料夾就是路由。

## 第一步：新增第二頁

你可以新增：

```text
app/about/page.js
```

內容先保持最簡單：

```jsx
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
```

## 第二步：在首頁放連結

```jsx
import Link from 'next/link'

<Link
  href="/about"
  className="inline-flex rounded-full bg-slate-200 px-5 py-3 font-medium text-slate-900"
>
  看課程介紹
</Link>
```

## 新手最容易卡的點

### 為什麼不是 `<a href="/about">`

在 Next.js 裡，站內切換建議用 `Link`。

因為它是框架提供的路由元件。

### `href="/about"` 是什麼

就是在說：

> 這個連結要帶你去 `/about`

### `import Link from 'next/link'` 又是什麼

白話翻譯：

> 我要把 Next.js 內建的 Link 元件拿進來用。

## 完成後你應該看到什麼

1. 首頁有一個連到第二頁的按鈕
2. 點下去可以切到 `/about`
3. 你開始知道 Next.js 的路由其實是靠資料夾決定的
