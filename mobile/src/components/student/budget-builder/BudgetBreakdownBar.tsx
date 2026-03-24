import React from 'react';
import { Text, View } from 'react-native';
import { MotiView } from 'moti';
import type { BudgetCategory } from './BudgetSlider';

interface BudgetBreakdownBarProps {
  categories: BudgetCategory[];
  takeHome: number;
}

export function BudgetBreakdownBar({ categories, takeHome }: BudgetBreakdownBarProps) {
  const totalAllocated = categories.reduce((sum, c) => sum + c.value, 0);

  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'timing', duration: 400, delay: 150 }}
    >
      <View className="mx-6 mb-4">
        <View className="mb-2 flex-row items-center justify-between">
          <Text className="font-poppins-semibold text-xs uppercase tracking-wider text-muted-foreground">
            Your Allocation
          </Text>
          <Text className="font-poppins-medium text-xs text-muted-foreground">
            £{totalAllocated} / £{takeHome}
          </Text>
        </View>

        {/* Stacked bar */}
        <View className="h-3 flex-row overflow-hidden rounded-full bg-border/50">
          {categories
            .filter((c) => c.value > 0)
            .map((cat, index) => {
              const widthPct = takeHome > 0 ? (cat.value / takeHome) * 100 : 0;
              return (
                <MotiView
                  key={cat.key}
                  from={{ width: '0%' as any }}
                  animate={{ width: `${Math.min(widthPct, 100)}%` as any }}
                  transition={{ type: 'timing', duration: 500, delay: 200 + index * 50 }}
                  style={{
                    backgroundColor: cat.color,
                    marginRight: 1,
                  }}
                  className="h-full"
                />
              );
            })}
        </View>

        {/* Legend pills */}
        <View className="mt-3 flex-row flex-wrap gap-2">
          {categories
            .filter((c) => c.value > 0)
            .map((cat) => (
              <View
                key={cat.key}
                className="flex-row items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1"
              >
                <View className="h-2 w-2 rounded-full" style={{ backgroundColor: cat.color }} />
                <Text className="font-poppins-medium text-[10px] text-muted-foreground">
                  {cat.label} · £{cat.value}
                </Text>
              </View>
            ))}
        </View>
      </View>
    </MotiView>
  );
}
