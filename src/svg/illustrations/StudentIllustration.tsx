import React from 'react';
import Svg, { Circle, Defs, Ellipse, G, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

interface StudentIllustrationProps {
  size?: number;
}

export function StudentIllustration({ size = 120 }: StudentIllustrationProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <Defs>
        <LinearGradient id="stuBag" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#4FC3F7" />
          <Stop offset="1" stopColor="#0288D1" />
        </LinearGradient>
        <LinearGradient id="stuShirt" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#6C5CE7" />
          <Stop offset="1" stopColor="#5B4DE3" />
        </LinearGradient>
        <LinearGradient id="stuBook" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor="#FFD700" />
          <Stop offset="1" stopColor="#F5A623" />
        </LinearGradient>
      </Defs>

      {/* Shadow */}
      <Ellipse cx="60" cy="112" rx="28" ry="5" fill="rgba(0,0,0,0.1)" />

      {/* Backpack strap */}
      <Path d="M44 56 Q40 60 40 70 L40 90 Q40 94 44 94 L50 94 L50 60" fill="url(#stuBag)" />

      {/* Body / shirt */}
      <Path
        d="M44 62 Q44 56 52 54 L68 54 Q76 56 76 62 L76 96 Q76 102 70 102 L50 102 Q44 102 44 96Z"
        fill="url(#stuShirt)"
      />

      {/* Collar */}
      <Path
        d="M52 54 L60 62 L68 54"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Arms */}
      <Path
        d="M44 64 Q36 66 34 76 Q33 80 36 82"
        fill="none"
        stroke="#FFD3B6"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <Path
        d="M76 64 Q84 66 86 76 Q87 80 84 82"
        fill="none"
        stroke="#FFD3B6"
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* Book in hand */}
      <Rect x="78" y="74" width="14" height="18" rx="2" fill="url(#stuBook)" />
      <Rect x="78" y="74" width="3" height="18" rx="1" fill="#E8960C" />
      <Path d="M83 78 L89 78" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M83 82 L87 82" stroke="white" strokeWidth="1.5" strokeLinecap="round" />

      {/* Legs */}
      <Rect x="50" y="100" width="10" height="14" rx="5" fill="#1A1B4B" />
      <Rect x="64" y="100" width="10" height="14" rx="5" fill="#1A1B4B" />

      {/* Shoes */}
      <Ellipse cx="55" cy="114" rx="7" ry="3.5" fill="#333" />
      <Ellipse cx="69" cy="114" rx="7" ry="3.5" fill="#333" />

      {/* Head */}
      <Circle cx="60" cy="36" r="20" fill="#FFD3B6" />

      {/* Hair */}
      <Path d="M40 32 Q40 14 60 14 Q80 14 80 32 Q78 24 60 22 Q42 24 40 32Z" fill="#5D4037" />

      {/* Eyes */}
      <Circle cx="52" cy="36" r="3" fill="#1F1F1F" />
      <Circle cx="68" cy="36" r="3" fill="#1F1F1F" />
      <Circle cx="53" cy="34.5" r="1.2" fill="white" />
      <Circle cx="69" cy="34.5" r="1.2" fill="white" />

      {/* Smile */}
      <Path
        d="M54 44 Q60 50 66 44"
        fill="none"
        stroke="#D4836A"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Blush */}
      <Ellipse cx="46" cy="42" rx="4" ry="2.5" fill="#FFB5A0" opacity="0.5" />
      <Ellipse cx="74" cy="42" rx="4" ry="2.5" fill="#FFB5A0" opacity="0.5" />

      {/* Sparkle */}
      <G transform="translate(90, 24)">
        <Path
          d="M0 -4 L0.9 -0.9 L4 0 L0.9 0.9 L0 4 L-0.9 0.9 L-4 0 L-0.9 -0.9Z"
          fill="#4FC3F7"
          opacity="0.7"
        />
      </G>
    </Svg>
  );
}
