import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import { ChevronLeft } from 'lucide-react-native';
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
  return (
    <MotiView
      from={{ opacity: 0, translateY: -10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 350 }}
      className="mb-2 flex-row items-center px-5"
    >
      <TouchableOpacity
        onPress={onBack}
        activeOpacity={0.7}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        className="p-1"
      >
        <ChevronLeft size={24} strokeWidth={2.5} className="text-foreground" />
      </TouchableOpacity>

      <View className="ml-2 flex-1">
        <StepIndicator totalSteps={totalSteps} currentStep={currentStep} />
      </View>
    </MotiView>
  );
}
