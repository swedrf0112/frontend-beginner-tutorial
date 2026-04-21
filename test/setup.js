import '@testing-library/jest-dom/vitest'

class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.IntersectionObserver = IntersectionObserverMock
