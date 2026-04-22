import './globals.css'
import { SiteProvider } from '../src/components/site-provider'
import { SiteChrome } from '../src/components/site-chrome'

export const metadata = {
  title: 'Asteron Education Studio',
  description: 'A beginner-friendly Next.js education brand tutorial project.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant" suppressHydrationWarning>
      <body>
        <SiteProvider>
          <SiteChrome>{children}</SiteChrome>
        </SiteProvider>
      </body>
    </html>
  )
}
