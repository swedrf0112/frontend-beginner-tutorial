'use client'

import { useEffect, useRef, useState } from 'react'

export function RevealSection({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const target = ref.current

    if (!target) {
      return undefined
    }

    if (!('IntersectionObserver' in window)) {
      setVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.18 },
    )

    observer.observe(target)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className={`reveal-block ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </section>
  )
}
