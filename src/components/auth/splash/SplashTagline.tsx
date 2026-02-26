import React from 'react';
import { View, Text } from 'react-native';
import { MotiView } from 'moti';
import { ShieldIcon } from '@/svg/icons';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

export function SplashTagline() {
  const { theme } = useTheme();
  const mutedColor = colors[theme].mutedForeground;

  return (
    <MotiView
      from={{ opacity: 0, translateY: 14 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 500, delay: 800 }}
      className="mb-1 items-center"
    >
      <Text className="text-center font-poppins-bold text-xs tracking-[2.5px] text-foreground">
        SMART FINANCE • BRIGHTER FUTURES
      </Text>
      <View className="mt-1.5 flex-row items-center gap-1">
        <ShieldIcon size={13} color={mutedColor} />
        <Text className="font-poppins-regular text-[11px] text-muted-foreground">
          Secure Educational Ecosystem
        </Text>
      </View>
    </MotiView>
  );
}
