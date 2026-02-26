import React from 'react';
import { View, Text } from 'react-native';
import { MotiView } from 'moti';
import { Sparkles } from 'lucide-react-native';
import { Mascot } from '@/svg/illustrations';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

export function SplashMascot() {
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <MotiView
      from={{ opacity: 0, translateY: 24, scale: 0.92 }}
      animate={{ opacity: 1, translateY: 0, scale: 1 }}
      transition={{ type: 'spring', damping: 14, stiffness: 100, delay: 1200 }}
      className="my-6 items-center"
    >
      <MotiView
        from={{ translateY: 0 }}
        animate={{ translateY: -8 }}
        transition={{ type: 'timing', duration: 2000, loop: true, repeatReverse: true }}
      >
        <View
          className="relative items-center justify-center overflow-hidden rounded-[20px]"
          style={{
            width: 240,
            height: 210,
            backgroundColor: theme === 'dark' ? c.card : '#EFECFF',
          }}
        >
          <Mascot size={120} />

          <View
            className="absolute top-3 flex-row items-center gap-1.5 rounded-full px-3 py-1.5"
            style={{
              backgroundColor: c.card,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: theme === 'dark' ? 0.3 : 0.06,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <Sparkles size={12} color={c.gradientStart} />
            <Text
              className="font-poppins-bold text-card-foreground"
              style={{ fontSize: 10, letterSpacing: 0.8 }}
            >
              READY TO LEARN
            </Text>
          </View>
        </View>
      </MotiView>
    </MotiView>
  );
}
