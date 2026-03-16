import React from 'react';
import { View } from 'react-native';
import { MotiView } from 'moti';

interface StepIndicatorProps {
  total: number;
  current: number;
}

export function StepIndicator({ total, current }: StepIndicatorProps) {
  return (
    <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center', justifyContent: 'center' }}>
      {Array.from({ length: total }, (_, i) => (
        <MotiView
          key={i}
          animate={{
            width: i === current ? 24 : 8,
            backgroundColor: i === current ? '#B9A7F8' : i < current ? '#D4C8FF' : '#E8E4F0',
          }}
          transition={{ type: 'spring', damping: 18, stiffness: 200 }}
          style={{ height: 8, borderRadius: 4 }}
        />
      ))}
    </View>
  );
}
