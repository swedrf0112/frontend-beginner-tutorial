# 15. 建立全站外殼：Header、Footer、共用版面

## 先看 SiteChrome

### src/components/site-chrome.jsx

```jsx
'use client'

import { usePathname } from 'next/navigation'
import { Footer } from './footer'
import { Header } from './header'

export function SiteChrome({ children }) {
  const pathname = usePathname()

  return (
    <div className="site-shell">
      <Header />
      <main key={pathname} className="page-transition shell-main">
        {children}
      </main>
      <Footer />
    </div>
  )
}
```

## 再看 Header

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

## 再看 Footer

### src/components/footer.jsx

```jsx
'use client'

import { useSite } from './site-provider'

export function Footer() {
  const { content } = useSite()

  return (
    <footer className="mt-10 border-t border-slate-200/80 bg-slate-950 text-slate-300 dark:border-slate-800">
      <div className="site-frame flex flex-col gap-2 py-8 text-sm md:flex-row md:items-center md:justify-between">
        <span className="font-semibold tracking-wide">{content.footerBrand}</span>
        <span>{content.footerLinks}</span>
      </div>
    </footer>
  )
}
```

## 這一步你要理解的事情

不是每個頁面都自己寫一份導覽列。

比較合理的做法是：

- layout 負責外框
- SiteChrome 負責共用殼
- Header / Footer 各自只管自己的內容
