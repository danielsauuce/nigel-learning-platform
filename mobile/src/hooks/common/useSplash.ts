import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

// Prevent auto-hiding the splash screen
SplashScreen.preventAutoHideAsync();

export function useSplash() {
  const [isReady, setIsReady] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function prepare() {
      try {
        // TODO: Load any necessary resources here
        // - Load fonts
        // - Load cached user data
        // - Check authentication status
        // - Initialize services

        // Simulate initialization
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setIsReady(true);
      } catch (e) {
        console.warn('Error during splash preparation:', e);
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (isReady && animationComplete) {
      // Hide the native splash screen
      SplashScreen.hideAsync();

      // Navigate to welcome screen after a brief delay
      setTimeout(() => {
        //router.replace('/(auth)/welcome');
      }, 300);
    }
  }, [isReady, animationComplete, router]);

  const handleAnimationComplete = () => {
    setAnimationComplete(true);
  };

  return {
    isReady,
    handleAnimationComplete,
  };
}
