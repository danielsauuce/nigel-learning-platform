import React from 'react';
import { View } from 'react-native';
import { MotiView } from 'moti';
import { GradientButton } from '@/components/ui';

interface PersonalizationFooterProps {
  onPress: () => void;
  disabled: boolean;
}

export function PersonalizationFooter({ onPress, disabled }: PersonalizationFooterProps) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 16 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 400 }}
      style={{ paddingHorizontal: 24, paddingTop: 8 }}
    >
      <GradientButton
        label="Continue"
        variant="navy"
        onPress={onPress}
        disabled={disabled}
        showArrow
      />
    </MotiView>
  );
}
