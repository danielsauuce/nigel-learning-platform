import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import { ChevronLeft } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';
import { StepIndicator } from '@/components/ui';

interface PersonalizationHeaderProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
}

export function PersonalizationHeader({
  currentStep,
  totalSteps,
  onBack,
}: PersonalizationHeaderProps) {
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <MotiView
      from={{ opacity: 0, translateY: -10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 400 }}
      style={{ paddingHorizontal: 24, marginBottom: 8 }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <TouchableOpacity onPress={onBack} activeOpacity={0.7} style={{ padding: 4 }}>
          <ChevronLeft size={24} color={c.foreground} strokeWidth={2.5} />
        </TouchableOpacity>
        <StepIndicator total={totalSteps} current={currentStep} />
        <View style={{ width: 32 }} />
      </View>
    </MotiView>
  );
}
