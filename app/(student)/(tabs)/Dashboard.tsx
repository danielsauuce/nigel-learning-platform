import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, ScrollView, StatusBar, View } from 'react-native';

import {
  AchievementsIcon,
  FamilyIcon,
  FloatingCoin,
  SimulatorIcon,
} from '@/components/illustrations';
import {
  BadgesRow,
  ContinueLearningCard,
  DailyChallengeCard,
  GreetingHeader,
  IslandsOverview,
  QuickAccessGrid,
  type QuickAccessItem,
} from '@/components/Dashboard';
import { QuickStatsBar } from '@/components/ui/quick-stats-bar';
import { SectionHeader } from '@/components/ui/section-header';
import { GradientBackground, StarField, WaveDecoration } from '@/components/ui/screen-background';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants/app';
import { useAppFonts } from '@/hooks/use-app-fonts';
import { SAFE_TOP } from '@/lib/safe-area';

const STUDENT = {
  nickname: 'James',
  overallProgress: 0.35,
  missionsCompleted: 7,
  totalMissions: 20,
  quizAverage: 82,
  currentStreak: 3,
};

const DAILY_CHALLENGE = {
  title: 'Quick Quiz: Needs vs Wants',
  description: 'Can you sort these 5 items correctly?',
  xpReward: 25,
};

const NEXT_MISSION = {
  islandName: 'Saving Goals',
  islandEmoji: '🎯',
  missionTitle: 'Mission 3: The 50/30/20 Rule',
  islandColor: '#10B981',
  progress: 0.6,
};

const RECENT_BADGES = [
  { id: '1', emoji: '🌟', label: 'First Steps', color: '#FFD700' },
  { id: '2', emoji: '📊', label: 'Budget Boss', color: '#4FC3F7' },
  { id: '3', emoji: '🧠', label: 'Quiz Whiz', color: '#A855F7' },
];

const ISLANDS_PREVIEW = [
  { id: 'budgeting', name: 'Budgeting Basics', emoji: '💰', color: '#4FC3F7', progress: 1.0 },
  { id: 'needs-wants', name: 'Needs vs Wants', emoji: '⚖️', color: '#FF2E91', progress: 0.75 },
  { id: 'saving', name: 'Saving Goals', emoji: '🎯', color: '#10B981', progress: 0.6 },
  { id: 'banking', name: 'Banking & Cards', emoji: '💳', color: '#A855F7', progress: 0.0 },
  { id: 'interest', name: 'Interest', emoji: '📈', color: '#F59E0B', progress: 0.0 },
];

const COIN_POSITIONS = [
  { delay: 0, startX: SCREEN_WIDTH * 0.05, startY: SCREEN_HEIGHT * 0.06, size: 22, opacity: 0.3 },
  {
    delay: 400,
    startX: SCREEN_WIDTH * 0.82,
    startY: SCREEN_HEIGHT * 0.04,
    size: 18,
    opacity: 0.25,
  },
  { delay: 200, startX: SCREEN_WIDTH * 0.7, startY: SCREEN_HEIGHT * 0.15, size: 16, opacity: 0.2 },
] as const;

