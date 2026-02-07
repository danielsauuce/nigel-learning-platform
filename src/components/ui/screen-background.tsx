import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants/app';
import { useFloatAnimation, useWaveAnimation } from '@/hooks/use-animations';

// ─── Gradient background ────────────────────────────────────────────

/**
 * Full-screen gradient backdrop used across all auth screens.
 * Positioned absolutely to sit behind all content.
 */
export function GradientBackground() {
  return (
    <LinearGradient
      colors={['#1A1B4B', '#2D3A8C', '#4158D0']}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={StyleSheet.absoluteFillObject}
    />
  );
}

// ─── Star field ─────────────────────────────────────────────────────

interface StarFieldProps {
  /** Number of stars to render. */
  count?: number;
  /** Seed for deterministic positioning. */
  seed?: number;
}

/**
 * Pseudo-random star field rendered in the upper portion of the screen.
 */
export function StarField({ count = 10, seed = 83 }: StarFieldProps) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const size = i % 3 === 0 ? 3 : 2;
        return (
          <View
            key={`star-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              left: (i * seed + 17) % SCREEN_WIDTH,
              top: (i * 59 + 20) % (SCREEN_HEIGHT * 0.35),
              width: size,
              height: size,
              opacity: 0.2 + (i % 4) * 0.1,
            }}
          />
        );
      })}
    </>
  );
}

// ─── Floating sparkle ───────────────────────────────────────────────

interface FloatingSparkleProps {
  delay: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

/**
 * Small colored dot that fades in and floats vertically.
 */
export function FloatingSparkle({ delay, x, y, size, color }: FloatingSparkleProps) {
  const { fadeIn, translateY } = useFloatAnimation(delay);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        opacity: Animated.multiply(fadeIn, 0.5),
        transform: [{ translateY }],
      }}
    />
  );
}

// ─── Default sparkle layout ─────────────────────────────────────────

/**
 * Pre-configured set of floating sparkles used on most auth screens.
 */
export function DefaultSparkles() {
  return (
    <>
      <FloatingSparkle
        delay={0}
        x={SCREEN_WIDTH * 0.06}
        y={SCREEN_HEIGHT * 0.15}
        size={6}
        color="#FFD700"
      />
      <FloatingSparkle
        delay={300}
        x={SCREEN_WIDTH * 0.85}
        y={SCREEN_HEIGHT * 0.1}
        size={5}
        color="#4FC3F7"
      />
      <FloatingSparkle
        delay={150}
        x={SCREEN_WIDTH * 0.72}
        y={SCREEN_HEIGHT * 0.25}
        size={4}
        color="#FF2E91"
      />
      <FloatingSparkle
        delay={500}
        x={SCREEN_WIDTH * 0.15}
        y={SCREEN_HEIGHT * 0.32}
        size={5}
        color="#10B981"
      />
    </>
  );
}

// ─── Animated wave decoration ───────────────────────────────────────

/**
 * Subtle animated wave SVG anchored to the bottom of the screen.
 */
export function WaveDecoration() {
  const { translateX } = useWaveAnimation();
  const waveWidth = SCREEN_WIDTH + 50;

  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: 0,
        left: -25,
        right: -25,
        height: 120,
        transform: [{ translateX }],
      }}
    >
      <Svg
        width={waveWidth}
        height={120}
        viewBox={`0 0 ${waveWidth} 120`}
        style={{ position: 'absolute', bottom: 0 }}
      >
        <Path
          d={`M0 50 Q${SCREEN_WIDTH * 0.15} 25 ${SCREEN_WIDTH * 0.3} 45 Q${SCREEN_WIDTH * 0.45} 65 ${SCREEN_WIDTH * 0.6} 40 Q${SCREEN_WIDTH * 0.75} 15 ${SCREEN_WIDTH * 0.9} 45 Q${SCREEN_WIDTH * 1.05} 75 ${waveWidth} 40 L${waveWidth} 120 L0 120 Z`}
          fill="#4FC3F7"
          opacity={0.12}
        />
        <Path
          d={`M0 70 Q${SCREEN_WIDTH * 0.2} 50 ${SCREEN_WIDTH * 0.35} 65 Q${SCREEN_WIDTH * 0.5} 80 ${SCREEN_WIDTH * 0.65} 60 Q${SCREEN_WIDTH * 0.8} 40 ${SCREEN_WIDTH * 0.95} 65 L${waveWidth} 55 L${waveWidth} 120 L0 120 Z`}
          fill="#4FC3F7"
          opacity={0.08}
        />
      </Svg>
    </Animated.View>
  );
}

// ─── Composed screen background ─────────────────────────────────────

/**
 * Convenience component that renders the full background stack:
 * gradient + stars + sparkles + wave.
 *
 * Used on welcome and role-select screens. The splash screen composes
 * its own background with FloatingCoins instead of sparkles.
 */
export function ScreenBackground() {
  return (
    <>
      <GradientBackground />
      <StarField />
      <DefaultSparkles />
      <WaveDecoration />
    </>
  );
}
