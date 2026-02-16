import React from 'react';
import { Text, View } from 'react-native';

export interface Badge {
  id: string;
  emoji: string;
  label: string;
  color: string;
}

interface BadgesRowProps {
  badges: Badge[];
}

export function BadgesRow({ badges }: BadgesRowProps) {
  return (
    <View className="flex-row" style={{ gap: 16 }}>
      {badges.map((badge) => (
        <View key={badge.id} className="items-center" style={{ gap: 6 }}>
          <View
            className="h-14 w-14 items-center justify-center rounded-full"
            style={{
              backgroundColor: `${badge.color}20`,
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.06)',
            }}
          >
            <Text className="text-2xl">{badge.emoji}</Text>
          </View>
          <Text
            className="text-center font-poppins-medium text-[11px]"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            {badge.label}
          </Text>
        </View>
      ))}
    </View>
  );
}
