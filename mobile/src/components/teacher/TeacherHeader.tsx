import { View, Text, TouchableOpacity } from 'react-native';
import { Search } from 'lucide-react-native';
import { useTheme } from '@/context';
import { colors } from '@/constants/colors';

export function TeacherHeader() {
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <View className="mb-5 flex-row items-center justify-between px-6">
      <View className="flex-row items-center gap-3">
        <View className="h-12 w-12 items-center justify-center rounded-full border-2 border-primary/20 bg-muted">
          <Text className="font-poppins-bold text-base text-primary">MJ</Text>
        </View>

        <View>
          <Text className="font-poppins-medium text-[10px] uppercase tracking-wider text-primary">
            Teacher Dashboard
          </Text>
          <Text className="font-fredoka text-xl text-foreground">Marcus Johnson</Text>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        className="h-10 w-10 items-center justify-center rounded-full border border-border bg-card"
      >
        <Search size={18} color={c.foreground} strokeWidth={2} />
      </TouchableOpacity>
    </View>
  );
}
