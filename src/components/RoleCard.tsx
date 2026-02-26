import { Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ReactNode } from 'react';
import { Card } from './Card';

interface RoleCardProps {
  emoji: string;
  title: string;
  subtitle: string;
  onPress: () => void;
  index?: number;
}

export function RoleCard({ emoji, title, subtitle, onPress, index = 0 }: RoleCardProps) {
  return (
    <Animated.View entering={FadeInDown.duration(600).delay(200 + index * 150)}>
      <Card
        variant="stat"
        title={title}
        subtitle={subtitle}
        onPress={onPress}
        leading={
          <View className="w-16 h-16 rounded-xl bg-primary/10 items-center justify-center">
            <Text className="text-3xl">{emoji}</Text>
          </View>
        }
      />
    </Animated.View>
  );
}
