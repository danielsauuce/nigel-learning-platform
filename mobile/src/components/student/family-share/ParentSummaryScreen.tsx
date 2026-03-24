import React, { useCallback, useState } from 'react';
import { Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/ui';
import {
  BookOpen,
  Award,
  TrendingUp,
  Target,
  Flame,
  MessageSquare,
  Send,
  Clock,
  Heart,
  X,
  Coins,
  BarChart2,
  Map,
  CheckCircle,
  MessageCircle,
  ShoppingCart,
} from 'lucide-react-native';
import { useTheme } from '@/context';
import { colors } from '@/constants/colors';
import Svg, { Circle } from 'react-native-svg';

// ── Progress ring ──
function ProgressRing({
  percent,
  size = 100,
  strokeWidth = 10,
}: {
  percent: number;
  size?: number;
  strokeWidth?: number;
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
        stroke="#B9A7F8"
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={`${circumference}`}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </Svg>
  );
}

// ── Mock data
const STUDENT = {
  name: 'Alex',
  initial: 'A',
  level: 14,
  streak: 12,
  overallProgress: 68,
  missionsCompleted: 12,
  missionsTotal: 18,
  simGrade: 'B',
  quizAverage: 82,
};

const BADGES = [
  {
    key: 'saver',
    icon: <Coins size={22} color="#F7E6B6" strokeWidth={2} />,
    label: 'Smart Saver',
    date: '2 days ago',
  },
  {
    key: 'streak',
    icon: <Flame size={22} color="#F97316" strokeWidth={2} />,
    label: 'Week Warrior',
    date: '5 days ago',
  },
  {
    key: 'budget',
    icon: <BarChart2 size={22} color="#B9A7F8" strokeWidth={2} />,
    label: 'Budget Pro',
    date: '1 week ago',
  },
  {
    key: 'island',
    icon: <Map size={22} color="#10B981" strokeWidth={2} />,
    label: 'Island Explorer',
    date: '2 weeks ago',
  },
];

const RECENT_ACTIVITY = [
  {
    key: 'lesson',
    icon: <CheckCircle size={16} color="#10B981" strokeWidth={2} />,
    text: 'Completed "Where to Keep Your Money" lesson',
    time: 'Today',
  },
  {
    key: 'quiz',
    icon: <Target size={16} color="#B9A7F8" strokeWidth={2} />,
    text: 'Scored 94% on Savings Quiz',
    time: 'Today',
  },
  {
    key: 'simulator',
    icon: <Coins size={16} color="#F7E6B6" strokeWidth={2} />,
    text: 'Finished Budget Simulator with B grade',
    time: 'Yesterday',
  },
  {
    key: 'island',
    icon: <Map size={16} color="#10B981" strokeWidth={2} />,
    text: 'Unlocked Smart Spending island',
    time: '3 days ago',
  },
];

const CONVERSATION_STARTERS = [
  {
    key: 'saving',
    icon: <MessageCircle size={16} color="#B9A7F8" strokeWidth={2} />,
    prompt: 'Ask about saving',
    detail: '"What did you learn about where to keep money safely?"',
  },
  {
    key: 'budgeting',
    icon: <ShoppingCart size={16} color="#B9A7F8" strokeWidth={2} />,
    prompt: 'Discuss budgeting',
    detail: '"Can you show me how you built a budget in the simulator?"',
  },
  {
    key: 'progress',
    icon: <Target size={16} color="#B9A7F8" strokeWidth={2} />,
    prompt: 'Celebrate progress',
    detail: '"I saw you completed 12 missions — which one was your favourite?"',
  },
];

export function ParentSummaryScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const c = colors[theme];

  const [feedback, setFeedback] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);

  const handleSendFeedback = useCallback(() => {
    if (feedback.trim().length > 0) {
      setFeedbackSent(true);
      setFeedback('');
    }
  }, [feedback]);

  return (
    <ScreenWrapper topPadding={16} showDecoration={false}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        bounces
      >
        {/* Close preview button */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 300 }}
          className="mb-2 flex-row justify-end px-5"
        >
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            className="flex-row items-center gap-1 rounded-full bg-muted/50 px-3 py-1.5"
          >
            <X size={14} className="text-muted-foreground" strokeWidth={2.5} />
            <Text className="font-poppins-medium text-xs text-muted-foreground">Close Preview</Text>
          </TouchableOpacity>
        </MotiView>

        {/* Nigel brand header */}
        <MotiView
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 130 }}
          className="mb-2 items-center px-6"
        >
          <View className="mb-1 flex-row items-center gap-2">
            <View className="h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <BookOpen size={16} color="#FFFFFF" strokeWidth={2.5} />
            </View>
            <Text className="font-fredoka text-lg text-primary">Nigel</Text>
          </View>
          <Text className="font-poppins-regular text-xs text-muted-foreground">
            Family Progress Summary
          </Text>
        </MotiView>

        {/* Expiry banner */}
        <MotiView
          from={{ opacity: 0, translateY: 6 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 130, delay: 50 }}
          className="mx-6 mb-4"
        >
          <View className="bg-warning/8 flex-row items-center gap-2 rounded-lg border border-warning/15 px-3 py-2">
            <Clock size={12} color="rgb(245, 158, 11)" strokeWidth={2} />
            <Text className="font-poppins-regular text-[11px] text-muted-foreground">
              This link expires in 6 days · Read-only
            </Text>
          </View>
        </MotiView>

        {/* ── Student profile card ── */}
        <MotiView
          from={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 14, stiffness: 110, delay: 100 }}
          className="mx-6 mb-5"
        >
          <View
            className="overflow-hidden rounded-3xl border border-border bg-card"
            style={Platform.select({
              ios: {
                shadowColor: c.primary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.08,
                shadowRadius: 16,
              },
              android: { elevation: 4 },
            })}
          >
            {/* Purple gradient header strip */}
            <View className="bg-primary/8 items-center px-5 pb-4 pt-5">
              <View
                className="w-18 h-18 mb-2 items-center justify-center rounded-full bg-primary/15"
                style={{ width: 72, height: 72 }}
              >
                <Text className="font-poppins-bold text-2xl text-primary">{STUDENT.initial}</Text>
              </View>
              <Text className="font-fredoka text-xl text-foreground">
                {STUDENT.name}'s Progress
              </Text>
              <View className="mt-1 flex-row items-center gap-3">
                <Text className="font-poppins-medium text-xs text-muted-foreground">
                  Level {STUDENT.level}
                </Text>
                <View className="h-1 w-1 rounded-full bg-muted-foreground" />
                <View className="flex-row items-center gap-1">
                  <Flame size={12} color="rgb(239, 68, 68)" strokeWidth={2} />
                  <Text className="font-poppins-medium text-xs text-muted-foreground">
                    {STUDENT.streak}-day streak
                  </Text>
                </View>
              </View>
            </View>

            {/* Progress ring + stats */}
            <View className="px-5 py-5">
              <View className="flex-row items-center gap-5">
                {/* Ring */}
                <View className="items-center justify-center">
                  <ProgressRing percent={STUDENT.overallProgress} size={90} strokeWidth={9} />
                  <View className="absolute items-center">
                    <Text className="font-fredoka text-xl text-foreground">
                      {STUDENT.overallProgress}%
                    </Text>
                    <Text className="font-poppins-regular text-[9px] text-muted-foreground">
                      complete
                    </Text>
                  </View>
                </View>

                {/* Stats grid */}
                <View className="flex-1 gap-2.5">
                  {[
                    {
                      icon: <Target size={14} color={c.primary} strokeWidth={2} />,
                      label: 'Missions',
                      value: `${STUDENT.missionsCompleted}/${STUDENT.missionsTotal}`,
                    },
                    {
                      icon: <TrendingUp size={14} color={colors.success} strokeWidth={2} />,
                      label: 'Simulation Grade',
                      value: STUDENT.simGrade,
                    },
                    {
                      icon: <Award size={14} color="rgb(245, 158, 11)" strokeWidth={2} />,
                      label: 'Quiz Average',
                      value: `${STUDENT.quizAverage}%`,
                    },
                  ].map((stat) => (
                    <View key={stat.label} className="flex-row items-center gap-2.5">
                      <View className="h-7 w-7 items-center justify-center rounded-lg bg-muted/50">
                        {stat.icon}
                      </View>
                      <View className="flex-1">
                        <Text className="font-poppins-regular text-[10px] text-muted-foreground">
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
          </View>
        </MotiView>

        {/* ── Achievements ── */}
        <MotiView
          from={{ opacity: 0, translateY: 12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 250 }}
          className="mx-6 mb-5"
        >
          <View className="mb-2.5 flex-row items-center gap-2">
            <Award size={16} color="rgb(245, 158, 11)" strokeWidth={2} />
            <Text className="font-poppins-bold text-sm text-foreground">Achievements Earned</Text>
          </View>
          <View className="gap-2">
            {BADGES.map((badge, index) => (
              <MotiView
                key={badge.key}
                from={{ opacity: 0, translateX: -10 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{
                  type: 'spring',
                  damping: 16,
                  stiffness: 130,
                  delay: 300 + index * 50,
                }}
              >
                <View className="flex-row items-center gap-3 rounded-xl border border-border bg-card px-3.5 py-3">
                  <View className="h-8 w-8 items-center justify-center">{badge.icon}</View>
                  <View className="flex-1">
                    <Text className="font-poppins-semibold text-sm text-foreground">
                      {badge.label}
                    </Text>
                    <Text className="font-poppins-regular text-[10px] text-muted-foreground">
                      Earned {badge.date}
                    </Text>
                  </View>
                </View>
              </MotiView>
            ))}
          </View>
        </MotiView>

        {/* ── Recent Activity ── */}
        <MotiView
          from={{ opacity: 0, translateY: 12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 450 }}
          className="mx-6 mb-5"
        >
          <View className="mb-2.5 flex-row items-center gap-2">
            <TrendingUp size={16} color={c.primary} strokeWidth={2} />
            <Text className="font-poppins-bold text-sm text-foreground">Recent Activity</Text>
          </View>
          <View className="overflow-hidden rounded-2xl border border-border bg-card">
            {RECENT_ACTIVITY.map((item, index) => (
              <MotiView
                key={item.key}
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
                  className={`flex-row items-center gap-3 px-4 py-3 ${
                    index < RECENT_ACTIVITY.length - 1 ? 'border-b border-border' : ''
                  }`}
                >
                  <View className="items-center justify-center">{item.icon}</View>
                  <View className="flex-1">
                    <Text className="font-poppins-medium text-xs leading-4 text-foreground">
                      {item.text}
                    </Text>
                    <Text className="mt-0.5 font-poppins-regular text-[10px] text-muted-foreground">
                      {item.time}
                    </Text>
                  </View>
                </View>
              </MotiView>
            ))}
          </View>
        </MotiView>

        {/* ── Conversation Starters ── */}
        <MotiView
          from={{ opacity: 0, translateY: 12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 650 }}
          className="mx-6 mb-5"
        >
          <View className="mb-1 flex-row items-center gap-2">
            <Heart size={16} color={c.primary} strokeWidth={2} />
            <Text className="font-poppins-bold text-sm text-foreground">
              Talk About It Together
            </Text>
          </View>
          <Text className="mb-2.5 font-poppins-regular text-xs text-muted-foreground">
            Here are some ideas to start a conversation with {STUDENT.name}:
          </Text>
          <View className="gap-2">
            {CONVERSATION_STARTERS.map((starter, index) => (
              <MotiView
                key={starter.key}
                from={{ opacity: 0, translateX: -8 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{
                  type: 'spring',
                  damping: 16,
                  stiffness: 130,
                  delay: 700 + index * 60,
                }}
              >
                <View className="rounded-xl border border-primary/10 bg-primary/5 p-3.5">
                  <View className="mb-1 flex-row items-center gap-2">
                    <View className="items-center justify-center">{starter.icon}</View>
                    <Text className="font-poppins-semibold text-xs text-primary">
                      {starter.prompt}
                    </Text>
                  </View>
                  <Text className="ml-6 font-poppins-regular text-xs italic leading-4 text-foreground">
                    {starter.detail}
                  </Text>
                </View>
              </MotiView>
            ))}
          </View>
        </MotiView>

        {/* ── Anonymous Feedback to Teacher ── */}
        <MotiView
          from={{ opacity: 0, translateY: 12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 850 }}
          className="mx-6 mb-4"
        >
          <View className="mb-1 flex-row items-center gap-2">
            <MessageSquare size={16} color={c.mutedForeground} strokeWidth={2} />
            <Text className="font-poppins-bold text-sm text-foreground">
              Feedback for the Teacher
            </Text>
          </View>
          <Text className="mb-2.5 font-poppins-regular text-xs text-muted-foreground">
            Optional and anonymous — help improve {STUDENT.name}'s learning experience.
          </Text>

          {feedbackSent ? (
            <MotiView
              from={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 14, stiffness: 120 }}
            >
              <View className="items-center gap-1 rounded-xl border border-success/15 bg-success/10 p-4">
                <CheckCircle size={28} color={colors.success} strokeWidth={2} />
                <Text className="font-poppins-semibold text-sm text-success">Thank you!</Text>
                <Text className="font-poppins-regular text-xs text-muted-foreground">
                  Your feedback has been sent anonymously.
                </Text>
              </View>
            </MotiView>
          ) : (
            <View className="rounded-xl border border-border bg-card p-3.5">
              <TextInput
                value={feedback}
                onChangeText={setFeedback}
                placeholder="e.g. Alex really enjoyed the budget simulator, but found the quiz hard..."
                placeholderTextColor={c.mutedForeground}
                multiline
                numberOfLines={3}
                className="mb-3 font-poppins-regular text-sm text-foreground"
                style={{ minHeight: 72, textAlignVertical: 'top' }}
              />
              <TouchableOpacity
                onPress={handleSendFeedback}
                activeOpacity={0.7}
                disabled={feedback.trim().length === 0}
                className={`flex-row items-center justify-center gap-2 rounded-xl py-3 ${
                  feedback.trim().length > 0 ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <Send
                  size={14}
                  color={feedback.trim().length > 0 ? '#FFFFFF' : c.mutedForeground}
                  strokeWidth={2}
                />
                <Text
                  className={`font-poppins-semibold text-sm ${
                    feedback.trim().length > 0 ? 'text-white' : 'text-muted-foreground'
                  }`}
                >
                  Send Anonymously
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </MotiView>

        {/* Footer branding */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 500, delay: 1000 }}
          className="mt-4 items-center px-6"
        >
          <View className="w-full items-center border-t border-border pt-4">
            <Text className="text-center font-poppins-regular text-[10px] text-muted-foreground">
              Powered by Nigel · Financial Literacy for Young Learners
            </Text>
            <Text className="mt-0.5 text-center font-poppins-regular text-[10px] text-muted-foreground">
              This is a secure, read-only summary. No account required.
            </Text>
          </View>
        </MotiView>
      </ScrollView>
    </ScreenWrapper>
  );
}
