import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

interface FadeSlideConfig {
  delay?: number;
  duration?: number;
  fromY?: number;
  spring?: boolean;
}

/**
 * Returns { opacity, translateY } animated values that fade + slide in.
 * Call `start()` on the returned object to trigger.
 */
export function useFadeSlide({
  delay = 0,
  duration = 450,
  fromY = 30,
  spring = false,
}: FadeSlideConfig = {}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(fromY)).current;

  const start = () => {
    const slideAnim = spring
      ? Animated.spring(translateY, {
          toValue: 0,
          friction: 6,
          tension: 50,
          useNativeDriver: true,
        })
      : Animated.timing(translateY, {
          toValue: 0,
          duration,
          useNativeDriver: true,
        });

    return Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }),
      slideAnim,
    ]);
  };

  return { opacity, translateY, start };
}

/**
 * Looping wave translate animation.
 */
export function useWaveAnimation(duration = 3500) {
  const waveOffset = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(waveOffset, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(waveOffset, {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const translateX = waveOffset.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -25],
  });

  return { waveOffset, translateX };
}

/**
 * Looping float animation for decorative elements.
 */
export function useFloatAnimation(delay = 0, amplitude = 14) {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const fadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 600,
      delay: delay + 300,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2200 + delay * 0.4,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2200 + delay * 0.4,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -amplitude],
  });

  return { fadeIn, translateY };
}

/**
 * Bounce-pulse for selection feedback.
 */
export function usePulse() {
  const scale = useRef(new Animated.Value(1)).current;

  const pulse = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 3,
        tension: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const reset = () => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  return { scale, pulse, reset };
}
