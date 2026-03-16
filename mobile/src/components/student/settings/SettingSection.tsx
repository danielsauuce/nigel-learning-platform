import React from 'react';
import { Text, View } from 'react-native';
import { MotiView } from 'moti';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

interface SettingSectionProps {
  title: string;
  delay?: number;
  children: React.ReactNode;
}

export function SettingSection({ title, delay = 0, children }: SettingSectionProps) {
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <MotiView
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 100 + delay }}
      style={{ paddingHorizontal: 24, marginBottom: 20 }}
    >
      {title ? (
        <Text
          style={{
            fontFamily: 'Poppins_600SemiBold',
            fontSize: 13,
            color: c.mutedForeground,
            textTransform: 'uppercase',
            letterSpacing: 0.8,
            marginBottom: 10,
          }}
        >
          {title}
        </Text>
      ) : null}
      <View
        style={{
          backgroundColor: c.card,
          borderRadius: 18,
          overflow: 'hidden',
        }}
      >
        {children}
      </View>
    </MotiView>
  );
}
