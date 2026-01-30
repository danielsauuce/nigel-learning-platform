import { View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  FadeInDown,
} from 'react-native-reanimated';
import { useEffect } from 'react';

interface OnboardingProgressProps {
  step: number;
  total: number;
}

export function OnboardingProgress({ step, total }: OnboardingProgressProps) {
  const progress = useSharedValue(step / total);

  useEffect(() => {
    progress.value = withTiming(step / total, { duration: 500 });
  }, [step]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <View className="w-full">
      <View className="h-2.5 bg-secondary rounded-full overflow-hidden">
        <Animated.View
          entering={FadeInDown.duration(600)}
          className="h-full bg-primary rounded-full"
          style={animatedStyle}
        />
      </View>

      <Text className="text-sm text-muted-foreground mt-2 text-center">
        Step {step} of {total}
      </Text>
    </View>
  );
}
