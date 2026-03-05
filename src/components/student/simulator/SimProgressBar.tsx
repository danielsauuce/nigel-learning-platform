import React from 'react';
import { Text, View } from 'react-native';
import { MotiView } from 'moti';

interface SimProgressBarProps {
  progress: number;
}

export function SimProgressBar({ progress }: SimProgressBarProps) {
  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'timing', duration: 350, delay: 100 }}
    >
      <View className="mb-6 px-6">
        <View className="mb-2 flex-row items-center justify-between">
          <Text className="font-poppins-semibold text-xs uppercase tracking-wider text-muted-foreground">
            Simulation Progress
          </Text>
          <Text className="font-poppins-semibold text-xs text-muted-foreground">{progress}%</Text>
        </View>

        <View className="h-1.5 overflow-hidden rounded-full bg-border">
          <MotiView
            from={{ width: '0%' as any }}
            animate={{ width: `${progress}%` as any }}
            transition={{ type: 'timing', duration: 700, delay: 300 }}
            className="h-full rounded-full bg-primary"
          />
        </View>
      </View>
    </MotiView>
  );
}
