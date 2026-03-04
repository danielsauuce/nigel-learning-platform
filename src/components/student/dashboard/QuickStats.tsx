import React from 'react';
import { Platform, Text, View } from 'react-native';
import { MotiView } from 'moti';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

interface StatItem {
  key: string;
  emoji: string;
  label: string;
  value: string;
  sublabel?: string;
}

interface QuickStatsProps {
  streak: number;
  balance: number;
  rank: number;
}

export function QuickStats({ streak, balance, rank }: QuickStatsProps) {
  const { theme } = useTheme();
  const c = colors[theme];

  const stats: StatItem[] = [
    {
      key: 'streak',
      emoji: '🔥',
      label: 'STREAK',
      value: String(streak),
      sublabel: 'days',
    },
    {
      key: 'balance',
      emoji: '💰',
      label: 'BALANCE',
      value: `£${balance}`,
      // sublabel: 'Sim',
    },
    {
      key: 'rank',
      emoji: '🏆',
      label: 'RANK',
      value: `#${rank}`,
      sublabel: 'global',
    },
  ];

  return (
    <View style={{ flexDirection: 'row', paddingHorizontal: 24, gap: 10, marginBottom: 20 }}>
      {stats.map((stat, index) => (
        <MotiView
          key={stat.key}
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 14, stiffness: 140, delay: 150 + index * 80 }}
          style={{
            flex: 1,
            backgroundColor: c.card,
            borderRadius: 16,
            paddingVertical: 14,
            paddingHorizontal: 10,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: c.border,
            ...Platform.select({
              ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: theme === 'dark' ? 0.15 : 0.04,
                shadowRadius: 4,
              },
              android: { elevation: 1 },
            }),
          }}
        >
          {/* Label row */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 6 }}>
            <Text style={{ fontSize: 12 }}>{stat.emoji}</Text>
            <Text
              style={{
                fontFamily: 'Poppins_600SemiBold',
                fontSize: 10,
                color: c.mutedForeground,
                letterSpacing: 0.6,
              }}
            >
              {stat.label}
            </Text>
          </View>

          {/* Value */}
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 3 }}>
            <Text
              style={{
                fontFamily: 'Poppins_700Bold',
                fontSize: 20,
                color: c.foreground,
              }}
            >
              {stat.value}
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins_400Regular',
                fontSize: 11,
                color: c.mutedForeground,
              }}
            >
              {stat.sublabel}
            </Text>
          </View>
        </MotiView>
      ))}
    </View>
  );
}
