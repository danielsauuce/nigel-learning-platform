import React from 'react';
import { View, ScrollView, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import { useTheme } from '@/context';
import { colors } from '@/constants/colors';
import { Users, UserCheck, Target, Award } from 'lucide-react-native';
import { TeacherHeader } from './TeacherHeader';
import { StatCard } from './StatCard';
import { QuickTools } from './QuickTools';
import { RecentActivity } from './RecentActivity';
import { StudentDirectory } from './StudentDirectory';

export function TeacherDashboardScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const c = colors[theme];

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
          {/* Header */}
          <MotiView
            from={{ opacity: 0, translateY: -10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 16, stiffness: 130 }}
          >
            <TeacherHeader />
          </MotiView>

          {/* Stat Cards — Row 1: Gradient */}
          <MotiView
            from={{ opacity: 0, translateY: 12 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 100 }}
          >
            <View className="mb-3 flex-row gap-3 px-6">
              <StatCard
                value="124"
                label="TOTAL STUDENTS"
                icon={<Users size={18} color="#FFFFFF" strokeWidth={2} />}
                trend="+4%"
                gradient={[c.gradientStart, c.gradientEnd]}
              />
              <StatCard
                value="98"
                label="ACTIVE (7 DAYS)"
                icon={<UserCheck size={18} color="#FFFFFF" strokeWidth={2} />}
                gradient={[c.gradientStart, c.secondary]}
              />
            </View>
          </MotiView>

          {/* Stat Cards — Row 2: Plain */}
          <MotiView
            from={{ opacity: 0, translateY: 12 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 200 }}
          >
            <View className="mb-5 flex-row gap-3 px-6">
              <StatCard
                value="84%"
                label="MISSION COMP."
                icon={<Target size={16} color={c.primary} strokeWidth={2} />}
                trend="+2%"
              />
              <StatCard
                value="76.2"
                label="AVG QUIZ SCORE"
                icon={<Award size={16} color={c.primary} strokeWidth={2} />}
              />
            </View>
          </MotiView>

          {/* Quick Tools */}
          <MotiView
            from={{ opacity: 0, translateY: 12 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 350 }}
          >
            <QuickTools />
          </MotiView>

          {/* Recent Activity */}
          <MotiView
            from={{ opacity: 0, translateY: 12 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 450 }}
          >
            <RecentActivity />
          </MotiView>

          {/* Student Directory */}
          <MotiView
            from={{ opacity: 0, translateY: 12 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 600 }}
          >
            <StudentDirectory />
          </MotiView>
        </ScrollView>
      </MotiView>
    </View>
  );
}
