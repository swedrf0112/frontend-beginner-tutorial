'use client'

import { usePathname } from 'next/navigation'
import { Footer } from './footer'
import { Header } from './header'

export function SiteChrome({ children }) {
  const pathname = usePathname()

  return (
    <div className="site-shell">
      <Header />
      <main key={pathname} className="page-transition shell-main">
        {children}
      </main>
      <Footer />
    </div>
  )
}
