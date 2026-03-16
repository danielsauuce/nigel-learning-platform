import React from 'react';
import { Text, TouchableOpacity, type ViewStyle } from 'react-native';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

interface TextButtonProps {
  label: string;
  onPress: () => void;
  color?: string;
  style?: ViewStyle;
}

export function TextButton({ label, onPress, color, style }: TextButtonProps) {
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress} style={[{ paddingVertical: 4 }, style]}>
      <Text
        style={{
          fontFamily: 'Poppins_500Medium',
          fontSize: 14,
          color: color ?? c.mutedForeground,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
