import React from 'react';
import { Text, View } from 'react-native';
import { MotiView } from 'moti';

interface BreakdownSegment {
  label: string;
  amount: number;
  color: string;
  percentage: number;
}

interface PayslipBreakdownChartProps {
  segments: BreakdownSegment[];
}

export function PayslipBreakdownChart({ segments }: PayslipBreakdownChartProps) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 14 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 500 }}
    >
      <View className="mx-6 mt-5">
        <Text className="mb-3 font-poppins-semibold text-sm text-foreground">
          Where your money goes
        </Text>

        {/* Stacked bar */}
        <View className="mb-4 h-4 flex-row overflow-hidden rounded-full">
          {segments.map((seg, index) => (
            <MotiView
              key={seg.label}
              from={{ flex: 0 }}
              animate={{ flex: seg.percentage }}
              transition={{ type: 'timing', duration: 700, delay: 600 + index * 100 }}
              style={{
                backgroundColor: seg.color,
                marginRight: index < segments.length - 1 ? 2 : 0,
              }}
              className="h-full first:rounded-l-full last:rounded-r-full"
            />
          ))}
        </View>

        {/* Legend */}
        <View className="gap-2.5">
          {segments.map((seg, index) => (
            <MotiView
              key={seg.label}
              from={{ opacity: 0, translateX: -8 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ type: 'spring', damping: 16, stiffness: 140, delay: 700 + index * 60 }}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-2.5">
                  <View className="h-3 w-3 rounded-sm" style={{ backgroundColor: seg.color }} />
                  <Text className="font-poppins-medium text-sm text-foreground">{seg.label}</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <Text className="font-poppins-regular text-xs text-muted-foreground">
                    {seg.percentage}%
                  </Text>
                  <Text className="font-poppins-semibold text-sm text-foreground">
                    £{seg.amount.toLocaleString()}
                  </Text>
                </View>
              </View>
            </MotiView>
          ))}
        </View>
      </View>
    </MotiView>
  );
}
