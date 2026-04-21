import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import App from '../src/App'

describe('education brand site', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  it('renders the home page title', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.getByText('文教品牌四頁網站')).toBeInTheDocument()
    expect(screen.getByText('打造更有溫度的學習體驗與教學場域')).toBeInTheDocument()
  })

  it('switches language to English', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getAllByRole('button', { name: 'toggle language' })[0])

    expect(screen.getByText('Four-page education brand website')).toBeInTheDocument()
    expect(screen.getByText('Build a warmer learning experience for every student')).toBeInTheDocument()
  })

  it('toggles dark mode class on the root element', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getAllByRole('button', { name: 'toggle theme' })[0])

    expect(document.documentElement).toHaveClass('dark')
  })

  it('renders the research events page', () => {
    render(
      <MemoryRouter initialEntries={['/events']}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.getByText('活動總覽')).toBeInTheDocument()
    expect(screen.getByText('2026 暑期親子學習節')).toBeInTheDocument()
    expect(screen.getAllByText('SEE MORE').length).toBeGreaterThan(0)
  })
})
