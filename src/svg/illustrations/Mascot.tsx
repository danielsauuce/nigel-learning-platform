import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Ellipse, Circle, Path, Rect, G } from 'react-native-svg';
import { View } from 'react-native';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

interface MascotProps {
  size?: number;
}

export function Mascot({ size = 130 }: MascotProps) {
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <View style={{ width: size, height: size * 1.2 }}>
      <Svg width={size} height={size * 1.2} viewBox="0 0 120 150" fill="none">
        <Defs>
          <LinearGradient id="mascotGrad" x1="22" y1="37" x2="98" y2="133">
            <Stop offset="0%" stopColor={c.gradientEnd} stopOpacity="0.35" />
            <Stop offset="100%" stopColor={c.gradientStart} stopOpacity="0.2" />
          </LinearGradient>
        </Defs>

        <Ellipse cx="60" cy="85" rx="38" ry="48" fill={c.gradientStart} />
        <Ellipse cx="60" cy="85" rx="38" ry="48" fill="url(#mascotGrad)" />

        <Ellipse cx="45" cy="72" rx="8" ry="10" fill="white" />
        <Ellipse cx="75" cy="72" rx="8" ry="10" fill="white" />
        <Circle cx="47" cy="73" r="5" fill="#1F1F1F" />
        <Circle cx="77" cy="73" r="5" fill="#1F1F1F" />
        <Circle cx="49" cy="71" r="2" fill="white" />
        <Circle cx="79" cy="71" r="2" fill="white" />

        <Path
          d="M48 93 Q60 106 72 93"
          stroke="#1F1F1F"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />

        <Circle cx="34" cy="89" r="5" fill="#FF8EC4" opacity="0.5" />
        <Circle cx="86" cy="89" r="5" fill="#FF8EC4" opacity="0.5" />

        <G>
          <Path
            d="M22 80 Q10 65 14 50"
            stroke={c.gradientStart}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
          <Circle cx="14" cy="50" r="6" fill={c.gradientStart} />
        </G>

        <Path
          d="M98 85 Q108 96 105 112"
          stroke={c.gradientStart}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />

        <Rect x="42" y="126" width="10" height="18" rx="5" fill={c.gradientEnd} />
        <Rect x="68" y="126" width="10" height="18" rx="5" fill={c.gradientEnd} />

        <Path d="M60 25 L55 42 Q60 48 65 42 Z" fill={c.gradientStart} />
      </Svg>
    </View>
  );
}
