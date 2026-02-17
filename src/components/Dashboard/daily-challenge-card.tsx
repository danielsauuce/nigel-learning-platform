import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface DailyChallengeCardProps {
  title: string;
  description: string;
  xpReward: number;
  onPress: () => void;
}

export function DailyChallengeCard({
  title,
  description,
  xpReward,
  onPress,
}: DailyChallengeCardProps) {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
      <LinearGradient
        colors={['rgba(255,215,0,0.18)', 'rgba(245,166,35,0.06)']}
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
          borderColor: 'rgba(255,215,0,0.15)',
        }}
      >
        {/* Icon */}
        <View
          className="h-[50px] w-[50px] items-center justify-center rounded-[14px]"
          style={{ backgroundColor: 'rgba(255,215,0,0.12)' }}
        >
          <Text className="text-[28px]">⚡</Text>
        </View>

        {/* Text */}
        <View className="flex-1">
          <Text className="font-poppins-semibold text-[11px] uppercase tracking-wider text-gold">
            Daily Challenge
          </Text>
          <Text className="mt-0.5 font-poppins-semibold text-sm text-white">{title}</Text>
          <Text
            className="mt-0.5 font-poppins-regular text-xs"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            {description}
          </Text>
        </View>

        {/* XP badge */}
        <View
          className="rounded-[10px] px-2.5 py-1.5"
          style={{ backgroundColor: 'rgba(255,215,0,0.18)' }}
        >
          <Text className="font-poppins-bold text-xs text-gold">+{xpReward} XP</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
