import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Rect, Path } from 'react-native-svg';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

interface AppIconProps {
  size?: number;
}

export function AppIcon({ size = 80 }: AppIconProps) {
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <Svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <Defs>
        <LinearGradient id="appIconGrad" x1="0" y1="0" x2="80" y2="80">
          <Stop offset="0%" stopColor={c.gradientStart} />
          <Stop offset="100%" stopColor={c.gradientEnd} />
        </LinearGradient>
      </Defs>
      <Rect width="80" height="80" rx="22" fill="url(#appIconGrad)" />
      <Path d="M43 18L28 38h10l-2 12 15-20H41l2-12z" fill="white" />
    </Svg>
  );
}
