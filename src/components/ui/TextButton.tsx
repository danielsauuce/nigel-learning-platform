import React from 'react';
import { Text, TouchableOpacity, type ViewStyle } from 'react-native';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

interface TextButtonProps {
  label: string;
  onPress: () => void;
  color?: 'muted' | 'primary' | 'destructive';
  size?: 'sm' | 'md';
  style?: ViewStyle;
}

export function TextButton({
  label,
  onPress,
  color = 'muted',
  size = 'md',
  style,
}: TextButtonProps) {
  const { theme } = useTheme();
  const c = colors[theme];

  const textColor =
    color === 'primary'
      ? c.gradientStart
      : color === 'destructive'
        ? c.destructive
        : c.mutedForeground;

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={[{ paddingVertical: 6, paddingHorizontal: 4 }, style]}
    >
      <Text
        style={{
          fontFamily: 'Poppins_500Medium',
          fontSize: size === 'sm' ? 13 : 14,
          color: textColor,
          letterSpacing: 0.3,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
