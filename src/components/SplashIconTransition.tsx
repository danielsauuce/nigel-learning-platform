import { View, Text } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { ReactNode, useEffect } from 'react';
import { StyleSheet } from 'react-native';

interface SplashIconTransitionProps {
  showFinal: boolean;
  initialIcon?: ReactNode;
  finalIcon?: ReactNode;
}

export function SplashIconTransition({
  showFinal,
  initialIcon,
  finalIcon,
}: SplashIconTransitionProps) {
  return (
    <View className="relative mb-10 w-24 h-24">
      {/* Initial Icon - Always renders first */}
      {!showFinal && (
        <Animated.View
          entering={FadeIn.duration(600)}
          exiting={FadeOut.duration(400)}
          style={[styles.iconContainer, styles.iconShadow]}
          className="absolute inset-0 items-center justify-center w-24 h-24 rounded-full bg-primary"
        >
          {initialIcon}
        </Animated.View>
      )}

      {showFinal && (
        <Animated.View
          entering={FadeIn.duration(400).delay(200)}
          style={[styles.iconContainer, styles.iconShadow]}
          className="absolute inset-0 items-center justify-center w-24 h-24 rounded-full bg-primary"
        >
          {finalIcon}
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  iconShadow: {
    shadowColor: '#7000E0',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 40,
    elevation: 10,
  },
});
