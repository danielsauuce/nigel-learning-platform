import React, { useCallback, useState } from 'react';
import { View, StatusBar } from 'react-native';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';
import { SplashLogo } from './SplashLogo';
import { SplashTagline } from './SplashTagline';
import { SplashMascot } from './SplashMascot';
import { SplashLoader } from './SplashLoader';

export function SplashScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const c = colors[theme];
  const [fadeOut, setFadeOut] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setFadeOut(true);
    setTimeout(() => {
      router.replace('/(auth)/welcome');
    }, 500);
  }, [router]);

  return (
    <MotiView
      animate={{ opacity: fadeOut ? 0 : 1, scale: fadeOut ? 1.04 : 1 }}
      transition={{ type: 'timing', duration: 500 }}
      className="flex-1"
      style={{ backgroundColor: c.background }}
    >
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      <View
        className="absolute rounded-full"
        style={{
          top: -90,
          right: -70,
          width: 280,
          height: 280,
          backgroundColor: `${c.gradientEnd}12`,
        }}
      />
      <View
        className="absolute rounded-full"
        style={{
          bottom: -60,
          left: -60,
          width: 220,
          height: 220,
          backgroundColor: `${c.gradientEnd}09`,
        }}
      />

      <View
        className="flex-1 items-center justify-center px-6"
        style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      >
        <SplashLogo />
        <SplashTagline />
        <SplashMascot />
        <SplashLoader onLoadComplete={handleLoadComplete} />
      </View>
    </MotiView>
  );
}
