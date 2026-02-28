import React from 'react';
import { ScrollView } from 'react-native';
import { ScreenWrapper } from '@/components/ui';
import { DashboardGreeting } from './DashboardGreeting';
import { QuickStats } from './QuickStats';
import { ProgressCard } from './ProgressCard';
import { QuickAccessCards } from './QuickAccessCards';
import { DailyChallenge } from './DailyChallenge';
import { RecentAchievements } from './RecentAchievements';
import { ProTipBanner } from './ProTipBanner';

export function DashboardScreen() {
  return (
    <ScreenWrapper topPadding={16} showDecoration={false}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        bounces
      >
        <DashboardGreeting
          name="Alex Chen"
          level={14}
          streak={12}
          onNotifications={() => {}}
          onSettings={() => {}}
        />

        <QuickStats streak={12} balance={450} rank={4} />

        <ProgressCard
          title="Financial Literacy B1"
          completion={68}
          missionsDone={12}
          totalMissions={18}
          onDetails={() => {}}
        />

        <QuickAccessCards onMapPress={() => {}} onSimulatorPress={() => {}} />

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
    </ScreenWrapper>
  );
}
