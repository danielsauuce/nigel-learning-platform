import React, { useCallback, useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import { ScreenWrapper, GradientButton } from '@/components/ui';
import { BudgetBuilderHeader } from './BudgetBuilderHeader';
import { BudgetBalanceCard } from './BudgetBalanceCard';
import { BudgetBreakdownBar } from './BudgetBreakdownBar';
import { BudgetSlider, type BudgetCategory } from './BudgetSlider';
import { BudgetFeedback } from './BudgetFeedback';

const TAKE_HOME = 2195; // from payslip (£2850 - deductions)

function createCategories(): BudgetCategory[] {
  return [
    {
      key: 'rent',
      label: 'Rent & Bills',
      emoji: '🏠',
      color: 'rgb(108, 92, 231)',
      min: 0,
      max: 1200,
      step: 25,
      recommended: 770,
      value: 0,
    },
    {
      key: 'food',
      label: 'Food & Groceries',
      emoji: '🛒',
      color: 'rgb(34, 197, 94)',
      min: 0,
      max: 600,
      step: 10,
      recommended: 330,
      value: 0,
    },
    {
      key: 'transport',
      label: 'Transport',
      emoji: '🚌',
      color: 'rgb(59, 130, 246)',
      min: 0,
      max: 400,
      step: 10,
      recommended: 175,
      value: 0,
    },
    {
      key: 'fun',
      label: 'Fun & Social',
      emoji: '🎮',
      color: 'rgb(245, 158, 11)',
      min: 0,
      max: 500,
      step: 10,
      recommended: 220,
      value: 0,
    },
    {
      key: 'savings',
      label: 'Savings',
      emoji: '🐷',
      color: 'rgb(236, 72, 153)',
      min: 0,
      max: 800,
      step: 25,
      recommended: 440,
      value: 0,
    },
    {
      key: 'other',
      label: 'Other & Emergency',
      emoji: '🎒',
      color: 'rgb(139, 92, 246)',
      min: 0,
      max: 400,
      step: 10,
      recommended: 110,
      value: 0,
    },
  ];
}

export function BudgetBuilderScreen() {
  const router = useRouter();
  const [categories, setCategories] = useState<BudgetCategory[]>(createCategories);

  const totalAllocated = useMemo(
    () => categories.reduce((sum, c) => sum + c.value, 0),
    [categories],
  );

  const remaining = TAKE_HOME - totalAllocated;
  const savingsAmount = categories.find((c) => c.key === 'savings')?.value ?? 0;

  const feedbackState = useMemo(() => {
    if (totalAllocated === 0) return 'empty' as const;
    if (remaining < 0) return 'over' as const;
    if (remaining === 0 && savingsAmount === 0) return 'savings_low' as const;
    if (Math.abs(remaining) <= 25) return 'balanced' as const;
    if (savingsAmount === 0 && totalAllocated > TAKE_HOME * 0.6) return 'savings_low' as const;
    return 'building' as const;
  }, [totalAllocated, remaining, savingsAmount]);

  const handleSliderChange = useCallback((key: string, value: number) => {
    setCategories((prev) => prev.map((c) => (c.key === key ? { ...c, value } : c)));
  }, []);

  const handleConfirm = useCallback(() => {
    router.push('/(student)/life-event' as any);
  }, [router]);

  const canConfirm = totalAllocated > 0 && remaining >= 0;

  return (
    <ScreenWrapper topPadding={12} showDecoration={false}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        bounces
        keyboardShouldPersistTaps="handled"
      >
        <BudgetBuilderHeader onBack={() => router.back()} />

        <BudgetBalanceCard takeHome={TAKE_HOME} allocated={totalAllocated} />

        <BudgetFeedback state={feedbackState} savingsAmount={savingsAmount} />

        <BudgetBreakdownBar categories={categories} takeHome={TAKE_HOME} />

        {/* Sliders */}
        <View className="px-6">
          {categories.map((cat, index) => (
            <BudgetSlider
              key={cat.key}
              category={cat}
              onChange={handleSliderChange}
              index={index}
              takeHome={TAKE_HOME}
            />
          ))}
        </View>
      </ScrollView>

      {/* Footer */}
      <MotiView
        from={{ opacity: 0, translateY: 16 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 700 }}
      >
        <View className="px-6 pt-2">
          <GradientButton
            label="Lock In Budget"
            variant="purple"
            onPress={handleConfirm}
            disabled={!canConfirm}
            showArrow
          />
        </View>
      </MotiView>
    </ScreenWrapper>
  );
}
