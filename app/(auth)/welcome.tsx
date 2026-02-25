import React from 'react';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function WelcomeRoute() {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 items-center justify-center bg-background"
      style={{ paddingTop: insets.top }}
    >
      <Text className="font-poppins-bold text-2xl text-foreground">Welcome Screen</Text>
      <Text className="mt-2 font-poppins-regular text-sm text-muted-foreground">Coming next…</Text>
    </View>
  );
}
