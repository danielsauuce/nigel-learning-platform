import React from 'react';
import { View } from 'react-native';
import { MotiView } from 'moti';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

interface IslandConnectorProps {
  index: number;
  isCompleted: boolean;
}

export function IslandConnector({ index, isCompleted }: IslandConnectorProps) {
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'timing', duration: 300, delay: 200 + index * 80 }}
      style={{
        alignItems: index % 2 === 0 ? 'flex-end' : 'flex-start',
        paddingHorizontal: 48,
        height: 28,
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: 3,
          height: 20,
          borderRadius: 1.5,
          backgroundColor: isCompleted ? '#4CAF50' : c.border,
        }}
      />
    </MotiView>
  );
}
