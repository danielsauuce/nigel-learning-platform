import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import type { ViewStyle } from 'react-native';

interface GlassCardProps {
  children: React.ReactNode;
  /** Gradient color stops. Defaults to a subtle white frosted glass. */
  colors?: [string, string];
  /** Border color. Defaults to semi-transparent white. */
  borderColor?: string;
  /** Border width. */
  borderWidth?: number;
  /** Border radius. Defaults to 24. */
  borderRadius?: number;
  /** Additional style overrides. */
  style?: ViewStyle;
}

/**
 * Semi-transparent gradient card with a glass-like appearance.
 * Used for onboarding slide cards, role selection cards, and similar UI.
 */
export function GlassCard({
  children,
  colors = ['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.05)'],
  borderColor = 'rgba(255,255,255,0.12)',
  borderWidth = 1,
  borderRadius = 24,
  style,
}: GlassCardProps) {
  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[
        {
          borderRadius,
          borderWidth,
          borderColor,
        },
        style,
      ]}
    >
      {children}
    </LinearGradient>
  );
}