export default function DashboardScreen() {
  const router = useRouter();
  const [fontsLoaded] = useAppFonts();

  const fadeAnims = useRef(Array.from({ length: 6 }, () => new Animated.Value(0))).current;
  const slideAnims = useRef(Array.from({ length: 6 }, () => new Animated.Value(25))).current;

  useEffect(() => {
    const animations = fadeAnims.map((fade, i) =>
      Animated.parallel([
        Animated.timing(fade, {
          toValue: 1,
          duration: 350,
          delay: i * 100,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnims[i], {
          toValue: 0,
          duration: 350,
          delay: i * 100,
          useNativeDriver: true,
        }),
      ]),
    );
    Animated.stagger(80, animations).start();
  }, []);

  const anim = (index: number) => ({
    opacity: fadeAnims[index],
    transform: [{ translateY: slideAnims[index] }],
  });

  const quickAccessItems: QuickAccessItem[] = [
    {
      key: 'simulator',
      Icon: SimulatorIcon,
      label: 'Budget\nSimulator',
      colors: ['rgba(255,215,0,0.15)', 'rgba(255,215,0,0.04)'],
      onPress: () => router.push('/BudgetSimulator'),
    },
    {
      key: 'achievements',
      Icon: AchievementsIcon,
      label: 'My\nAchievements',
      colors: ['rgba(255,46,145,0.15)', 'rgba(255,46,145,0.04)'],
      onPress: () => router.push('/(student)/Progress'),
    },
    {
      key: 'family',
      Icon: FamilyIcon,
      label: 'Share with\nFamily',
      colors: ['rgba(16,185,129,0.15)', 'rgba(16,185,129,0.04)'],
      onPress: () => router.push('/(student)/FamilyShare'),
    },
  ];

  if (!fontsLoaded) return null;

  return (
    <View className="flex-1 overflow-hidden">
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Background layers */}
      <GradientBackground />
      <StarField count={12} seed={97} />
      {COIN_POSITIONS.map((coin) => (
        <FloatingCoin key={coin.delay} {...coin} />
      ))}
      <WaveDecoration />

      {/* Content */}
      <ScrollView
        className="z-[1] flex-1"
        contentContainerStyle={{ paddingTop: SAFE_TOP, paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header: Greeting + Progress Ring */}
        <Animated.View className="mb-5" style={anim(0)}>
          <GreetingHeader
            nickname={STUDENT.nickname}
            streak={STUDENT.currentStreak}
            progress={STUDENT.overallProgress}
          />
          <View className="mt-4">
            <QuickStatsBar
              stats={[
                {
                  value: `${STUDENT.missionsCompleted}/${STUDENT.totalMissions}`,
                  label: 'Missions',
                },
                { value: `${STUDENT.quizAverage}%`, label: 'Quiz Avg' },
                { value: `${RECENT_BADGES.length}`, label: 'Badges' },
              ]}
            />
          </View>
        </Animated.View>

        {/* Daily Challenge */}
        <Animated.View className="mb-6" style={anim(1)}>
          <DailyChallengeCard
            title={DAILY_CHALLENGE.title}
            description={DAILY_CHALLENGE.description}
            xpReward={DAILY_CHALLENGE.xpReward}
            onPress={() => router.push('/DailyChallenge')}
          />
        </Animated.View>

        {/* Continue Learning */}
        <Animated.View className="mb-6" style={anim(2)}>
          <SectionHeader title="Continue Learning" />
          <ContinueLearningCard
            islandName={NEXT_MISSION.islandName}
            islandEmoji={NEXT_MISSION.islandEmoji}
            missionTitle={NEXT_MISSION.missionTitle}
            islandColor={NEXT_MISSION.islandColor}
            progress={NEXT_MISSION.progress}
          />
        </Animated.View>

        {/* Quick Access Grid */}
        <Animated.View className="mb-6" style={anim(3)}>
          <SectionHeader title="Quick Access" />
          <QuickAccessGrid items={quickAccessItems} />
        </Animated.View>

        {/* Islands Overview */}
        <Animated.View style={anim(4)}>
          <SectionHeader title="Your Islands" linkText="See all →" onLinkPress={() => {}} />
          <IslandsOverview islands={ISLANDS_PREVIEW} />
        </Animated.View>

        {/* Recent Badges */}
        <Animated.View className="mt-6" style={anim(5)}>
          <SectionHeader title="Recent Badges" linkText="View all →" onLinkPress={() => {}} />
          <BadgesRow badges={RECENT_BADGES} />
        </Animated.View>

        {/* Bottom spacer for tab bar */}
        <View className="h-[100px]" />
      </ScrollView>
    </View>
  );
}
