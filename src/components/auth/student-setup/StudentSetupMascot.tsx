import React from 'react';
import { View } from 'react-native';
import { MotiView } from 'moti';
import { SpeechBubble } from '@/components/ui';
import { Mascot } from '@/svg/illustrations';

export function StudentSetupMascot() {
  return (
    <View style={{ alignItems: 'center', marginTop: 4, marginBottom: 4 }}>
      <SpeechBubble text="Almost there!" delay={150} />
      <MotiView
        from={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 14, stiffness: 120, delay: 80 }}
      >
        <Mascot size={90} />
      </MotiView>
    </View>
  );
}
