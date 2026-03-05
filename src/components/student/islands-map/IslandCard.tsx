import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import { CheckCircle, Circle, Lock } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

export type IslandStatus = 'mastered' | 'active' | 'locked';

export interface IslandData {
  key: string;
  title: string;
  category: string;
  description: string;
  lessonsCompleted: number;
  totalLessons: number;
  status: IslandStatus;
}

interface IslandCardProps {
  island: IslandData;
  index: number;
  onPress: () => void;
}

export function IslandCard({ island, index, onPress }: IslandCardProps) {
  const { theme } = useTheme();
  const c = colors[theme];

  const isRight = index % 2 !== 0;
  const isMastered = island.status === 'mastered';
  const isActive = island.status === 'active';
  const isLocked = island.status === 'locked';

  const progress =
    island.totalLessons > 0 ? (island.lessonsCompleted / island.totalLessons) * 100 : 0;

  const statusIcon = isMastered ? (
    <CheckCircle size={22} color="#22C55E" strokeWidth={2.5} />
  ) : isActive ? (
    <Circle size={22} color={c.gradientStart} strokeWidth={2.5} fill={c.gradientStart} />
  ) : (
    <Lock size={18} color={c.mutedForeground} strokeWidth={2} />
  );

  const categoryColor = isMastered ? '#22C55E' : isActive ? c.gradientStart : c.mutedForeground;

  const ctaLabel = isMastered
    ? 'Review Skills'
    : isActive
      ? 'Resume Learning'
      : `Unlocks after ${island.category}`;

  return (
    <MotiView
      from={{ opacity: 0, translateX: isRight ? 30 : -30 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 200 + index * 120 }}
      style={{
        alignSelf: isRight ? 'flex-end' : 'flex-start',
        width: '82%',
        marginBottom: 8,
      }}
    >
      <TouchableOpacity activeOpacity={isLocked ? 1 : 0.8} onPress={isLocked ? undefined : onPress}>
        <View
          style={{
            backgroundColor: c.card,
            borderRadius: 20,
            padding: 20,
            borderWidth: isActive ? 2 : 1,
            borderColor: isActive ? c.gradientStart : c.border,
            opacity: isLocked ? 0.6 : 1,
            ...Platform.select({
              ios: {
                shadowColor: isActive ? c.gradientStart : '#000',
                shadowOffset: { width: 0, height: isActive ? 4 : 2 },
                shadowOpacity: isActive ? 0.15 : theme === 'dark' ? 0.2 : 0.05,
                shadowRadius: isActive ? 12 : 6,
              },
              android: { elevation: isActive ? 6 : 2 },
            }),
          }}
        >
          {/* Top row: icon + title + status tag */}
          <View
            style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 8 }}
          >
            {/* Status icon */}
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                backgroundColor: isMastered
                  ? '#ECFDF5'
                  : isActive
                    ? theme === 'dark'
                      ? `${c.gradientStart}20`
                      : '#F0EDFF'
                    : theme === 'dark'
                      ? c.muted
                      : '#F3F4F6',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {statusIcon}
            </View>

            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: 'Poppins_700Bold',
                  fontSize: 16,
                  color: isLocked ? c.mutedForeground : c.foreground,
                  marginBottom: 2,
                }}
              >
                {island.title}
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins_600SemiBold',
                  fontSize: 11,
                  color: categoryColor,
                  letterSpacing: 0.5,
                  textTransform: 'uppercase',
                }}
              >
                {island.category}
              </Text>
            </View>

            {/* Mastered tag */}
            {isMastered && (
              <View
                style={{
                  backgroundColor: '#ECFDF5',
                  paddingHorizontal: 10,
                  paddingVertical: 3,
                  borderRadius: 8,
                }}
              >
                <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 11, color: '#22C55E' }}>
                  Mastered
                </Text>
              </View>
            )}
          </View>

          {/* Description */}
          <Text
            style={{
              fontFamily: 'Poppins_400Regular',
              fontSize: 13,
              color: c.mutedForeground,
              lineHeight: 19,
              marginBottom: 14,
            }}
            numberOfLines={2}
          >
            {island.description}
          </Text>

          {/* Progress row */}
          {!isLocked && (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 6,
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Poppins_600SemiBold',
                    fontSize: 12,
                    color: c.foreground,
                  }}
                >
                  Progress
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins_500Medium',
                    fontSize: 12,
                    color: c.mutedForeground,
                  }}
                >
                  {island.lessonsCompleted}/{island.totalLessons} Lessons
                </Text>
              </View>

              {/* Progress bar */}
              <View
                style={{
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: theme === 'dark' ? c.muted : '#F0EDFF',
                  marginBottom: 14,
                  overflow: 'hidden',
                }}
              >
                <MotiView
                  from={{ width: '0%' as any }}
                  animate={{ width: `${progress}%` as any }}
                  transition={{ type: 'timing', duration: 700, delay: 400 + index * 120 }}
                  style={{
                    height: '100%',
                    borderRadius: 3,
                    backgroundColor: isMastered ? '#22C55E' : c.gradientStart,
                  }}
                />
              </View>
            </>
          )}

          {/* CTA */}
          {isMastered ? (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onPress}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
            >
              <Text
                style={{
                  fontFamily: 'Poppins_600SemiBold',
                  fontSize: 13.5,
                  color: c.foreground,
                }}
              >
                Review Skills
              </Text>
              <Text style={{ fontSize: 14, color: c.foreground }}>→</Text>
            </TouchableOpacity>
          ) : isActive ? (
            <View style={{ borderRadius: 14, overflow: 'hidden' }}>
              <LinearGradient
                colors={[c.gradientStart, c.gradientEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  paddingVertical: 12,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 6,
                }}
              >
                <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 14, color: '#FFFFFF' }}>
                  Resume Learning
                </Text>
                <Text style={{ fontSize: 15, color: '#FFFFFF' }}>→</Text>
              </LinearGradient>
            </View>
          ) : (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Lock size={13} color={c.mutedForeground} strokeWidth={2} />
              <Text
                style={{
                  fontFamily: 'Poppins_400Regular',
                  fontSize: 12,
                  color: c.mutedForeground,
                  fontStyle: 'italic',
                }}
              >
                Unlocks after previous island
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </MotiView>
  );
}
