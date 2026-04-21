import { useEffect, useMemo, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { siteContent } from './data/content'
import { HomePage } from './pages/HomePage'
import { LearningQualityPage } from './pages/LearningQualityPage'
import { AdmissionsPage } from './pages/AdmissionsPage'
import { EventsPage } from './pages/EventsPage'

export default function App() {
  const [language, setLanguage] = useState(() => localStorage.getItem('site-language') || 'zh')
  const [theme, setTheme] = useState(() => localStorage.getItem('site-theme') || 'light')

  useEffect(() => {
    localStorage.setItem('site-language', language)
  }, [language])

  useEffect(() => {
    localStorage.setItem('site-theme', theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const content = useMemo(() => siteContent[language], [language])

  return (
    <div className="site-shell">
      <Header
        content={content}
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
      />

      <div className="site-frame pt-6">
        <section
          className="glass-panel page-enter grid gap-5 px-6 py-6 md:grid-cols-[1.2fr_0.8fr] md:px-8"
        >
          <div>
            <div className="section-title">Local Build</div>
            <h1 className="mb-4 text-4xl font-semibold leading-tight md:text-5xl">{content.introTitle}</h1>
            <p className="max-w-3xl text-sm leading-8 text-slate-500 dark:text-slate-400 md:text-base">
              {content.introText}
            </p>
          </div>
          <div className="rounded-[24px] bg-slate-950 px-6 py-6 text-slate-200 dark:bg-slate-900">
            <h2 className="mb-4 text-2xl font-semibold text-white">{content.buildSummaryTitle}</h2>
            <ul className="space-y-3 text-sm leading-7">
              {content.buildSummaryItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <Routes>
        <Route path="/" element={<HomePage content={content} />} />
        <Route path="/quality" element={<LearningQualityPage content={content} />} />
        <Route path="/admissions" element={<AdmissionsPage content={content} />} />
        <Route path="/events" element={<EventsPage content={content} />} />
      </Routes>

      <Footer />
    </div>
  )
}
