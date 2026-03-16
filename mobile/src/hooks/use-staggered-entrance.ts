import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

// ─── Types ──────────────────────────────────────────────────────────

interface StageConfig {
  /** Starting Y offset (positive = from below, negative = from above). */
  fromY?: number;
  /** Animation duration in ms. Ignored when `spring` is true. */
  duration?: number;
  /** Use a spring animation instead of timing for the slide. */
  spring?: boolean;
  /** Spring friction (only used when `spring: true`). */
  friction?: number;
  /** Spring tension (only used when `spring: true`). */
  tension?: number;
}

interface ScaleStageConfig extends StageConfig {
  /** Starting scale value (e.g. 0.3). */
  fromScale: number;
}

type Stage = StageConfig | ScaleStageConfig;

/**
 * Drives a sequential staggered entrance animation for N visual stages.
 *
 * Each stage gets an `opacity` (0 → 1) and either a `translateY` or `scale`
 * animated value. The stages play one after another in the order given.
 *
 * @example
 * ```ts
 * const stages = useStaggeredEntrance([
 *   { fromScale: 0.3, spring: true, friction: 4, tension: 60 },  // logo pop
 *   { fromY: 30, duration: 500 },   // title slide up
 *   { fromY: 20, duration: 400 },   // subtitle
 *   { fromY: 40, duration: 400 },   // CTA button
 * ]);
 *
 * // In JSX:
 * <Animated.View style={stages[0].style}>…</Animated.View>
 * ```
 */
export function useStaggeredEntrance(configs: Stage[]) {
  const animations = useRef(
    configs.map((cfg) => {
      const isScale = 'fromScale' in cfg;
      return {
        opacity: new Animated.Value(0),
        translateY: isScale ? undefined : new Animated.Value(cfg.fromY ?? 30),
        scale: isScale ? new Animated.Value((cfg as ScaleStageConfig).fromScale) : undefined,
      };
    }),
  ).current;

  useEffect(() => {
    const sequence = configs.map((cfg, i) => {
      const { opacity, translateY, scale } = animations[i];
      const isScale = 'fromScale' in cfg;
      const duration = cfg.duration ?? 450;

      const fadeAnim = Animated.timing(opacity, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      });

      let moveAnim: Animated.CompositeAnimation;

      if (isScale && scale) {
        moveAnim = cfg.spring
          ? Animated.spring(scale, {
              toValue: 1,
              friction: cfg.friction ?? 4,
              tension: cfg.tension ?? 60,
              useNativeDriver: true,
            })
          : Animated.timing(scale, {
              toValue: 1,
              duration,
              useNativeDriver: true,
            });
      } else if (translateY) {
        moveAnim = cfg.spring
          ? Animated.spring(translateY, {
              toValue: 0,
              friction: cfg.friction ?? 6,
              tension: cfg.tension ?? 50,
              useNativeDriver: true,
            })
          : Animated.timing(translateY, {
              toValue: 0,
              duration,
              useNativeDriver: true,
            });
      } else {
        moveAnim = fadeAnim; // fallback — just fade
      }

      return Animated.parallel([fadeAnim, moveAnim]);
    });

    Animated.sequence(sequence).start();
  }, []);

  return animations.map(({ opacity, translateY, scale }) => ({
    opacity,
    translateY,
    scale,
    /** Ready-to-spread animated style object. */
    style: {
      opacity,
      transform: scale ? [{ scale }] : translateY ? [{ translateY }] : [],
    },
  }));
}
