# 20. 最後總整理：完整原始碼、檔案結構與驗證

## 最終檔案結構

```text
app/
src/
docs/tutorials/
tools/
```

## 驗證指令

```bash
npm test
npm run build
npm run dev
```

## 完整原始碼附錄

### package.json

```json
{
  "name": "website-build",
  "version": "1.0.0",
  "description": "Beginner-friendly Next.js education brand tutorial project",
  "type": "module",
  "directories": {
    "doc": "docs"
  },
  "scripts": {
    "dev": "next dev --webpack",
    "build": "next build --webpack",
    "start": "next start",
    "test": "vitest run",
    "docs:build": "node tools/build-education-docs.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@tailwindcss/postcss": "^4.2.4",
    "next": "^16.2.4",
    "postcss": "^8.5.10",
    "react": "^19.2.5",
    "react-dom": "^19.2.5"
  },
  "devDependencies": {
    "@testing-library/dom": "^10.4.1",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.0",
    "@vitejs/plugin-react": "^4.7.0",
    "jsdom": "^25.0.1",
    "tailwindcss": "^4.1.14",
    "vite": "^5.4.19",
    "vitest": "^2.1.8"
  }
}
```

### next.config.mjs

```js
const nextConfig = {}

export default nextConfig
```

### postcss.config.mjs

```js
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

export default config
```

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

### app/page.js

```js
'use client'

import { RevealSection } from '../src/components/reveal-section'
import { useSite } from '../src/components/site-provider'

function QuickLinkCard({ item }) {
  return (
    <article className="rounded-3xl border border-white/14 bg-white/10 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/14">
      <div className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">{item.eyebrow}</div>
      <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-200">{item.desc}</p>
    </article>
  )
}

export default function HomePage() {
  const { content } = useSite()
  const page = content.home

  return (
    <div className="page-stack">
      <RevealSection className="hero-panel">
        <div className="grid gap-8 xl:grid-cols-[1.18fr_0.82fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-sky-100">
              {page.badge}
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-tight text-white md:text-6xl">
              {page.title}
            </h1>
            <p className="max-w-3xl text-base leading-8 text-slate-200">{page.desc}</p>
            <div className="flex flex-wrap gap-4">
              <a href="#programs" className="cta-primary">
                {page.primaryAction}
              </a>
              <a href="#story" className="cta-secondary">
                {page.secondaryAction}
              </a>
            </div>
            <div className="hero-stage">
              <div className="hero-stage-ribbon">{page.stage.ribbon}</div>
              <div className="hero-stage-grid">
                {page.stage.cards.map((card) => (
                  <div key={card} className="hero-stage-card">
                    {card}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 self-center sm:grid-cols-2">
            {page.quickLinks.map((item) => (
              <QuickLinkCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </RevealSection>

      <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <RevealSection className="surface-card" delay={120}>
          <div className="section-header">
            <div>
              <div className="section-kicker">{page.newsKicker}</div>
              <h2 className="section-title">{page.newsTitle}</h2>
            </div>
            <span className="section-meta">{page.newsMeta}</span>
          </div>
          <div className="space-y-3">
            {page.news.map((item, index) => (
              <div key={item.title} className="list-card">
                <div>
                  <div className="list-card-title">{item.title}</div>
                  <div className="list-card-text">{item.desc}</div>
                </div>
                <span className="list-card-index">{String(index + 1).padStart(2, '0')}</span>
              </div>
            ))}
          </div>
        </RevealSection>

        <RevealSection className="surface-card" delay={220}>
          <div className="section-header">
            <div>
              <div className="section-kicker">{page.storyKicker}</div>
              <h2 className="section-title">{page.storyTitle}</h2>
            </div>
            <span className="section-meta">{page.storyMeta}</span>
          </div>
          <div className="grid gap-3">
            {page.storyPoints.map((item) => (
              <div key={item.title} className="story-card">
                <div className="story-dot" />
                <div>
                  <div className="story-title">{item.title}</div>
                  <div className="story-text">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </RevealSection>
      </div>
    </div>
  )
}
```

### app/quality/page.js

