import React from 'react';
import { Platform, Text, TouchableOpacity, View, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

type ButtonVariant = 'gold' | 'purple' | 'outline' | 'ghost';
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

// Size presets
const SIZE_MAP: Record<ButtonSize, { py: number; px: number; fontSize: number; radius: number }> = {
  sm: { py: 10, px: 20, fontSize: 14, radius: 20 },
  md: { py: 14, px: 28, fontSize: 16, radius: 26 },
  lg: { py: 16, px: 32, fontSize: 17, radius: 28 },
};

export function GradientButton({
  label,
  onPress,
  variant = 'purple',
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

  // Resolve colours per variant
  const resolveColors = (): {
    gradientColors: [string, string];
    textColor: string;
    shadowColor: string;
    borderColor?: string;
  } => {
    if (disabled) {
      return {
        gradientColors: ['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.05)'],
        textColor: 'rgba(255,255,255,0.3)',
        shadowColor: 'transparent',
      };
    }
    switch (variant) {
      case 'gold':
        return {
          gradientColors: ['#FFD700', '#F5A623'],
          textColor: '#1A1B4B',
          shadowColor: '#F5A623',
        };
      case 'purple':
        return {
          gradientColors: [c.gradientStart, c.gradientEnd],
          textColor: '#FFFFFF',
          shadowColor: c.gradientStart,
        };
      case 'outline':
        return {
          gradientColors: ['transparent', 'transparent'],
          textColor: c.gradientStart,
          shadowColor: 'transparent',
          borderColor: c.gradientStart,
        };
      case 'ghost':
        return {
          gradientColors: ['transparent', 'transparent'],
          textColor: c.mutedForeground,
          shadowColor: 'transparent',
        };
    }
  };

  const { gradientColors, textColor, shadowColor, borderColor } = resolveColors();

  return (
    <TouchableOpacity
      activeOpacity={disabled ? 1 : 0.85}
      onPress={disabled ? undefined : onPress}
      style={[
        {
          borderRadius: s.radius,
          overflow: 'hidden',
          ...(fullWidth ? { width: '100%' as any } : {}),
          ...(borderColor ? { borderWidth: 2, borderColor } : {}),
          ...Platform.select({
            ios: {
              shadowColor,
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: disabled ? 0 : 0.3,
              shadowRadius: 14,
            },
            android: { elevation: disabled ? 0 : 6 },
          }),
        },
        style,
      ]}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: s.py,
          paddingHorizontal: s.px,
          gap: 10,
        }}
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
      </LinearGradient>
    </TouchableOpacity>
  );
}
