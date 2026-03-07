import { View, Text, TouchableOpacity } from 'react-native';
import { Award, ChevronRight } from 'lucide-react-native';
import { getInitials } from './utils/getInitials';

interface Props {
  student: {
    name: string;
    missions: number;
    avg: number;
    badges: number;
    active: boolean;
  };
}

export function StudentCard({ student }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.7}>
      <View className="flex-row items-center rounded-xl border border-border bg-card px-4 py-3.5">
        <View className="mr-3 h-11 w-11 items-center justify-center rounded-full bg-muted">
          <Text className="font-poppins-bold text-sm">{getInitials(student.name)}</Text>
        </View>

        <View className="flex-1">
          <Text className="font-poppins-semibold text-sm text-foreground">{student.name}</Text>

          <Text className="text-xs text-muted-foreground">
            {student.missions} Missions • {student.avg}% Avg
          </Text>
        </View>

        <View className="flex-row items-center gap-2">
          <Text>{student.badges}</Text>
          <Award size={14} />
          <ChevronRight size={16} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
