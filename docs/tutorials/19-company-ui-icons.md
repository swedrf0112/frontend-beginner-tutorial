# 19. 公司內部 npm 套件要怎麼接：UI 元件與 icon 的接法

## 這一篇不會直接綁死真實套件名稱

這次用代稱說明：

- `@company/ui`
- `@company/icons`

## 一般流程

```bash
npm install @company/ui @company/icons
```

## 匯入方式通常長這樣

```jsx
import { Button } from '@company/ui'
import { ChevronDown } from '@company/icons'
```

## 怎麼判斷要不要替換

適合先替換的地方：

- Button
- Icon
- 表單欄位

不建議一開始就全部替換，因為新手會失去對基礎 HTML / Tailwind 結構的理解。
