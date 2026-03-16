import React from 'react';
import { View } from 'react-native';
import { MotiView } from 'moti';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

interface PaginationDotsProps {
  total: number;
  activeIndex: number;
}

export function PaginationDots({ total, activeIndex }: PaginationDotsProps) {
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
      {Array.from({ length: total }, (_, i) => {
        const isActive = i === activeIndex;
        return (
          <MotiView
            key={i}
            animate={{
              width: isActive ? 28 : 8,
              opacity: isActive ? 1 : 0.35,
              backgroundColor: isActive ? c.primary : c.mutedForeground,
            }}
            transition={{ type: 'spring', damping: 18, stiffness: 200 }}
            style={{
              height: 8,
              borderRadius: 4,
            }}
          />
        );
      })}
    </View>
  );
}
