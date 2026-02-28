import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import { TrendingUp, Trophy } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

interface ProgressCardProps {
  title: string;
  completion: number;
  missionsDone: number;
  totalMissions: number;
  onDetails?: () => void;
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
      from={{ opacity: 0, translateY: 16 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 100 }}
      style={{ paddingHorizontal: 24, marginBottom: 16 }}
    >
      <View
        style={{
          backgroundColor: c.card,
          borderRadius: 20,
          padding: 20,
          borderWidth: 1,
          borderColor: c.border,
          ...Platform.select({
            ios: {
              shadowColor: c.gradientStart,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.08,
              shadowRadius: 12,
            },
            android: { elevation: 3 },
          }),
        }}
      >
        {/* Header row */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 4,
          }}
        >
          <Text
            style={{
              fontFamily: 'Poppins_600SemiBold',
              fontSize: 11.5,
              color: c.gradientStart,
              letterSpacing: 0.8,
              textTransform: 'uppercase',
            }}
          >
            Your Progress
          </Text>
          <TouchableOpacity activeOpacity={0.7} onPress={onDetails}>
            <TrendingUp size={20} color={c.gradientStart} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text
          style={{
            fontFamily: 'Poppins_700Bold',
            fontSize: 18,
            color: c.foreground,
            marginBottom: 14,
          }}
        >
          {title}
        </Text>

        {/* Progress bar row */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 6,
          }}
        >
          <Text
            style={{
              fontFamily: 'Poppins_400Regular',
              fontSize: 13,
              color: c.mutedForeground,
            }}
          >
            Completion
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins_700Bold',
              fontSize: 16,
              color: c.gradientStart,
            }}
          >
            {completion}%
          </Text>
        </View>

        {/* Bar */}
        <View
          style={{
            height: 8,
            borderRadius: 4,
            backgroundColor: theme === 'dark' ? c.muted : '#F0EDFF',
            marginBottom: 14,
            overflow: 'hidden',
          }}
        >
          <MotiView
            from={{ width: '0%' as any }}
            animate={{ width: `${completion}%` as any }}
            transition={{ type: 'timing', duration: 800, delay: 400 }}
            style={{
              height: '100%',
              borderRadius: 4,
              backgroundColor: c.gradientStart,
            }}
          />
        </View>

        {/* Missions row */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Trophy size={15} color={c.mutedForeground} strokeWidth={2} />
            <Text
              style={{
                fontFamily: 'Poppins_500Medium',
                fontSize: 13,
                color: c.mutedForeground,
              }}
            >
              {missionsDone} Missions Done
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onDetails}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
          >
            <Text
              style={{
                fontFamily: 'Poppins_600SemiBold',
                fontSize: 13,
                color: c.gradientStart,
              }}
            >
              Details
            </Text>
            <Text style={{ color: c.gradientStart, fontSize: 14 }}>→</Text>
          </TouchableOpacity>
        </View>
      </View>
    </MotiView>
  );
}
