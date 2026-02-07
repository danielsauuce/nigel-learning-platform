import React from 'react';
import { Path, Rect } from 'react-native-svg';
import { BaseSvg } from './BaseSvg';
import { Sparkle } from './Sparkle';

export function TrophyIllustration({ size = 160 }: { size?: number }) {
  return (
    <BaseSvg width={size} height={size * 0.875} viewBox="0 0 160 140">
      <Sparkle x={30} y={30} r={4} color="#FF2E91" />
      <Sparkle x={135} y={25} r={3} color="#4FC3F7" />

      <Path
        d="M55 35 L55 80 Q55 95 80 95 Q105 95 105 80 L105 35 Z"
        fill="#FFD700"
        stroke="#E8960C"
        strokeWidth="2"
      />

      <Rect x="70" y="95" width="20" height="8" rx="2" fill="#E8960C" />
      <Rect x="62" y="103" width="36" height="8" rx="3" fill="#D4A056" />
    </BaseSvg>
  );
}
