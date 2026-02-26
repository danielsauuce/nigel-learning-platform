import React from 'react';
import Svg, { Circle, Defs, Ellipse, G, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

interface IslandIconProps {
  size?: number;
}

export function IslandIcon({ size = 140 }: IslandIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 140 140" fill="none">
      <Defs>
        <LinearGradient id="islandSea" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#4FC3F7" stopOpacity="0.5" />
          <Stop offset="1" stopColor="#0288D1" stopOpacity="0.25" />
        </LinearGradient>
        <LinearGradient id="islandSand" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFE082" />
          <Stop offset="1" stopColor="#D4A056" />
        </LinearGradient>
        <LinearGradient id="trunk" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#8D6E63" />
          <Stop offset="1" stopColor="#6D4C41" />
        </LinearGradient>
        <LinearGradient id="coinFill" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFD700" />
          <Stop offset="1" stopColor="#F5A623" />
        </LinearGradient>
      </Defs>

      {/* Water */}
      <Ellipse cx="70" cy="98" rx="56" ry="20" fill="url(#islandSea)" />

      {/* Island body */}
      <Path
        d="M24 90 Q24 70 48 64 Q58 60 70 60 Q82 60 92 64 Q116 70 116 90 Q92 102 70 102 Q48 102 24 90Z"
        fill="url(#islandSand)"
      />

      {/* Palm trunk */}
      <Path
        d="M66 64 Q62 46 58 28"
        stroke="url(#trunk)"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />

      {/* Palm leaves */}
      <Path d="M58 28 Q44 20 32 24 Q46 22 56 30Z" fill="#4CAF50" />
      <Path d="M58 28 Q62 12 74 10 Q65 16 60 27Z" fill="#66BB6A" />
      <Path d="M58 28 Q74 22 86 26 Q72 21 60 28Z" fill="#43A047" />
      <Path d="M58 28 Q46 14 38 16 Q48 18 57 27Z" fill="#388E3C" />

      {/* Coconuts */}
      <Circle cx="58" cy="30" r="3.5" fill="#795548" />
      <Circle cx="62" cy="28" r="2.8" fill="#6D4C41" />

      {/* Treasure chest */}
      <Rect x="74" y="72" width="16" height="12" rx="2.5" fill="#C6893A" />
      <Rect x="74" y="72" width="16" height="5" rx="2.5" fill="#D4A056" />
      <Circle cx="82" cy="78" r="2.2" fill="url(#coinFill)" />

      {/* Flag */}
      <Path d="M84 60 L84 42" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
      <Path d="M84 42 L96 46 L84 50Z" fill="#EF4444" />

      {/* Sparkles */}
      <G transform="translate(42, 54)">
        <Path
          d="M0 -5 L1.2 -1.2 L5 0 L1.2 1.2 L0 5 L-1.2 1.2 L-5 0 L-1.2 -1.2Z"
          fill="#FFD700"
          opacity="0.85"
        />
      </G>
      <G transform="translate(105, 56)">
        <Path
          d="M0 -3.5 L0.8 -0.8 L3.5 0 L0.8 0.8 L0 3.5 L-0.8 0.8 L-3.5 0 L-0.8 -0.8Z"
          fill="#4FC3F7"
          opacity="0.7"
        />
      </G>

      {/* Wave accents */}
      <Path
        d="M18 96 Q30 91 42 96"
        fill="none"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <Path
        d="M88 98 Q100 93 112 98"
        fill="none"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </Svg>
  );
}
