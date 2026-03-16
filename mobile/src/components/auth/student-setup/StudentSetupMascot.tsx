import React from 'react';
import { View } from 'react-native';
import { MotiView } from 'moti';
import { Mascot } from '@/svg/illustrations';

export function StudentSetupMascot() {
  return (
    <MotiView
      from={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', damping: 14, stiffness: 100, delay: 80 }}
      style={{ alignItems: 'center', marginVertical: 12 }}
    >
      <Mascot size={80} />
    </MotiView>
  );
}
