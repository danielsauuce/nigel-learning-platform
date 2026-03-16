import React from 'react';
import Svg, { Circle, Ellipse, Path, Rect } from 'react-native-svg';
import { View } from 'react-native';

interface Props {
  size?: number;
}

export function IslandIcon({ size = 130 }: Props) {
  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox="0 0 130 130" fill="none">
        <Ellipse cx="65" cy="90" rx="45" ry="20" fill="#F7E6B6" />
        <Rect x="60" y="40" width="10" height="50" rx="5" fill="#8D6E63" />
        <Ellipse cx="65" cy="38" rx="28" ry="22" fill="#66BB6A" />
        <Circle cx="55" cy="32" r="6" fill="#4CAF50" />
        <Circle cx="75" cy="35" r="5" fill="#8BC34A" />
        <Circle cx="40" cy="80" r="8" fill="#B9A7F8" opacity={0.3} />
        <Circle cx="95" cy="75" r="6" fill="#F7B6B6" opacity={0.3} />
      </Svg>
    </View>
  );
}
