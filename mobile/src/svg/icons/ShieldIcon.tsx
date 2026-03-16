import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ShieldIconProps {
  size?: number;
  color?: string;
}

export function ShieldIcon({ size = 16, color = '#6C6C80' }: ShieldIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M8 1.5L2.5 4V7.5C2.5 11 5 13.5 8 14.5C11 13.5 13.5 11 13.5 7.5V4L8 1.5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M6 8L7.5 9.5L10 6.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
