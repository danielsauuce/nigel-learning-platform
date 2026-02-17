import React from 'react';
import { Text, View } from 'react-native';

export interface StatItem {
  value: string;
  label: string;
}

interface QuickStatsBarProps {
  stats: StatItem[];
}

export function QuickStatsBar({ stats }: QuickStatsBarProps) {
  return (
    <View
      className="flex-row items-center rounded-2xl px-2 py-3.5"
      style={{
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
      }}
    >
      {stats.map((stat, index) => (
        <React.Fragment key={stat.label}>
          {index > 0 && (
            <View className="h-7 w-px" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
          )}
          <View className="flex-1 items-center">
            <Text className="font-poppins-bold text-[20px] text-white">{stat.value}</Text>
            <Text
              className="mt-0.5 font-poppins-regular text-[14px]"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              {stat.label}
            </Text>
          </View>
        </React.Fragment>
      ))}
    </View>
  );
}
