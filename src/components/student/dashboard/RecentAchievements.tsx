import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';

interface Badge {
  key: string;
  emoji: string;
  label: string;
}

interface RecentAchievementsProps {
  badges: Badge[];
  onViewAll?: () => void;
}

const DEFAULT_BADGES: Badge[] = [
  { key: 'early_bird', emoji: '🔥', label: 'Early Bird' },
  { key: 'smart_saver', emoji: '💰', label: 'Smart Saver' },
  { key: 'island_king', emoji: '🏆', label: 'Island King' },
  { key: 'goal_setter', emoji: '⭐', label: 'Goal Setter' },
];

export function RecentAchievements({
  badges = DEFAULT_BADGES,
  onViewAll,
}: RecentAchievementsProps) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 14 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 450 }}
      className="mb-6"
    >
      {/* Section Header */}
      <View className="mb-3.5 flex-row items-center justify-between px-6">
        <Text className="font-poppins-bold text-lg text-foreground">Recent Achievements</Text>

        <TouchableOpacity activeOpacity={0.7} onPress={onViewAll}>
          <Text className="font-poppins-semibold text-sm text-gradient-start">View All</Text>
        </TouchableOpacity>
      </View>

      {/* Badge Row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="px-6 gap-2.5"
      >
        {badges.map((badge, index) => (
          <MotiView
            key={badge.key}
            from={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: 'spring',
              damping: 14,
              stiffness: 140,
              delay: 500 + index * 60,
            }}
          >
            <View className="flex-row items-center gap-1.5 rounded-full border border-border bg-muted px-3.5 py-2.5 dark:bg-card">
              <Text className="text-base">{badge.emoji}</Text>

              <Text className="font-poppins-semibold text-sm text-primary">{badge.label}</Text>
            </View>
          </MotiView>
        ))}
      </ScrollView>
    </MotiView>
  );
}
