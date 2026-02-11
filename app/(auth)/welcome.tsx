import React, { useRef, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, StatusBar, View } from 'react-native';
import { useRouter } from 'expo-router';

import { ScreenBackground } from '@/components/ui/screen-background';
import { WelcomeHeader } from '@/components/welcome-header';
import { OnboardingCarousel } from '@/components/onboarding-carousel';
import { OnboardingFooter } from '@/components/onboarding-footer';
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

  if (!fontsLoaded) return null;

  const isLastSlide = activeSlide >= ONBOARDING_SLIDES.length - 1;

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setActiveSlide(Math.round(e.nativeEvent.contentOffset.x / CARD_WIDTH));
  };

  const handleNext = () => {
    if (activeSlide < ONBOARDING_SLIDES.length - 1) {
      scrollRef.current?.scrollTo({
        x: (activeSlide + 1) * CARD_WIDTH,
        animated: true,
      });
    } else {
      router.push('/(auth)/RoleSelect');
    }
  };

  const handleSkip = () => {
    router.push('/(auth)/RoleSelect');
  };

  return (
    <View className="flex-1 overflow-hidden">
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ScreenBackground />

      <View className="flex-1" style={{ paddingTop: SAFE_TOP, paddingBottom: SAFE_BOTTOM }}>
        <WelcomeHeader animatedStyle={header.style} />

        <OnboardingCarousel
          activeSlide={activeSlide}
          onScroll={handleScroll}
          scrollRef={scrollRef}
          animatedStyle={carousel.style}
        />

        <OnboardingFooter
          isLastSlide={isLastSlide}
          onNext={handleNext}
          onSkip={handleSkip}
          animatedStyle={footer.style}
        />
      </View>
    </View>
  );
}
