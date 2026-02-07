import React from 'react';
import { Animated } from 'react-native';

import { useFloatAnimation } from '@/hooks/use-animations';

import { BaseSvg } from './BaseSvg';
import { Coin } from './Coin';

interface FloatingCoinProps {
  delay: number;
  startX: number;
  startY: number;
  size: number;
  opacity: number;
}

/**
 * Animated floating coin positioned absolutely on screen.
 * Fades in and bobs up/down in an infinite loop.
 */
export function FloatingCoin({ delay, startX, startY, size, opacity }: FloatingCoinProps) {
  const { fadeIn, translateY } = useFloatAnimation(delay, 18);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: startX,
        top: startY,
        opacity: Animated.multiply(fadeIn, opacity),
        transform: [{ translateY }],
      }}
    >
      <BaseSvg width={size} height={size} viewBox="0 0 40 40">
        <Coin cx={20} cy={20} r={18} gradientId={`floatCoin-${delay}`} />
      </BaseSvg>
    </Animated.View>
  );
}
