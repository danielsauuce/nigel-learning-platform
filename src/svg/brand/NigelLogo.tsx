import React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';
import { colors } from '@/constants/colors';

interface NigelLogoProps {
  size?: number;
}

export function NigelLogo({ size = 32 }: NigelLogoProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <Rect
        x="5"
        y="5"
        width="90"
        height="90"
        rx="16"
        stroke={colors.pink.DEFAULT}
        strokeWidth="7"
      />
      <Path d="M25 90 Q25 55 50 55 Q75 55 75 90" fill={colors.pink.DEFAULT} />
    </Svg>
  );
}
