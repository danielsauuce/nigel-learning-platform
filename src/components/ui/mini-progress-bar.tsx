import React from 'react';
import { View } from 'react-native';

interface MiniProgressBarProps {
  progress: number;
  color: string;
  height?: number;
}

export function MiniProgressBar({ progress, color, height = 5 }: MiniProgressBarProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 1);

  return (
    <View
      className="w-full overflow-hidden rounded-full"
      style={{ height, backgroundColor: 'rgba(255,255,255,0.08)' }}
    >
      <View
        className="h-full rounded-full"
        style={{ width: `${clampedProgress * 100}%`, backgroundColor: color }}
      />
    </View>
  );
}
