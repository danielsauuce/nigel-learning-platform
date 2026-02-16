import React from 'react';
import { Circle, Defs, Path, Stop, LinearGradient as SvgLinearGradient } from 'react-native-svg';

import { BaseSvg } from './BaseSvg';

export function ShieldIcon() {
  return (
    <BaseSvg width={72} height={80} viewBox="0 0 72 80">
      <Defs>
        <SvgLinearGradient id="shieldGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#4FC3F7" />
          <Stop offset="1" stopColor="#2196F3" />
        </SvgLinearGradient>
        <SvgLinearGradient id="shieldInner" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFD700" />
          <Stop offset="1" stopColor="#F5A623" />
        </SvgLinearGradient>
      </Defs>

      {/* Shield body */}
      <Path d="M36 4 L66 18 L66 40 Q66 62 36 76 Q6 62 6 40 L6 18 Z" fill="url(#shieldGrad)" />
      <Path
        d="M36 4 L66 18 L66 40 Q66 62 36 76 Q6 62 6 40 L6 18 Z"
        fill="none"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="2"
      />

      {/* Inner shield */}
      <Path
        d="M36 14 L58 24 L58 40 Q58 56 36 66 Q14 56 14 40 L14 24 Z"
        fill="rgba(255,255,255,0.12)"
      />

      {/* Tick mark */}
      <Path
        d="M24 40 L32 48 L48 30"
        fill="none"
        stroke="url(#shieldInner)"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Sparkle accents */}
      <Circle cx="60" cy="10" r="3" fill="#FFD700" opacity={0.7} />
      <Circle cx="8" cy="14" r="2" fill="#FFD700" opacity={0.5} />
    </BaseSvg>
  );
}
