import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Platform, StatusBar, Text, TouchableOpacity, View } from 'react-native';

import { FloatingCoin, IslandIcon } from '@/components/ui/illustrations';
import { GradientBackground, StarField, WaveDecoration } from '@/components/ui/screen-background';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants/app';
import { useAppFonts } from '@/hooks/use-app-fonts';

export default function SplashScreen() {
  const [fontsLoaded] = useAppFonts();

  const logoScale = useRef(new Animated.Value(0.3)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const titleSlide = useRef(new Animated.Value(30)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const subtitleSlide = useRef(new Animated.Value(20)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const buttonSlide = useRef(new Animated.Value(40)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, { toValue: 1, friction: 4, tension: 60, useNativeDriver: true }),
        Animated.timing(logoOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(titleSlide, { toValue: 0, duration: 500, useNativeDriver: true }),
        Animated.timing(titleOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(subtitleSlide, { toValue: 0, duration: 400, useNativeDriver: true }),
        Animated.timing(subtitleOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(buttonSlide, { toValue: 0, duration: 400, useNativeDriver: true }),
        Animated.timing(buttonOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  if (!fontsLoaded) return null;

  return (
    <View className="flex-1 overflow-hidden">
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <GradientBackground />
      <StarField count={12} seed={97} />

      {/* Floating coins */}
      <FloatingCoin delay={0} startX={SCREEN_WIDTH * 0.08} startY={SCREEN_HEIGHT * 0.12} size={32} opacity={0.6} />
      <FloatingCoin delay={400} startX={SCREEN_WIDTH * 0.78} startY={SCREEN_HEIGHT * 0.08} size={26} opacity={0.5} />
      <FloatingCoin delay={200} startX={SCREEN_WIDTH * 0.62} startY={SCREEN_HEIGHT * 0.22} size={22} opacity={0.4} />
      <FloatingCoin delay={600} startX={SCREEN_WIDTH * 0.2} startY={SCREEN_HEIGHT * 0.28} size={20} opacity={0.35} />
      <FloatingCoin delay={300} startX={SCREEN_WIDTH * 0.88} startY={SCREEN_HEIGHT * 0.3} size={28} opacity={0.45} />

      <WaveDecoration />

      {/* Content */}
      <View className="flex-1 items-center justify-center px-8 pb-10">
        {/* Logo */}
        <Animated.View
          className="mb-7"
          style={{ opacity: logoOpacity, transform: [{ scale: logoScale }] }}
        >
          <View
            className="h-40 w-40 items-center justify-center rounded-full border-2 border-white/20 bg-white/10"
            style={Platform.select({
              ios: { shadowColor: '#4FC3F7', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.4, shadowRadius: 30 },
              android: { elevation: 12 },
            })}
          >
            <IslandIcon />
          </View>
        </Animated.View>

        {/* Title */}
        <Animated.View style={{ opacity: titleOpacity, transform: [{ translateY: titleSlide }] }}>
          <Text
            className="text-center font-fredoka text-[52px] leading-[56px] tracking-tight text-white"
            style={{ textShadowColor: 'rgba(0,0,0,0.25)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 8 }}
          >
            Money
          </Text>
          <Text
            className="-mt-1 text-center font-fredoka text-[52px] leading-[56px] tracking-tight text-gold"
            style={{ textShadowColor: 'rgba(245,166,35,0.4)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 12 }}
          >
            Islands
          </Text>
        </Animated.View>

        {/* Tagline */}
        <Animated.View style={{ opacity: subtitleOpacity, transform: [{ translateY: subtitleSlide }] }}>
          <Text className="mt-4 text-center font-poppins-regular text-base leading-6 tracking-wide text-white/75">
            Learn to save, spend smart{'\n'}& build your future 🏝️
          </Text>
        </Animated.View>

        {/* CTA */}
        <Animated.View
          className="mt-12 items-center"
          style={{ opacity: buttonOpacity, transform: [{ translateY: buttonSlide }] }}
        >
          <TouchableOpacity
            className="overflow-hidden rounded-[28px]"
            style={Platform.select({
              ios: { shadowColor: '#F5A623', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 16 },
              android: { elevation: 8 },
            })}
            activeOpacity={0.85}
            onPress={() => router.replace('/(auth)/welcome')}
          >
            <LinearGradient
              colors={['#FFD700', '#F5A623']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="flex-row items-center justify-center gap-2.5 px-9 py-4"
            >
              <Text className="font-poppins-bold text-lg tracking-wide text-navy">
                Start Your Adventure
              </Text>
              <Text className="font-poppins-bold text-xl text-navy">→</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text className="mt-4 font-poppins-regular text-xs tracking-wide text-white/40">
            Made for learners aged 11–16
          </Text>
        </Animated.View>
      </View>
    </View>
  );
}