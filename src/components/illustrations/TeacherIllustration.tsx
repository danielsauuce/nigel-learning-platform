import React from 'react';
import { Circle, G, Path, Rect } from 'react-native-svg';

import { BaseSvg } from './BaseSvg';

interface TeacherIllustrationProps {
  size?: number;
}

/**
 * Teacher character illustration for the role selection screen.
 * Features a person with glasses, a purple top, and a clipboard.
 */
export function TeacherIllustration({ size = 120 }: TeacherIllustrationProps) {
  return (
    <BaseSvg width={size} height={size} viewBox="0 0 120 120">
      {/* Body */}
      <Path d="M35 102 Q35 72 60 68 Q85 72 85 102 Z" fill="#7000E0" />
      <Path
        d="M35 102 Q35 72 60 68 Q85 72 85 102 Z"
        fill="none"
        stroke="#5B00B8"
        strokeWidth="1.5"
      />

      {/* V-neck detail */}
      <Path
        d="M50 70 L60 80 L70 70"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Head */}
      <Circle cx="60" cy="38" r="22" fill="#FFD3B6" />
      <Circle cx="60" cy="38" r="22" fill="none" stroke="#F0B898" strokeWidth="1.5" />

      {/* Hair */}
      <Path d="M38 30 Q38 12 60 14 Q82 12 82 30 Q78 20 60 18 Q42 20 38 30 Z" fill="#3E2723" />

      {/* Glasses */}
      <G>
        <Circle cx="50" cy="37" r="7" fill="none" stroke="#455A64" strokeWidth="2" />
        <Circle cx="70" cy="37" r="7" fill="none" stroke="#455A64" strokeWidth="2" />
        <Path d="M57 37 L63 37" stroke="#455A64" strokeWidth="1.5" />
        <Path d="M43 35 L38 33" stroke="#455A64" strokeWidth="1.5" strokeLinecap="round" />
        <Path d="M77 35 L82 33" stroke="#455A64" strokeWidth="1.5" strokeLinecap="round" />
      </G>

      {/* Eyes */}
      <Circle cx="50" cy="37" r="2" fill="#1A1B4B" />
      <Circle cx="50.5" cy="36.2" r="0.8" fill="#FFFFFF" />
      <Circle cx="70" cy="37" r="2" fill="#1A1B4B" />
      <Circle cx="70.5" cy="36.2" r="0.8" fill="#FFFFFF" />

      {/* Smile */}
      <Path
        d="M53 46 Q60 51 67 46"
        fill="none"
        stroke="#D4836A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Clipboard */}
      <Rect x="88" y="55" width="22" height="28" rx="3" fill="#FFE082" />
      <Rect
        x="88"
        y="55"
        width="22"
        height="28"
        rx="3"
        fill="none"
        stroke="#E8960C"
        strokeWidth="1.5"
      />
      <Rect x="94" y="52" width="10" height="6" rx="2" fill="#D4A056" />
      <Path d="M93 64 L105 64" stroke="#D4A056" strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M93 69 L105 69" stroke="#D4A056" strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M93 74 L100 74" stroke="#D4A056" strokeWidth="1.5" strokeLinecap="round" />

      {/* Sparkle */}
      <Circle cx="18" cy="60" r="3" fill="#FFD700" opacity={0.6} />
    </BaseSvg>
  );
}
