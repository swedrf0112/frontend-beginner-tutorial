export function LearningQualityPage({ content }) {
  return (
    <main className="site-frame pt-7">
      <section className="glass-panel page-enter overflow-hidden">
        <div className="grid gap-0 lg:grid-cols-[250px_1fr]">
          <aside className="border-b border-slate-200 bg-slate-50 px-5 py-6 dark:border-slate-800 dark:bg-slate-950/65 lg:border-b-0 lg:border-r">
            <div className="section-title">Quality</div>
            <div className="grid gap-2">
              {content.audit.menu.map((item) => (
                <div
                  key={item}
                  className={`rounded-2xl px-4 py-3 text-sm font-medium ${
                    item === content.audit.title
                      ? 'bg-slate-900 text-white dark:bg-sky-900'
                      : 'border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </aside>

          <article className="p-6 md:p-9">
            <div className="mb-4 text-xs text-slate-500 dark:text-slate-400">{content.audit.breadcrumb}</div>
            <h1 className="mb-3 text-4xl font-semibold">{content.audit.title}</h1>
            <p className="mb-8 max-w-3xl text-sm leading-8 text-slate-500 dark:text-slate-400 md:text-base">
              {content.audit.desc}
            </p>

            <div className="space-y-5">
              {content.audit.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-8 md:text-base">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 rounded-[24px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/60">
              <h2 className="mb-4 text-2xl font-semibold">Key Points</h2>
              <ul className="list-disc space-y-3 pl-5 text-sm leading-8 md:text-base">
                {content.audit.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}
