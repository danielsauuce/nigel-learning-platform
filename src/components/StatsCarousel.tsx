import { View, Dimensions } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { StatCard } from './StatCard';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.9;

interface StatsCarouselProps {
  stats: Array<{
    icon: any;
    stat: string;
    text: string;
    source: string;
  }>;
}

export function StatsCarousel({ stats }: StatsCarouselProps) {
  return (
    <Animated.View entering={FadeIn.duration(900).delay(300)} className="mt-12 px-6">
      <View className="space-y-6">
        {stats.map((item, index) => (
          <View key={index} style={{ width: CARD_WIDTH }} className="self-center mb-5">
            <StatCard {...item} index={index} />
          </View>
        ))}
      </View>
    </Animated.View>
  );
}
