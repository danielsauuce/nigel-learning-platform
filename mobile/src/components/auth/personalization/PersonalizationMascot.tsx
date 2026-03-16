import React from 'react';
import { View } from 'react-native';
import { MotiView } from 'moti';
import { Mascot } from '@/svg/illustrations';
import { SpeechBubble } from '@/components/ui';

interface PersonalizationMascotProps {
  speechText: string;
}

export function PersonalizationMascot({ speechText }: PersonalizationMascotProps) {
  return (
    <MotiView
      from={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', damping: 14, stiffness: 100, delay: 100 }}
      style={{ alignItems: 'center', paddingHorizontal: 24, marginBottom: 16 }}
    >
      <SpeechBubble text={speechText} />
      <View style={{ marginTop: 8 }}>
        <Mascot size={80} />
      </View>
    </MotiView>
  );
}
