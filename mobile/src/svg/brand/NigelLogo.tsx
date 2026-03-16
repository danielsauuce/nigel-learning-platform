import React from 'react';
import Svg, { Rect, Text as SvgText, Circle, Path } from 'react-native-svg';

interface NigelLogoProps {
  size?: number;
}

/**
 * Nigel brand logo — Puzzle-shaped "N" mark with pink accent dot.
 * Nigel brand puzzle logo.
 */
export function NigelLogo({ size = 32 }: NigelLogoProps) {
  return (
    <Svg width={size * 1.1} height={size} viewBox="0 0 36 32" fill="none">
      {/* Purple puzzle background */}
      <Path
        d="M4 4C4 2 5.5 0 8 0L22 0C24.5 0 26 2 26 4L26 10L28 10C30 10 32 12 32 14L32 18C32 20 30 22 28 22L26 22L26 28C26 30 24.5 32 22 32L16 32L16 30C16 28.5 14.5 27 13 27C11.5 27 10 28.5 10 30L10 32L8 32C5.5 32 4 30 4 28L4 22L2 22C0 22 -1 20 -1 18L-1 14C-1 12 0 10 2 10L4 10Z"
        fill="#B9A7F8"
      />
      {/* "N" letter */}
      <SvgText x="7" y="23" fontFamily="Poppins" fontWeight="800" fontSize="18" fill="white">
        N
      </SvgText>
      {/* Pink accent dot */}
      <Circle cx="28" cy="5" r="5" fill="#F7B6B6" />
      <Circle cx="28" cy="5" r="2.5" fill="#F9D6D0" />
    </Svg>
  );
}
