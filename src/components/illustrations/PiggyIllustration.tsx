import React from 'react';
import { Circle, Rect, G, Path } from 'react-native-svg';
import { BaseSvg } from './BaseSvg';
import { Coin } from './Coin';

export function PiggyIllustration({ size = 160 }: { size?: number }) {
  return (
    <BaseSvg width={size} height={size * 0.875} viewBox="0 0 160 140">
      <G>
        <Circle cx="72" cy="80" r="36" fill="#FF8FAB" />
        <Rect x="52" y="108" width="8" height="12" rx="4" fill="#FF8FAB" />
        <Rect x="80" y="108" width="8" height="12" rx="4" fill="#FF8FAB" />
      </G>

      <Coin cx={72} cy={28} r={12} gradientId="piggyCoin" />

      <Circle cx="28" cy="65" r="2.5" fill="#FFD700" opacity={0.6} />
    </BaseSvg>
  );
}
