import { ReactNode } from 'react';

export interface SplashScreenProps {
  title: string;
  subtitle?: string;
  initialIcon?: ReactNode;
  finalIcon?: ReactNode;
  nextRoute?: string;
  onComplete?: () => void;
  capDelay?: number;
  totalDuration?: number;
  showLoader?: boolean;
  versionLabel?: string;
  showAccessibility?: boolean;
  onAccessibilityPress?: () => void;
}
