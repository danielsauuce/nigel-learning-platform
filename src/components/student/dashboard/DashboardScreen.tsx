import React from 'react';
import { View, StatusBar, ScrollView } from 'react-native';
import { MotiView } from 'moti';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/context';

import { DashboardGreeting } from './DashboardGreeting';
import { QuickStats } from './QuickStats';
import { ProgressCard } from './ProgressCard';
import { QuickAccessCards } from './QuickAccessCards';
import { DailyChallenge } from './DailyChallenge';
import { RecentAchievements } from './RecentAchievements';
import { ProTipBanner } from './ProTipBanner';
import { router } from 'expo-router';

export function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

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
        style={{ flex: 1 }}
      >
        <View
          style={{
            flex: 1,
            paddingTop: insets.top + 16,
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false} bounces contentContainerClassName="pb-6">
            <DashboardGreeting
              name="Alex Chen"
              level={14}
              streak={12}
              onNotifications={() => {}}
              onSettings={() => {
                router.push('/(student)/(tabs)/settings');
              }}
            />

            <QuickStats streak={12} balance={450} rank={4} />

            <ProgressCard
              title="Learning Progress"
              completion={68}
              missionsDone={12}
              totalMissions={18}
              onDetails={() => {
                router.push('/(student)/progress-stats');
              }}
            />

            <QuickAccessCards
              onMapPress={() => {
                router.push('/(student)/(tabs)/map');
              }}
              onSimulatorPress={() => {
                router.push('/(student)/simulator');
              }}
            />

            <DailyChallenge
              title="Compound Interest Puzzle"
              description="Solve the mystery of how a $100 investment grows over 5 years. Can you find the missing link?"
              duration="5 Mins"
              xpReward={50}
              onStart={() => {
                router.push('/(student)/daily-challenge');
              }}
            />

            <RecentAchievements
              badges={[
                { key: 'early_bird', emoji: '🔥', label: 'Early Bird' },
                { key: 'smart_saver', emoji: '💰', label: 'Smart Saver' },
                { key: 'island_king', emoji: '🏆', label: 'Island King' },
                { key: 'goal_setter', emoji: '⭐', label: 'Goal Setter' },
              ]}
              onViewAll={() => {
                router.push('/(student)/progress-stats');
              }}
            />

            <ProTipBanner
              title="Pro Tip: 50/30/20 Rule"
              description="Divide your sim-income into Needs (50%), Wants (30%), and Savings (20%)."
            />
          </ScrollView>
        </View>
      </MotiView>
    </View>
  );
}
