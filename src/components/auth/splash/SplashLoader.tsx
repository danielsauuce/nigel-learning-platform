import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { MotiView } from 'moti';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

interface SplashLoaderProps {
  onLoadComplete: () => void;
}

export function SplashLoader({ onLoadComplete }: SplashLoaderProps) {
  const { theme } = useTheme();
  const c = colors[theme];
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 18 + 5;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(onLoadComplete, 600);
      }
      setProgress(Math.min(p, 100));
    }, 280);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  return (
    <MotiView
      from={{ opacity: 0, translateY: 12 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 500, delay: 1600 }}
      className="items-center gap-3.5"
    >
      <ActivityIndicator size="small" color={c.gradientStart} />

      <MotiView
        from={{ opacity: 0.45 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing', duration: 1200, loop: true, repeatReverse: true }}
      >
        <Text className="font-poppins-regular text-[13px] text-muted-foreground">
          Synchronizing your dashboard…
        </Text>
      </MotiView>

      <View className="w-[170px] items-center gap-2">
        <View
          className="h-[3px] w-full overflow-hidden rounded-full"
          style={{ backgroundColor: `${c.gradientEnd}18` }}
        >
          <View
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              backgroundColor: c.gradientStart,
            }}
          />
        </View>

        <Text
          className="font-poppins-semibold text-muted-foreground"
          style={{ fontSize: 10, letterSpacing: 1.8 }}
        >
          VERSION 1.0.0
        </Text>
      </View>
    </MotiView>
  );
}
