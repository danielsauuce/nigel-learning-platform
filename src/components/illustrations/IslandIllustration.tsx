import React from 'react';
import { Circle, Path } from 'react-native-svg';

import { BaseSvg } from './BaseSvg';

interface IslandIllustrationProps {
  size?: number;
}

/**
 * Tropical island illustration for the first onboarding slide.
 * Features a palm tree, sandy beach, water, and a flag.
 */
export function IslandIllustration({ size = 160 }: IslandIllustrationProps) {
  return (
    <BaseSvg width={size} height={size * 0.875} viewBox="0 0 160 140">
      {/* Water */}
      <Path
        d="M10 105 Q40 95 80 105 Q120 115 150 105 L150 130 Q120 120 80 130 Q40 140 10 130 Z"
        fill="#4FC3F7"
        opacity={0.35}
      />
      <Path
        d="M0 112 Q35 102 75 112 Q115 122 155 110"
        fill="none"
        stroke="#4FC3F7"
        strokeWidth="2"
        opacity={0.25}
      />

      {/* Island mound */}
      <Path d="M30 105 Q50 70 80 75 Q110 70 130 105 Z" fill="#8BC34A" />
      <Path d="M38 105 Q55 82 80 85 Q105 82 122 105 Z" fill="#FFE082" />

      {/* Palm trunk */}
      <Path
        d="M78 75 Q74 50 70 28"
        stroke="#8D6E63"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Palm fronds */}
      <Path
        d="M70 28 Q52 14 34 24"
        stroke="#4CAF50"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M70 28 Q74 10 90 14"
        stroke="#4CAF50"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M70 28 Q56 34 44 44"
        stroke="#66BB6A"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M70 28 Q82 26 94 36"
        stroke="#66BB6A"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Flag */}
      <Path
        d="M105 60 L105 40"
        stroke="#E8960C"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <Path d="M105 40 L120 46 L105 52" fill="#FFD700" />

      {/* Sparkles */}
      <Circle cx="42" cy="55" r="2.5" fill="#FFD700" opacity={0.7} />
      <Circle cx="125" cy="72" r="2" fill="#FFD700" opacity={0.5} />
    </BaseSvg>
  );
}
