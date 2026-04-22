'use client'

import { useSite } from './site-provider'

export function Footer() {
  const { content } = useSite()

  return (
    <footer className="mt-10 border-t border-slate-200/80 bg-slate-950 text-slate-300 dark:border-slate-800">
      <div className="site-frame flex flex-col gap-2 py-8 text-sm md:flex-row md:items-center md:justify-between">
        <span className="font-semibold tracking-wide">{content.footerBrand}</span>
        <span>{content.footerLinks}</span>
      </div>
    </footer>
  )
}
