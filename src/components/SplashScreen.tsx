import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SplashScreenProps } from '../types/splash';
import Animated, { FadeIn, FadeOut, ZoomIn, ZoomOut } from 'react-native-reanimated';
import { GraduationCap, Accessibility } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [showCap, setShowCap] = useState(false);
  const insets = useSafeAreaInsets();

  
  useEffect(() => {
    const capTimer = setTimeout(() => setShowCap(true), 1000);
    const navTimer = setTimeout(() => onFinish?.(), 2500);

    return () => {
      clearTimeout(capTimer);
      clearTimeout(navTimer);
    };
  }, [onFinish]);

  return (
    <View
      className="flex-1 items-center justify-center p-6 bg-background"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <TouchableOpacity
        className="absolute top-4 right-4 p-3 rounded-full hover:bg-secondary"
        accessibilityLabel="Accessibility options"
      >
        <Accessibility size={24} className="text-muted-foreground" />
      </TouchableOpacity>

      <View className="relative">
        {!showCap && (
          <Animated.View
            entering={ZoomIn.duration(600)}
            exiting={ZoomOut.duration(400)}
            className="absolute inset-0 items-center justify-center"
          >
            <View className="w-24 h-24 rounded-full bg-primary items-center justify-center shadow-lg">
              <Text className="text-5xl">🐷</Text>
            </View>
          </Animated.View>
        )}

        {showCap && (
          <Animated.View
            entering={ZoomIn.duration(400).delay(200)}
            exiting={ZoomOut.duration(400)}
            className="absolute inset-0 items-center justify-center"
          >
            <View className="w-24 h-24 rounded-full bg-primary items-center justify-center shadow-lg">
              <GraduationCap size={48} color="white" />
            </View>
          </Animated.View>
        )}
      </View>

      <Animated.Text
        entering={FadeIn.duration(500).delay(400)}
        className="text-3xl font-bold text-foreground mt-8 text-center"
      >
        Nigel
      </Animated.Text>

      <Animated.Text
        entering={FadeIn.duration(500).delay(600)}
        className="text-xl text-foreground mt-2 text-center"
      >
        Your financial future starts here
      </Animated.Text>

      <Animated.Text
        entering={FadeIn.duration(500).delay(1200)}
        className="absolute bottom-4 right-4 text-xs text-muted-foreground"
      >
        v1.0
      </Animated.Text>
    </View>
  );
};
