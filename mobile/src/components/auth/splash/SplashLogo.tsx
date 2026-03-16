import React from 'react';
import { MotiView } from 'moti';
import { AppIcon } from '@/svg/brand';

export function SplashLogo() {
  return (
    <MotiView
      from={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', damping: 12, stiffness: 120, delay: 300 }}
      className="mb-4 items-center"
    >
      <AppIcon size={80} />
    </MotiView>
  );
}
