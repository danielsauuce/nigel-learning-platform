import { View, Text } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface AuthHeaderProps {
  emoji: string;
  title: string;
  subtitle?: string;
}

export function AuthHeader({ emoji, title, subtitle }: AuthHeaderProps) {
  return (
    <Animated.View entering={FadeInDown.duration(600)} className="items-center mb-10">
      <Text className="text-6xl mb-4">{emoji}</Text>

      <Text className="text-2xl font-bold text-foreground mb-2 text-center">{title}</Text>

      {subtitle && <Text className="text-muted-foreground text-base text-center">{subtitle}</Text>}
    </Animated.View>
  );
}
