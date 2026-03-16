import React, { useEffect, useState } from 'react';
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
    const totalDuration = 3500;
    const intervalTime = 35;
    const steps = totalDuration / intervalTime;
    const increment = 100 / steps;
    let progressValue = 0;

    const interval = setInterval(() => {
      progressValue += increment;
      if (progressValue >= 100) {
        progressValue = 100;
        clearInterval(interval);
        onLoadComplete();
      }
      setProgress(progressValue);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  return (
    <MotiView
      from={{ opacity: 0, translateY: 12 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 500, delay: 1600 }}
      className="items-center gap-3.5"
    >
      <ActivityIndicator size="small" color={c.primary} />

      <MotiView
        from={{ opacity: 0.45 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing', duration: 1200, loop: true, repeatReverse: true }}
      >
        <Text
          style={{
            fontFamily: 'Poppins_400Regular',
            fontSize: 13,
            color: c.mutedForeground,
          }}
        >
          Preparing your adventure...
        </Text>
      </MotiView>

      <View className="w-[170px] items-center gap-2">
        <View
          className="h-[4px] w-full overflow-hidden rounded-full"
          style={{ backgroundColor: `${c.primary}18` }}
        >
          <View
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              backgroundColor: c.primary,
            }}
          />
        </View>
      </View>
    </MotiView>
  );
}
