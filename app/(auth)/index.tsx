import React from 'react';
import { Animated, Platform, StatusBar, Text, View } from 'react-native';
import { router } from 'expo-router';

import { FloatingCoin, IslandIcon } from '@/components/illustrations';
import { GoldButton } from '@/components/ui/gold-button';
import { GradientBackground, StarField, WaveDecoration } from '@/components/ui/screen-background';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants/app';
import { useAppFonts } from '@/hooks/use-app-fonts';
import { useStaggeredEntrance } from '@/hooks/use-staggered-entrance';
import { SAFE_BOTTOM, SAFE_TOP } from '@/lib/safe-area';

// ─── Floating coin positions ────────────────────────────────────────

const COIN_POSITIONS = [
  { delay: 0, startX: SCREEN_WIDTH * 0.08, startY: SCREEN_HEIGHT * 0.12, size: 32, opacity: 0.6 },
  { delay: 400, startX: SCREEN_WIDTH * 0.78, startY: SCREEN_HEIGHT * 0.08, size: 26, opacity: 0.5 },
  { delay: 200, startX: SCREEN_WIDTH * 0.62, startY: SCREEN_HEIGHT * 0.22, size: 22, opacity: 0.4 },
  { delay: 600, startX: SCREEN_WIDTH * 0.2, startY: SCREEN_HEIGHT * 0.28, size: 20, opacity: 0.35 },
  { delay: 300, startX: SCREEN_WIDTH * 0.88, startY: SCREEN_HEIGHT * 0.3, size: 28, opacity: 0.45 },
] as const;

// ─── Screen ─────────────────────────────────────────────────────────

export default function SplashScreen() {
  const [fontsLoaded] = useAppFonts();

  const [logo, title, subtitle, cta] = useStaggeredEntrance([
    { fromScale: 0.3, spring: true, friction: 4, tension: 60, duration: 600 },
    { fromY: 30, duration: 500 },
    { fromY: 20, duration: 400 },
    { fromY: 40, duration: 400 },
  ]);

  if (!fontsLoaded) return null;

  return (
    <View className="flex-1 overflow-hidden">
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Background layers */}
      <GradientBackground />
      <StarField count={12} seed={97} />
      {COIN_POSITIONS.map((coin) => (
        <FloatingCoin key={coin.delay} {...coin} />
      ))}
      <WaveDecoration />

      {/* Content */}
      <View
        className="flex-1 items-center justify-center px-8"
        style={{ paddingTop: SAFE_TOP, paddingBottom: SAFE_BOTTOM }}
      >
        {/* Logo */}
        <Animated.View className="mb-7" style={logo.style}>
          <View
            className="h-40 w-40 items-center justify-center rounded-full"
            style={{
              backgroundColor: 'rgba(255,255,255,0.12)',
              borderWidth: 2,
              borderColor: 'rgba(255,255,255,0.2)',
              ...Platform.select({
                ios: {
                  shadowColor: '#4FC3F7',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.4,
                  shadowRadius: 30,
                },
                android: { elevation: 12 },
              }),
            }}
          >
            <IslandIcon />
          </View>
        </Animated.View>

        {/* Title */}
        <Animated.View style={title.style}>
          <Text
            className="text-center font-fredoka text-[52px] leading-[56px] text-white"
            style={{
              letterSpacing: -1,
              textShadowColor: 'rgba(0,0,0,0.25)',
              textShadowOffset: { width: 0, height: 2 },
              textShadowRadius: 8,
            }}
          >
            Money
          </Text>
          <Text
            className="text-center font-fredoka text-[52px] leading-[56px]"
            style={{
              color: '#FFD700',
              letterSpacing: -1,
              marginTop: -4,
              textShadowColor: 'rgba(245,166,35,0.4)',
              textShadowOffset: { width: 0, height: 2 },
              textShadowRadius: 12,
            }}
          >
            Islands
          </Text>
        </Animated.View>

        {/* Tagline */}
        <Animated.View style={subtitle.style}>
          <Text
            className="text-center font-poppins-regular text-base leading-6"
            style={{ color: 'rgba(255,255,255,0.75)', marginTop: 16, letterSpacing: 0.3 }}
          >
            Learn to save, spend smart{'\n'}& build your future 🏝️
          </Text>
        </Animated.View>

        {/* CTA */}
        <Animated.View className="w-full items-center" style={{ marginTop: 48, ...cta.style }}>
          <GoldButton
            label="Start Your Adventure"
            onPress={() => router.replace('/(auth)/welcome')}
          />

          <Text
            className="font-poppins-regular text-xs"
            style={{ color: 'rgba(255,255,255,0.4)', marginTop: 16, letterSpacing: 0.5 }}
          >
            Made for learners aged 11–16
          </Text>
        </Animated.View>
      </View>
    </View>
  );
}
