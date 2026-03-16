import React from 'react';
import { View, Text } from 'react-native';
import { MotiView } from 'moti';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

export function SplashTagline() {
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <MotiView
      from={{ opacity: 0, translateY: 14 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 500, delay: 800 }}
      className="mb-1 items-center"
    >
      <Text
        style={{
          fontFamily: 'Fredoka_700Bold',
          fontSize: 24,
          color: c.foreground,
          textAlign: 'center',
          letterSpacing: 0.5,
        }}
      >
        Nigel
      </Text>
      <View className="mt-1.5 flex-row items-center gap-1">
        <Text
          style={{
            fontFamily: 'Poppins_400Regular',
            fontSize: 12,
            color: c.mutedForeground,
          }}
        >
          Smart Finance • Brighter Futures
        </Text>
      </View>
    </MotiView>
  );
}
