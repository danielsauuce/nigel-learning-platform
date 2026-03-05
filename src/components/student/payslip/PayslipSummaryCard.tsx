import React from 'react';
import { Platform, Text, View } from 'react-native';
import { MotiView } from 'moti';
import { Receipt } from 'lucide-react-native';

export interface PayslipLine {
  label: string;
  amount: number;
  type: 'income' | 'deduction' | 'total';
}

interface PayslipSummaryCardProps {
  grossPay: number;
  lines: PayslipLine[];
  takeHome: number;
}

export function PayslipSummaryCard({ grossPay, lines, takeHome }: PayslipSummaryCardProps) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 16 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 100 }}
    >
      <View
        className="mx-6 overflow-hidden rounded-3xl border border-border bg-card"
        style={Platform.select({
          ios: {
            shadowColor: 'rgb(108, 92, 231)',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.08,
            shadowRadius: 14,
          },
          android: { elevation: 4 },
        })}
      >
        {/* Header */}
        <View className="flex-row items-center gap-2.5 px-5 pb-3 pt-5">
          <View className="h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
            <Receipt size={18} className="text-primary" strokeWidth={2} />
          </View>
          <View>
            <Text className="font-poppins-semibold text-xs uppercase tracking-wider text-primary">
              Monthly Payslip
            </Text>
            <Text className="font-poppins-regular text-xs text-muted-foreground">
              Before budgeting
            </Text>
          </View>
        </View>

        {/* Gross pay */}
        <View className="px-5 pb-4">
          <MotiView
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 14, stiffness: 120, delay: 250 }}
          >
            <Text className="font-fredoka text-4xl text-foreground">
              £{grossPay.toLocaleString()}
            </Text>
            <Text className="mt-0.5 font-poppins-regular text-xs text-muted-foreground">
              Gross monthly salary
            </Text>
          </MotiView>
        </View>

        {/* Divider */}
        <View className="mx-5 h-px bg-border" />

        {/* Line items */}
        <View className="gap-3.5 px-5 py-4">
          {lines.map((line, index) => (
            <MotiView
              key={line.label}
              from={{ opacity: 0, translateX: -10 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ type: 'spring', damping: 16, stiffness: 140, delay: 350 + index * 70 }}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-2.5">
                  <View
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor:
                        line.type === 'income'
                          ? 'rgb(34, 197, 94)'
                          : line.type === 'deduction'
                            ? 'rgb(239, 68, 68)'
                            : 'rgb(108, 92, 231)',
                    }}
                  />
                  <Text className="font-poppins-medium text-sm text-foreground">{line.label}</Text>
                </View>
                <Text
                  className="font-poppins-semibold text-sm"
                  style={{
                    color: line.type === 'deduction' ? 'rgb(239, 68, 68)' : 'rgb(31, 31, 31)',
                  }}
                >
                  {line.type === 'deduction' ? '−' : ''}£{Math.abs(line.amount).toLocaleString()}
                </Text>
              </View>
            </MotiView>
          ))}
        </View>

        {/* Take-home footer */}
        <View className="bg-primary/5 px-5 py-4">
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'timing', duration: 400, delay: 600 }}
          >
            <View className="flex-row items-center justify-between">
              <Text className="font-poppins-semibold text-sm text-foreground">Take-Home Pay</Text>
              <Text className="font-fredoka text-2xl text-primary">
                £{takeHome.toLocaleString()}
              </Text>
            </View>
            <Text className="mt-1 font-poppins-regular text-xs text-muted-foreground">
              This is what you'll budget with each month
            </Text>
          </MotiView>
        </View>
      </View>
    </MotiView>
  );
}
