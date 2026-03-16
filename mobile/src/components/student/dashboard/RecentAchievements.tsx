import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
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
  onViewAll: () => void;
}

export function RecentAchievements({ badges, onViewAll }: RecentAchievementsProps) {
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <MotiView
      from={{ opacity: 0, translateY: 12 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 440 }}
      style={{ paddingHorizontal: 24, marginBottom: 20 }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 14,
        }}
      >
        <Text
          style={{
            fontFamily: 'Poppins_700Bold',
            fontSize: 16,
            color: c.foreground,
          }}
        >
          Recent Achievements
        </Text>
        <TouchableOpacity onPress={onViewAll}>
          <Text
            style={{
              fontFamily: 'Poppins_500Medium',
              fontSize: 13,
              color: '#B9A7F8',
            }}
          >
            See more
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', gap: 12 }}>
        {badges.map((badge, i) => (
          <MotiView
            key={badge.key}
            from={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 14, stiffness: 140, delay: 500 + i * 60 }}
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: c.card,
              borderRadius: 18,
              paddingVertical: 14,
              paddingHorizontal: 8,
              ...Platform.select({
                ios: {
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.04,
                  shadowRadius: 6,
                },
                android: { elevation: 2 },
              }),
            }}
          >
            <Text style={{ fontSize: 24, marginBottom: 6 }}>{badge.emoji}</Text>
            <Text
              style={{
                fontFamily: 'Poppins_500Medium',
                fontSize: 10,
                color: c.mutedForeground,
                textAlign: 'center',
              }}
              numberOfLines={1}
            >
              {badge.label}
            </Text>
          </MotiView>
        ))}
      </View>
    </MotiView>
  );
}
