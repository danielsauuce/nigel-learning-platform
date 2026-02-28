import React from 'react';
import { Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

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
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <MotiView
      from={{ opacity: 0, translateY: 14 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 450 }}
      style={{ marginBottom: 24 }}
    >
      {/* Section header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 24,
          marginBottom: 14,
        }}
      >
        <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 18, color: c.foreground }}>
          Recent Achievements
        </Text>
        <TouchableOpacity activeOpacity={0.7} onPress={onViewAll}>
          <Text
            style={{
              fontFamily: 'Poppins_600SemiBold',
              fontSize: 13,
              color: c.gradientStart,
            }}
          >
            View All
          </Text>
        </TouchableOpacity>
      </View>

      {/* Badge row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, gap: 10 }}
      >
        {badges.map((badge, index) => (
          <MotiView
            key={badge.key}
            from={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 14, stiffness: 140, delay: 500 + index * 60 }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
                paddingHorizontal: 14,
                paddingVertical: 10,
                borderRadius: 24,
                backgroundColor: theme === 'dark' ? c.muted : '#F0EDFF',
                borderWidth: 1,
                borderColor: theme === 'dark' ? c.border : '#E0DAFF',
              }}
            >
              <Text style={{ fontSize: 15 }}>{badge.emoji}</Text>
              <Text
                style={{
                  fontFamily: 'Poppins_600SemiBold',
                  fontSize: 13,
                  color: c.gradientStart,
                }}
              >
                {badge.label}
              </Text>
            </View>
          </MotiView>
        ))}
      </ScrollView>
    </MotiView>
  );
}
