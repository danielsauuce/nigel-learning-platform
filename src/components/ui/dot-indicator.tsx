import React from 'react';
import { View } from 'react-native';

interface DotIndicatorProps {
  count: number;
  activeIndex: number;
  colors: string | string[];
  inactiveColor?: string;
}
export function DotIndicator({
  count,
  activeIndex,
  colors,
  inactiveColor = 'rgba(255,255,255,0.25)',
}: DotIndicatorProps) {
  return (
    <View className="flex-row items-center justify-center" style={{ gap: 8 }}>
      {Array.from({ length: count }, (_, i) => {
        const isActive = i === activeIndex;
        const color = Array.isArray(colors) ? (colors[i] ?? colors[0]) : colors;

        return (
          <View
            key={i}
            style={{
              height: 8,
              borderRadius: 4,
              backgroundColor: isActive ? color : inactiveColor,
              width: isActive ? 24 : 8,
            }}
          />
        );
      })}
    </View>
  );
}
