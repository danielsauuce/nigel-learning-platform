import React from 'react';
import { View } from 'react-native';
import { MotiView } from 'moti';
import { SpeechBubble } from '@/components/ui';
import { Mascot } from '@/svg/illustrations';

interface PersonalizationMascotProps {
  speechText: string;
}

export function PersonalizationMascot({ speechText }: PersonalizationMascotProps) {
  return (
    <View style={{ alignItems: 'center', marginTop: 8, marginBottom: 4 }}>
      <SpeechBubble text={speechText} delay={200} />
      <MotiView
        from={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 14, stiffness: 120, delay: 100 }}
      >
        <Mascot size={100} />
      </MotiView>
    </View>
  );
}
