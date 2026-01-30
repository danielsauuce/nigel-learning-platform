import { View, Text } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LucideIcon } from 'lucide-react-native';

interface StatCardProps {
  icon: LucideIcon;
  stat: string;
  text: string;
  source: string;
  index: number;
}

export function StatCard({ icon: Icon, stat, text, source, index }: StatCardProps) {
  return (
    <Animated.View
      entering={FadeInDown.duration(700).delay(400 + index * 120)}
      className="w-full px-6"
    >
      <View className="bg-card border border-border rounded-2xl p-6 shadow-xl">
        <View className="w-14 h-14 rounded-full bg-primary items-center justify-center mb-5 shadow-lg">
          <Icon size={28} color="#FFFFFF" />
        </View>
        <Text className="text-5xl font-extrabold text-primary mb-3">{stat}</Text>
        <Text className="text-base text-foreground leading-6 mb-4">{text}</Text>
        <Text className="text-xs text-muted-foreground">Source: {source}</Text>
      </View>
    </Animated.View>
  );
}
