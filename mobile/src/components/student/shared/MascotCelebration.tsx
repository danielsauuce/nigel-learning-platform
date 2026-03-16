import React, { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { MotiView } from 'moti';
import { MascotCelebrating, ConfettiRain, HurrayBanner } from '@/svg/illustrations';

const { width: SCREEN_W } = Dimensions.get('window');

interface MascotCelebrationProps {
  size?: number;
  showConfetti?: boolean;
  enableJump?: boolean;
  showHurray?: boolean;
}

/**
 * Full celebration scene:
 *  1. "Hurray!" text falls from top with spring bounce
 *  2. Confetti particles + emoji hurray rain from above
 *  3. Mascot springs in wearing graduation cap
 *  4. Mascot continuously jumps with arms raised
 *  5. Shadow squishes in sync with jump
 */
export function MascotCelebration({
  size = 160,
  showConfetti = true,
  enableJump = true,
  showHurray = true,
}: MascotCelebrationProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={{ alignItems: 'center', position: 'relative', paddingTop: 10 }}>
      {/* Confetti raining from top */}
      {showConfetti && visible && <ConfettiRain width={SCREEN_W} height={320} />}

      {/* "Hurray!" text drops in from top */}
      {showHurray && visible && <HurrayBanner />}

      {/* Mascot entrance + jump */}
      <MotiView
        from={{ opacity: 0, translateY: 100, scale: 0.5 }}
        animate={{
          opacity: visible ? 1 : 0,
          translateY: visible ? 0 : 100,
          scale: visible ? 1 : 0.5,
        }}
        transition={{
          type: 'spring',
          damping: 8,
          stiffness: 80,
          mass: 1.2,
          delay: 500,
        }}
      >
        {/* Jump loop */}
        <MotiView
          from={{ translateY: 0 }}
          animate={enableJump && visible ? { translateY: -22 } : { translateY: 0 }}
          transition={
            enableJump
              ? {
                  type: 'timing',
                  duration: 450,
                  delay: 1000,
                  loop: true,
                  repeatReverse: true,
                }
              : { type: 'timing', duration: 300 }
          }
        >
          <MascotCelebrating size={size} />
        </MotiView>
      </MotiView>

      {/* Jump shadow — squishes with jump */}
      <MotiView
        from={{ scaleX: 0.4, opacity: 0 }}
        animate={{
          scaleX: visible ? 0.7 : 0.4,
          opacity: visible ? 0.08 : 0,
        }}
        transition={{
          type: 'timing',
          duration: 450,
          loop: true,
          repeatReverse: true,
          delay: 1000,
        }}
        style={{
          width: size * 0.6,
          height: 10,
          borderRadius: 10,
          backgroundColor: '#22223B',
          marginTop: -6,
        }}
      />
    </View>
  );
}
