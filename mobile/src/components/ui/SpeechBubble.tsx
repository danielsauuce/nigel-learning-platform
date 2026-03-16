import React from 'react';
import { Platform, Text, View } from 'react-native';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

interface SpeechBubbleProps {
  text: string;
}

export function SpeechBubble({ text }: SpeechBubbleProps) {
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <View
      style={{
        backgroundColor: c.card,
        borderRadius: 18,
        paddingHorizontal: 18,
        paddingVertical: 12,
        ...Platform.select({
          ios: {
            shadowColor: '#B9A7F8',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.08,
            shadowRadius: 10,
          },
          android: { elevation: 3 },
        }),
      }}
    >
      <Text
        style={{
          fontFamily: 'Poppins_500Medium',
          fontSize: 14,
          color: c.foreground,
          textAlign: 'center',
        }}
      >
        {text}
      </Text>
      {/* Tail */}
      <View
        style={{
          position: 'absolute',
          bottom: -8,
          left: '50%',
          marginLeft: -8,
          width: 16,
          height: 16,
          backgroundColor: c.card,
          transform: [{ rotate: '45deg' }],
          borderRadius: 3,
        }}
      />
    </View>
  );
}
