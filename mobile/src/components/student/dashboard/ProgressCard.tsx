import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import { ChevronRight } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

interface ProgressCardProps {
  title: string;
  completion: number;
  missionsDone: number;
  totalMissions: number;
  onDetails: () => void;
}

export function ProgressCard({
  title,
  completion,
  missionsDone,
  totalMissions,
  onDetails,
}: ProgressCardProps) {
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <MotiView
      from={{ opacity: 0, translateY: 12 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 180 }}
      style={{ paddingHorizontal: 24, marginBottom: 20 }}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onDetails}
        style={{
          backgroundColor: c.card,
          borderRadius: 22,
          padding: 20,
          ...Platform.select({
            ios: {
              shadowColor: '#B9A7F8',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.08,
              shadowRadius: 12,
            },
            android: { elevation: 3 },
          }),
        }}
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
            {title}
          </Text>
          <ChevronRight size={18} color={c.mutedForeground} />
        </View>

        {/* Progress bar */}
        <View
          style={{
            height: 10,
            borderRadius: 5,
            backgroundColor: theme === 'dark' ? c.muted : '#F3F0FF',
            overflow: 'hidden',
            marginBottom: 12,
          }}
        >
          <MotiView
            from={{ width: '0%' }}
            animate={{ width: `${completion}%` as any }}
            transition={{ type: 'timing', duration: 800, delay: 400 }}
            style={{
              height: '100%',
              borderRadius: 5,
              backgroundColor: c.primary,
            }}
          />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text
            style={{
              fontFamily: 'Poppins_500Medium',
              fontSize: 13,
              color: c.mutedForeground,
            }}
          >
            {missionsDone}/{totalMissions} missions
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins_700Bold',
              fontSize: 14,
              color: c.primary,
            }}
          >
            {completion}%
          </Text>
        </View>
      </TouchableOpacity>
    </MotiView>
  );
}