```js
'use client'

import { RevealSection } from '../../src/components/reveal-section'
import { useSite } from '../../src/components/site-provider'

export default function QualityPage() {
  const { content } = useSite()
  const page = content.quality

  return (
    <div className="page-stack">
      <RevealSection className="surface-card article-panel">
        <div className="grid gap-0 lg:grid-cols-[270px_1fr]">
          <aside className="sidebar-panel">
            <div className="section-kicker">{page.sidebarKicker}</div>
            <div className="grid gap-2">
              {page.sidebarItems.map((item) => (
                <div
                  key={item}
                  className={`sidebar-item ${item === page.title ? 'sidebar-item-active' : ''}`}
                >
                  {item}
                </div>
              ))}
            </div>
          </aside>

          <article className="article-body">
            <div className="breadcrumb">{page.breadcrumb}</div>
            <h1 className="article-title">{page.title}</h1>
            <p className="article-lead">{page.desc}</p>

            <div className="space-y-5">
              {page.paragraphs.map((paragraph) => (
                <p key={paragraph} className="article-paragraph">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="highlight-box mt-8">
              <h2 className="text-2xl font-semibold">{page.bulletsTitle}</h2>
              <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-8 md:text-base">
                {page.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </RevealSection>
    </div>
  )
}
```

### app/admissions/page.js

```js
'use client'

import { RevealSection } from '../../src/components/reveal-section'
import { useSite } from '../../src/components/site-provider'

export default function AdmissionsPage() {
  const { content } = useSite()
  const page = content.admissions

  return (
    <div className="page-stack">
      <RevealSection className="surface-card overflow-hidden">
        <div className="border-b border-slate-200 bg-[linear-gradient(90deg,#eaf1f8_0%,#f8fbff_100%)] px-6 py-8 dark:border-slate-800 dark:bg-[linear-gradient(90deg,#102033_0%,#16283c_100%)] md:px-8">
          <div className="breadcrumb">{page.breadcrumb}</div>
          <h1 className="article-title">{page.title}</h1>
          <p className="article-lead">{page.desc}</p>
        </div>

        <div className="space-y-6 p-6 md:p-8">
          <div className="grid gap-4 md:grid-cols-5">
            {page.steps.map((step, index) => (
              <div key={step.title} className="step-card">
                <div className="step-badge">{index + 1}</div>
                <h2 className="step-title">{step.title}</h2>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="support-card">
              <h3 className="text-2xl font-semibold">{page.detailsTitle}</h3>
              <div className="mt-4 space-y-3">
                {page.steps.map((step) => (
                  <div key={step.title} className="detail-card">
                    <div className="font-semibold">{step.title}</div>
                    <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{step.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="support-card">
              <h3 className="text-2xl font-semibold">{page.supportTitle}</h3>
              <div className="cta-spotlight mt-4">
                <div className="section-kicker !text-slate-200">{page.supportKicker}</div>
                <div className="max-w-xs text-xl font-semibold text-white">{page.supportLead}</div>
              </div>
              <div className="mt-5 space-y-3">
                {page.supportItems.map((item) => (
                  <div key={item} className="detail-card">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </RevealSection>
    </div>
  )
}
```

### app/events/page.js

```js
'use client'

import { RevealSection } from '../../src/components/reveal-section'
import { useSite } from '../../src/components/site-provider'

export default function EventsPage() {
  const { content } = useSite()
  const page = content.events

  return (
    <div className="page-stack">
      <RevealSection className="surface-card overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-8 dark:border-slate-800 md:px-8">
          <div className="breadcrumb">{page.breadcrumb}</div>
          <h1 className="article-title">{page.title}</h1>
          <div className="mt-5 flex flex-wrap gap-2">
            {page.filters.map((filter) => (
              <span key={filter} className="filter-chip">
                {filter}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-6 p-6 md:p-8">
          <div className="event-stage">
            <div className="section-kicker !text-slate-200">{page.stageKicker}</div>
            <div className="max-w-2xl text-3xl font-semibold leading-tight text-white">{page.stageLead}</div>
          </div>

          <div className="space-y-3">
            {page.items.map((item) => (
              <article key={item.title} className="event-row">
                <div>
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-500 dark:text-slate-400">{item.desc}</p>
                </div>
                <div className="event-date">{item.date}</div>
                <div className="event-link">{page.moreLabel}</div>
              </article>
            ))}
          </div>
        </div>
      </RevealSection>
    </div>
  )
}
```

### app/globals.css

