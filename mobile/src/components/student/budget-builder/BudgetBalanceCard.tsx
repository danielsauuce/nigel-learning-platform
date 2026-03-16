import React from 'react';
import { Platform, Text, View } from 'react-native';
import { MotiView } from 'moti';
import Svg, { Circle } from 'react-native-svg';
import { TrendingDown, TrendingUp, Minus } from 'lucide-react-native';

interface BudgetBalanceCardProps {
  takeHome: number;
  allocated: number;
}

function ProgressRing({
  percentage,
  size = 100,
  strokeWidth = 8,
}: {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const strokeColor =
    percentage > 100 ? 'rgb(239, 68, 68)' : percentage > 85 ? 'rgb(245, 158, 11)' : '#B9A7F8';

  return (
    <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
      {/* Track */}
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="rgb(229, 231, 235)"
        strokeWidth={strokeWidth}
        fill="none"
        opacity={0.4}
      />
      {/* Progress */}
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={`${circumference}`}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function BudgetBalanceCard({ takeHome, allocated }: BudgetBalanceCardProps) {
  const remaining = takeHome - allocated;
  const percentage = takeHome > 0 ? Math.round((allocated / takeHome) * 100) : 0;
  const isOverBudget = remaining < 0;
  const isBalanced = remaining === 0;

  const StatusIcon = isOverBudget ? TrendingDown : isBalanced ? Minus : TrendingUp;
  const statusColor = isOverBudget
    ? 'text-destructive'
    : isBalanced
      ? 'text-success'
      : 'text-primary';
  const statusBg = isOverBudget
    ? 'bg-destructive/10'
    : isBalanced
      ? 'bg-success/10'
      : 'bg-primary/10';
  const statusText = isOverBudget
    ? 'Over budget!'
    : isBalanced
      ? 'Perfectly balanced'
      : 'Under budget';

  return (
    <MotiView
      from={{ opacity: 0, translateY: 16 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 80 }}
    >
      <View
        className="mx-6 rounded-3xl border border-border bg-card p-5"
        style={Platform.select({
          ios: {
            shadowColor: '#B9A7F8',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.06,
            shadowRadius: 14,
          },
          android: { elevation: 3 },
        })}
      >
        <View className="flex-row items-center">
          {/* Ring */}
          <View className="mr-5 items-center justify-center">
            <ProgressRing percentage={Math.min(percentage, 100)} />
            <View className="absolute items-center">
              <Text className="font-poppins-bold text-xl text-foreground">{percentage}%</Text>
              <Text className="font-poppins-regular text-[10px] text-muted-foreground">used</Text>
            </View>
          </View>

          {/* Stats */}
          <View className="flex-1 gap-3">
            <View>
              <Text className="font-poppins-regular text-xs text-muted-foreground">Take-Home</Text>
              <Text className="font-poppins-bold text-lg text-foreground">
                £{takeHome.toLocaleString()}
              </Text>
            </View>
            <View className="h-px bg-border" />
            <View className="flex-row justify-between">
              <View>
                <Text className="font-poppins-regular text-[10px] text-muted-foreground">
                  Allocated
                </Text>
                <Text className="font-poppins-semibold text-sm text-foreground">
                  £{allocated.toLocaleString()}
                </Text>
              </View>
              <View className="items-end">
                <Text className="font-poppins-regular text-[10px] text-muted-foreground">
                  Remaining
                </Text>
                <Text
                  className={`font-poppins-bold text-sm ${isOverBudget ? 'text-destructive' : 'text-success'}`}
                >
                  {isOverBudget ? '−' : ''}£{Math.abs(remaining).toLocaleString()}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Status pill */}
        <MotiView animate={{ scale: [1, 1.03, 1] }} transition={{ type: 'timing', duration: 300 }}>
          <View
            className={`mt-4 flex-row items-center justify-center gap-1.5 rounded-xl py-2 ${statusBg}`}
          >
            <StatusIcon size={14} className={statusColor} strokeWidth={2.5} />
            <Text className={`font-poppins-semibold text-xs ${statusColor}`}>{statusText}</Text>
          </View>
        </MotiView>
      </View>
    </MotiView>
  );
}
