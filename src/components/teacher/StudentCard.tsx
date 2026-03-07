import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Award, ChevronRight } from 'lucide-react-native';
import { useTheme } from '@/context';
import { colors } from '@/constants/colors';
import { getInitials } from './utils/getInitials';

const AVATAR_COLORS = ['#6C5CE7', '#E91E8C', '#22C55E', '#F59E0B', '#3B82F6'];

interface StudentCardProps {
  student: {
    name: string;
    missions: number;
    avg: number;
    badges: number;
    active: boolean;
  };
  index?: number;
}

export function StudentCard({ student, index = 0 }: StudentCardProps) {
  const { theme } = useTheme();
  const c = colors[theme];
  const avatarColor = AVATAR_COLORS[index % AVATAR_COLORS.length];

  return (
    <TouchableOpacity activeOpacity={0.7}>
      <View
        className="flex-row items-center rounded-xl border border-border bg-card px-4 py-3.5"
        style={Platform.select({
          ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.03,
            shadowRadius: 4,
          },
          android: { elevation: 1 },
        })}
      >
        {/* Avatar */}
        <View
          className="mr-3 h-11 w-11 items-center justify-center rounded-full"
          style={{ backgroundColor: avatarColor + '20' }}
        >
          <Text className="font-poppins-bold text-sm" style={{ color: avatarColor }}>
            {getInitials(student.name)}
          </Text>
          {student.active && (
            <View
              className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card"
              style={{ backgroundColor: colors.success }}
            />
          )}
        </View>

        {/* Info */}
        <View className="flex-1">
          <Text className="mb-0.5 font-poppins-semibold text-sm text-foreground">
            {student.name}
          </Text>
          <View className="flex-row items-center gap-2">
            <Text className="font-poppins-semibold text-[10px]" style={{ color: c.primary }}>
              {student.missions} Missions
            </Text>
            <Text className="font-poppins-regular text-[10px] text-muted-foreground">
              ⊘ {student.avg}% Avg
            </Text>
          </View>
        </View>

        {/* Badge count + chevron */}
        <View className="flex-row items-center gap-2">
          <View className="bg-primary/8 flex-row items-center gap-1 rounded-lg px-2 py-1">
            <Text className="font-poppins-bold text-xs text-primary">{student.badges}</Text>
            <Award size={12} color={c.primary} strokeWidth={2} />
          </View>
          <ChevronRight size={16} color={c.mutedForeground} strokeWidth={2} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
