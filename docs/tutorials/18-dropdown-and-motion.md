# 18. 把網站做得更像正式成品：dropdown、切換、進場動畫

## 先看 Header 裡的互動

### src/components/header.jsx

```jsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navigation } from '../lib/site-content'
import { useSite } from './site-provider'

function navLabelClass(isActive) {
  return `nav-link ${isActive ? 'nav-link-active' : ''}`
}

function TogglePill({ leftLabel, rightLabel, activeRight, onClick, ariaLabel }) {
  const leftClass = activeRight ? 'text-slate-500 dark:text-slate-500' : 'text-slate-950 dark:text-slate-950'
  const rightClass = activeRight ? 'text-white dark:text-slate-950' : 'text-slate-500 dark:text-slate-500'

  return (
    <button type="button" aria-label={ariaLabel} onClick={onClick} className="toggle-pill">
      <span className={`toggle-knob ${activeRight ? 'translate-x-[30px]' : 'translate-x-0'}`} />
      <span className={`toggle-label ${leftClass}`}>{leftLabel}</span>
      <span className={`toggle-label ${rightClass}`}>{rightLabel}</span>
    </button>
  )
}

export function Header() {
  const pathname = usePathname()
  const { content, language, setLanguage, theme, setTheme } = useSite()

  return (
    <>
      <div className="topbar">
        <div className="site-frame flex items-center justify-between py-3">
          <span>{content.topbar}</span>
          <span>English / 繁中 / 简中 / 日本語</span>
        </div>
      </div>

      <header className="sticky-header">
        <div className="site-frame grid grid-cols-1 gap-4 py-5 lg:grid-cols-[auto_1fr_auto] lg:items-center">
          <Link href="/" className="brand-mark">
            Asteron
          </Link>

          <nav className="flex flex-wrap gap-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href

              return (
                <div key={item.href} className="nav-item group relative">
                  <Link href={item.href} className={navLabelClass(isActive)}>
                    {item.label[language]}
                    <span className="text-[10px] transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180">
                      ▾
                    </span>
                  </Link>

                  <div className="nav-panel">
                    <div className="nav-panel-inner">
                      <div className="section-kicker mb-3">{item.title[language]}</div>
                      <div className="grid gap-2">
                        {item.items.map((subItem) => (
                          <div key={subItem.title.zh} className="nav-panel-card">
                            <div className="font-semibold text-slate-800 dark:text-slate-100">
                              {subItem.title[language]}
                            </div>
                            <div className="mt-1 text-xs leading-6 text-slate-500 dark:text-slate-400">
                              {subItem.desc[language]}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </nav>

          <div className="flex items-center gap-3 justify-self-start lg:justify-self-end">
            <TogglePill
              ariaLabel="toggle language"
              leftLabel="中文"
              rightLabel="EN"
              activeRight={language === 'en'}
              onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
            />
            <TogglePill
              ariaLabel="toggle theme"
              leftLabel={content.themeLight}
              rightLabel={content.themeDark}
              activeRight={theme === 'dark'}
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            />
          </div>
        </div>
      </header>
    </>
  )
}
```

## 再看 RevealSection

### src/components/reveal-section.jsx

```jsx
'use client'

import { useEffect, useRef, useState } from 'react'

export function RevealSection({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const target = ref.current

    if (!target) {
      return undefined
    }

    if (!('IntersectionObserver' in window)) {
      setVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.18 },
    )

    observer.observe(target)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className={`reveal-block ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </section>
  )
}
```

## 這裡的學習順序

先理解三件事：

1. 哪些東西需要 state
2. 哪些互動只靠 CSS transition 就夠
3. 哪些區塊需要等滾動到畫面裡再顯示

## 新手最常看不懂的地方

### `setMenuOpen((current) => !current)`

這一行白話就是：

> 把 current 拿來看一下，如果原本是開的就關掉，如果原本是關的就打開。

### `items.map((item) => ...)`

這就是把多個導覽項目逐一轉成畫面。
