import React from 'react';
import { View, Text } from 'react-native';
import { MotiView } from 'moti';
import { SCREEN_WIDTH, type SlideIcon } from '@/constants/app';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';
import { IslandIcon, PiggyIcon, TrophyIcon } from '@/svg/illustrations';

interface WelcomeSlideProps {
  icon: SlideIcon;
  title: string;
  subtitle: string;
  accentColor: string;
  isActive: boolean;
}

function SlideIllustration({ icon, size }: { icon: SlideIcon; size: number }) {
  switch (icon) {
    case 'island':
      return <IslandIcon size={size} />;
    case 'piggy':
      return <PiggyIcon size={size} />;
    case 'trophy':
      return <TrophyIcon size={size} />;
  }
}

export function WelcomeSlide({ icon, title, subtitle, accentColor, isActive }: WelcomeSlideProps) {
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <View style={{ width: SCREEN_WIDTH, alignItems: 'center', paddingHorizontal: 32 }}>
      {/* Illustration container */}
      <MotiView
        animate={{
          scale: isActive ? 1 : 0.85,
          opacity: isActive ? 1 : 0.5,
        }}
        transition={{ type: 'spring', damping: 16, stiffness: 140 }}
        style={{
          width: 200,
          height: 200,
          borderRadius: 100,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme === 'dark' ? `${accentColor}18` : `${accentColor}15`,
          marginBottom: 32,
        }}
      >
        {/* Inner glow ring */}
        <View
          style={{
            width: 170,
            height: 170,
            borderRadius: 85,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme === 'dark' ? `${accentColor}12` : `${accentColor}10`,
            borderWidth: 1.5,
            borderColor: `${accentColor}25`,
          }}
        >
          <SlideIllustration icon={icon} size={130} />
        </View>
      </MotiView>

      {/* Title */}
      <MotiView
        animate={{
          translateY: isActive ? 0 : 10,
          opacity: isActive ? 1 : 0.4,
        }}
        transition={{ type: 'timing', duration: 350 }}
      >
        <Text
          style={{
            fontFamily: 'Fredoka_700Bold',
            fontSize: 28,
            lineHeight: 36,
            color: c.foreground,
            textAlign: 'center',
            letterSpacing: 0.3,
            marginBottom: 14,
          }}
        >
          {title}
        </Text>
      </MotiView>

      {/* Subtitle */}
      <MotiView
        animate={{
          translateY: isActive ? 0 : 8,
          opacity: isActive ? 1 : 0.3,
        }}
        transition={{ type: 'timing', duration: 400, delay: 50 }}
      >
        <Text
          style={{
            fontFamily: 'Poppins_400Regular',
            fontSize: 15,
            lineHeight: 23,
            color: c.mutedForeground,
            textAlign: 'center',
            paddingHorizontal: 8,
          }}
        >
          {subtitle}
        </Text>
      </MotiView>
    </View>
  );
}
