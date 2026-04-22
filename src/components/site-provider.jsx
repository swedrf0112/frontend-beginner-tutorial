'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { siteContent } from '../lib/site-content'

const SiteContext = createContext(null)

export function SiteProvider({ children }) {
  const [language, setLanguage] = useState('zh')
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem('site-language')
    const storedTheme = window.localStorage.getItem('site-theme')

    if (storedLanguage === 'en') {
      setLanguage('en')
    }

    if (storedTheme === 'dark') {
      setTheme('dark')
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('site-language', language)
  }, [language])

  useEffect(() => {
    window.localStorage.setItem('site-theme', theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      theme,
      setTheme,
      content: siteContent[language],
    }),
    [language, theme],
  )

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
}

export function useSite() {
  const context = useContext(SiteContext)

  if (!context) {
    throw new Error('useSite must be used inside SiteProvider')
  }

  return context
}
