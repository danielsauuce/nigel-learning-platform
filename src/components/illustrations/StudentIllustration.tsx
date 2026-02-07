import React from 'react';
import { Circle, Rect, Path } from 'react-native-svg';
import { BaseSvg } from './BaseSvg';
import { Coin } from './Coin';

export function StudentIllustration({ size = 120 }: { size?: number }) {
  return (
    <BaseSvg width={size} height={size} viewBox="0 0 120 120">
      <Rect x="38" y="52" width="44" height="50" rx="12" fill="#4FC3F7" />
      <Circle cx="60" cy="28" r="18" fill="#FFD3B6" />

      <Path
        d="M54 34 Q60 39 66 34"
        fill="none"
        stroke="#D4836A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <Coin cx={96} cy={18} r={10} gradientId="studentCoin" />
    </BaseSvg>
  );
}
