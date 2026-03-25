import React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

interface NigelLogoProps {
  size?: number;
}

const PINK = '#E91E8C';

/** Nigel brand icon — pink rounded square border with solid pink arch inside */
export function NigelLogo({ size = 32 }: NigelLogoProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Outer rounded square — border only */}
      <Rect x="5" y="5" width="90" height="90" rx="20" stroke={PINK} strokeWidth="8" fill="none" />
      {/* Inner solid arch / semicircle */}
      <Path d="M18 80 A32 32 0 0 0 82 80 Z" fill={PINK} />
    </Svg>
  );
}

/** White version for dark backgrounds */
export function NigelLogoWhite({ size = 32 }: NigelLogoProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <Rect x="5" y="5" width="90" height="90" rx="20" stroke="white" strokeWidth="8" fill="none" />
      <Path d="M18 80 A32 32 0 0 0 82 80 Z" fill="white" />
    </Svg>
  );
}
