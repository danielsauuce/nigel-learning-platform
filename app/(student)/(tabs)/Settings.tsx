import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import { GradientBackground, StarField } from '@/components/ui/screen-background';
import { SAFE_TOP } from '@/lib/safe-area';

export default function SettingsScreen() {
  return (
    <View className="flex-1 overflow-hidden">
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <GradientBackground />
      <StarField count={8} seed={37} />

      <View className="flex-1 items-center justify-center px-8" style={{ paddingTop: SAFE_TOP }}>
        <Text className="text-5xl">⚙️</Text>
        <Text
          className="mt-4 font-fredoka text-[28px] text-white"
          style={{
            textShadowColor: 'rgba(0,0,0,0.2)',
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 4,
          }}
        >
          Settings
        </Text>
        <Text
          className="mt-2 text-center font-poppins-regular text-sm"
          style={{ color: 'rgba(255,255,255,0.5)' }}
        >
          Preferences and account settings
        </Text>
      </View>
    </View>
  );
}
