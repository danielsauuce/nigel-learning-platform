import React from 'react';
import { Circle, G, Path, Rect } from 'react-native-svg';

import { BaseSvg } from './BaseSvg';
import { Coin } from './Coin';

interface StudentIllustrationProps {
  size?: number;
}

/**
 * Student character illustration for the role selection screen.
 * Features a young person in a blue top with a floating coin.
 */
export function StudentIllustration({ size = 120 }: StudentIllustrationProps) {
  return (
    <BaseSvg width={size} height={size} viewBox="0 0 120 120">
      {/* Body */}
      <Rect x="38" y="52" width="44" height="50" rx="12" fill="#4FC3F7" />
      <Rect
        x="38"
        y="52"
        width="44"
        height="50"
        rx="12"
        fill="none"
        stroke="#2196F3"
        strokeWidth="2"
      />
      <Rect x="48" y="72" width="24" height="16" rx="4" fill="#FFFFFF" opacity={0.35} />

      {/* Backpack strap */}
      <Path
        d="M46 52 Q46 40 60 38 Q74 40 74 52"
        fill="none"
        stroke="#2196F3"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Head */}
      <Circle cx="60" cy="28" r="18" fill="#FFD3B6" />
      <Circle cx="60" cy="28" r="18" fill="none" stroke="#F0B898" strokeWidth="1.5" />

      {/* Hair */}
      <Path d="M42 22 Q42 8 60 10 Q78 8 78 22 Q75 16 60 15 Q45 16 42 22 Z" fill="#5D4037" />

      {/* Eyes */}
      <G>
        <Circle cx="52" cy="27" r="3" fill="#FFFFFF" />
        <Circle cx="53" cy="26.5" r="1.8" fill="#1A1B4B" />
        <Circle cx="53.5" cy="25.8" r="0.7" fill="#FFFFFF" />
      </G>
      <G>
        <Circle cx="68" cy="27" r="3" fill="#FFFFFF" />
        <Circle cx="69" cy="26.5" r="1.8" fill="#1A1B4B" />
        <Circle cx="69.5" cy="25.8" r="0.7" fill="#FFFFFF" />
      </G>

      {/* Smile */}
      <Path
        d="M54 34 Q60 39 66 34"
        fill="none"
        stroke="#D4836A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Floating coin */}
      <Coin cx={96} cy={18} r={10} gradientId="studentCoinGrad" />

      {/* Sparkle */}
      <Circle cx="22" cy="44" r="3" fill="#FFD700" opacity={0.6} />
    </BaseSvg>
  );
}
