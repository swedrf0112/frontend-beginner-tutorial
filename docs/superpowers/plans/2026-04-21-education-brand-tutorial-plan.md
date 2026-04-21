# 四頁文教品牌前端教學實作計畫

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 產出一份可直接照做的單一 Markdown 教學，帶讀者完成四頁文教品牌網站。

**Architecture:** 文件以「先建最小骨架，再逐頁完成」的方式撰寫。內容同時涵蓋 React/Tailwind 最小必要概念、頁面程式碼、內部套件接法與驗收步驟。

**Tech Stack:** Markdown、React、Vite、Tailwind CSS、react-router-dom、npm 私有套件代稱

---

### Task 1: 建立文件骨架

**Files:**
- Create: `docs/tutorials/2026-04-21-education-brand-step-by-step.md`
- Modify: `docs/superpowers/specs/2026-04-21-education-brand-tutorial-design.md`
- Modify: `docs/superpowers/plans/2026-04-21-education-brand-tutorial-plan.md`

- [ ] 建立教學文件標題、目標、完成圖範圍、先備條件與檔案結構章節
- [ ] 明確寫出四頁名稱、路由與功能範圍
- [ ] 寫出最小必要觀念：HTML、CSS、React、Tailwind、Node.js 各自做什麼

### Task 2: 寫出專案初始化與共用骨架

**Files:**
- Modify: `docs/tutorials/2026-04-21-education-brand-step-by-step.md`

- [ ] 寫出 `Vite + React + Tailwind` 專案初始化步驟
- [ ] 寫出需要安裝的套件與指令
- [ ] 寫出共用檔案：`main.jsx`、`App.jsx`、`main.css`、`content.js`
- [ ] 寫出路由、Header、Footer、語言切換、dark mode 的基礎程式

### Task 3: 寫出四頁實作內容

**Files:**
- Modify: `docs/tutorials/2026-04-21-education-brand-step-by-step.md`

- [ ] 首頁：hero、快速入口、新聞與重點入口
- [ ] 教學品質頁：breadcrumb、側欄、文章內容
- [ ] 報名流程頁：流程步驟、FAQ、CTA
- [ ] 教育活動頁：篩選列、活動列表、日期欄位、`SEE MORE`

### Task 4: 寫出公司內部套件與圖片策略

**Files:**
- Modify: `docs/tutorials/2026-04-21-education-brand-step-by-step.md`

- [ ] 寫出 `@company/ui`、`@company/icons` 的安裝與 import 範例
- [ ] 寫出無法直接存取私有套件時的替換方式
- [ ] 寫出圖片放置策略與可替換素材流程

### Task 5: 寫出驗收與常見錯誤

**Files:**
- Modify: `docs/tutorials/2026-04-21-education-brand-step-by-step.md`

- [ ] 寫出啟動專案與畫面驗收步驟
- [ ] 寫出 dark mode / 語言切換驗收項目
- [ ] 寫出初學者常見錯誤：import 路徑、Tailwind 沒生效、路由白畫面、私有套件安裝失敗
