import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import { ChevronLeft, CalendarDays } from 'lucide-react-native';

interface BudgetBuilderHeaderProps {
  onBack: () => void;
}

export function BudgetBuilderHeader({ onBack }: BudgetBuilderHeaderProps) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: -12 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'spring', damping: 16, stiffness: 130 }}
    >
      <View className="mb-1 flex-row items-center justify-center px-5">
        <TouchableOpacity
          onPress={onBack}
          activeOpacity={0.7}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          className="absolute left-5 p-1"
        >
          <ChevronLeft size={24} className="text-foreground" strokeWidth={2.5} />
        </TouchableOpacity>
        <Text className="font-poppins-semibold text-base tracking-wide text-foreground">
          Build Your Budget
        </Text>
      </View>

      {/* Month badge */}
      <View className="mb-3 mt-2 items-center">
        <View className="flex-row items-center gap-1.5 rounded-full bg-muted/50 px-3.5 py-1">
          <CalendarDays size={13} className="text-muted-foreground" strokeWidth={2} />
          <Text className="font-poppins-medium text-xs text-muted-foreground">
            Month 1 — Simulation
          </Text>
        </View>
      </View>
    </MotiView>
  );
}
