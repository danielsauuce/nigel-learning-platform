import React from 'react';
import { View, Text } from 'react-native';
import { Zap } from 'lucide-react-native';
import { Student } from '../data/students';

export function SimBadge({ level }: { level: Student['simLevel'] }) {
  const config = {
    HIGH: { color: '#6C5CE7', bg: 'rgba(108,92,231,0.08)', icon: true },
    STEADY: { color: '#22C55E', bg: 'rgba(34,197,94,0.08)', icon: false },
    LOW: { color: '#F59E0B', bg: 'rgba(245,158,11,0.08)', icon: false },
  }[level];

  return (
    <View
      className="flex-row items-center gap-1 rounded-full px-2 py-0.5"
      style={{ backgroundColor: config.bg }}
    >
      {config.icon ? (
        <Zap size={10} color={config.color} strokeWidth={2.5} fill={config.color} />
      ) : (
        <View className="h-2 w-2 rounded-full" style={{ backgroundColor: config.color }} />
      )}

      <Text className="font-poppins-bold text-[10px]" style={{ color: config.color }}>
        {level}
      </Text>
    </View>
  );
}
