# 01. 先把專案跑起來：不要先背全部資料夾

## 這篇目標

先看到網站跑起來。

很多新手一開始就去研究所有檔案，結果直接淹死。這一篇先只管：

- 專案怎麼啟動
- 首頁是哪個檔案
- 改哪裡會立刻看到畫面變化

## 先做這三件事

```bash
npm install
npm run dev
```

接著打開瀏覽器看本地網址。

## 先認最重要的兩個位置

### 1. package.json

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

你現在先只看 scripts：

- `npm run dev`：開發時最常用
- `npm run build`：檢查正式版能不能打包
- `npm run start`：跑正式站

### 2. app/page.js

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

在 Next.js App Router 裡：

- `app/page.js` 就是首頁
- 你改這個檔案，首頁就會變

## 先不要研究全部，只記這件事

如果你只想先試著改東西，先改：

- `app/page.js`
- `app/globals.css`

這樣就夠了。

## 完成後你應該看到什麼

1. 開發伺服器能跑起來
2. 首頁能打開
3. 你知道首頁主要來自 `app/page.js`
