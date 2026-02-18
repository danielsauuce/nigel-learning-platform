import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { MiniProgressBar } from '@/components/ui/mini-progress-bar';

interface ContinueLearningCardProps {
  islandName: string;
  islandEmoji: string;
  missionTitle: string;
  islandColor: string;
  progress: number;
  onPress?: () => void;
}

export function ContinueLearningCard({
  islandName,
  islandEmoji,
  missionTitle,
  islandColor,
  progress,
  onPress,
}: ContinueLearningCardProps) {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
      <LinearGradient
        colors={[`${islandColor}22`, `${islandColor}08`]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 14,
          borderRadius: 18,
          paddingHorizontal: 16,
          paddingVertical: 16,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.08)',
        }}
      >
        {/* Island emoji */}
        <View
          className="h-14 w-14 items-center justify-center rounded-2xl"
          style={{ backgroundColor: `${islandColor}25` }}
        >
          <Text className="text-[30px]">{islandEmoji}</Text>
        </View>

        {/* Info */}
        <View className="flex-1">
          <Text
            className="font-poppins-medium text-[16px] tracking-wide"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            {islandName}
          </Text>
          <Text className="mb-2 mt-0.5 font-poppins-semibold text-[13px] text-white">
            {missionTitle}
          </Text>
          <MiniProgressBar progress={progress} color={islandColor} />
        </View>

        {/* Play button */}
        <View className="overflow-hidden rounded-[14px]">
          <LinearGradient
            colors={[islandColor, `${islandColor}CC`]}
            style={{
              width: 42,
              height: 42,
              borderRadius: 14,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text className="ml-0.5 text-sm text-white">▶</Text>
          </LinearGradient>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
