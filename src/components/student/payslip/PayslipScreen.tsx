import React, { useCallback, useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import { ScreenWrapper, GradientButton } from '@/components/ui';
import { PayslipHeader } from './PayslipHeader';
import { PayslipSummaryCard, type PayslipLine } from './PayslipSummaryCard';
import { PayslipBreakdownChart } from './PayslipBreakdownChart';
import { PayslipTip } from './PayslipTip';

// ─── Salary calculation helpers (simplified for kids) ───────────
function calcDeductions(gross: number) {
  const tax = Math.round(gross * 0.12);
  const nationalInsurance = Math.round(gross * 0.08);
  const pension = Math.round(gross * 0.03);
  const takeHome = gross - tax - nationalInsurance - pension;
  return { tax, nationalInsurance, pension, takeHome };
}

interface PayslipScreenProps {
  jobTitle?: string;
  grossSalary?: number;
}

export function PayslipScreen({
  jobTitle = 'Office Junior',
  grossSalary = 2850,
}: PayslipScreenProps) {
  const router = useRouter();

  const deductions = useMemo(() => calcDeductions(grossSalary), [grossSalary]);

  const lines: PayslipLine[] = [
    { label: 'Gross Salary', amount: grossSalary, type: 'income' },
    { label: 'Income Tax (12%)', amount: deductions.tax, type: 'deduction' },
    { label: 'National Insurance (8%)', amount: deductions.nationalInsurance, type: 'deduction' },
    { label: 'Pension (3%)', amount: deductions.pension, type: 'deduction' },
  ];

  const segments = [
    {
      label: 'Take-Home',
      amount: deductions.takeHome,
      color: 'rgb(108, 92, 231)',
      percentage: Math.round((deductions.takeHome / grossSalary) * 100),
    },
    {
      label: 'Income Tax',
      amount: deductions.tax,
      color: 'rgb(239, 68, 68)',
      percentage: Math.round((deductions.tax / grossSalary) * 100),
    },
    {
      label: 'National Insurance',
      amount: deductions.nationalInsurance,
      color: 'rgb(245, 158, 11)',
      percentage: Math.round((deductions.nationalInsurance / grossSalary) * 100),
    },
    {
      label: 'Pension',
      amount: deductions.pension,
      color: 'rgb(59, 130, 246)',
      percentage: Math.round((deductions.pension / grossSalary) * 100),
    },
  ];

  const handleContinue = useCallback(() => {
    router.push('/(student)/budget-builder' as any);
  }, [router]);

  return (
    <ScreenWrapper topPadding={12} showDecoration={false}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        bounces
      >
        <PayslipHeader jobTitle={jobTitle} onBack={() => router.back()} />

        <PayslipSummaryCard grossPay={grossSalary} lines={lines} takeHome={deductions.takeHome} />

        <PayslipBreakdownChart segments={segments} />

        <PayslipTip
          title="Did you know?"
          description="Everyone who earns money pays some of it to the government as tax. This helps fund schools, hospitals, roads, and public services that benefit everyone!"
        />
      </ScrollView>

      {/* Footer */}
      <MotiView
        from={{ opacity: 0, translateY: 16 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 800 }}
      >
        <View className="px-6 pt-2">
          <GradientButton
            label="Start Budgeting"
            variant="purple"
            onPress={handleContinue}
            showArrow
          />
        </View>
      </MotiView>
    </ScreenWrapper>
  );
}
