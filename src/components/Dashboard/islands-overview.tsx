import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { MiniProgressBar } from '@/components/ui/mini-progress-bar';

export interface IslandPreview {
  id: string;
  name: string;
  emoji: string;
  color: string;
  progress: number;
}

interface IslandsOverviewProps {
  islands: IslandPreview[];
  onIslandPress?: (id: string) => void;
}

// Helper to get the status label for an island
function getStatusLabel(progress: number): string {
  if (progress === 1) return '✅ Complete';
  if (progress === 0) return '🔒 Locked';
  return `${Math.round(progress * 100)}%`;
}

export function IslandsOverview({ islands, onIslandPress }: IslandsOverviewProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 12, paddingRight: 20, paddingBottom: 4 }}
    >
      {islands.map((island) => (
        <TouchableOpacity
          key={island.id}
          activeOpacity={0.85}
          onPress={() => onIslandPress?.(island.id)}
        >
          <View className="w-[130px] overflow-hidden rounded-2xl">
            <LinearGradient
              colors={[`${island.color}20`, `${island.color}08`]}
              className="items-center rounded-2xl px-3.5 py-4"
              style={{
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.06)',
                gap: 6,
              }}
            >
              <Text className="text-[28px]">{island.emoji}</Text>
              <Text
                className="text-center font-poppins-semibold text-xs text-white"
                numberOfLines={1}
              >
                {island.name}
              </Text>
              <MiniProgressBar progress={island.progress} color={island.color} />
              <Text
                className="mt-0.5 font-poppins-regular text-[11px]"
                style={{ color: 'rgba(255,255,255,0.45)' }}
              >
                {getStatusLabel(island.progress)}
              </Text>
            </LinearGradient>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
