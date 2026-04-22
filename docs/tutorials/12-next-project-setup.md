# 12. 建立 Next.js 專案：先認識 package.json、app 資料夾與 scripts

## 這篇要做什麼

你要先看懂一個 Next.js 專案最小會有哪些東西，不然後面每新增一個檔案都只會像背答案。

## 先看 package.json

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

## 初學者先看 3 個重點

### 1. scripts 是你最常用的入口

- `npm run dev`：開發時使用
- `npm run build`：打包檢查正式版本
- `npm run start`：啟動 build 後的正式伺服器
- `npm test`：跑測試

### 2. dependencies 是網站真正會用到的套件

這次最重要的是：

- `next`
- `react`
- `react-dom`

### 3. devDependencies 是開發輔助

像測試、Tailwind 與 Vitest 都屬於這層。

## 接著看 app 資料夾

在 Next.js App Router 裡，`app/` 很重要。

你可以把它理解成：

- `layout.js`：全站共用外殼
- `page.js`：某一路由真正的頁面

例如這次專案會有：

```text
app/
├─ layout.js
├─ page.js
├─ quality/page.js
├─ admissions/page.js
└─ events/page.js
```
