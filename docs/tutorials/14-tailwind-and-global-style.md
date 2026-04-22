# 14. 全域樣式怎麼寫：先看 globals.css 與 Tailwind 思維

## 先看全域樣式

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

## Tailwind 的思維

Tailwind 不會幫你自動設計版面，它只是讓你用很多小 class 快速組合樣式。

例如：

```jsx
<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
  卡片
</div>
```

白話翻譯：

- `rounded-3xl`：圓角
- `border`：邊框
- `bg-white`：白底
- `p-6`：內距
- `shadow-sm`：淡陰影
