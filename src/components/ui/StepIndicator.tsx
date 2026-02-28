import React from 'react';
import { Text, View, type ViewStyle } from 'react-native';
import { MotiView } from 'moti';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

interface StepIndicatorProps {
  totalSteps: number;
  currentStep: number;
  badge?: string;
  style?: ViewStyle;
}

export function StepIndicator({ totalSteps, currentStep, badge, style }: StepIndicatorProps) {
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }, style]}>
      {/* Dots */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          flex: 1,
          justifyContent: 'center',
        }}
      >
        {Array.from({ length: totalSteps }).map((_, i) => (
          <MotiView
            key={i}
            animate={{
              width: i === currentStep ? 24 : 8,
              backgroundColor: i === currentStep ? c.gradientStart : c.border,
              opacity: i <= currentStep ? 1 : 0.5,
            }}
            transition={{ type: 'spring', damping: 16, stiffness: 160 }}
            style={{
              height: 8,
              borderRadius: 4,
            }}
          />
        ))}
      </View>

      {/* Badge */}
      {badge && (
        <View
          style={{
            position: 'absolute',
            right: 0,
            paddingHorizontal: 12,
            paddingVertical: 5,
            borderRadius: 14,
            borderWidth: 1.5,
            borderColor: c.border,
            backgroundColor: c.card,
          }}
        >
          <Text
            style={{
              fontFamily: 'Poppins_600SemiBold',
              fontSize: 10.5,
              color: c.foreground,
              letterSpacing: 0.8,
              textTransform: 'uppercase',
            }}
          >
            {badge}
          </Text>
        </View>
      )}
    </View>
  );
}
