import { View, Text, TouchableOpacity } from 'react-native';
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
  return (
    <TouchableOpacity
      onPress={onSelect}
      activeOpacity={0.85}
      className={`
        w-full aspect-[4/3] max-w-[160px] rounded-2xl border-2 p-5 relative
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
        <Text className="text-5xl mb-4">{icon}</Text>

        <View className="items-center">
          <Text className="text-xl font-bold text-foreground">{year}</Text>
          <Text className="text-sm text-muted-foreground mt-1">{age}</Text>
        </View>
      </Animated.View>

      {isSelected && (
        <View className="absolute top-3 right-3 w-8 h-8 rounded-full bg-primary items-center justify-center shadow-md">
          <Check size={20} color="#FFFFFF" />
        </View>
      )}
    </TouchableOpacity>
  );
}
