import React, { useCallback } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import { ScreenWrapper, GradientButton, TextButton } from '@/components/ui';
import { MascotCelebration } from '@/components/student/shared';
import {
  Award,
  BarChart2,
  PiggyBank,
  Zap,
  Home,
  Gamepad2,
  AlertTriangle,
  Trophy,
} from 'lucide-react-native';
import { ResultsScoreCard } from './ResultsScoreCard';
import { ResultsBreakdown } from './ResultsBreakdown';
import { ResultsFeedbackList, type FeedbackItem } from './ResultsFeedbackList';

const STATS = [
  {
    key: 'budget',
    icon: <BarChart2 size={20} color="#B9A7F8" strokeWidth={2} />,
    label: 'Budget',
    value: '74%',
  },
  {
    key: 'savings',
    icon: <PiggyBank size={20} color="#E91E63" strokeWidth={2} />,
    label: 'Saved',
    value: '£440',
  },
  {
    key: 'xp',
    icon: <Zap size={20} color="#F59E0B" strokeWidth={2} />,
    label: 'XP',
    value: '+250',
  },
];

const FEEDBACK: FeedbackItem[] = [
  {
    key: 'rent',
    icon: <Home size={18} color="#B9A7F8" strokeWidth={2} />,
    category: 'Rent & Bills',
    message: 'Nicely within the recommended range. You kept housing costs under control!',
    type: 'good',
  },
  {
    key: 'savings',
    icon: <PiggyBank size={18} color="#E91E63" strokeWidth={2} />,
    category: 'Savings',
    message:
      "Great job putting money aside! You saved 20% of your income — that's the 50/30/20 rule in action.",
    type: 'good',
  },
  {
    key: 'fun',
    icon: <Gamepad2 size={18} color="#FF9800" strokeWidth={2} />,
    category: 'Fun & Social',
    message: 'You went a bit over the suggested amount. Try trimming £30 next month.',
    type: 'warning',
  },
  {
    key: 'emergency',
    icon: <AlertTriangle size={18} color="#9C27B0" strokeWidth={2} />,
    category: 'Emergency Fund',
    message:
      'The life event caught you off guard! Building a bigger emergency buffer would help next time.',
    type: 'bad',
  },
];

export function SimResultsScreen() {
  const router = useRouter();

  const handleDashboard = useCallback(() => {
    router.replace('/(student)/(tabs)' as any);
  }, [router]);

  const handleRetry = useCallback(() => {
    router.replace('/(student)/(tabs)/budget' as any);
  }, [router]);

  return (
    <ScreenWrapper topPadding={16} showDecoration={false}>
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
          className="mb-5 items-center px-6"
        >
          <MotiView
            from={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 10, stiffness: 100, delay: 100 }}
            className="mb-3 h-14 w-14 items-center justify-center rounded-full bg-primary/10"
          >
            <MascotCelebration size={80} showConfetti showHurray enableJump />
          </MotiView>
          <Text className="mb-1 text-center font-fredoka text-2xl text-foreground">
            Simulation Complete!
          </Text>
          <Text className="text-center font-poppins-regular text-sm text-muted-foreground">
            Here's how you managed your finances this month.
          </Text>
        </MotiView>

        <ResultsScoreCard score={74} />

        <ResultsBreakdown stats={STATS} />

        <ResultsFeedbackList items={FEEDBACK} />

        {/* Badge earned */}
        <MotiView
          from={{ opacity: 0, translateY: 12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 1200 }}
          className="mx-6 mt-6"
        >
          <View className="flex-row items-center gap-3.5 rounded-2xl border border-primary/15 bg-primary/5 p-4">
            <View className="h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Trophy size={24} color="#F59E0B" strokeWidth={2} />
            </View>
            <View className="flex-1">
              <Text className="mb-0.5 font-poppins-bold text-xs uppercase tracking-wider text-primary">
                New Badge Earned
              </Text>
              <Text className="font-poppins-semibold text-sm text-foreground">Budget Beginner</Text>
              <Text className="font-poppins-regular text-xs text-muted-foreground">
                Completed your first budget simulation!
              </Text>
            </View>
          </View>
        </MotiView>
      </ScrollView>

      {/* Footer */}
      <MotiView
        from={{ opacity: 0, translateY: 16 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 1400 }}
      >
        <View className="gap-2 px-6 pt-2">
          <GradientButton
            label="Back to Dashboard"
            variant="purple"
            onPress={handleDashboard}
            showArrow
          />
          <TextButton
            label="Try Again with a Different Job"
            onPress={handleRetry}
            color="primary"
            size="sm"
            style={{ alignSelf: 'center' }}
          />
        </View>
      </MotiView>
    </ScreenWrapper>
  );
}
