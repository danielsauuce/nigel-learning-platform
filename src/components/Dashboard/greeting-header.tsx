import React from 'react';
import { Text, View } from 'react-native';

import { ProgressRing } from '@/components/ui/progress-ring';

interface GreetingHeaderProps {
  nickname: string;
  streak: number;
  progress: number;
}

export function GreetingHeader({ nickname, streak, progress }: GreetingHeaderProps) {
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-1">
        <Text className="font-poppins-regular text-[18px]" style={{ color: 'rgba(255,255,255,0.55)' }}>
          Welcome back,
        </Text>
        <Text
          className="mt-0.5 font-fredoka text-[30px] leading-[34px] text-white"
          style={{
            textShadowColor: 'rgba(0,0,0,0.2)',
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 4,
          }}
        >
          {nickname} 👋
        </Text>
        <Text className="mt-1.5 font-poppins-medium text-[13px] text-gold">
          🔥 {streak} day streak
        </Text>
      </View>

      <View className="h-[76px] w-[76px] items-center justify-center">
        <ProgressRing progress={progress} size={76} strokeWidth={7} color="#FFD700" />
        <View className="absolute items-center">
          <Text className="font-poppins-bold text-base leading-5 text-white">
            {Math.round(progress * 100)}%
          </Text>
          <Text
            className="-mt-0.5 font-poppins-regular text-[13px]"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            done
          </Text>
        </View>
      </View>
    </View>
  );
}
