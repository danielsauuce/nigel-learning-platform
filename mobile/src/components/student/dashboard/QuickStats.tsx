import React from 'react';
import { Platform, Text, View } from 'react-native';
import { MotiView } from 'moti';
import { Flame, Coins, Medal } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

interface QuickStatsProps {
  streak: number;
  balance: number;
  rank: number;
}

const STAT_CONFIG = [
  {
    key: 'streak',
    icon: Flame,
    iconColor: '#F7B6B6',
    label: 'Streak',
    suffix: 'd',
    bg: '#FDE8E4',
    accent: '#F7B6B6',
  },
  {
    key: 'balance',
    icon: Coins,
    iconColor: '#F7E6B6',
    label: 'Coins',
    suffix: '',
    bg: '#FFF8E8',
    accent: '#F7E6B6',
  },
  {
    key: 'rank',
    icon: Medal,
    iconColor: '#B9A7F8',
    label: 'Rank',
    prefix: '#',
    bg: '#F3F0FF',
    accent: '#B9A7F8',
  },
] as const;

export function QuickStats({ streak, balance, rank }: QuickStatsProps) {
  const { theme } = useTheme();
  const c = colors[theme];
  const values = { streak, balance, rank };

  return (
    <View style={{ flexDirection: 'row', gap: 12, paddingHorizontal: 24, marginBottom: 20 }}>
      {STAT_CONFIG.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <MotiView
            key={stat.key}
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 16, stiffness: 140, delay: 80 + i * 60 }}
            style={{
              flex: 1,
              backgroundColor: theme === 'dark' ? c.card : stat.bg,
              borderRadius: 18,
              padding: 14,
              alignItems: 'center',
              ...Platform.select({
                ios: {
                  shadowColor: stat.accent,
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                },
                android: { elevation: 2 },
              }),
            }}
          >
            <Icon size={20} color={stat.iconColor} strokeWidth={2} style={{ marginBottom: 4 }} />
            <Text
              style={{
                fontFamily: 'Poppins_700Bold',
                fontSize: 18,
                color: c.foreground,
              }}
            >
              {stat.prefix ?? ''}
              {values[stat.key]}
              {stat.suffix ?? ''}
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins_400Regular',
                fontSize: 11,
                color: c.mutedForeground,
                marginTop: 2,
              }}
            >
              {stat.label}
            </Text>
          </MotiView>
        );
      })}
    </View>
  );
}
