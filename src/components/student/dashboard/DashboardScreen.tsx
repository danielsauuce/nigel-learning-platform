import React from 'react';
import { View, StatusBar, ScrollView } from 'react-native';
import { MotiView } from 'moti';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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

  return (
    <View className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

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
              onSettings={() => {}}
            />

            <QuickStats streak={12} balance={450} rank={4} />

            <ProgressCard
              title="Learning Progress"
              completion={68}
              missionsDone={12}
              totalMissions={18}
              onDetails={() => {}}
            />

            <QuickAccessCards
              onMapPress={() => {
                router.push('/(student)/map');
              }}
              onSimulatorPress={() => {}}
            />

            <DailyChallenge
              title="Compound Interest Puzzle"
              description="Solve the mystery of how a $100 investment grows over 5 years. Can you find the missing link?"
              duration="5 Mins"
              xpReward={50}
              onStart={() => {}}
            />

            <RecentAchievements
              badges={[
                { key: 'early_bird', emoji: '🔥', label: 'Early Bird' },
                { key: 'smart_saver', emoji: '💰', label: 'Smart Saver' },
                { key: 'island_king', emoji: '🏆', label: 'Island King' },
                { key: 'goal_setter', emoji: '⭐', label: 'Goal Setter' },
              ]}
              onViewAll={() => {}}
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
