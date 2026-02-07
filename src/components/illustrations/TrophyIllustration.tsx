import React from 'react';
import {
  Circle,
  Defs,
  Path,
  Rect,
  Stop,
  Text as SvgText,
  LinearGradient as SvgLinearGradient,
} from 'react-native-svg';

import { BaseSvg } from './BaseSvg';

interface TrophyIllustrationProps {
  size?: number;
}

/**
 * Trophy illustration for the third onboarding slide.
 * Features a gold trophy with star, handles, base, and confetti sparkles.
 */
export function TrophyIllustration({ size = 160 }: TrophyIllustrationProps) {
  return (
    <BaseSvg width={size} height={size * 0.875} viewBox="0 0 160 140">
      {/* Confetti decorations */}
      <Circle cx="30" cy="30" r="4" fill="#FF2E91" opacity={0.6} />
      <Circle cx="135" cy="25" r="3" fill="#4FC3F7" opacity={0.6} />
      <Rect
        x="22"
        y="55"
        width="8"
        height="4"
        rx="2"
        fill="#FFD700"
        opacity={0.5}
        transform="rotate(-20 26 57)"
      />
      <Rect
        x="130"
        y="60"
        width="8"
        height="4"
        rx="2"
        fill="#10B981"
        opacity={0.5}
        transform="rotate(15 134 62)"
      />
      <Circle cx="45" cy="110" r="3" fill="#7000E0" opacity={0.4} />
      <Circle cx="120" cy="105" r="2.5" fill="#FF2E91" opacity={0.4} />

      {/* Trophy body */}
      <Defs>
        <SvgLinearGradient id="trophyGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFD700" />
          <Stop offset="1" stopColor="#F5A623" />
        </SvgLinearGradient>
      </Defs>
      <Path d="M55 35 L55 80 Q55 95 80 95 Q105 95 105 80 L105 35 Z" fill="url(#trophyGrad)" />
      <Path
        d="M55 35 L55 80 Q55 95 80 95 Q105 95 105 80 L105 35 Z"
        fill="none"
        stroke="#E8960C"
        strokeWidth="2"
      />

      {/* Handles */}
      <Path
        d="M55 45 Q35 45 35 60 Q35 75 55 75"
        fill="none"
        stroke="#E8960C"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <Path
        d="M105 45 Q125 45 125 60 Q125 75 105 75"
        fill="none"
        stroke="#E8960C"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Star */}
      <Path
        d="M80 50 L83 59 L93 59 L85 65 L88 74 L80 68 L72 74 L75 65 L67 59 L77 59 Z"
        fill="#FFFFFF"
        opacity={0.9}
      />

      {/* Base */}
      <Rect x="70" y="95" width="20" height="8" rx="2" fill="#E8960C" />
      <Rect x="62" y="103" width="36" height="8" rx="3" fill="#D4A056" />
      <Rect
        x="62"
        y="103"
        width="36"
        height="8"
        rx="3"
        fill="none"
        stroke="#C6893A"
        strokeWidth="1.5"
      />
      <SvgText x="80" y="115" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#8D6E63">
        #1
      </SvgText>
    </BaseSvg>
  );
}
