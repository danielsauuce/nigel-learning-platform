import React from 'react';
import { Circle } from 'react-native-svg';

interface SparkleProps {
  x: number;
  y: number;
  r?: number;
  color?: string;
  opacity?: number;
}

export function Sparkle({ x, y, r = 3, color = '#FFD700', opacity = 0.6 }: SparkleProps) {
  return <Circle cx={x} cy={y} r={r} fill={color} opacity={opacity} />;
}
