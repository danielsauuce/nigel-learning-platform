import { useCallback, useState } from 'react';
import { useRouter } from 'expo-router';
import { useTheme } from '@/context';

export function useSettings() {
  const router = useRouter();
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  const [notifications, setNotifications] = useState(true);
  const [consent, setConsent] = useState(false);

  const toggleConsent = useCallback(() => {
    setConsent((prev) => !prev);
  }, []);

  const handleLogout = useCallback(() => {
    router.replace('/(auth)/' as any);
  }, []);

  const handleBack = useCallback(() => {
    router.back();
  }, []);

  return {
    theme,
    isDark,
    toggleTheme: toggle,
    notifications,
    setNotifications,
    consent,
    toggleConsent,
    handleLogout,
    handleBack,
  };
}
