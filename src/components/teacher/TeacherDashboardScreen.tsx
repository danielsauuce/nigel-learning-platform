import React, { useState } from 'react';
import { Platform, ScrollView, StatusBar, Text, TouchableOpacity, View, Image } from 'react-native';
import { MotiView } from 'moti';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '@/context';
import { colors } from '@/constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Search,
  Users,
  UserCheck,
  Target,
  Award,
  TrendingUp,
  PlusCircle,
  BookOpen,
  Download,
  Clock,
  ChevronRight,
} from 'lucide-react-native';

// ── Mock data ──
const RECENT_ACTIVITY = [
  {
    icon: '📝',
    name: 'Emma Watson',
    action: 'Scored 100% in "Advanced Grammar Quiz"',
    time: '12m ago',
  },
  {
    icon: '🎯',
    name: 'Alex Thompson',
    action: 'Completed "The Great Expedition" mission series',
    time: '1h ago',
  },
  {
    icon: '🏆',
    name: 'Sarah Jenkins',
    action: 'Earned "Consistent Learner" badge for 7-day streak',
    time: '3h ago',
  },
];

const STUDENTS = [
  { name: 'Alex Thompson', missions: 12, avg: 94, badges: 5, active: true },
  { name: 'Sarah Jenkins', missions: 10, avg: 88, badges: 3, active: true },
  { name: 'Leo Martinez', missions: 8, avg: 76, badges: 2, active: true },
  { name: 'Emma Watson', missions: 15, avg: 98, badges: 8, active: true },
];

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

const AVATAR_COLORS = ['#6C5CE7', '#E91E8C', '#22C55E', '#F59E0B', '#3B82F6'];

