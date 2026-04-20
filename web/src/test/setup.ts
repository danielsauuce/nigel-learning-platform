import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import React from 'react'
import { afterEach, vi } from 'vitest'
import { navigateMock } from './routerMock'

vi.mock('motion/react', () => {
  const stripMotionProps = ({
    animate,
    exit,
    initial,
    layout,
    layoutId,
    transition,
    viewport,
    whileHover,
    whileInView,
    whileTap,
    ...rest
  }: Record<string, unknown>) => rest

  const motion = new Proxy(
    {},
    {
      get: (_target, tag: string) =>
        React.forwardRef<HTMLElement, Record<string, unknown>>(
          ({ children, ...props }, ref) =>
            React.createElement(
              tag,
              { ...stripMotionProps(props), ref },
              children
            )
        ),
    }
  )

  return { motion }
})

vi.mock('react-router-dom', () => ({
  Link: ({
    children,
    to,
    ...props
  }: {
    children: React.ReactNode
    to: string
  }) =>
    React.createElement('a', {
      ...props,
      href: to,
      children,
    }),
  useNavigate: () => navigateMock,
}))

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

afterEach(() => {
  cleanup()
  navigateMock.mockReset()
  localStorage.clear()
  document.documentElement.className = ''
})
