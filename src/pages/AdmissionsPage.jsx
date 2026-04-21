export function AdmissionsPage({ content }) {
  return (
    <main className="site-frame pt-7">
      <section className="glass-panel page-enter overflow-hidden">
        <div className="border-b border-slate-200 bg-[linear-gradient(90deg,#e6edf5_0%,#f8fafc_100%)] px-6 py-8 dark:border-slate-800 dark:bg-[linear-gradient(90deg,#102234_0%,#16293b_100%)]">
          <div className="mb-3 text-xs text-slate-500 dark:text-slate-400">{content.careers.breadcrumb}</div>
          <h1 className="mb-3 text-4xl font-semibold">{content.careers.title}</h1>
          <p className="max-w-3xl text-sm leading-8 text-slate-500 dark:text-slate-400 md:text-base">
            {content.careers.desc}
          </p>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid gap-4 md:grid-cols-5">
            {content.careers.steps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-[24px] border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950/60"
              >
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white dark:bg-sky-900">
                  {index + 1}
                </div>
                <h2 className="mb-2 text-lg font-semibold">{step.title}</h2>
                <p className="text-sm leading-7 text-slate-500 dark:text-slate-400">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950/60">
              <h3 className="mb-4 text-2xl font-semibold">Process Detail</h3>
              <div className="space-y-3">
                {content.careers.steps.map((step) => (
                  <div key={step.title} className="rounded-2xl border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-900">
                    <div className="font-semibold">{step.title}</div>
                    <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{step.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950/60">
              <h3 className="mb-4 text-2xl font-semibold">Support</h3>
              <div className="research-photo h-52 rounded-[24px] border border-slate-200 p-5 text-sm text-white dark:border-slate-700">
                <div className="section-title !text-slate-200">Admissions</div>
                <div className="max-w-56 text-lg font-semibold">讓報名頁面同時清楚、正式，並保留適度的引導感與節奏。</div>
              </div>
              <div className="mt-5 space-y-3">
                {content.careers.support.map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm dark:border-slate-800 dark:bg-slate-900">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
