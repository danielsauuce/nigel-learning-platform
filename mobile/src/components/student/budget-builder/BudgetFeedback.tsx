import React from 'react';
import { Text, View } from 'react-native';
import { MotiView } from 'moti';
import { ShieldCheck, AlertTriangle, PartyPopper, PiggyBank } from 'lucide-react-native';

type FeedbackState = 'empty' | 'building' | 'balanced' | 'over' | 'savings_low';

interface BudgetFeedbackProps {
  state: FeedbackState;
  savingsAmount: number;
}

const FEEDBACK: Record<
  FeedbackState,
  {
    title: string;
    message: string;
    bgClass: string;
    textClass: string;
    icon: React.ComponentType<any>;
    iconColor: string;
  }
> = {
  empty: {
    title: 'Ready to budget?',
    message: 'Drag the sliders to allocate your take-home pay across categories.',
    bgClass: 'bg-muted/30',
    textClass: 'text-muted-foreground',
    icon: PiggyBank,
    iconColor: 'rgb(107, 114, 128)',
  },
  building: {
    title: 'Looking good!',
    message: "You're building your budget. Try to use all your income wisely.",
    bgClass: 'bg-primary/5',
    textClass: 'text-primary',
    icon: PiggyBank,
    iconColor: '#B9A7F8',
  },
  balanced: {
    title: 'Budget balanced!',
    message: "Amazing work! You've allocated all your income. Now let's see how it plays out!",
    bgClass: 'bg-success/8',
    textClass: 'text-success',
    icon: PartyPopper,
    iconColor: 'rgb(34, 197, 94)',
  },
  over: {
    title: "You're over budget!",
    message: "You're spending more than you earn. Reduce some categories to balance it.",
    bgClass: 'bg-destructive/8',
    textClass: 'text-destructive',
    icon: AlertTriangle,
    iconColor: 'rgb(239, 68, 68)',
  },
  savings_low: {
    title: 'No savings?',
    message:
      "You haven't saved anything! Even £50 a month adds up over time. Try the 50/30/20 rule.",
    bgClass: 'bg-warning/8',
    textClass: 'text-warning',
    icon: PiggyBank,
    iconColor: 'rgb(245, 158, 11)',
  },
};

export function BudgetFeedback({ state, savingsAmount }: BudgetFeedbackProps) {
  const fb = FEEDBACK[state];
  const Icon = fb.icon;

  return (
    <MotiView
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 100 }}
      key={state}
    >
      <View className={`mx-6 mb-4 mt-2 flex-row gap-3 rounded-2xl p-4 ${fb.bgClass}`}>
        <View className="h-10 w-10 items-center justify-center rounded-xl bg-card">
          <Icon size={20} color={fb.iconColor} strokeWidth={2} />
        </View>
        <View className="flex-1">
          <Text className={`mb-0.5 font-poppins-bold text-sm ${fb.textClass}`}>{fb.title}</Text>
          <Text className="font-poppins-regular text-xs leading-4 text-muted-foreground">
            {fb.message}
          </Text>
        </View>
      </View>
    </MotiView>
  );
}
