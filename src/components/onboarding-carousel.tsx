import React from 'react';
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
  Text,
} from 'react-native';

import { SlideIllustration } from '@/components/illustrations';
import { DotIndicator } from '@/components/ui/dot-indicator';
import { GlassCard } from '@/components/ui/glass-card';
import { ONBOARDING_SLIDES, SCREEN_WIDTH } from '@/constants/app';

const CARD_WIDTH = SCREEN_WIDTH - 64;

interface OnboardingCarouselProps {
  activeSlide: number;
  onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
  scrollRef: React.RefObject<ScrollView>;
  animatedStyle: Animated.AnimatedProps<any>['style'];
}

export function OnboardingCarousel({
  activeSlide,
  onScroll,
  scrollRef,
  animatedStyle,
}: OnboardingCarouselProps) {
  return (
    <Animated.View className="flex-1 justify-center" style={animatedStyle}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScroll}
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

              {/* Title */}
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

              {/* Description */}
              <Text
                className="text-center font-poppins-regular text-[16px] leading-[21px]"
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

      {/* Dots */}
      <View style={{ marginTop: 24 }}>
        <DotIndicator
          count={ONBOARDING_SLIDES.length}
          activeIndex={activeSlide}
          colors={ONBOARDING_SLIDES.map((s) => s.accentColor)}
        />
      </View>
    </Animated.View>
  );
}
