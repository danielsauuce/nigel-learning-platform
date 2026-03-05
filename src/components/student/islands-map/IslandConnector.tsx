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

  const isRight = index % 2 !== 0;

  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'timing', duration: 400, delay: 300 + index * 120 }}
      style={{
        alignSelf: isRight ? 'flex-end' : 'flex-start',
        marginLeft: isRight ? undefined : 44,
        marginRight: isRight ? 44 : undefined,
        height: 36,
        justifyContent: 'center',
      }}
    >
      {[0, 1, 2].map((dot) => (
        <View
          key={dot}
          style={{
            width: 4,
            height: 4,
            borderRadius: 2,
            backgroundColor: isCompleted ? '#22C55E' : c.border,
            marginBottom: dot < 2 ? 6 : 0,
            alignSelf: 'center',
          }}
        />
      ))}
    </MotiView>
  );
}