```css
@import "tailwindcss";

:root {
  color-scheme: light;
  font-family: "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif;
  background:
    radial-gradient(circle at top, rgba(255, 255, 255, 0.96), transparent 40%),
    linear-gradient(180deg, #eef3f8 0%, #e6edf5 100%);
  color: #172433;
}

html.dark {
  color-scheme: dark;
}

html.dark body {
  background:
    radial-gradient(circle at top, rgba(39, 93, 145, 0.22), transparent 38%),
    linear-gradient(180deg, #07111c 0%, #0d1824 100%);
}

body {
  margin: 0;
  min-height: 100vh;
  background: inherit;
}

* {
  box-sizing: border-box;
}

a {
  color: inherit;
  text-decoration: none;
}

.site-shell {
  @apply min-h-screen text-slate-800 dark:text-slate-100;
}

.site-frame {
  @apply mx-auto max-w-[1420px] px-4 md:px-6 xl:px-8;
}

.page-stack {
  @apply space-y-6 pb-14;
}

.shell-main {
  @apply mx-auto max-w-[1420px] px-4 pb-10 pt-6 md:px-6 xl:px-8;
}

.surface-card {
  @apply rounded-[30px] border border-white/60 bg-white/88 shadow-[0_22px_60px_rgba(16,37,63,0.12)] backdrop-blur;
}

.dark .surface-card {
  @apply border-slate-800/80 bg-slate-900/82 shadow-[0_28px_64px_rgba(0,0,0,0.36)];
}

.hero-panel {
  @apply overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(120deg,#061322_0%,#133355_56%,#206e9e_100%)] px-6 py-8 shadow-[0_36px_80px_rgba(5,16,28,0.28)] md:px-8 md:py-10;
  position: relative;
}

.hero-panel::before {
  content: "";
  position: absolute;
  inset: -40% auto auto -20%;
  width: 420px;
  height: 420px;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.18), transparent 65%);
  animation: pulse-float 8s ease-in-out infinite;
  pointer-events: none;
}

.hero-stage {
  @apply relative mt-4 overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/18 p-6 backdrop-blur-sm;
}

.hero-stage::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(110deg, transparent 15%, rgba(255, 255, 255, 0.14) 45%, transparent 70%);
  transform: translateX(-120%);
  animation: stage-sheen 9s linear infinite;
}

.hero-stage-ribbon {
  @apply relative z-[1] text-xs font-semibold uppercase tracking-[0.24em] text-slate-200;
}

.hero-stage-grid {
  @apply relative z-[1] mt-5 grid gap-3 md:grid-cols-3;
}

.hero-stage-card {
  @apply rounded-3xl border border-white/12 bg-white/12 p-4 text-sm leading-7 text-white shadow-[0_14px_30px_rgba(0,0,0,0.15)] transition duration-300 hover:-translate-y-1;
}

.section-header {
  @apply mb-5 flex items-start justify-between gap-4;
}

.section-kicker {
  @apply text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400;
}

.section-title {
  @apply mt-2 text-3xl font-semibold;
}

.section-meta {
  @apply text-xs font-semibold uppercase tracking-[0.24em] text-slate-400;
}

.list-card,
.story-card,
.detail-card,
.step-card,
.support-card {
  @apply rounded-[26px] border border-slate-200 bg-slate-50/92 shadow-[0_18px_30px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-950/65;
}

.list-card {
  @apply flex items-center justify-between gap-4 px-5 py-5;
}

.list-card-title,
.story-title {
  @apply text-lg font-semibold;
}

.list-card-text,
.story-text {
  @apply mt-2 text-sm leading-7 text-slate-500 dark:text-slate-400;
}

.list-card-index {
  @apply text-xs font-semibold uppercase tracking-[0.24em] text-sky-700 dark:text-sky-300;
}

.story-card {
  @apply flex items-start gap-4 px-5 py-5;
}

.story-dot {
  @apply mt-1 h-3.5 w-3.5 rounded-full bg-sky-700 shadow-[0_0_0_7px_rgba(14,165,233,0.14)];
}

.article-panel {
  @apply overflow-hidden;
}

.sidebar-panel {
  @apply border-b border-slate-200 bg-slate-50/95 px-5 py-6 dark:border-slate-800 dark:bg-slate-950/72 lg:border-b-0 lg:border-r;
}

.sidebar-item {
  @apply rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition duration-300 hover:border-sky-300 hover:text-sky-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200;
}

.sidebar-item-active {
  @apply border-transparent bg-slate-950 text-white shadow-[0_12px_28px_rgba(2,6,23,0.2)] dark:bg-sky-900;
}

.article-body {
  @apply px-6 py-7 md:px-9 md:py-9;
}

.breadcrumb {
  @apply mb-3 text-xs tracking-[0.2em] text-slate-500 dark:text-slate-400;
}

.article-title {
  @apply text-4xl font-semibold md:text-5xl;
}

.article-lead {
  @apply mt-3 max-w-3xl text-sm leading-8 text-slate-500 dark:text-slate-400 md:text-base;
}

.article-paragraph {
  @apply text-sm leading-8 md:text-base;
}

.highlight-box {
  @apply rounded-[28px] border border-slate-200 bg-slate-50/95 px-5 py-5 dark:border-slate-800 dark:bg-slate-950/62;
}

.step-card {
  @apply px-5 py-5;
}

.step-badge {
  @apply mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white dark:bg-sky-900;
}

.step-title {
  @apply text-lg font-semibold;
}

.step-desc {
  @apply mt-2 text-sm leading-7 text-slate-500 dark:text-slate-400;
}

.support-card {
  @apply p-6;
}

.cta-spotlight {
  @apply rounded-[28px] border border-white/10 bg-[linear-gradient(145deg,#0a1827_0%,#133251_58%,#2a78a6_100%)] p-5 shadow-[0_24px_44px_rgba(2,6,23,0.24)];
}

.event-stage {
  @apply rounded-[28px] border border-white/10 bg-[linear-gradient(150deg,#0d1724_0%,#21415e_48%,#91a7c1_100%)] p-6 shadow-[0_24px_50px_rgba(3,10,18,0.28)];
}

.filter-chip {
  @apply rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-600 transition duration-300 hover:border-sky-300 hover:text-sky-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300;
}

.event-row {
  @apply grid gap-4 rounded-[26px] border border-slate-200 bg-slate-50/92 px-5 py-5 shadow-[0_16px_30px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-950/65 md:grid-cols-[1fr_180px_92px];
}

.event-date {
  @apply text-sm font-medium text-slate-500 dark:text-slate-400;
}

.event-link {
  @apply text-xs font-bold uppercase tracking-[0.22em] text-sky-700 dark:text-sky-300;
}

.topbar {
  @apply border-b border-slate-200/80 bg-white/72 text-xs text-slate-500 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/70 dark:text-slate-400;
}

.sticky-header {
  @apply sticky top-0 z-40 border-b border-slate-200/80 bg-white/82 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/80;
}

.brand-mark {
  @apply text-[34px] font-extrabold tracking-[0.12em] text-[#8b1f25];
}

.nav-link {
  @apply inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-slate-700 transition duration-300 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-200 dark:hover:bg-slate-900 dark:hover:text-white;
}

.nav-link-active {
  @apply bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300;
}

.nav-panel {
  position: absolute;
  top: calc(100% + 12px);
  left: 0;
  min-width: 320px;
  opacity: 0;
  pointer-events: none;
  transform: translateY(10px);
  transition:
    opacity 180ms ease,
    transform 180ms ease;
}

.nav-item:hover .nav-panel,
.nav-item:focus-within .nav-panel {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

.nav-panel-inner {
  @apply rounded-[24px] border border-slate-200 bg-white/96 p-4 shadow-[0_26px_54px_rgba(15,23,42,0.15)] dark:border-slate-800 dark:bg-slate-950/96 dark:shadow-[0_28px_56px_rgba(0,0,0,0.4)];
}

.nav-panel-card {
  @apply rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition duration-300 hover:-translate-y-0.5 hover:border-sky-300 dark:border-slate-800 dark:bg-slate-900;
}

.toggle-pill {
  @apply relative inline-flex h-[42px] w-[84px] items-center rounded-full border border-slate-300 bg-white px-[9px] text-[11px] font-semibold tracking-[0.08em] text-slate-600 transition-colors dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300;
}

.toggle-knob {
  @apply absolute left-[6px] h-[28px] w-[42px] rounded-full bg-slate-950 shadow-md transition-transform duration-300 ease-out dark:bg-slate-100;
}

.toggle-label {
  @apply relative z-[1] flex-1 text-center transition-colors duration-300;
}

.cta-primary,
.cta-secondary {
  @apply inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold transition duration-300 hover:-translate-y-0.5;
}

.cta-primary {
  @apply bg-white text-slate-950 shadow-[0_18px_38px_rgba(255,255,255,0.18)];
}

.cta-secondary {
  @apply border border-white/18 bg-white/8 text-white;
}

.page-transition {
  animation: page-enter 620ms cubic-bezier(0.22, 1, 0.36, 1);
}

.reveal-block {
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 620ms ease,
    transform 620ms cubic-bezier(0.22, 1, 0.36, 1);
}

.reveal-block.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@keyframes page-enter {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse-float {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(36px, 24px, 0) scale(1.08);
  }
}

@keyframes stage-sheen {
  from {
    transform: translateX(-120%);
  }
  to {
    transform: translateX(120%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .page-transition,
  .reveal-block,
  .hero-panel::before,
  .hero-stage::after,
  .list-card,
  .story-card,
  .detail-card,
  .step-card,
  .support-card,
  .event-row,
  .hero-stage-card,
  .nav-link,
  .cta-primary,
  .cta-secondary,
  .toggle-knob {
    animation: none !important;
    transition: none !important;
    transform: none !important;
    opacity: 1 !important;
  }
}
```

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

