import React from 'react';
import { View } from 'react-native';

interface StepProgressBarProps {
  totalSteps: number;
  currentStep: number;
  activeColor?: string;
  inactiveColor?: string;
}

export function StepProgressBar({
  totalSteps,
  currentStep,
  activeColor = '#FFD700',
  inactiveColor = 'rgba(255, 255, 255, 0.2)',
}: StepProgressBarProps) {
  return (
    <View className="flex-row items-center" style={{ gap: 8 }}>
      {Array.from({ length: totalSteps }, (_, i) => {
        const isActive = i <= currentStep;
        return (
          <View
            key={i}
            style={{
              width: isActive ? 28 : 12,
              height: 6,
              borderRadius: 3,
              backgroundColor: isActive ? activeColor : inactiveColor,
            }}
          />
        );
      })}
    </View>
  );
}
