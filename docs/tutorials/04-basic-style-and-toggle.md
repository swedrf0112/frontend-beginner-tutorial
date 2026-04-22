# 04. 先加一點樣式與互動：最小 dark mode 與按鈕切換

## 這篇目標

先做一個最小互動，不直接跳到完整 Header。

這篇只想讓你理解兩件事：

1. React state 是什麼
2. 點一下按鈕，畫面為什麼會跟著改

## 最小例子

```jsx
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
```

## 超白話拆解

### `'use client'` 是什麼

在 Next.js App Router 裡，如果你要用：

- `useState`
- `onClick`
- 瀏覽器互動

通常這個檔案就要先標記 `'use client'`。

### `const [dark, setDark] = useState(false)`

這一行可以直接翻成：

> 我現在有一個叫 dark 的狀態，一開始是 false。以後如果要改它，用 setDark。

### `setDark(!dark)`

這行的意思是：

> 如果原本是 true，就改成 false；如果原本是 false，就改成 true。

### `onClick={() => setDark(!dark)}`

這一行最容易讓新手頭痛，所以直接翻譯：

> 當按鈕被點擊的時候，執行 setDark(!dark)。

不是現在執行，是點擊的時候才執行。

## 完成後你應該看到什麼

你點按鈕之後，背景與文字顏色會切換。這就是最小互動版的 dark mode。
