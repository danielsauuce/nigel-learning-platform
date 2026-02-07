import React, { useRef, useState } from 'react';
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
import { useRouter } from 'expo-router';

import { SlideIllustration } from '@/components/illustrations';
import { DotIndicator } from '@/components/ui/dot-indicator';
import { GlassCard } from '@/components/ui/glass-card';
import { GoldButton } from '@/components/ui/gold-button';
import { ScreenBackground } from '@/components/ui/screen-background';
import { ONBOARDING_SLIDES, SCREEN_WIDTH } from '@/constants/app';
import { useAppFonts } from '@/hooks/use-app-fonts';
import { useStaggeredEntrance } from '@/hooks/use-staggered-entrance';
import { SAFE_BOTTOM, SAFE_TOP } from '@/lib/safe-area';

const CARD_WIDTH = SCREEN_WIDTH - 64;

export default function WelcomeScreen() {
  const router = useRouter();
  const [fontsLoaded] = useAppFonts();
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const [header, carousel, footer] = useStaggeredEntrance([
    { fromY: -20, duration: 500 },
    { fromY: 40, duration: 500 },
    { fromY: 30, duration: 400 },
  ]);

  // ─── Handlers ───────────────────────────────────────────────────

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
        <Animated.View style={{ paddingHorizontal: 32, marginBottom: 8, ...header.style }}>
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
        <Animated.View className="flex-1 justify-center" style={carousel.style}>
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
                <GlassCard
                  style={{
                    paddingVertical: 28,
                    paddingHorizontal: 24,
                    alignItems: 'center',
                  }}
                >
                  {/* Illustration */}
                  <View
                    className="items-center justify-center"
                    style={{ marginBottom: 20, width: 160, height: 140 }}
                  >
                    <SlideIllustration icon={slide.icon} />
                  </View>

                  {/* Slide title */}
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

                  {/* Slide description */}
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
                </GlassCard>
              </View>
            ))}
          </ScrollView>

          {/* Pagination dots */}
          <View style={{ marginTop: 24 }}>
            <DotIndicator
              count={ONBOARDING_SLIDES.length}
              activeIndex={activeSlide}
              colors={ONBOARDING_SLIDES.map((s) => s.accentColor)}
            />
          </View>
        </Animated.View>

        {/* Footer CTA */}
        <Animated.View
          className="items-center"
          style={{ paddingHorizontal: 32, paddingTop: 8, ...footer.style }}
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
