import React from 'react';
import Svg, { Circle, Defs, Ellipse, G, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

interface TeacherIllustrationProps {
  size?: number;
}

export function TeacherIllustration({ size = 120 }: TeacherIllustrationProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <Defs>
        <LinearGradient id="tchBlouse" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#8E7CFF" />
          <Stop offset="1" stopColor="#6C5CE7" />
        </LinearGradient>
        <LinearGradient id="tchClipboard" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#D4A056" />
          <Stop offset="1" stopColor="#C6893A" />
        </LinearGradient>
      </Defs>

      {/* Shadow */}
      <Ellipse cx="60" cy="112" rx="28" ry="5" fill="rgba(0,0,0,0.1)" />

      {/* Body / blouse */}
      <Path
        d="M42 62 Q42 54 52 52 L68 52 Q78 54 78 62 L78 96 Q78 102 72 102 L48 102 Q42 102 42 96Z"
        fill="url(#tchBlouse)"
      />

      {/* Collar / neckline */}
      <Path
        d="M52 52 L60 58 L68 52"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Button line */}
      <Circle cx="60" cy="64" r="1.5" fill="rgba(255,255,255,0.5)" />
      <Circle cx="60" cy="74" r="1.5" fill="rgba(255,255,255,0.5)" />
      <Circle cx="60" cy="84" r="1.5" fill="rgba(255,255,255,0.5)" />

      {/* Arms */}
      <Path
        d="M42 64 Q34 68 32 78 Q31 82 34 84"
        fill="none"
        stroke="#F0B898"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <Path
        d="M78 64 Q86 68 88 78 Q89 82 86 84"
        fill="none"
        stroke="#F0B898"
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* Clipboard in hand */}
      <G transform="translate(20, 74)">
        <Rect x="0" y="0" width="18" height="24" rx="2.5" fill="url(#tchClipboard)" />
        {/* Clip */}
        <Rect x="5" y="-3" width="8" height="6" rx="1.5" fill="#8D6E63" />
        {/* Lines on clipboard */}
        <Path d="M4 8 L14 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <Path d="M4 12 L12 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <Path d="M4 16 L14 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        {/* Checkmark */}
        <Path
          d="M4 20 L6 22.5 L10 18"
          stroke="#22C55E"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>

      {/* Legs */}
      <Rect x="48" y="100" width="10" height="14" rx="5" fill="#1A1B4B" />
      <Rect x="62" y="100" width="10" height="14" rx="5" fill="#1A1B4B" />

      {/* Shoes */}
      <Ellipse cx="53" cy="114" rx="7" ry="3.5" fill="#444" />
      <Ellipse cx="67" cy="114" rx="7" ry="3.5" fill="#444" />

      {/* Head */}
      <Circle cx="60" cy="34" r="20" fill="#F0B898" />

      {/* Hair (up-do / bun style) */}
      <Path d="M40 30 Q38 12 60 10 Q82 12 80 30 Q78 22 60 20 Q42 22 40 30Z" fill="#3E2723" />
      <Circle cx="60" cy="10" r="8" fill="#3E2723" />

      {/* Glasses */}
      <Circle cx="52" cy="34" r="7" fill="none" stroke="#6C5CE7" strokeWidth="2" />
      <Circle cx="68" cy="34" r="7" fill="none" stroke="#6C5CE7" strokeWidth="2" />
      <Path d="M59 34 L61 34" stroke="#6C5CE7" strokeWidth="2" strokeLinecap="round" />
      <Path d="M45 32 L40 30" stroke="#6C5CE7" strokeWidth="2" strokeLinecap="round" />
      <Path d="M75 32 L80 30" stroke="#6C5CE7" strokeWidth="2" strokeLinecap="round" />

      {/* Eyes (behind glasses) */}
      <Circle cx="52" cy="35" r="2.5" fill="#1F1F1F" />
      <Circle cx="68" cy="35" r="2.5" fill="#1F1F1F" />
      <Circle cx="53" cy="33.5" r="1" fill="white" />
      <Circle cx="69" cy="33.5" r="1" fill="white" />

      {/* Smile */}
      <Path
        d="M54 42 Q60 47 66 42"
        fill="none"
        stroke="#D4836A"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Blush */}
      <Ellipse cx="44" cy="40" rx="4" ry="2.5" fill="#FFB5A0" opacity="0.4" />
      <Ellipse cx="76" cy="40" rx="4" ry="2.5" fill="#FFB5A0" opacity="0.4" />

      {/* Sparkle */}
      <G transform="translate(92, 20)">
        <Path
          d="M0 -4 L0.9 -0.9 L4 0 L0.9 0.9 L0 4 L-0.9 0.9 L-4 0 L-0.9 -0.9Z"
          fill="#FFD700"
          opacity="0.7"
        />
      </G>
    </Svg>
  );
}
