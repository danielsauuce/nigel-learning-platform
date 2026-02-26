import React from 'react';
import { Text, TouchableOpacity, View, Platform } from 'react-native';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';
import { PaginationDots } from './PaginationDots';

interface WelcomeFooterProps {
  totalSlides: number;
  activeIndex: number;
  isLastSlide: boolean;
  onNext: () => void;
  onSkip: () => void;
}

export function WelcomeFooter({
  totalSlides,
  activeIndex,
  isLastSlide,
  onNext,
  onSkip,
}: WelcomeFooterProps) {
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 500, delay: 600 }}
      style={{ alignItems: 'center', gap: 24 }}
    >
      {/* Pagination dots */}
      <PaginationDots total={totalSlides} activeIndex={activeIndex} />

      {/* Primary CTA */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onNext}
        style={{
          borderRadius: 28,
          overflow: 'hidden',
          width: '100%',
          ...Platform.select({
            ios: {
              shadowColor: isLastSlide ? '#F5A623' : c.gradientStart,
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.35,
              shadowRadius: 14,
            },
            android: { elevation: 8 },
          }),
        }}
      >
        <LinearGradient
          colors={isLastSlide ? ['#FFD700', '#F5A623'] : [c.gradientStart, c.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 16,
            paddingHorizontal: 32,
            gap: 10,
          }}
        >
          <Text
            style={{
              fontFamily: 'Poppins_700Bold',
              fontSize: 17,
              color: isLastSlide ? '#1A1B4B' : '#FFFFFF',
              letterSpacing: 0.3,
            }}
          >
            {isLastSlide ? "Let's Go!" : 'Next'}
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins_700Bold',
              fontSize: 19,
              color: isLastSlide ? '#1A1B4B' : '#FFFFFF',
            }}
          >
            →
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Skip link */}
      {!isLastSlide && (
        <TouchableOpacity activeOpacity={0.6} onPress={onSkip} style={{ paddingVertical: 4 }}>
          <Text
            style={{
              fontFamily: 'Poppins_500Medium',
              fontSize: 14,
              color: c.mutedForeground,
              letterSpacing: 0.3,
            }}
          >
            Skip for now
          </Text>
        </TouchableOpacity>
      )}
    </MotiView>
  );
}