### src/lib/site-content.js

```js
export const navigation = [
  {
    href: '/',
    label: { zh: '首頁', en: 'Home' },
    title: { zh: '品牌入口', en: 'Brand Entry' },
    items: [
      {
        title: { zh: '品牌故事', en: 'Brand Story' },
        desc: {
          zh: '主視覺、定位與學習理念的第一層入口。',
          en: 'The first layer for brand vision, positioning, and teaching values.',
        },
      },
      {
        title: { zh: '課程方案', en: 'Programs' },
        desc: {
          zh: '不同年齡與學習目標的課程編排方式。',
          en: 'Program structure for different ages and learning goals.',
        },
      },
      {
        title: { zh: '最新資訊', en: 'News' },
        desc: {
          zh: '公告、活動與更新模組的整理方式。',
          en: 'How announcements, events, and updates are grouped together.',
        },
      },
    ],
  },
  {
    href: '/quality',
    label: { zh: '教學品質', en: 'Quality' },
    title: { zh: '品質制度', en: 'Quality System' },
    items: [
      {
        title: { zh: '教學理念', en: 'Teaching Vision' },
        desc: {
          zh: '教學設計原則與陪伴式學習節奏。',
          en: 'Learning design principles and support rhythm.',
        },
      },
      {
        title: { zh: '品質流程', en: 'Quality Flow' },
        desc: {
          zh: '觀課、回饋、追蹤與版本更新。',
          en: 'Observation, feedback, follow-up, and iteration.',
        },
      },
      {
        title: { zh: '學習支持', en: 'Learning Support' },
        desc: {
          zh: '學生與家長都看得懂的支持機制。',
          en: 'Support systems for learners and families.',
        },
      },
    ],
  },
  {
    href: '/admissions',
    label: { zh: '報名流程', en: 'Admissions' },
    title: { zh: '報名與諮詢', en: 'Admissions Guide' },
    items: [
      {
        title: { zh: '報名前準備', en: 'Before You Apply' },
        desc: {
          zh: '需求確認、資料整理與課程媒合。',
          en: 'Needs review, form prep, and program matching.',
        },
      },
      {
        title: { zh: '試聽安排', en: 'Trial Session' },
        desc: {
          zh: '諮詢、試聽與入班安排。',
          en: 'Consultation, trial lessons, and placement.',
        },
      },
      {
        title: { zh: '常見問題', en: 'FAQ' },
        desc: {
          zh: '時程、費用、補課與請假說明。',
          en: 'Timing, pricing, make-up lessons, and leave policy.',
        },
      },
    ],
  },
  {
    href: '/events',
    label: { zh: '教育活動', en: 'Events' },
    title: { zh: '活動與合作', en: 'Events & Collaborations' },
    items: [
      {
        title: { zh: '講座活動', en: 'Talks' },
        desc: {
          zh: '家長講座、公開課與社群論壇。',
          en: 'Parent talks, open classes, and community forums.',
        },
      },
      {
        title: { zh: '工作坊', en: 'Workshops' },
        desc: {
          zh: '教師培訓與教案實作活動。',
          en: 'Teacher training and lesson design workshops.',
        },
      },
      {
        title: { zh: '合作計畫', en: 'Collaborations' },
        desc: {
          zh: '校園、社群與合作夥伴專案。',
          en: 'School, community, and partner projects.',
        },
      },
    ],
  },
]

export const siteContent = {
  zh: {
    topbar: '文教服務與學習體驗',
    themeLight: 'Light',
    themeDark: 'Dark',
    footerBrand: 'Asteron',
    footerLinks: '品牌介紹 / 報名資訊 / 聯絡我們 / 網站地圖',
    home: {
      badge: 'Next.js 文教品牌首頁',
      title: '打造更有溫度，也更有節奏感的學習品牌網站',
      desc: '這一版首頁把正式網站常見的深色主視覺、快速入口、資訊模組與動態節奏都整合進來，讓新人也能一步一步做出接近成品的頁面。',
      primaryAction: '查看課程方案',
      secondaryAction: '認識品牌故事',
      stage: {
        ribbon: 'Learning Programs / Parent Services / Campus Experience',
        cards: ['分齡課程與主題學習', '校區空間與課後支持', '家長服務與社群活動'],
      },
      quickLinks: [
        {
          eyebrow: 'Programs',
          title: '課程方案',
          desc: '從學齡前到青少年，依學習目標拆出不同的課程路徑。',
        },
        {
          eyebrow: 'Campuses',
          title: '學習空間',
          desc: '把校區環境、教室設備與學生支持整合成可閱讀的資訊卡片。',
        },
        {
          eyebrow: 'Story',
          title: '品牌故事',
          desc: '用正式但不生硬的方式講清楚理念、師資與家長回饋。',
        },
        {
          eyebrow: 'Admissions',
          title: '報名資訊',
          desc: '引導使用者往報名流程、課程顧問與常見問題移動。',
        },
      ],
      newsKicker: 'Latest Updates',
      newsTitle: '最新資訊',
      newsMeta: 'Weekly',
      news: [
        {
          title: '2026 暑期主題學習營開放預約',
          desc: '整理課程亮點、年齡對應與顧問聯繫入口。',
        },
        {
          title: '家長講座與試聽週同步上線',
          desc: '讓訪客先看見活動資訊，再自然導到報名頁。',
        },
        {
          title: '新校區體驗日與教室導覽公告',
          desc: '讓首頁資訊模組不只是美觀，也真的能帶動行動。',
        },
      ],
      storyKicker: 'Brand Focus',
      storyTitle: '品牌節奏',
      storyMeta: 'Overview',
      storyPoints: [
        {
          title: '清楚的主視覺階層',
          desc: '大標題、導覽、CTA 都有明確主次，不會一進站就失焦。',
        },
        {
          title: '正式但可讀的資訊卡片',
          desc: '不是電商卡片感，而是更像企業與教育服務網站的節奏。',
        },
        {
          title: '柔和但有存在感的動畫',
          desc: '滑過、切頁、進場都有動態，但不會打斷閱讀。',
        },
      ],
    },
    quality: {
      sidebarKicker: 'Quality System',
      breadcrumb: '首頁 / 教學品質 / 品質制度 / 教學品質',
      title: '教學品質',
      desc: '這一頁的任務是把正式閱讀頁做好：有 breadcrumb、有側欄、有段落節奏，也有重點摘要區塊。',
      sidebarItems: ['教學理念', '品質制度', '教學品質', '師資培訓', '學習支持'],
      paragraphs: [
        '對新人來說，這種頁型最重要的不是視覺炫技，而是學會如何把大量內容整理成容易閱讀的企業型版面。',
        '左邊側欄負責讓人知道自己在哪一個主題層級，右邊正文則用標題、段落與重點框架出穩定的閱讀節奏。',
      ],
      bulletsTitle: '品質重點',
      bullets: ['定期觀課與回饋制度', '課程更新與教學版本追蹤', '學生與家長意見蒐集與追蹤'],
    },
    admissions: {
      breadcrumb: '首頁 / 報名流程 / 入學與報名',
      title: '報名流程',
      desc: '這頁要教新人做出有步驟感的內容頁：上方先講全貌，下方再拆成步驟卡、詳細說明與支援資訊。',
      steps: [
        { title: '填寫資料', desc: '建立學生與家長基本資訊，方便顧問先了解需求。' },
        { title: '需求確認', desc: '依年齡、學習目標與可上課時段媒合課程。' },
        { title: '安排試聽', desc: '讓家長與學生先體驗課程，再決定是否報名。' },
        { title: '完成報名', desc: '確認班級、開課時間與通知方式。' },
        { title: '開課準備', desc: '收到入班資訊、教材提醒與第一堂課注意事項。' },
      ],
      detailsTitle: '流程細節',
      supportTitle: '支援資訊',
      supportKicker: 'Admissions Support',
      supportLead: '把看起來很繁雜的流程，拆成訪客真正看得懂、也敢往下做的節奏。',
      supportItems: ['FAQ 常見問題', '聯絡課程顧問', '查看近期開課時程'],
    },
    events: {
      breadcrumb: '首頁 / 教育活動 / 活動總覽',
      title: '活動總覽',
      filters: ['全部活動', '講座', '工作坊', '即將開始', '已結束'],
      stageKicker: 'Learning Community Events',
      stageLead: '活動列表頁的重點是資訊秩序、日期欄位與操作入口，而不是把所有內容都做成大圖卡。',
      moreLabel: 'SEE MORE',
      items: [
        {
          title: '2026 暑期親子學習節',
          desc: '用高密度但清楚的排版，讓使用者一眼看見主題、摘要與時間。',
          date: '2026/07/10 - 2026/07/16',
        },
        {
          title: '2026 教師教案設計工作坊',
          desc: '保留正式網站的節奏感，同時讓資料區塊不會顯得死板。',
          date: '2026/06/14 - 2026/06/18',
        },
        {
          title: '2026 學習成長論壇',
          desc: '這類頁面最適合教新人理解列表、欄位與 CTA 如何一起工作。',
          date: '2026/05/26 - 2026/05/29',
        },
      ],
    },
  },
  en: {
    topbar: 'Education services and learning experience',
    themeLight: 'Light',
    themeDark: 'Dark',
    footerBrand: 'Asteron',
    footerLinks: 'Brand / Admissions / Contact / Sitemap',
    home: {
      badge: 'Next.js Education Brand Home',
      title: 'Build an education brand website with stronger pacing and warmer interaction',
      desc: 'This version of the home page combines a formal hero, quick entry cards, layered information modules, and smoother motion so beginners can still build something that feels close to a finished site.',
      primaryAction: 'Browse Programs',
      secondaryAction: 'Read Our Story',
      stage: {
        ribbon: 'Learning Programs / Parent Services / Campus Experience',
        cards: ['Age-based programs and guided learning', 'Campus spaces and student support', 'Parent services and community events'],
      },
      quickLinks: [
        {
          eyebrow: 'Programs',
          title: 'Programs',
          desc: 'Build clear paths for different age groups and learning goals.',
        },
        {
          eyebrow: 'Campuses',
          title: 'Learning Spaces',
          desc: 'Turn campus environment and support details into structured content cards.',
        },
        {
          eyebrow: 'Story',
          title: 'Our Story',
          desc: 'Explain mission, faculty tone, and family feedback in a formal way.',
        },
        {
          eyebrow: 'Admissions',
          title: 'Admissions',
          desc: 'Lead people from the home page into process, support, and FAQ content.',
        },
      ],
      newsKicker: 'Latest Updates',
      newsTitle: 'Latest News',
      newsMeta: 'Weekly',
      news: [
        {
          title: '2026 Summer Theme Camp is now open',
          desc: 'Show key highlights, age fit, and advisor entry points in one module.',
        },
        {
          title: 'Parent talks and trial week are live',
          desc: 'Let visitors notice events first, then move naturally into admissions.',
        },
        {
          title: 'New campus experience day announced',
          desc: 'The information module should do real work, not just decorate the page.',
        },
      ],
      storyKicker: 'Brand Focus',
      storyTitle: 'Brand Rhythm',
      storyMeta: 'Overview',
      storyPoints: [
        {
          title: 'Clear visual hierarchy',
          desc: 'Headline, navigation, and calls to action each keep a clear role.',
        },
        {
          title: 'Formal but readable cards',
          desc: 'Closer to an education brand site than a generic marketing template.',
        },
        {
          title: 'Motion with restraint',
          desc: 'Hover, route, and reveal motion support the content instead of overwhelming it.',
        },
      ],
    },
    quality: {
      sidebarKicker: 'Quality System',
      breadcrumb: 'Home / Quality / Quality System / Learning Quality',
      title: 'Learning Quality',
      desc: 'This page teaches a formal reading layout: breadcrumb, sidebar, paragraph rhythm, and a short summary box.',
      sidebarItems: ['Teaching Vision', 'Quality System', 'Learning Quality', 'Faculty Growth', 'Student Support'],
      paragraphs: [
        'For beginners, this page type is less about visual drama and more about learning how to organize dense content into a calm, readable structure.',
        'The left sidebar anchors the topic while the article body handles paragraph flow, spacing, and summary content.',
      ],
      bulletsTitle: 'Quality Highlights',
      bullets: ['Regular class observation and feedback', 'Course updates and teaching version tracking', 'Feedback loops for students and families'],
    },
    admissions: {
      breadcrumb: 'Home / Admissions / Enrollment Process',
      title: 'Admissions Process',
      desc: 'This page teaches a stronger step-based layout: start with a clear summary, then split into step cards, details, and support blocks.',
      steps: [
        { title: 'Submit Form', desc: 'Collect the learner and parent details first.' },
        { title: 'Needs Review', desc: 'Match age, goals, and preferred class times.' },
        { title: 'Trial Session', desc: 'Offer a class experience before enrollment.' },
        { title: 'Confirm Enrollment', desc: 'Lock the program, class time, and notices.' },
        { title: 'Prepare to Start', desc: 'Share onboarding notes and class reminders.' },
      ],
      detailsTitle: 'Process Details',
      supportTitle: 'Support',
      supportKicker: 'Admissions Support',
      supportLead: 'Turn a complex enrollment process into something that feels clear, formal, and easy to follow.',
      supportItems: ['FAQ', 'Talk to an advisor', 'View upcoming schedules'],
    },
    events: {
      breadcrumb: 'Home / Events / Event Overview',
      title: 'Events',
      filters: ['All Events', 'Talks', 'Workshops', 'Upcoming', 'Past'],
      stageKicker: 'Learning Community Events',
      stageLead: 'An event listing page works best when titles, dates, summaries, and action links are easy to scan in one pass.',
      moreLabel: 'SEE MORE',
      items: [
        {
          title: '2026 Summer Family Learning Festival',
          desc: 'Use a denser layout so visitors can read title, summary, and date quickly.',
          date: '2026/07/10 - 2026/07/16',
        },
        {
          title: '2026 Teacher Lesson Design Workshop',
          desc: 'Keep the page formal and calm while still feeling current.',
          date: '2026/06/14 - 2026/06/18',
        },
        {
          title: '2026 Learning Growth Forum',
          desc: 'This page is ideal for teaching list layout, metadata columns, and CTA rhythm.',
          date: '2026/05/26 - 2026/05/29',
        },
      ],
    },
  },
}
```

