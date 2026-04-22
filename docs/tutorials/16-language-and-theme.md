# 16. 把狀態提升到全站：語言切換與 dark mode 怎麼共用

## 先看 SiteProvider

### src/components/site-provider.jsx

```jsx
'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { siteContent } from '../lib/site-content'

const SiteContext = createContext(null)

export function SiteProvider({ children }) {
  const [language, setLanguage] = useState('zh')
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem('site-language')
    const storedTheme = window.localStorage.getItem('site-theme')

    if (storedLanguage === 'en') {
      setLanguage('en')
    }

    if (storedTheme === 'dark') {
      setTheme('dark')
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('site-language', language)
  }, [language])

  useEffect(() => {
    window.localStorage.setItem('site-theme', theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      theme,
      setTheme,
      content: siteContent[language],
    }),
    [language, theme],
  )

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
}

export function useSite() {
  const context = useContext(SiteContext)

  if (!context) {
    throw new Error('useSite must be used inside SiteProvider')
  }

  return context
}
```

## 為什麼狀態不放在單一頁面

因為語言和主題不只影響首頁，而是整站都會用到。

所以這類狀態適合放在共用 provider。

## 這裡最容易卡的語法

### `const value = { theme, setTheme, language, setLanguage }`

這不是魔法，它只是把多個值包進一個物件，方便傳下去。

### `useEffect(() => { ... }, [theme])`

白話翻譯：

> 當 theme 改變後，執行這段程式。

### `localStorage.setItem('site-theme', theme)`

意思是把目前主題存進瀏覽器，重新整理後還能記住。
