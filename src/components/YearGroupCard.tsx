import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Check } from 'lucide-react-native';

interface YearGroupCardProps {
  year: string;
  age: string;
  icon: string;
  isSelected: boolean;
  onSelect: () => void;
}

export function YearGroupCard({ year, age, icon, isSelected, onSelect }: YearGroupCardProps) {
  const { width } = useWindowDimensions();

  const padding = 48;
  const gap = 12;
  const availableWidth = width - padding;
  const cardWidth = (availableWidth - gap) / 2;

  return (
    <TouchableOpacity
      onPress={onSelect}
      activeOpacity={0.85}
      style={{ width: cardWidth }}
      className={`
        aspect-[3/2.5] rounded-2xl border-2 p-4 relative
        bg-card shadow-sm
        ${isSelected ? 'border-primary bg-primary/5' : 'border-border'}
      `}
      accessibilityLabel={`Select ${year}`}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
    >
      <Animated.View
        entering={FadeInDown.duration(500)}
        className="flex-1 justify-between items-center"
      >
        <Text className="text-4xl mb-2">{icon}</Text>

        <View className="items-center">
          <Text className="text-lg font-bold text-foreground">{year}</Text>
          <Text className="text-xs text-muted-foreground mt-0.5">{age}</Text>
        </View>
      </Animated.View>

      {isSelected && (
        <View className="absolute top-2 right-2 w-7 h-7 rounded-full bg-primary items-center justify-center shadow-md">
          <Check size={16} color="#FFFFFF" />
        </View>
      )}
    </TouchableOpacity>
  );
}
