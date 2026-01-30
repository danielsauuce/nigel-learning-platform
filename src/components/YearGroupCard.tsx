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
      activeOpacity={0.8}
      className={`flex-1 p-5 rounded-2xl border-2 transition-all ${
        isSelected
          ? 'border-primary bg-primary/10'
          : 'border-border bg-card hover:border-primary/50'
      }`}
      accessibilityLabel={`Select ${year}`}
    >
      <Animated.View entering={FadeInDown.duration(500)}>
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-4xl">{icon}</Text>
          {isSelected && (
            <View className="w-7 h-7 rounded-full bg-primary items-center justify-center">
              <Check size={18} color="#FFFFFF" />
            </View>
          )}
        </View>

        <Text className="text-lg font-semibold text-foreground">{year}</Text>
        <Text className="text-sm text-muted-foreground">{age}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}
