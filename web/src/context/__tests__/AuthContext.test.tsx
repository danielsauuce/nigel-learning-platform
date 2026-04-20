import type { ReactNode } from 'react'
import { renderHook, act } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AuthProvider, useAuth } from '../AuthContext'

function wrapper({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}

describe('AuthContext', () => {
  it('provides the expected initial auth state', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    expect(result.current.role).toBeNull()
    expect(result.current.hasCompletedOnboarding).toBe(false)
    expect(result.current.hasAcceptedPrivacy).toBe(false)
  })

  it('updates role and completion flags through the exposed actions', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    act(() => {
      result.current.setRole('student')
      result.current.completeOnboarding()
      result.current.acceptPrivacy()
    })

    expect(result.current.role).toBe('student')
    expect(result.current.hasCompletedOnboarding).toBe(true)
    expect(result.current.hasAcceptedPrivacy).toBe(true)
  })

  it('resets auth state back to the defaults', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    act(() => {
      result.current.setRole('teacher')
      result.current.completeOnboarding()
      result.current.acceptPrivacy()
    })

    act(() => {
      result.current.reset()
    })

    expect(result.current.role).toBeNull()
    expect(result.current.hasCompletedOnboarding).toBe(false)
    expect(result.current.hasAcceptedPrivacy).toBe(false)
  })

  it('throws when useAuth is used outside the provider', () => {
    expect(() => renderHook(() => useAuth())).toThrow(
      'useAuth must be used within AuthProvider'
    )
  })
})
