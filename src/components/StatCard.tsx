import { View, Text } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LucideIcon } from 'lucide-react-native';
import { Card } from './Card';

interface StatCardProps {
  icon: LucideIcon;
  stat: string;
  text: string;
  source: string;
  index: number;
}

export function StatCard({ icon: Icon, stat, text, source, index }: StatCardProps) {
  return (
    <Animated.View entering={FadeInDown.duration(700).delay(400 + index * 120)}>
      <Card
        variant="stat"
        title={stat}
        subtitle={text}
        leading={
          <View className="w-14 h-14 rounded-full bg-primary items-center justify-center">
            <Icon size={28} color="#FFFFFF" />
          </View>
        }
      >
        <Text className="text-xs text-muted-foreground mt-3">Source: {source}</Text>
      </Card>
    </Animated.View>
  );
}
