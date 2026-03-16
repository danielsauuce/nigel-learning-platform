import React from 'react';
import { Platform, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/context';
import { colors } from '@/constants/colors';
import { GraduationCap, SlidersHorizontal } from 'lucide-react-native';
import { STUDENTS } from '../data/students';
import { useStudentRoster } from './hooks/useStudentRoster';
import { StudentSearch } from './StudentSearch';
import { StatPill } from './StatPill';
import { StudentFilters } from './StudentFilters';
import { StudentCard } from './StudentCard';
import { StudentFAB } from './StudentFAB';

export function StudentRosterScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const c = colors[theme];
  const { search, setSearch, filter, setFilter, filtered } = useStudentRoster();

  const totalActive = STUDENTS.filter((s) => s.active).length;
  const avgQuiz = Math.round(STUDENTS.reduce((a, s) => a + s.avg, 0) / STUDENTS.length);
  const totalMissions = STUDENTS.reduce((a, s) => a + s.missions, 0);

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
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* Header */}
          <MotiView
            from={{ opacity: 0, translateY: -10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 16, stiffness: 130 }}
          >
            <View className="mb-4 flex-row items-center justify-between px-6">
              <View className="flex-row items-center gap-2.5">
                <GraduationCap size={24} color={c.primary} strokeWidth={2} />
                <Text className="font-fredoka text-2xl text-foreground">Student Roster</Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                className="h-10 w-10 items-center justify-center rounded-full border border-border bg-card"
              >
                <SlidersHorizontal size={18} color={c.foreground} strokeWidth={2} />
              </TouchableOpacity>
            </View>
          </MotiView>

          {/* Search */}
          <MotiView
            from={{ opacity: 0, translateY: 8 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 16, stiffness: 130, delay: 80 }}
          >
            <StudentSearch value={search} onChange={setSearch} />
          </MotiView>

          {/* Stat pills */}
          <MotiView
            from={{ opacity: 0, translateY: 8 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 16, stiffness: 130, delay: 150 }}
          >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 24, gap: 10, marginBottom: 16 }}
            >
              <StatPill
                label="ACTIVE"
                value={String(totalActive)}
                color="#22C55E"
                bg="rgba(34,197,94,0.08)"
              />
              <StatPill
                label="AVG QUIZ"
                value={`${avgQuiz}%`}
                color="#E91E8C"
                bg="rgba(233,30,140,0.08)"
              />
              <StatPill
                label="MISSIONS"
                value={String(totalMissions)}
                color="#6C5CE7"
                bg="rgba(108,92,231,0.08)"
              />
            </ScrollView>
          </MotiView>

          {/* Filters */}
          <MotiView
            from={{ opacity: 0, translateY: 8 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 16, stiffness: 130, delay: 220 }}
          >
            <StudentFilters filter={filter} setFilter={setFilter} />
          </MotiView>

          {/* Count */}
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'timing', duration: 300, delay: 280 }}
          >
            <Text className="mb-3 px-6 font-poppins-regular text-xs text-muted-foreground">
              Showing {filtered.length} of {STUDENTS.length} Students
            </Text>
          </MotiView>

          {/* Student cards */}
          {filtered.map((student, index) => (
            <MotiView
              key={student.id}
              from={{ opacity: 0, translateY: 16 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                type: 'spring',
                damping: 16,
                stiffness: 120,
                delay: 320 + index * 60,
              }}
            >
              <StudentCard student={student} index={index} />
            </MotiView>
          ))}
        </ScrollView>
      </MotiView>

      {/* FAB */}
      <StudentFAB />
    </View>
  );
}
