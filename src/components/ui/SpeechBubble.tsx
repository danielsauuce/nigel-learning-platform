import React from 'react';
import { Text, View, type ViewStyle } from 'react-native';
import { MotiView } from 'moti';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

interface SpeechBubbleProps {
  text: string;
  delay?: number;
  style?: ViewStyle;
}

export function SpeechBubble({ text, delay = 400, style }: SpeechBubbleProps) {
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <MotiView
      from={{ opacity: 0, translateY: 8, scale: 0.85 }}
      animate={{ opacity: 1, translateY: 0, scale: 1 }}
      transition={{ type: 'spring', damping: 14, stiffness: 140, delay }}
      style={[{ alignItems: 'center' }, style]}
    >
      <View
        style={{
          backgroundColor: c.gradientStart,
          paddingHorizontal: 16,
          paddingVertical: 7,
          borderRadius: 16,
          borderBottomLeftRadius: 4,
        }}
      >
        <Text
          style={{
            fontFamily: 'Poppins_600SemiBold',
            fontSize: 13,
            color: '#FFFFFF',
            letterSpacing: 0.2,
          }}
        >
          {text}
        </Text>
      </View>
    </MotiView>
  );
}
