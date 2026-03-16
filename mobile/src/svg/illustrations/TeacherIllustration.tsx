import React from 'react';
import Svg, { Circle, Ellipse, Path, Rect } from 'react-native-svg';
import { View } from 'react-native';

interface Props {
  size?: number;
}

export function TeacherIllustration({ size = 60 }: Props) {
  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox="0 0 60 60" fill="none">
        <Circle cx="30" cy="30" r="28" fill="#FDE8E4" />
        <Circle cx="30" cy="24" r="12" fill="#F9D6D0" />
        <Ellipse cx="30" cy="48" rx="16" ry="10" fill="#F9D6D0" />
        <Circle cx="26" cy="22" r="2" fill="#22223B" />
        <Circle cx="34" cy="22" r="2" fill="#22223B" />
        <Path
          d="M27 27 Q30 30 33 27"
          stroke="#22223B"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <Rect x="18" y="14" width="24" height="3" rx="1.5" fill="#F7B6B6" />
        <Path d="M30 11 L33 14 L27 14 Z" fill="#F7B6B6" />
      </Svg>
    </View>
  );
}
