import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { SlideIllustration } from '@/components/illustrations';
import { GoldButton } from '@/components/ui/gold-button';
import { ScreenBackground } from '@/components/ui/screen-background';
import { ONBOARDING_SLIDES, SCREEN_WIDTH } from '@/constants/app';
import { useAppFonts } from '@/hooks/use-app-fonts';
import { SAFE_BOTTOM, SAFE_TOP } from '@/lib/safe-area';

const CARD_WIDTH = SCREEN_WIDTH - 64;

export default function WelcomeScreen() {
  const router = useRouter();
  const [fontsLoaded] = useAppFonts();
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  // Entrance animations
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-20)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const cardSlide = useRef(new Animated.Value(40)).current;
  const footerOpacity = useRef(new Animated.Value(0)).current;
  const footerSlide = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(headerOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(headerSlide, { toValue: 0, duration: 500, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(cardOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(cardSlide, { toValue: 0, duration: 500, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(footerOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(footerSlide, { toValue: 0, duration: 400, useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setActiveSlide(Math.round(e.nativeEvent.contentOffset.x / CARD_WIDTH));
  };

  const handleGetStarted = () => router.push('/(auth)/RoleSelect');

  const handleNext = () => {
    if (activeSlide < ONBOARDING_SLIDES.length - 1) {
      scrollRef.current?.scrollTo({
        x: (activeSlide + 1) * CARD_WIDTH,
        animated: true,
      });
    } else {
      handleGetStarted();
    }
  };

  if (!fontsLoaded) return null;

  const isLastSlide = activeSlide >= ONBOARDING_SLIDES.length - 1;

  return (
    <View className="flex-1 overflow-hidden">
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ScreenBackground />

      <View className="flex-1" style={{ paddingTop: SAFE_TOP, paddingBottom: SAFE_BOTTOM }}>
        {/* Header */}
        <Animated.View
          style={{
            paddingHorizontal: 32,
            marginBottom: 8,
            opacity: headerOpacity,
            transform: [{ translateY: headerSlide }],
          }}
        >
          <Text
            className="font-poppins-medium text-base"
            style={{ color: 'rgba(255,255,255,0.6)', letterSpacing: 0.5 }}
          >
            Welcome to
          </Text>
          <View className="flex-row items-baseline" style={{ marginTop: 2 }}>
            <Text
              className="font-fredoka text-4xl leading-[42px] text-white"
              style={{
                textShadowColor: 'rgba(0,0,0,0.2)',
                textShadowOffset: { width: 0, height: 2 },
                textShadowRadius: 6,
              }}
            >
              Money{' '}
            </Text>
            <Text
              className="font-fredoka text-4xl leading-[42px]"
              style={{
                color: '#FFD700',
                textShadowColor: 'rgba(245,166,35,0.35)',
                textShadowOffset: { width: 0, height: 2 },
                textShadowRadius: 10,
              }}
            >
              Islands
            </Text>
          </View>
          <Text
            className="font-poppins-regular text-sm"
            style={{ color: 'rgba(255,255,255,0.55)', marginTop: 6, letterSpacing: 0.2 }}
          >
            Your adventure in financial literacy starts here
          </Text>
        </Animated.View>

        {/* Carousel */}
        <Animated.View
          className="flex-1 justify-center"
          style={{ opacity: cardOpacity, transform: [{ translateY: cardSlide }] }}
        >
          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleScroll}
            snapToInterval={CARD_WIDTH}
            decelerationRate="fast"
            contentContainerStyle={{ paddingHorizontal: 32 }}
          >
            {ONBOARDING_SLIDES.map((slide, index) => (
              <View key={index} style={{ width: CARD_WIDTH, paddingHorizontal: 4 }}>
                <LinearGradient
                  colors={['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.05)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={{
                    borderRadius: 24,
                    borderWidth: 1,
                    borderColor: 'rgba(255,255,255,0.12)',
                    paddingVertical: 28,
                    paddingHorizontal: 24,
                    alignItems: 'center',
                  }}
                >
                  <View
                    className="items-center justify-center"
                    style={{ marginBottom: 20, width: 160, height: 140 }}
                  >
                    <SlideIllustration icon={slide.icon} />
                  </View>
                  <Text
                    className="text-center font-fredoka text-[26px] leading-8 text-white"
                    style={{
                      letterSpacing: -0.5,
                      textShadowColor: 'rgba(0,0,0,0.15)',
                      textShadowOffset: { width: 0, height: 1 },
                      textShadowRadius: 4,
                    }}
                  >
                    {slide.title}
                  </Text>
                  <Text
                    className="text-center font-poppins-regular text-sm leading-[21px]"
                    style={{
                      color: 'rgba(255,255,255,0.7)',
                      marginTop: 12,
                      letterSpacing: 0.2,
                      paddingHorizontal: 8,
                    }}
                  >
                    {slide.subtitle}
                  </Text>
                </LinearGradient>
              </View>
            ))}
          </ScrollView>

          {/* Dot indicators */}
          <View className="flex-row items-center justify-center" style={{ marginTop: 24, gap: 8 }}>
            {ONBOARDING_SLIDES.map((slide, index) => (
              <View
                key={index}
                style={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor:
                    index === activeSlide ? slide.accentColor : 'rgba(255,255,255,0.25)',
                  width: index === activeSlide ? 24 : 8,
                }}
              />
            ))}
          </View>
        </Animated.View>

        {/* Footer CTA */}
        <Animated.View
          className="items-center"
          style={{
            paddingHorizontal: 32,
            paddingTop: 8,
            opacity: footerOpacity,
            transform: [{ translateY: footerSlide }],
          }}
        >
          <GoldButton label={isLastSlide ? 'Get Started' : 'Next'} onPress={handleNext} />
          {!isLastSlide && (
            <TouchableOpacity
              style={{ marginTop: 16, paddingVertical: 8, paddingHorizontal: 24 }}
              onPress={handleGetStarted}
            >
              <Text
                className="font-poppins-medium text-sm"
                style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: 0.3 }}
              >
                Skip
              </Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      </View>
    </View>
  );
}
