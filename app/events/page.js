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
