export function EventsPage({ content }) {
  return (
    <main className="site-frame pt-7">
      <section className="glass-panel page-enter overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-8 dark:border-slate-800">
          <div className="mb-3 text-xs text-slate-500 dark:text-slate-400">{content.research.breadcrumb}</div>
          <h1 className="mb-5 text-4xl font-semibold">{content.research.title}</h1>
          <div className="flex flex-wrap gap-2">
            {content.research.filters.map((filter) => (
              <span
                key={filter}
                className="rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
              >
                {filter}
              </span>
            ))}
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="research-photo mb-6 rounded-[28px] p-6 text-white">
            <div className="section-title !text-slate-200">Learning Community Events</div>
            <div className="max-w-2xl text-3xl font-semibold leading-tight">
              活動頁改用更密集的列表排版，重點是資訊秩序、閱讀節奏與清楚的操作入口。
            </div>
          </div>

          <div className="space-y-2">
            {content.research.events.map((event) => (
              <div
                key={event.title}
                className="grid gap-4 rounded-[24px] border border-slate-200 bg-slate-50 px-5 py-5 dark:border-slate-800 dark:bg-slate-950/60 md:grid-cols-[1fr_180px_90px]"
              >
                <div>
                  <h2 className="mb-2 text-xl font-semibold">{event.title}</h2>
                  <p className="text-sm leading-7 text-slate-500 dark:text-slate-400">{event.desc}</p>
                </div>
                <div className="text-sm font-medium text-slate-500 dark:text-slate-400">{event.date}</div>
                <div className="text-xs font-bold tracking-[0.22em] text-sky-700 dark:text-sky-300">SEE MORE</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
