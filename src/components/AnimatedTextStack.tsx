import { View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

interface AnimatedTextItem {
  text: string;
  delay: number;
  className: string;
}

interface AnimatedTextStackProps {
  items: AnimatedTextItem[];
}

export function AnimatedTextStack({ items }: AnimatedTextStackProps) {
  return (
    <View>
      {items.map((item, index) => (
        <Animated.Text
          key={`${item.text}-${index}`}
          entering={FadeInUp.duration(500).delay(item.delay)}
          className={item.className}
        >
          {item.text}
        </Animated.Text>
      ))}
    </View>
  );
}
