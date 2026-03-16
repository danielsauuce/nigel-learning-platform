import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import { MotiView } from 'moti';
import { Mascot, MascotWaving, MascotThinking } from '@/svg/illustrations';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

const { width: SCREEN_W } = Dimensions.get('window');

interface WelcomeSlideProps {
  icon: string;
  title: string;
  subtitle: string;
  accentColor?: string;
  isActive?: boolean;
}

function SlideIllustration({ icon, size }: { icon: string; size: number }) {
  switch (icon) {
    case 'island':
      return <MascotWaving size={size} />;
    case 'piggy':
      return <MascotThinking size={size} />;
    case 'trophy':
    default:
      return <Mascot size={size} />;
  }
}

export function WelcomeSlide({ icon, title, subtitle, accentColor, isActive }: WelcomeSlideProps) {
  const { theme } = useTheme();
  const c = colors[theme];
  const accent = accentColor || c.primary;

  return (
    <View
      style={{
        width: SCREEN_W,
        paddingHorizontal: 32,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: 180,
          height: 180,
          borderRadius: 90,
          backgroundColor: accent + '20',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 24,
        }}
      >
        <MotiView
          from={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 12, stiffness: 100, delay: 200 }}
        >
          <SlideIllustration icon={icon} size={110} />
        </MotiView>
      </View>

      <MotiView
        from={{ opacity: 0, translateY: 12 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 350 }}
        style={{ alignItems: 'center' }}
      >
        <Text
          style={{
            fontFamily: 'Fredoka_700Bold',
            fontSize: 26,
            color: c.foreground,
            textAlign: 'center',
            lineHeight: 34,
            marginBottom: 10,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins_400Regular',
            fontSize: 14,
            color: c.mutedForeground,
            textAlign: 'center',
            lineHeight: 22,
            paddingHorizontal: 16,
          }}
        >
          {subtitle}
        </Text>
      </MotiView>
    </View>
  );
}
