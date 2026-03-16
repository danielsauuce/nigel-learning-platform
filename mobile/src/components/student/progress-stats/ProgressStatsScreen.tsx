import React from 'react';
import { Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import { ChevronLeft, Flame, Star, Trophy, Target } from 'lucide-react-native';
import { ScreenWrapper } from '@/components/ui';
import { Mascot, MascotCelebrating, MascotWaving } from '@/svg/illustrations';
import { colors } from '@/constants/colors';
import { useTheme, useLearning } from '@/context';
import { LEARNING_PATHS, BADGES } from '@/constants/learning-paths';

function StatCard({
  emoji,
  label,
  value,
  color,
  delay,
}: {
  emoji: string;
  label: string;
  value: string;
  color: string;
  delay: number;
}) {
  const { theme } = useTheme();
  const c = colors[theme];
  return (
    <MotiView
      from={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', damping: 14, stiffness: 110, delay }}
      style={{ flex: 1 }}
    >
      <View
        style={{
          backgroundColor: theme === 'dark' ? c.card : '#FFFFFF',
          borderRadius: 18,
          padding: 16,
          alignItems: 'center',
          borderWidth: 1,
          borderColor: theme === 'dark' ? c.border : '#F0EDF5',
          ...Platform.select({
            ios: {
              shadowColor: color,
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
            },
            android: { elevation: 2 },
          }),
        }}
      >
        <Text style={{ fontSize: 24, marginBottom: 6 }}>{emoji}</Text>
        <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 20, color }}>{value}</Text>
        <Text
          style={{
            fontFamily: 'Poppins_400Regular',
            fontSize: 11,
            color: c.mutedForeground,
            textAlign: 'center',
          }}
        >
          {label}
        </Text>
      </View>
    </MotiView>
  );
}

