import React, { createContext, useCallback, useContext, useState } from 'react';

type Role = 'student' | 'teacher' | null;

interface AuthContextValue {
  role: Role;
  hasCompletedOnboarding: boolean;
  hasAcceptedPrivacy: boolean;
  setRole: (role: Role) => void;
  completeOnboarding: () => void;
  acceptPrivacy: () => void;
  reset: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [hasAcceptedPrivacy, setHasAcceptedPrivacy] = useState(false);

  const completeOnboarding = useCallback(() => setHasCompletedOnboarding(true), []);
  const acceptPrivacy = useCallback(() => setHasAcceptedPrivacy(true), []);
  const reset = useCallback(() => {
    setRole(null);
    setHasCompletedOnboarding(false);
    setHasAcceptedPrivacy(false);
  }, []);

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
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
