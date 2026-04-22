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
