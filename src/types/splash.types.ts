/**
 * Splash Screen Types
 */

export interface SplashState {
  isReady: boolean;
  animationComplete: boolean;
}

export interface SplashHookReturn {
  isReady: boolean;
  handleAnimationComplete: () => void;
}

export interface InitializationTask {
  name: string;
  execute: () => Promise<void>;
}
