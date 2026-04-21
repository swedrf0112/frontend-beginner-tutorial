import fs from 'node:fs';
import path from 'node:path';

export function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function inline(text) {
  return escapeHtml(text)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

export function convertMarkdown(markdown) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let inCode = false;
  let codeLang = '';
  let paragraph = [];
  let listType = null;

  function flushParagraph() {
    if (paragraph.length) {
      out.push(`<p>${inline(paragraph.join(' '))}</p>`);
      paragraph = [];
    }
  }

  function flushList() {
    if (listType) {
      out.push(`</${listType}>`);
      listType = null;
    }
  }

  for (const line of lines) {
    if (inCode) {
      if (line.startsWith('```')) {
        out.push('</code></pre>');
        inCode = false;
        codeLang = '';
      } else {
        out.push(`${escapeHtml(line)}\n`);
      }
      continue;
    }

    if (line.startsWith('```')) {
      flushParagraph();
      flushList();
      codeLang = line.slice(3).trim();
      out.push(`<pre><code class="language-${codeLang}">`);
      inCode = true;
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      flushList();
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      flushParagraph();
      flushList();
      const level = heading[1].length;
      out.push(`<h${level}>${inline(heading[2])}</h${level}>`);
      continue;
    }

    const ordered = line.match(/^\d+\.\s+(.*)$/);
    if (ordered) {
      flushParagraph();
      if (listType && listType !== 'ol') flushList();
      if (!listType) {
        listType = 'ol';
        out.push('<ol>');
      }
      out.push(`<li>${inline(ordered[1])}</li>`);
      continue;
    }

    const unordered = line.match(/^-\s+(.*)$/);
    if (unordered) {
      flushParagraph();
      if (listType && listType !== 'ul') flushList();
      if (!listType) {
        listType = 'ul';
        out.push('<ul>');
      }
      out.push(`<li>${inline(unordered[1])}</li>`);
      continue;
    }

    flushList();
    paragraph.push(line.trim());
  }

  flushParagraph();
  flushList();

  return out.join('\n');
}

export function wrapHtml(title, bodyHtml) {
  return `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <style>
    :root {
      --page-width: 920px;
      --text: #1f2937;
      --muted: #5b6574;
      --border: #d9e2ec;
      --panel: #f8fafc;
      --code: #0f172a;
      --accent: #8b1f25;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 40px 24px 72px;
      font-family: "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif;
      color: var(--text);
      background: #ffffff;
      line-height: 1.8;
    }
    main {
      max-width: var(--page-width);
      margin: 0 auto;
    }
    h1, h2, h3, h4, h5, h6 {
      line-height: 1.35;
      margin: 1.5em 0 0.6em;
      page-break-after: avoid;
    }
    h1 { font-size: 34px; color: var(--accent); margin-top: 0; }
    h2 { font-size: 26px; border-top: 1px solid var(--border); padding-top: 24px; }
    h3 { font-size: 20px; }
    p, li { font-size: 15px; }
    p { margin: 0 0 1em; }
    ul, ol { margin: 0 0 1.2em 1.4em; padding: 0; }
    li { margin: 0.35em 0; }
    pre {
      margin: 0 0 1.2em;
      padding: 16px 18px;
      overflow-x: auto;
      background: var(--code);
      color: #e2e8f0;
      border-radius: 14px;
      white-space: pre-wrap;
      word-break: break-word;
    }
    code {
      font-family: "SFMono-Regular", "Menlo", monospace;
      font-size: 0.92em;
      background: var(--panel);
      border: 1px solid var(--border);
      padding: 0.1em 0.35em;
      border-radius: 6px;
    }
    pre code {
      background: transparent;
      border: 0;
      padding: 0;
      border-radius: 0;
      color: inherit;
    }
    strong { font-weight: 700; }
    @media print {
      body { padding: 0; }
      h2, h3 { page-break-after: avoid; }
      pre, ul, ol { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <main>
    ${bodyHtml}
  </main>
</body>
</html>`;
}

function main() {
  const input = process.argv[2];
  const output = process.argv[3];

  if (!input || !output) {
    console.error('Usage: node tools/markdown-to-html.js <input.md> <output.html>');
    process.exit(1);
  }

  const markdown = fs.readFileSync(input, 'utf8');
  const title = path.basename(input, path.extname(input));
  const html = wrapHtml(title, convertMarkdown(markdown));
  fs.writeFileSync(output, html);
}

const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname);

if (isDirectRun) {
  main();
}
