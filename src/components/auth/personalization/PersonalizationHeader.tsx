import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import { ChevronLeft } from 'lucide-react-native';
import { StepIndicator } from '@/components/ui';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

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
      transition={{ type: 'timing', duration: 350 }}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 8,
      }}
    >
      <TouchableOpacity
        onPress={onBack}
        activeOpacity={0.7}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        style={{ padding: 4 }}
      >
        <ChevronLeft size={24} color={c.foreground} strokeWidth={2.5} />
      </TouchableOpacity>

      <StepIndicator
        totalSteps={totalSteps}
        currentStep={currentStep}
        style={{ flex: 1, marginLeft: 8 }}
      />
    </MotiView>
  );
}
