import { View, ScrollView, Dimensions } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  FadeIn,
} from 'react-native-reanimated';
import { useState } from 'react';
import { StatCard } from './StatCard';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 48;

interface StatsCarouselProps {
  stats: Array<{
    icon: any;
    stat: string;
    text: string;
    source: string;
  }>;
}

export function StatsCarousel({ stats }: StatsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const handleScrollEnd = (e: any) => {
    const contentOffset = e.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / CARD_WIDTH);
    setActiveIndex(index);
  };

  return (
    <Animated.View entering={FadeIn.duration(900).delay(300)} className="flex-1 mt-12">
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH}
        decelerationRate="fast"
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        onMomentumScrollEnd={handleScrollEnd}
        className="-mx-6"
      >
        {stats.map((item, index) => (
          <StatCard key={index} {...item} index={index} />
        ))}
      </ScrollView>

      <View className="flex-row justify-center items-center mt-8 space-x-3">
        {stats.map((_, i) => (
          <View
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === activeIndex ? 'bg-primary scale-125 shadow-md' : 'bg-border/60'
            }`}
          />
        ))}
      </View>
    </Animated.View>
  );
}
