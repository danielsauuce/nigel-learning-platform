import React from 'react';
import { Circle, Path, Rect } from 'react-native-svg';

import { BaseSvg } from './BaseSvg';

/**
 * Compact island icon used inside the splash screen logo circle.
 * Smaller and simpler than IslandIllustration.
 */
export function IslandIcon() {
  return (
    <BaseSvg width={120} height={100} viewBox="0 0 120 100">
      {/* Water */}
      <Path
        d="M10 75 Q30 68 60 75 Q90 82 110 75 L110 95 Q90 88 60 95 Q30 102 10 95 Z"
        fill="#4FC3F7"
        opacity={0.5}
      />

      {/* Island mound */}
      <Path d="M25 75 Q40 55 60 58 Q80 55 95 75 Z" fill="#8BC34A" />
      <Path d="M30 75 Q45 65 60 67 Q75 65 90 75 Z" fill="#FFE082" />

      {/* Palm trunk */}
      <Path
        d="M58 58 Q55 40 52 25"
        stroke="#8D6E63"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />

      {/* Palm fronds */}
      <Path
        d="M52 25 Q40 15 28 22"
        stroke="#4CAF50"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M52 25 Q55 10 68 12"
        stroke="#4CAF50"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M52 25 Q42 28 35 35"
        stroke="#66BB6A"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M52 25 Q60 22 70 28"
        stroke="#66BB6A"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Treasure chest */}
      <Rect x="62" y="62" width="14" height="10" rx="2" fill="#D4A056" />
      <Rect x="62" y="62" width="14" height="4" rx="1" fill="#C6893A" />
      <Circle cx="69" cy="67" r="1.5" fill="#FFD700" />
    </BaseSvg>
  );
}
