import React from 'react';
import { Circle, G, Path, Rect, Text as SvgText } from 'react-native-svg';

import { BaseSvg } from './BaseSvg';
import { Coin } from './Coin';

interface PiggyIllustrationProps {
  size?: number;
}

/**
 * Piggy bank illustration for the second onboarding slide.
 * Features a pink piggy bank with coin slot, stacked coins, and legs.
 */
export function PiggyIllustration({ size = 160 }: PiggyIllustrationProps) {
  return (
    <BaseSvg width={size} height={size * 0.875} viewBox="0 0 160 140">
      {/* Stacked coins behind piggy */}
      <Rect x="110" y="70" width="28" height="6" rx="3" fill="#FFD700" opacity={0.5} />
      <Rect x="112" y="62" width="24" height="6" rx="3" fill="#FFD700" opacity={0.6} />
      <Rect x="114" y="54" width="20" height="6" rx="3" fill="#FFD700" opacity={0.7} />

      {/* Piggy body */}
      <G>
        <Circle cx="72" cy="80" r="36" fill="#FF8FAB" />
        <Circle cx="72" cy="80" r="36" fill="none" stroke="#E8728A" strokeWidth="2" />

        {/* Snout */}
        <Rect x="93" y="74" width="20" height="14" rx="7" fill="#FFB3C6" />
        <Circle cx="100" cy="79" r="2" fill="#E8728A" />
        <Circle cx="106" cy="79" r="2" fill="#E8728A" />

        {/* Eye */}
        <Circle cx="84" cy="70" r="4" fill="#FFFFFF" />
        <Circle cx="85" cy="69.5" r="2.5" fill="#1A1B4B" />
        <Circle cx="86" cy="68.5" r="1" fill="#FFFFFF" />

        {/* Ear */}
        <Path
          d="M58 55 Q52 38 65 42 Q68 48 62 58"
          fill="#FF8FAB"
          stroke="#E8728A"
          strokeWidth="1.5"
        />

        {/* Coin slot */}
        <Rect x="64" y="44" width="16" height="3" rx="1.5" fill="#E8728A" />

        {/* Legs */}
        <Rect
          x="52"
          y="108"
          width="8"
          height="12"
          rx="4"
          fill="#FF8FAB"
          stroke="#E8728A"
          strokeWidth="1.5"
        />
        <Rect
          x="80"
          y="108"
          width="8"
          height="12"
          rx="4"
          fill="#FF8FAB"
          stroke="#E8728A"
          strokeWidth="1.5"
        />
      </G>

      {/* Floating coin above piggy */}
      <Coin cx={72} cy={28} r={12} gradientId="piggyCoinGrad" />

      {/* Sparkles */}
      <Circle cx="28" cy="65" r="2.5" fill="#FFD700" opacity={0.6} />
      <Circle cx="130" cy="48" r="2" fill="#FFD700" opacity={0.5} />
    </BaseSvg>
  );
}
