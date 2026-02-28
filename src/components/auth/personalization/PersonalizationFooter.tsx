import React from 'react';
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
      transition={{ type: 'timing', duration: 400, delay: 700 }}
      style={{ paddingHorizontal: 24, paddingTop: 8 }}
    >
      <GradientButton
        label="Continue"
        variant="purple"
        onPress={onPress}
        disabled={disabled}
        showArrow
      />
    </MotiView>
  );
}