### test/app.test.jsx

```jsx
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const currentDir = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(currentDir, '..')

function projectFile(relativePath) {
  return path.join(projectRoot, relativePath)
}

describe('next.js education tutorial rebuild', () => {
  it('uses next.js scripts instead of vite scripts', () => {
    const packageJson = JSON.parse(fs.readFileSync(projectFile('package.json'), 'utf8'))

    expect(packageJson.dependencies.next).toBeDefined()
    expect(packageJson.scripts.dev).toMatch(/^next dev/)
    expect(packageJson.scripts.build).toMatch(/^next build/)
    expect(packageJson.scripts.start).toMatch(/^next start/)
  })

  it('creates the required app router pages and shared next.js files', () => {
    const requiredFiles = [
      'app/layout.js',
      'app/page.js',
      'app/quality/page.js',
      'app/admissions/page.js',
      'app/events/page.js',
      'app/globals.css',
      'postcss.config.mjs',
      'next.config.mjs',
      'src/components/site-provider.jsx',
      'src/components/site-chrome.jsx',
      'src/components/header.jsx',
      'src/components/footer.jsx',
      'src/lib/site-content.js',
    ]

    requiredFiles.forEach((relativePath) => {
      expect(fs.existsSync(projectFile(relativePath)), relativePath).toBe(true)
    })
  })

  it('ships a multi-part beginner tutorial series in markdown and html', () => {
    const tutorialsDir = projectFile('docs/tutorials')
    const tutorialFiles = fs.readdirSync(tutorialsDir)
    const markdownFiles = tutorialFiles.filter((file) => file.endsWith('.md'))
    const htmlFiles = tutorialFiles.filter((file) => file.endsWith('.html'))

    expect(markdownFiles.length).toBeGreaterThanOrEqual(14)
    expect(htmlFiles.length).toBeGreaterThanOrEqual(14)

    const foundationsFile = markdownFiles.find((file) => file.includes('00-frontend-zero-map'))
    expect(foundationsFile).toBeDefined()

    const foundationsText = fs.readFileSync(path.join(tutorialsDir, foundationsFile), 'utf8')
    expect(foundationsText).toContain('Node.js')
    expect(foundationsText).toContain('React')
    expect(foundationsText).toContain('Next.js')
    expect(foundationsText).toContain('Tailwind CSS')
    expect(foundationsText).toContain('() => {}')

    const syntaxGuideFile = markdownFiles.find((file) => file.includes('06-javascript-syntax-translator'))
    expect(syntaxGuideFile).toBeDefined()

    const syntaxGuideText = fs.readFileSync(path.join(tutorialsDir, syntaxGuideFile), 'utf8')
    expect(syntaxGuideText).toContain('import')
    expect(syntaxGuideText).toContain('return')
    expect(syntaxGuideText).toContain('props')
    expect(syntaxGuideText).toContain('map()')
  })
})
```
