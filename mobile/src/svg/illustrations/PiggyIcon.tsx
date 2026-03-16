import React from 'react';
import Svg, { Circle, Ellipse, Path, Rect } from 'react-native-svg';
import { View } from 'react-native';

interface Props {
  size?: number;
}

export function PiggyIcon({ size = 130 }: Props) {
  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox="0 0 130 130" fill="none">
        <Ellipse cx="65" cy="70" rx="38" ry="32" fill="#F7B6B6" />
        <Ellipse cx="65" cy="70" rx="32" ry="26" fill="#F9D6D0" />
        <Circle cx="54" cy="62" r="4" fill="#22223B" />
        <Circle cx="76" cy="62" r="4" fill="#22223B" />
        <Circle cx="55.5" cy="60.5" r="1.5" fill="white" />
        <Circle cx="77.5" cy="60.5" r="1.5" fill="white" />
        <Ellipse cx="65" cy="74" rx="8" ry="5" fill="#F7B6B6" />
        <Circle cx="62" cy="73" r="1.5" fill="#E89999" />
        <Circle cx="68" cy="73" r="1.5" fill="#E89999" />
        <Rect x="58" y="38" width="14" height="5" rx="2.5" fill="#F7E6B6" />
        <Rect x="52" y="92" width="8" height="12" rx="4" fill="#F7B6B6" />
        <Rect x="70" y="92" width="8" height="12" rx="4" fill="#F7B6B6" />
        <Circle cx="48" cy="78" r="6" fill="#FCDADA" opacity={0.6} />
        <Circle cx="82" cy="78" r="6" fill="#FCDADA" opacity={0.6} />
      </Svg>
    </View>
  );
}
