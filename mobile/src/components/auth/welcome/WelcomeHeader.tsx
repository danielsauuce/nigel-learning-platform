import React from 'react';
import { Text, View } from 'react-native';
import { MotiView } from 'moti';
import { NigelLogo } from '@/svg/brand';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

export function WelcomeHeader() {
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <MotiView
      from={{ opacity: 0, translateY: -16 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 500, delay: 200 }}
      style={{ alignItems: 'center', gap: 6 }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <NigelLogo size={36} />
        <Text
          style={{
            fontFamily: 'Poppins_600SemiBold',
            fontSize: 22,
            color: c.foreground,
            letterSpacing: 0.5,
          }}
        >
          Nigel
        </Text>
      </View>
    </MotiView>
  );
}
