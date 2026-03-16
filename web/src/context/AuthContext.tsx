/**
 * AuthContext — Web port of mobile/src/context/AuthContext.tsx
 */

import React, { createContext, useContext, useState, useCallback } from 'react'
import type { RoleType } from '../types'

interface AuthContextValue {
  role: RoleType
  hasCompletedOnboarding: boolean
  hasAcceptedPrivacy: boolean
  setRole: (role: RoleType) => void
  completeOnboarding: () => void
  acceptPrivacy: () => void
  reset: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<RoleType>(null)
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)
  const [hasAcceptedPrivacy, setHasAcceptedPrivacy] = useState(false)

  const completeOnboarding = useCallback(
    () => setHasCompletedOnboarding(true),
    []
  )
  const acceptPrivacy = useCallback(() => setHasAcceptedPrivacy(true), [])
  const reset = useCallback(() => {
    setRole(null)
    setHasCompletedOnboarding(false)
    setHasAcceptedPrivacy(false)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        role,
        hasCompletedOnboarding,
        hasAcceptedPrivacy,
        setRole,
        completeOnboarding,
        acceptPrivacy,
        reset,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
