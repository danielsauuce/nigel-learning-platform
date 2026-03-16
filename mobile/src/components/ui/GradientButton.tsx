import React from 'react';
import { Platform, Text, TouchableOpacity, View, type ViewStyle } from 'react-native';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

type ButtonVariant = 'primary' | 'purple' | 'navy' | 'outline' | 'ghost' | 'peach';
type ButtonSize = 'sm' | 'md' | 'lg';

interface GradientButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
  showArrow?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
}

const SIZE_MAP: Record<ButtonSize, { py: number; px: number; fontSize: number; radius: number }> = {
  sm: { py: 10, px: 20, fontSize: 14, radius: 22 },
  md: { py: 14, px: 28, fontSize: 16, radius: 26 },
  lg: { py: 16, px: 32, fontSize: 17, radius: 30 },
};

export function GradientButton({
  label,
  onPress,
  variant = 'primary',
  size = 'lg',
  disabled = false,
  fullWidth = true,
  showArrow = false,
  icon,
  style,
}: GradientButtonProps) {
  const { theme } = useTheme();
  const c = colors[theme];
  const s = SIZE_MAP[size];

  const resolveColors = (): {
    bgColor: string;
    textColor: string;
    shadowColor: string;
    borderColor?: string;
  } => {
    if (disabled) {
      return {
        bgColor: theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#E8E4F0',
        textColor: theme === 'dark' ? 'rgba(255,255,255,0.3)' : '#A0A0B8',
        shadowColor: 'transparent',
      };
    }
    switch (variant) {
      case 'primary':
      case 'purple':
        return {
          bgColor: '#B9A7F8',
          textColor: '#FFFFFF',
          shadowColor: '#B9A7F8',
        };
      case 'navy':
        return {
          bgColor: '#22223B',
          textColor: '#FFFFFF',
          shadowColor: '#22223B',
        };
      case 'peach':
        return {
          bgColor: '#F9D6D0',
          textColor: '#22223B',
          shadowColor: '#F9D6D0',
        };
      case 'outline':
        return {
          bgColor: 'transparent',
          textColor: c.primary,
          shadowColor: 'transparent',
          borderColor: c.primary,
        };
      case 'ghost':
        return {
          bgColor: 'transparent',
          textColor: c.mutedForeground,
          shadowColor: 'transparent',
        };
      default:
        return {
          bgColor: '#B9A7F8',
          textColor: '#FFFFFF',
          shadowColor: '#B9A7F8',
        };
    }
  };

  const { bgColor, textColor, shadowColor, borderColor } = resolveColors();

  return (
    <TouchableOpacity
      activeOpacity={disabled ? 1 : 0.85}
      onPress={disabled ? undefined : onPress}
      style={[
        {
          borderRadius: s.radius,
          backgroundColor: bgColor,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: s.py,
          paddingHorizontal: s.px,
          gap: 10,
          ...(fullWidth ? { width: '100%' as any } : {}),
          ...(borderColor ? { borderWidth: 2, borderColor } : {}),
          ...Platform.select({
            ios: {
              shadowColor,
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: disabled ? 0 : 0.25,
              shadowRadius: 14,
            },
            android: { elevation: disabled ? 0 : 6 },
          }),
        },
        style,
      ]}
    >
      {icon && <View>{icon}</View>}
      <Text
        style={{
          fontFamily: 'Poppins_700Bold',
          fontSize: s.fontSize,
          color: textColor,
          letterSpacing: 0.3,
        }}
      >
        {label}
      </Text>
      {showArrow && (
        <Text
          style={{
            fontFamily: 'Poppins_700Bold',
            fontSize: s.fontSize + 2,
            color: textColor,
          }}
        >
          →
        </Text>
      )}
    </TouchableOpacity>
  );
}
