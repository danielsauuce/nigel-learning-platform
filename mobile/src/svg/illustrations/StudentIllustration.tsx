import React from 'react';
import Svg, { Circle, Ellipse, Path, Rect } from 'react-native-svg';
import { View } from 'react-native';

interface Props {
  size?: number;
}

export function StudentIllustration({ size = 60 }: Props) {
  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox="0 0 60 60" fill="none">
        <Circle cx="30" cy="30" r="28" fill="#F3F0FF" />
        <Circle cx="30" cy="24" r="12" fill="#B9A7F8" />
        <Ellipse cx="30" cy="48" rx="16" ry="10" fill="#B9A7F8" />
        <Circle cx="26" cy="22" r="2" fill="white" />
        <Circle cx="34" cy="22" r="2" fill="white" />
        <Path
          d="M27 27 Q30 30 33 27"
          stroke="white"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <Rect x="22" y="13" width="16" height="4" rx="2" fill="#F7E6B6" />
      </Svg>
    </View>
  );
}
