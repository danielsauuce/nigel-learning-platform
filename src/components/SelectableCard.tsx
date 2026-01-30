import { View } from 'react-native';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import { Check } from 'lucide-react-native';
import { ReactNode } from 'react';
import { Card } from './Card';

interface SelectableCardProps {
  title: string;
  subtitle?: string;
  leading?: ReactNode;
  selected: boolean;
  onPress: () => void;
  index?: number;
}

export function SelectableCard({
  title,
  subtitle,
  leading,
  selected,
  onPress,
  index = 0,
}: SelectableCardProps) {
  return (
    <Animated.View entering={FadeInLeft.duration(500).delay(index * 80)}>
      <Card
        variant="selectable"
        title={title}
        subtitle={subtitle}
        leading={leading}
        selected={selected}
        onPress={onPress}
        trailing={
          <View
            className={`
              w-7 h-7 rounded-full border-2 items-center justify-center
              ${selected ? 'bg-primary border-primary' : 'border-border'}
            `}
          >
            {selected && <Check size={18} color="#fff" />}
          </View>
        }
      />
    </Animated.View>
  );
}
