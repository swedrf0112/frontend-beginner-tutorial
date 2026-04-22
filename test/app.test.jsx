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
