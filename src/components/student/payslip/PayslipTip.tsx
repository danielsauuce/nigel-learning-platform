import React from 'react';
import { Text, View } from 'react-native';
import { MotiView } from 'moti';
import { Lightbulb } from 'lucide-react-native';

interface PayslipTipProps {
  title: string;
  description: string;
}

export function PayslipTip({ title, description }: PayslipTipProps) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 12 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 700 }}
    >
      <View className="mx-6 mt-5 flex-row gap-3 rounded-2xl border border-warning/30 bg-warning/10 p-4">
        <View className="mt-0.5 h-9 w-9 items-center justify-center rounded-xl bg-warning/20">
          <Lightbulb size={18} color="rgb(245, 158, 11)" strokeWidth={2} />
        </View>
        <View className="flex-1">
          <Text className="mb-1 font-poppins-bold text-sm text-foreground">{title}</Text>
          <Text className="font-poppins-regular text-xs leading-5 text-muted-foreground">
            {description}
          </Text>
        </View>
      </View>
    </MotiView>
  );
}
