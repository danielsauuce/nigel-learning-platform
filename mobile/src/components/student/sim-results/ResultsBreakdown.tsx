import React from 'react';
import { Text, View } from 'react-native';
import { MotiView } from 'moti';

interface StatPill {
  key: string;
  emoji: string;
  label: string;
  value: string;
}

interface ResultsBreakdownProps {
  stats: StatPill[];
}

export function ResultsBreakdown({ stats }: ResultsBreakdownProps) {
  return (
    <View className="mt-5 flex-row gap-2.5 px-6">
      {stats.map((stat, index) => (
        <MotiView
          key={stat.key}
          from={{ opacity: 0, translateY: 12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 130, delay: 600 + index * 80 }}
          className="flex-1"
        >
          <View className="items-center rounded-2xl border border-border bg-card py-3.5">
            <Text className="mb-1 text-lg">{stat.emoji}</Text>
            <Text className="mb-1 font-poppins-semibold text-xs uppercase tracking-wider text-muted-foreground">
              {stat.label}
            </Text>
            <Text className="font-poppins-bold text-lg text-foreground">{stat.value}</Text>
          </View>
        </MotiView>
      ))}
    </View>
  );
}
