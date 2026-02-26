import React from 'react';
import Svg, { Circle, Defs, Ellipse, G, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

interface TrophyIconProps {
  size?: number;
}

export function TrophyIcon({ size = 140 }: TrophyIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 140 140" fill="none">
      <Defs>
        <LinearGradient id="tCup" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFD700" />
          <Stop offset="1" stopColor="#F5A623" />
        </LinearGradient>
        <LinearGradient id="tBase" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#D4A056" />
          <Stop offset="1" stopColor="#B8860B" />
        </LinearGradient>
      </Defs>

      {/* Shadow */}
      <Ellipse cx="70" cy="122" rx="30" ry="5.5" fill="rgba(0,0,0,0.1)" />

      {/* Base */}
      <Rect x="46" y="110" width="48" height="9" rx="3.5" fill="url(#tBase)" />
      <Rect x="50" y="107" width="40" height="5" rx="2.5" fill="#E8960C" />

      {/* Stem */}
      <Rect x="62" y="88" width="16" height="20" fill="#E8960C" />
      <Rect x="59" y="86" width="22" height="4" rx="2" fill="#D4A056" />

      {/* Cup body */}
      <Path
        d="M36 26 L46 26 L48 16 L92 16 L94 26 L104 26 L100 56 Q96 74 70 82 Q44 74 40 56Z"
        fill="url(#tCup)"
      />

      {/* Cup highlight */}
      <Path d="M52 28 L88 28 L84 56 Q80 68 70 72 Q60 68 56 56Z" fill="rgba(255,255,255,0.2)" />

      {/* Left handle */}
      <Path
        d="M36 26 Q22 26 20 40 Q18 52 32 54"
        fill="none"
        stroke="#F5A623"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Right handle */}
      <Path
        d="M104 26 Q118 26 120 40 Q122 52 108 54"
        fill="none"
        stroke="#F5A623"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Star on cup */}
      <Path
        d="M70 30 L74 40 L84 40 L76 48 L79 58 L70 52 L61 58 L64 48 L56 40 L66 40Z"
        fill="white"
        opacity="0.85"
      />

      {/* Ribbon left */}
      <Path d="M44 80 L34 100 L44 95 L48 102 L48 82" fill="#EF4444" />

      {/* Ribbon right */}
      <Path d="M96 80 L106 100 L96 95 L92 102 L92 82" fill="#EF4444" />

      {/* Sparkles */}
      <G transform="translate(30, 12)">
        <Path
          d="M0 -5 L1.2 -1.2 L5 0 L1.2 1.2 L0 5 L-1.2 1.2 L-5 0 L-1.2 -1.2Z"
          fill="#FFD700"
          opacity="0.85"
        />
      </G>
      <G transform="translate(110, 12)">
        <Path
          d="M0 -3.5 L0.8 -0.8 L3.5 0 L0.8 0.8 L0 3.5 L-0.8 0.8 L-3.5 0 L-0.8 -0.8Z"
          fill="#FFD700"
          opacity="0.7"
        />
      </G>
      <G transform="translate(70, 4)">
        <Path
          d="M0 -4 L0.9 -0.9 L4 0 L0.9 0.9 L0 4 L-0.9 0.9 L-4 0 L-0.9 -0.9Z"
          fill="#FFD700"
          opacity="0.9"
        />
      </G>

      {/* Small badge */}
      <Circle cx="22" cy="70" r="9" fill="#10B981" opacity="0.6" />
      <Path
        d="M19 70 L21 72.8 L26 67"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
