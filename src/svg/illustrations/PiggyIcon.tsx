import React from 'react';
import Svg, { Circle, Defs, Ellipse, G, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

interface PiggyIconProps {
  size?: number;
}

export function PiggyIcon({ size = 140 }: PiggyIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 140 140" fill="none">
      <Defs>
        <LinearGradient id="pigBody" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FF8EC4" />
          <Stop offset="1" stopColor="#E91E8C" />
        </LinearGradient>
        <LinearGradient id="pigCoin" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFD700" />
          <Stop offset="1" stopColor="#F5A623" />
        </LinearGradient>
      </Defs>

      {/* Shadow */}
      <Ellipse cx="70" cy="118" rx="36" ry="7" fill="rgba(0,0,0,0.12)" />

      {/* Body */}
      <Ellipse cx="70" cy="78" rx="38" ry="32" fill="url(#pigBody)" />

      {/* Belly highlight */}
      <Ellipse cx="67" cy="83" rx="24" ry="20" fill="rgba(255,255,255,0.15)" />

      {/* Snout */}
      <Ellipse cx="104" cy="78" rx="11" ry="9" fill="#FF69B4" />
      <Circle cx="101" cy="76" r="2.2" fill="#E91E8C" />
      <Circle cx="107" cy="76" r="2.2" fill="#E91E8C" />

      {/* Eyes */}
      <Circle cx="84" cy="64" r="6" fill="white" />
      <Circle cx="85" cy="65" r="3.5" fill="#1A1B4B" />
      <Circle cx="86.5" cy="63" r="1.4" fill="white" />

      {/* Ears */}
      <Path d="M52 52 Q46 34 58 40 Q55 48 52 52Z" fill="#E91E8C" />
      <Path d="M82 48 Q85 32 92 38 Q88 46 82 48Z" fill="#E91E8C" />
      <Path d="M54 50 Q50 38 57 42" fill="#FF69B4" />
      <Path d="M83 47 Q86 35 91 40" fill="#FF69B4" />

      {/* Legs */}
      <Rect x="44" y="102" width="12" height="14" rx="6" fill="#E91E8C" />
      <Rect x="84" y="102" width="12" height="14" rx="6" fill="#E91E8C" />

      {/* Hooves */}
      <Rect x="44" y="113" width="12" height="4" rx="2" fill="#C8177A" />
      <Rect x="84" y="113" width="12" height="4" rx="2" fill="#C8177A" />

      {/* Coin slot */}
      <Rect x="58" y="46" width="18" height="3.5" rx="1.75" fill="#C8177A" />

      {/* Flying coin */}
      <G transform="translate(63, 22)">
        <Circle cx="0" cy="0" r="10" fill="url(#pigCoin)" />
        <Circle cx="0" cy="0" r="7" fill="none" stroke="#E8960C" strokeWidth="1.4" />
        <Path d="M-2.5 -3 L0 -5 L2.5 -3 L2.5 3 L0 5 L-2.5 3Z" fill="#B8760A" opacity="0.45" />
      </G>

      {/* Tail curl */}
      <Path
        d="M32 74 Q22 68 25 60 Q28 54 33 58"
        fill="none"
        stroke="#E91E8C"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Sparkles */}
      <G transform="translate(48, 16)">
        <Path
          d="M0 -4 L0.9 -0.9 L4 0 L0.9 0.9 L0 4 L-0.9 0.9 L-4 0 L-0.9 -0.9Z"
          fill="#FFD700"
          opacity="0.8"
        />
      </G>
      <G transform="translate(90, 26)">
        <Path
          d="M0 -3 L0.7 -0.7 L3 0 L0.7 0.7 L0 3 L-0.7 0.7 L-3 0 L-0.7 -0.7Z"
          fill="#FFD700"
          opacity="0.65"
        />
      </G>
    </Svg>
  );
}
