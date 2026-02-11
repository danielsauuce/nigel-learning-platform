import React from 'react';
import { View } from 'react-native';

interface RadioIndicatorProps {
  selected: boolean;
  color: string;
  size?: number;
}

export function RadioIndicator({ selected, color, size = 26 }: RadioIndicatorProps) {
  const innerSize = Math.round(size * 0.46);

  return (
    <View
      className="items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        borderWidth: 2,
        borderColor: selected ? color : 'rgba(255,255,255,0.2)',
        backgroundColor: selected ? `${color}26` : 'transparent',
      }}
    >
      {selected && (
        <View
          style={{
            width: innerSize,
            height: innerSize,
            borderRadius: innerSize / 2,
            backgroundColor: color,
          }}
        />
      )}
    </View>
  );
}
