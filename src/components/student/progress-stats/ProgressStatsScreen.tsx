import React from 'react';
import { Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/ui';
import {
  ChevronLeft,
  Award,
  Target,
  TrendingUp,
  BookOpen,
  Zap,
  Calendar,
  CheckCircle,
} from 'lucide-react-native';
import { useTheme } from '@/context';
import { colors } from '@/constants/colors';
import Svg, { Circle } from 'react-native-svg';

// ── Progress ring ──
function ProgressRing({
  percent,
  size = 110,
  strokeWidth = 10,
  color,
}: {
  percent: number;
  size?: number;
  strokeWidth?: number;
  color: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="rgb(229, 231, 235)"
        strokeWidth={strokeWidth}
        fill="none"
        opacity={0.25}
      />
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={`${circumference}`}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </Svg>
  );
}

// ── Mini progress bar ──
function MiniBar({ percent, color }: { percent: number; color: string }) {
  return (
    <View className="h-2 flex-1 overflow-hidden rounded-full bg-border">
      <MotiView
        from={{ width: '0%' as any }}
        animate={{ width: `${percent}%` as any }}
        transition={{ type: 'timing', duration: 700, delay: 300 }}
        style={{ height: '100%', borderRadius: 4, backgroundColor: color }}
      />
    </View>
  );
}

// ── Data ──
const ISLANDS = [
  { name: 'Smart Spending', emoji: '🛒', progress: 100, color: 'rgb(34, 197, 94)' },
  { name: 'Saving Goals', emoji: '🎯', progress: 75, color: 'rgb(108, 92, 231)' },
  { name: 'Earning Money', emoji: '💼', progress: 50, color: 'rgb(245, 158, 11)' },
  { name: 'Borrowing Basics', emoji: '🏦', progress: 20, color: 'rgb(59, 130, 246)' },
  { name: 'Giving Back', emoji: '❤️', progress: 0, color: 'rgb(239, 68, 68)' },
];

const BADGES = [
  { emoji: '🔥', label: 'Early Bird', earned: true },
  { emoji: '💰', label: 'Smart Saver', earned: true },
  { emoji: '🏆', label: 'Island King', earned: true },
  { emoji: '⭐', label: 'Goal Setter', earned: true },
  { emoji: '📊', label: 'Budget Pro', earned: true },
  { emoji: '🎯', label: 'Quiz Master', earned: false },
  { emoji: '🏝️', label: 'Explorer', earned: false },
  { emoji: '💎', label: 'Diamond', earned: false },
];

const QUIZ_HISTORY = [
  { name: 'Savings Quiz', score: 94, date: 'Today' },
  { name: 'Spending Quiz', score: 88, date: 'Yesterday' },
  { name: 'Budgeting Quiz', score: 75, date: '3 days ago' },
  { name: 'Money Safety', score: 100, date: '1 week ago' },
];

const WEEK_ACTIVITY = [
  { day: 'Mon', minutes: 25 },
  { day: 'Tue', minutes: 40 },
  { day: 'Wed', minutes: 15 },
  { day: 'Thu', minutes: 35 },
  { day: 'Fri', minutes: 50 },
  { day: 'Sat', minutes: 10 },
  { day: 'Sun', minutes: 30 },
];

export function ProgressStatsScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const c = colors[theme];

  const maxMinutes = Math.max(...WEEK_ACTIVITY.map((d) => d.minutes));

  return (
    <ScreenWrapper topPadding={12} showDecoration={false}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        bounces
      >
        {/* Header */}
        <MotiView
          from={{ opacity: 0, translateY: -12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 130 }}
        >
          <View className="mb-4 flex-row items-center justify-center px-5">
            <TouchableOpacity
              onPress={() => router.back()}
              activeOpacity={0.7}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              className="absolute left-5 p-1"
            >
              <ChevronLeft size={24} className="text-foreground" strokeWidth={2.5} />
            </TouchableOpacity>
            <Text className="font-poppins-semibold text-base text-foreground">
              Progress & Stats
            </Text>
          </View>
        </MotiView>

        {/* ── Overview card ── */}
        <MotiView
          from={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 14, stiffness: 110, delay: 100 }}
          className="mx-6 mb-5"
        >
          <View
            className="rounded-3xl border border-border bg-card p-5"
            style={Platform.select({
              ios: {
                shadowColor: c.primary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.08,
                shadowRadius: 14,
              },
              android: { elevation: 3 },
            })}
          >
            <View className="flex-row items-center">
              {/* Ring */}
              <View className="mr-5 items-center justify-center">
                <ProgressRing percent={68} color={c.primary} />
                <View className="absolute items-center">
                  <Text className="font-fredoka text-2xl text-foreground">68%</Text>
                  <Text className="font-poppins-regular text-[9px] text-muted-foreground">
                    overall
                  </Text>
                </View>
              </View>

              {/* Summary stats */}
              <View className="flex-1 gap-3">
                {[
                  {
                    icon: <Target size={14} color={c.primary} strokeWidth={2} />,
                    label: 'Missions',
                    value: '12/18',
                  },
                  {
                    icon: <BookOpen size={14} color={c.success} strokeWidth={2} />,
                    label: 'Lessons',
                    value: '24/36',
                  },
                  {
                    icon: <Zap size={14} color="rgb(245, 158, 11)" strokeWidth={2.5} />,
                    label: 'Total XP',
                    value: '2,450',
                  },
                  {
                    icon: <Calendar size={14} color={c.mutedForeground} strokeWidth={2} />,
                    label: 'Active Days',
                    value: '28',
                  },
                ].map((stat) => (
                  <View key={stat.label} className="flex-row items-center gap-2.5">
                    <View className="h-7 w-7 items-center justify-center rounded-lg bg-muted/50">
                      {stat.icon}
                    </View>
                    <View className="flex-1 flex-row items-center justify-between">
                      <Text className="font-poppins-regular text-xs text-muted-foreground">
                        {stat.label}
                      </Text>
                      <Text className="font-poppins-bold text-sm text-foreground">
                        {stat.value}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </MotiView>

        {/* ── Weekly Activity ── */}
        <MotiView
          from={{ opacity: 0, translateY: 12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 200 }}
          className="mx-6 mb-5"
        >
          <Text className="mb-2.5 font-poppins-bold text-sm text-foreground">This Week</Text>
          <View className="rounded-2xl border border-border bg-card p-4">
            <View className="flex-row items-end justify-between gap-2" style={{ height: 100 }}>
              {WEEK_ACTIVITY.map((day, index) => {
                const height = maxMinutes > 0 ? (day.minutes / maxMinutes) * 80 : 0;
                const isToday = index === 4; // Friday
                return (
                  <View key={day.day} className="flex-1 items-center">
                    <MotiView
                      from={{ height: 0 }}
                      animate={{ height }}
                      transition={{
                        type: 'spring',
                        damping: 14,
                        stiffness: 100,
                        delay: 300 + index * 50,
                      }}
                      style={{
                        width: '70%',
                        borderRadius: 6,
                        backgroundColor: isToday ? c.primary : c.border,
                      }}
                    />
                    <Text
                      className={`mt-1.5 font-poppins-medium text-[10px] ${
                        isToday ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    >
                      {day.day}
                    </Text>
                  </View>
                );
              })}
            </View>
            <View className="mt-2 flex-row justify-between border-t border-border pt-2">
              <Text className="font-poppins-regular text-xs text-muted-foreground">
                Total: 205 minutes
              </Text>
              <Text className="font-poppins-semibold text-xs text-primary">↑ 18% vs last week</Text>
            </View>
          </View>
        </MotiView>

        {/* ── Island Progress ── */}
        <MotiView
          from={{ opacity: 0, translateY: 12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 350 }}
          className="mx-6 mb-5"
        >
          <Text className="mb-2.5 font-poppins-bold text-sm text-foreground">Islands</Text>
          <View className="gap-3.5 rounded-2xl border border-border bg-card p-4">
            {ISLANDS.map((island, index) => (
              <MotiView
                key={island.name}
                from={{ opacity: 0, translateX: -10 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{
                  type: 'spring',
                  damping: 16,
                  stiffness: 130,
                  delay: 400 + index * 50,
                }}
              >
                <View className="flex-row items-center gap-3">
                  <Text className="text-xl">{island.emoji}</Text>
                  <View className="flex-1">
                    <View className="mb-1 flex-row items-center justify-between">
                      <Text className="font-poppins-medium text-xs text-foreground">
                        {island.name}
                      </Text>
                      <Text className="font-poppins-bold text-xs text-muted-foreground">
                        {island.progress}%
                      </Text>
                    </View>
                    <MiniBar percent={island.progress} color={island.color} />
                  </View>
                  {island.progress === 100 && (
                    <CheckCircle size={16} color="rgb(34, 197, 94)" strokeWidth={2.5} />
                  )}
                </View>
              </MotiView>
            ))}
          </View>
        </MotiView>

        {/* ── Badges ── */}
        <MotiView
          from={{ opacity: 0, translateY: 12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 500 }}
          className="mx-6 mb-5"
        >
          <View className="mb-2.5 flex-row items-center justify-between">
            <Text className="font-poppins-bold text-sm text-foreground">
              Badges ({BADGES.filter((b) => b.earned).length}/{BADGES.length})
            </Text>
          </View>
          <View className="flex-row flex-wrap gap-2.5">
            {BADGES.map((badge, index) => (
              <MotiView
                key={badge.label}
                from={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: badge.earned ? 1 : 0.4, scale: 1 }}
                transition={{
                  type: 'spring',
                  damping: 14,
                  stiffness: 120,
                  delay: 550 + index * 40,
                }}
                style={{ width: '22%' }}
              >
                <View className="items-center rounded-xl border border-border bg-card py-3">
                  <Text className="mb-1 text-2xl">{badge.emoji}</Text>
                  <Text className="px-1 text-center font-poppins-medium text-[9px] text-muted-foreground">
                    {badge.label}
                  </Text>
                  {!badge.earned && (
                    <View className="absolute right-1 top-1 h-2 w-2 rounded-full bg-muted" />
                  )}
                </View>
              </MotiView>
            ))}
          </View>
        </MotiView>

        {/* ── Quiz History ── */}
        <MotiView
          from={{ opacity: 0, translateY: 12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 650 }}
          className="mx-6 mb-5"
        >
          <Text className="mb-2.5 font-poppins-bold text-sm text-foreground">Quiz History</Text>
          <View className="overflow-hidden rounded-2xl border border-border bg-card">
            {QUIZ_HISTORY.map((quiz, index) => {
              const scoreColor =
                quiz.score >= 90
                  ? 'text-success'
                  : quiz.score >= 70
                    ? 'text-primary'
                    : 'text-warning';
              return (
                <MotiView
                  key={quiz.name}
                  from={{ opacity: 0, translateX: -8 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  transition={{
                    type: 'spring',
                    damping: 16,
                    stiffness: 130,
                    delay: 700 + index * 50,
                  }}
                >
                  <View
                    className={`flex-row items-center justify-between px-4 py-3 ${
                      index < QUIZ_HISTORY.length - 1 ? 'border-b border-border' : ''
                    }`}
                  >
                    <View>
                      <Text className="font-poppins-medium text-sm text-foreground">
                        {quiz.name}
                      </Text>
                      <Text className="font-poppins-regular text-[10px] text-muted-foreground">
                        {quiz.date}
                      </Text>
                    </View>
                    <Text className={`font-poppins-bold text-base ${scoreColor}`}>
                      {quiz.score}%
                    </Text>
                  </View>
                </MotiView>
              );
            })}
          </View>
        </MotiView>

        {/* ── Simulation Grades ── */}
        <MotiView
          from={{ opacity: 0, translateY: 12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 800 }}
          className="mx-6"
        >
          <Text className="mb-2.5 font-poppins-bold text-sm text-foreground">
            Budget Simulations
          </Text>
          <View className="flex-row gap-2.5">
            {[
              { role: 'Junior Designer', grade: 'B', color: 'rgb(108, 92, 231)' },
              { role: 'Café Worker', grade: 'A-', color: 'rgb(34, 197, 94)' },
              { role: 'Dog Walker', grade: 'C+', color: 'rgb(245, 158, 11)' },
            ].map((sim, index) => (
              <MotiView
                key={sim.role}
                from={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: 'spring',
                  damping: 14,
                  stiffness: 120,
                  delay: 850 + index * 60,
                }}
                className="flex-1"
              >
                <View className="items-center rounded-xl border border-border bg-card py-4">
                  <Text className="mb-1 font-fredoka text-2xl" style={{ color: sim.color }}>
                    {sim.grade}
                  </Text>
                  <Text className="px-2 text-center font-poppins-medium text-[10px] text-muted-foreground">
                    {sim.role}
                  </Text>
                </View>
              </MotiView>
            ))}
          </View>
        </MotiView>
      </ScrollView>
    </ScreenWrapper>
  );
}
