import React from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';

import { GoldButton } from '@/components/ui/gold-button';

interface OnboardingFooterProps {
  isLastSlide: boolean;
  onNext: () => void;
  onSkip: () => void;
  animatedStyle: Animated.AnimatedProps<any>['style'];
}

export function OnboardingFooter({
  isLastSlide,
  onNext,
  onSkip,
  animatedStyle,
}: OnboardingFooterProps) {
  return (
    <Animated.View
      className="items-center"
      style={{ paddingHorizontal: 32, paddingTop: 8, ...animatedStyle }}
    >
      <GoldButton label={isLastSlide ? 'Get Started' : 'Next'} onPress={onNext} />

      {!isLastSlide && (
        <TouchableOpacity
          style={{ marginTop: 16, paddingVertical: 8, paddingHorizontal: 24 }}
          onPress={onSkip}
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
  );
}