export function ProgressStatsScreen() {
  const { theme } = useTheme();
  const c = colors[theme];
  const router = useRouter();
  const learning = useLearning();

  const totalLessons = LEARNING_PATHS.reduce((s, p) => s + p.lessons.length, 0);
  const completedCount = learning.completedLessons.size;
  const overallPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  const pathsCompleted = LEARNING_PATHS.filter((p) => learning.isPathCompleted(p.key)).length;

  return (
    <ScreenWrapper topPadding={12} showDecoration={false}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        bounces
      >
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 20,
            marginBottom: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            style={{ position: 'absolute', left: 20, padding: 4 }}
          >
            <ChevronLeft size={24} color={c.foreground} strokeWidth={2.5} />
          </TouchableOpacity>
          <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: c.foreground }}>
            Progress & Stats
          </Text>
        </View>

        {/* Hero mascot with overall progress */}
        <MotiView
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 14, stiffness: 110 }}
          style={{ alignItems: 'center', paddingHorizontal: 24, marginBottom: 24 }}
        >
          <View
            style={{
              width: '100%',
              backgroundColor: theme === 'dark' ? c.card : '#F3F0FF',
              borderRadius: 24,
              padding: 24,
              alignItems: 'center',
              borderWidth: 1.5,
              borderColor: '#B9A7F830',
            }}
          >
            {overallPercent >= 80 ? (
              <MascotCelebrating size={90} />
            ) : overallPercent > 0 ? (
              <MascotWaving size={80} />
            ) : (
              <Mascot size={80} />
            )}

            {/* Progress ring (simplified as bar) */}
            <Text
              style={{
                fontFamily: 'Fredoka_700Bold',
                fontSize: 36,
                color: '#B9A7F8',
                marginTop: 12,
              }}
            >
              {overallPercent}%
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins_500Medium',
                fontSize: 14,
                color: c.mutedForeground,
                marginTop: 2,
              }}
            >
              Overall Progress
            </Text>

            <View
              style={{
                width: '100%',
                height: 10,
                borderRadius: 5,
                backgroundColor: c.border,
                marginTop: 16,
              }}
            >
              <MotiView
                from={{ width: '0%' as any }}
                animate={{ width: `${overallPercent}%` as any }}
                transition={{ type: 'timing', duration: 800, delay: 300 }}
                style={{ height: 10, borderRadius: 5, backgroundColor: '#B9A7F8' }}
              />
            </View>
            <Text
              style={{
                fontFamily: 'Poppins_400Regular',
                fontSize: 12,
                color: c.mutedForeground,
                marginTop: 8,
              }}
            >
              {completedCount} of {totalLessons} lessons completed
            </Text>
          </View>
        </MotiView>

        {/* Quick stats */}
        <View style={{ flexDirection: 'row', gap: 10, paddingHorizontal: 24, marginBottom: 24 }}>
          <StatCard
            emoji="🔥"
            label="Day Streak"
            value={`${learning.streak}`}
            color="#FF9800"
            delay={200}
          />
          <StatCard
            emoji="⭐"
            label="XP Earned"
            value={`${learning.xp}`}
            color="#B9A7F8"
            delay={260}
          />
          <StatCard
            emoji="🏝️"
            label="Paths Done"
            value={`${pathsCompleted}/5`}
            color="#4CAF50"
            delay={320}
          />
        </View>

        {/* Learning path progress */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <Text
            style={{
              fontFamily: 'Poppins_700Bold',
              fontSize: 16,
              color: c.foreground,
              marginBottom: 14,
            }}
          >
            Learning Paths
          </Text>
          {LEARNING_PATHS.map((path, idx) => {
            const { completed, total } = learning.getPathProgress(path.key);
            const pPercent = total > 0 ? Math.round((completed / total) * 100) : 0;
            const status = learning.getPathStatus(path.key);

            return (
              <MotiView
                key={path.key}
                from={{ opacity: 0, translateX: -12 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 200 + idx * 60 }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 14,
                    backgroundColor: theme === 'dark' ? c.card : '#FFFFFF',
                    borderRadius: 16,
                    padding: 14,
                    marginBottom: 10,
                    borderWidth: 1,
                    borderColor: theme === 'dark' ? c.border : '#F0EDF5',
                    opacity: status === 'locked' ? 0.5 : 1,
                  }}
                >
                  <View
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 14,
                      backgroundColor: path.color + '15',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={{ fontSize: 22 }}>{path.emoji}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: 'Poppins_600SemiBold',
                          fontSize: 14,
                          color: c.foreground,
                        }}
                      >
                        {path.title}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Poppins_600SemiBold',
                          fontSize: 12,
                          color: status === 'mastered' ? '#4CAF50' : path.color,
                        }}
                      >
                        {status === 'mastered' ? '✅' : status === 'locked' ? '🔒' : `${pPercent}%`}
                      </Text>
                    </View>
                    <View
                      style={{
                        height: 5,
                        borderRadius: 3,
                        backgroundColor: c.border,
                        marginTop: 6,
                      }}
                    >
                      <View
                        style={{
                          height: 5,
                          borderRadius: 3,
                          width: `${pPercent}%` as any,
                          backgroundColor: status === 'mastered' ? '#4CAF50' : path.color,
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        fontFamily: 'Poppins_400Regular',
                        fontSize: 10,
                        color: c.mutedForeground,
                        marginTop: 3,
                      }}
                    >
                      {completed}/{total} lessons
                    </Text>
                  </View>
                </View>
              </MotiView>
            );
          })}
        </View>

        {/* Badges */}
        <View style={{ paddingHorizontal: 24 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <Mascot size={28} />
            <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 16, color: c.foreground }}>
              Badges ({learning.earnedBadges.size}/{BADGES.length})
            </Text>
          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
            {BADGES.map((badge, idx) => {
              const earned = learning.earnedBadges.has(badge.id);
              return (
                <MotiView
                  key={badge.id}
                  from={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: 'spring',
                    damping: 14,
                    stiffness: 110,
                    delay: 300 + idx * 40,
                  }}
                  style={{ width: '31%' }}
                >
                  <View
                    style={{
                      backgroundColor: earned
                        ? theme === 'dark'
                          ? '#4CAF5020'
                          : '#E8F5E9'
                        : theme === 'dark'
                          ? c.card
                          : '#F8F6FB',
                      borderRadius: 18,
                      padding: 14,
                      alignItems: 'center',
                      borderWidth: earned ? 2 : 1,
                      borderColor: earned ? '#4CAF50' : theme === 'dark' ? c.border : '#E8E4F0',
                      opacity: earned ? 1 : 0.45,
                    }}
                  >
                    <Text style={{ fontSize: 28, marginBottom: 6 }}>{badge.emoji}</Text>
                    <Text
                      style={{
                        fontFamily: 'Poppins_600SemiBold',
                        fontSize: 10,
                        color: c.foreground,
                        textAlign: 'center',
                      }}
                    >
                      {badge.title}
                    </Text>
                    {earned && (
                      <Text
                        style={{
                          fontFamily: 'Poppins_400Regular',
                          fontSize: 9,
                          color: '#4CAF50',
                          marginTop: 2,
                        }}
                      >
                        Earned ✅
                      </Text>
                    )}
                  </View>
                </MotiView>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
