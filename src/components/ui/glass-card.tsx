import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import type { ViewStyle } from 'react-native';

interface GlassCardProps {
  children: React.ReactNode;
  colors?: [string, string];
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

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
