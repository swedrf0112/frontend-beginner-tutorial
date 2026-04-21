function QuickCard({ item }) {
  return (
    <div className="rounded-[22px] border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
      <h3 className="mb-2 text-lg font-semibold text-white">{item.title}</h3>
      <p className="text-sm leading-7 text-slate-200">{item.desc}</p>
    </div>
  )
}

export function HomePage({ content }) {
  return (
    <main className="site-frame pt-7">
      <section className="glass-panel page-enter hero-gradient overflow-hidden">
        <div className="grid gap-8 px-6 py-8 text-white md:px-10 md:py-12 xl:grid-cols-[1.3fr_0.95fr]">
          <div className="space-y-5">
            <div className="section-title !text-slate-200">{content.home.eyebrow}</div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight md:text-5xl xl:text-6xl">
              {content.home.title}
            </h1>
            <p className="max-w-3xl text-sm leading-8 text-slate-200 md:text-base">
              {content.home.desc}
            </p>
            <div className="mock-photo relative mt-6 h-56 rounded-[26px] border border-white/10 p-6 md:h-72">
              <div className="absolute inset-x-6 top-6 flex items-center justify-between text-xs text-slate-300">
                <span>LEARNING PROGRAMS</span>
                <span>CAMPUS EXPERIENCE</span>
              </div>
              <div className="absolute inset-x-6 bottom-6 grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl bg-white/12 p-4 backdrop-blur-sm">Age-based Programs / Project Learning</div>
                <div className="rounded-2xl bg-white/12 p-4 backdrop-blur-sm">Campus Spaces / Student Support</div>
                <div className="rounded-2xl bg-white/12 p-4 backdrop-blur-sm">Parent Services / Community Events</div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 self-center sm:grid-cols-2 xl:grid-cols-2">
            {content.home.quickLinks.map((item) => (
              <QuickCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="glass-panel page-enter p-6 [animation-delay:120ms]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">News</h2>
            <span className="text-xs uppercase tracking-[0.22em] text-slate-400">Latest</span>
          </div>
          <div className="space-y-3">
            {content.home.news.map((item, index) => (
              <div
                key={item}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/60"
              >
                <span className="text-sm md:text-base">{item}</span>
                <span className="text-xs font-semibold text-sky-700 dark:text-sky-300">0{index + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel page-enter p-6 [animation-delay:200ms]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Highlights</h2>
            <span className="text-xs uppercase tracking-[0.22em] text-slate-400">Focus</span>
          </div>
          <div className="grid gap-3">
            {content.home.highlights.map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 px-4 py-4 dark:border-slate-800"
              >
                <span className="h-3.5 w-3.5 rounded-full bg-sky-700" />
                <span className="text-sm md:text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