export function TeacherDashboardScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { theme } = useTheme();
  const c = colors[theme];

  const [studentFilter, setStudentFilter] = useState<'all' | 'active'>('all');

  return (
    <View className="flex-1 bg-background">
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        translucent
        backgroundColor="transparent"
      />
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing', duration: 400 }}
        style={{ flex: 1, paddingTop: insets.top + 8 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces
          contentContainerStyle={{ paddingBottom: 24 }}
        >
          {/* ── Header ── */}
          <MotiView
            from={{ opacity: 0, translateY: -10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 16, stiffness: 130 }}
          >
            <View className="mb-5 flex-row items-center justify-between px-6">
              <View className="flex-row items-center gap-3">
                <View className="h-12 w-12 items-center justify-center rounded-full border-2 border-primary/20 bg-muted">
                  <Text className="font-poppins-bold text-base text-primary">MJ</Text>
                </View>
                <View>
                  <Text className="font-poppins-medium text-[10px] uppercase tracking-wider text-primary">
                    Teacher Dashboard
                  </Text>
                  <Text className="font-fredoka text-xl text-foreground">Marcus Johnson</Text>
                </View>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                className="h-10 w-10 items-center justify-center rounded-full border border-border bg-card"
              >
                <Search size={18} color={c.foreground} strokeWidth={2} />
              </TouchableOpacity>
            </View>
          </MotiView>

          {/* ── Stat Cards ── */}
          <MotiView
            from={{ opacity: 0, translateY: 12 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 100 }}
          >
            {/* Top row: Students + Active */}
            <View className="mb-3 flex-row gap-3 px-6">
              {[
                {
                  icon: <Users size={18} color="#FFFFFF" strokeWidth={2} />,
                  value: '124',
                  label: 'TOTAL STUDENTS',
                  trend: '+4%',
                  gradient: [c.gradientStart, c.gradientEnd] as [string, string],
                },
                {
                  icon: <UserCheck size={18} color="#FFFFFF" strokeWidth={2} />,
                  value: '98',
                  label: 'ACTIVE (7 DAYS)',
                  trend: null,
                  gradient: [c.gradientStart, c.secondary] as [string, string],
                },
              ].map((card, index) => (
                <MotiView
                  key={card.label}
                  from={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: 'spring',
                    damping: 14,
                    stiffness: 120,
                    delay: 150 + index * 60,
                  }}
                  className="flex-1"
                >
                  <LinearGradient
                    colors={card.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      borderRadius: 18,
                      padding: 16,
                      ...Platform.select({
                        ios: {
                          shadowColor: c.gradientStart,
                          shadowOffset: { width: 0, height: 4 },
                          shadowOpacity: 0.2,
                          shadowRadius: 10,
                        },
                        android: { elevation: 4 },
                      }),
                    }}
                  >
                    <View className="mb-3 flex-row items-center justify-between">
                      {card.icon}
                      {card.trend && (
                        <View className="flex-row items-center gap-0.5">
                          <TrendingUp size={12} color="rgba(255,255,255,0.7)" strokeWidth={2} />
                          <Text className="font-poppins-semibold text-[10px] text-white/70">
                            {card.trend}
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text className="mb-0.5 font-fredoka text-3xl text-white">{card.value}</Text>
                    <Text className="font-poppins-semibold text-[10px] uppercase tracking-wider text-white/70">
                      {card.label}
                    </Text>
                  </LinearGradient>
                </MotiView>
              ))}
            </View>

            {/* Bottom row: Mission Comp + Quiz Score */}
            <View className="mb-5 flex-row gap-3 px-6">
              {[
                {
                  icon: <Target size={16} color={c.primary} strokeWidth={2} />,
                  value: '84%',
                  label: 'MISSION COMP.',
                  trend: '+2%',
                },
                {
                  icon: <Award size={16} color={c.primary} strokeWidth={2} />,
                  value: '76.2',
                  label: 'AVG QUIZ SCORE',
                  trend: null,
                },
              ].map((card, index) => (
                <MotiView
                  key={card.label}
                  from={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: 'spring',
                    damping: 14,
                    stiffness: 120,
                    delay: 250 + index * 60,
                  }}
                  className="flex-1"
                >
                  <View
                    className="rounded-2xl border border-border bg-card p-4"
                    style={Platform.select({
                      ios: {
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.04,
                        shadowRadius: 6,
                      },
                      android: { elevation: 1 },
                    })}
                  >
                    <View className="mb-2 flex-row items-center justify-between">
                      {card.icon}
                      {card.trend && (
                        <View className="flex-row items-center gap-0.5">
                          <TrendingUp size={11} color={c.success} strokeWidth={2} />
                          <Text
                            className="font-poppins-semibold text-[10px]"
                            style={{ color: c.success }}
                          >
                            {card.trend}
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text className="mb-0.5 font-fredoka text-2xl text-foreground">
                      {card.value}
                    </Text>
                    <Text className="font-poppins-semibold text-[9px] uppercase tracking-wider text-muted-foreground">
                      {card.label}
                    </Text>
                  </View>
                </MotiView>
              ))}
            </View>
          </MotiView>

          {/* ── Quick Tools ── */}
          <MotiView
            from={{ opacity: 0, translateY: 12 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 350 }}
            className="mb-5 px-6"
          >
            <Text className="mb-2.5 font-poppins-bold text-sm text-foreground">Quick Tools</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-2.5">
                {[
                  {
                    label: 'Create Quiz',
                    icon: <PlusCircle size={15} color="#FFF" strokeWidth={2} />,
                    filled: true,
                  },
                  {
                    label: 'Assign Content',
                    icon: <BookOpen size={15} color={c.foreground} strokeWidth={2} />,
                    filled: false,
                  },
                  {
                    label: 'Export CSV',
                    icon: <Download size={15} color={c.foreground} strokeWidth={2} />,
                    filled: false,
                  },
                ].map((tool) => (
                  <TouchableOpacity key={tool.label} activeOpacity={0.7}>
                    <View
                      className={`flex-row items-center gap-2 rounded-full border px-4 py-2.5 ${
                        tool.filled ? 'border-primary bg-primary' : 'border-border bg-card'
                      }`}
                    >
                      {tool.icon}
                      <Text
                        className={`font-poppins-semibold text-xs ${
                          tool.filled ? 'text-white' : 'text-foreground'
                        }`}
                      >
                        {tool.label}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </MotiView>

          {/* ── Recent Activity ── */}
          <MotiView
            from={{ opacity: 0, translateY: 12 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 450 }}
            className="mb-5 px-6"
          >
            <View className="rounded-2xl border border-border bg-card p-4">
              <View className="mb-3 flex-row items-center justify-between">
                <View className="flex-row items-center gap-2">
                  <Clock size={16} color={c.primary} strokeWidth={2} />
                  <Text className="font-poppins-bold text-sm text-foreground">Recent Activity</Text>
                </View>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text className="font-poppins-semibold text-xs text-primary">View All</Text>
                </TouchableOpacity>
              </View>

              {RECENT_ACTIVITY.map((item, index) => (
                <MotiView
                  key={index}
                  from={{ opacity: 0, translateX: -8 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  transition={{
                    type: 'spring',
                    damping: 16,
                    stiffness: 130,
                    delay: 500 + index * 50,
                  }}
                >
                  <View
                    className={`flex-row items-start gap-3 py-3 ${
                      index < RECENT_ACTIVITY.length - 1 ? 'border-b border-border' : ''
                    }`}
                  >
                    <View className="mt-0.5 h-8 w-8 items-center justify-center rounded-full bg-muted/50">
                      <Text className="text-sm">{item.icon}</Text>
                    </View>
                    <View className="flex-1">
                      <View className="mb-0.5 flex-row items-center gap-2">
                        <Text className="font-poppins-semibold text-sm text-foreground">
                          {item.name}
                        </Text>
                        <View className="flex-row items-center gap-1">
                          <Clock size={10} color={c.mutedForeground} strokeWidth={2} />
                          <Text className="font-poppins-regular text-[10px] text-muted-foreground">
                            {item.time}
                          </Text>
                        </View>
                      </View>
                      <Text className="font-poppins-regular text-xs leading-4 text-muted-foreground">
                        {item.action}
                      </Text>
                    </View>
                  </View>
                </MotiView>
              ))}
            </View>
          </MotiView>

          {/* ── Student Directory ── */}
          <MotiView
            from={{ opacity: 0, translateY: 12 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 600 }}
            className="px-6"
          >
            <View className="mb-3 flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <Text className="font-poppins-bold text-sm text-foreground">Student Directory</Text>
                <View className="rounded-md bg-muted px-2 py-0.5">
                  <Text className="font-poppins-semibold text-[10px] text-muted-foreground">
                    {STUDENTS.length}
                  </Text>
                </View>
              </View>
              <View className="flex-row overflow-hidden rounded-lg bg-muted">
                {(['all', 'active'] as const).map((filter) => (
                  <TouchableOpacity
                    key={filter}
                    onPress={() => setStudentFilter(filter)}
                    activeOpacity={0.7}
                    className={`px-3 py-1.5 ${studentFilter === filter ? 'bg-card' : ''}`}
                    style={
                      studentFilter === filter
                        ? {
                            borderRadius: 6,
                            ...Platform.select({
                              ios: {
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.08,
                                shadowRadius: 2,
                              },
                              android: { elevation: 1 },
                            }),
                          }
                        : undefined
                    }
                  >
                    <Text
                      className={`font-poppins-semibold text-xs ${
                        studentFilter === filter ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      {filter === 'all' ? 'All' : 'Active'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View className="gap-2.5">
              {STUDENTS.map((student, index) => (
                <MotiView
                  key={student.name}
                  from={{ opacity: 0, translateX: -10 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  transition={{
                    type: 'spring',
                    damping: 16,
                    stiffness: 130,
                    delay: 650 + index * 50,
                  }}
                >
                  <TouchableOpacity activeOpacity={0.7}>
                    <View
                      className="flex-row items-center rounded-xl border border-border bg-card px-4 py-3.5"
                      style={Platform.select({
                        ios: {
                          shadowColor: '#000',
                          shadowOffset: { width: 0, height: 1 },
                          shadowOpacity: 0.03,
                          shadowRadius: 4,
                        },
                        android: { elevation: 1 },
                      })}
                    >
                      {/* Avatar */}
                      <View
                        className="mr-3 h-11 w-11 items-center justify-center rounded-full"
                        style={{
                          backgroundColor: AVATAR_COLORS[index % AVATAR_COLORS.length] + '20',
                        }}
                      >
                        <Text
                          className="font-poppins-bold text-sm"
                          style={{ color: AVATAR_COLORS[index % AVATAR_COLORS.length] }}
                        >
                          {getInitials(student.name)}
                        </Text>
                        {/* Active dot */}
                        {student.active && (
                          <View
                            className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card"
                            style={{ backgroundColor: colors.success }}
                          />
                        )}
                      </View>

                      {/* Info */}
                      <View className="flex-1">
                        <Text className="mb-0.5 font-poppins-semibold text-sm text-foreground">
                          {student.name}
                        </Text>
                        <View className="flex-row items-center gap-2">
                          <Text
                            className="font-poppins-semibold text-[10px]"
                            style={{ color: c.primary }}
                          >
                            {student.missions} Missions
                          </Text>
                          <Text className="font-poppins-regular text-[10px] text-muted-foreground">
                            ⊘ {student.avg}% Avg
                          </Text>
                        </View>
                      </View>

                      {/* Badge count */}
                      <View className="flex-row items-center gap-2">
                        <View className="bg-primary/8 flex-row items-center gap-1 rounded-lg px-2 py-1">
                          <Text className="font-poppins-bold text-xs text-primary">
                            {student.badges}
                          </Text>
                          <Award size={12} color={c.primary} strokeWidth={2} />
                        </View>
                        <ChevronRight size={16} color={c.mutedForeground} strokeWidth={2} />
                      </View>
                    </View>
                  </TouchableOpacity>
                </MotiView>
              ))}
            </View>

            {/* See all students */}
            <TouchableOpacity activeOpacity={0.7} className="mt-4 items-center">
              <Text className="font-poppins-semibold text-sm text-muted-foreground">
                See all students
              </Text>
            </TouchableOpacity>
          </MotiView>
        </ScrollView>
      </MotiView>
    </View>
  );
}
