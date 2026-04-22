# 13. 先做全站骨架：layout、page、route 到底怎麼配合

## 這篇目標

先把全站骨架看懂。你現在不要想動畫，也不要想 dropdown。

## 先看全站入口：layout.js

### app/layout.js

```js
import './globals.css'
import { SiteProvider } from '../src/components/site-provider'
import { SiteChrome } from '../src/components/site-chrome'

export const metadata = {
  title: 'Asteron Education Studio',
  description: 'A beginner-friendly Next.js education brand tutorial project.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant" suppressHydrationWarning>
      <body>
        <SiteProvider>
          <SiteChrome>{children}</SiteChrome>
        </SiteProvider>
      </body>
    </html>
  )
}
```

## layout.js 在做什麼

### 1. 引入全域 CSS

`import './globals.css'`

### 2. 包住 SiteProvider

`SiteProvider` 會管理：

- 語言
- dark mode
- 全站共用切換

### 3. 包住 SiteChrome

`SiteChrome` 可以把 Header、Footer、頁面內容放在共同外殼裡。

## 頁面怎麼對應路由

- `app/page.js` 對應首頁
- `app/quality/page.js` 對應 `/quality`
- `app/admissions/page.js` 對應 `/admissions`
- `app/events/page.js` 對應 `/events`
