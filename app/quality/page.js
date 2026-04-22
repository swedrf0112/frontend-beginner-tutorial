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
