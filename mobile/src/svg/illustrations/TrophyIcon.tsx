import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { View } from 'react-native';

interface Props {
  size?: number;
}

export function TrophyIcon({ size = 130 }: Props) {
  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox="0 0 130 130" fill="none">
        <Path d="M45 35 L85 35 L80 75 Q65 90 50 75 Z" fill="#F7E6B6" />
        <Path d="M45 35 L35 35 Q30 55 45 60" fill="#E8D49A" />
        <Path d="M85 35 L95 35 Q100 55 85 60" fill="#E8D49A" />
        <Rect x="58" y="80" width="14" height="16" rx="3" fill="#D4BC7A" />
        <Rect x="50" y="96" width="30" height="8" rx="4" fill="#F7E6B6" />
        <Circle cx="65" cy="55" r="8" fill="#B9A7F8" opacity={0.5} />
        <Path d="M62 53 L65 48 L68 53 L65 51 Z" fill="#B9A7F8" />
      </Svg>
    </View>
  );
}
