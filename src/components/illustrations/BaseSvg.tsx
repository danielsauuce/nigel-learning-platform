import React from 'react';
import { Svg } from 'react-native-svg';

interface BaseSvgProps {
  width: number;
  height: number;
  viewBox?: string;
  children: React.ReactNode;
}

export function BaseSvg({
  width,
  height,
  viewBox = `0 0 ${width} ${height}`,
  children,
}: BaseSvgProps) {
  return (
    <Svg width={width} height={height} viewBox={viewBox}>
      {children}
    </Svg>
  );
}
