import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Eye, MessageSquare, Award, Zap, MoreVertical } from 'lucide-react-native';
import { Student } from '../data/students';
import { getInitials } from '../utils/getInitials';
import { SimBadge } from './SimBadge';
import { useTheme } from '@/context';
import { colors } from '@/constants/colors';

const AVATAR_COLORS = ['#6C5CE7', '#E91E8C', '#22C55E', '#F59E0B', '#3B82F6', '#EF4444'];

export function StudentCard({ student, index }: { student: Student; index: number }) {
  const { theme } = useTheme();
  const c = colors[theme];

  const avatarColor = AVATAR_COLORS[index % AVATAR_COLORS.length];

  return (
    <View
      className="mx-6 mb-3 overflow-hidden rounded-2xl border border-border bg-card"
      style={Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.04,
          shadowRadius: 8,
        },
        android: { elevation: 2 },
      })}
    >
      {/* Avatar + Info */}
      <View className="flex-row items-start p-4 pb-3">
        <View
          className="mr-3 h-14 w-14 items-center justify-center rounded-full"
          style={{ backgroundColor: avatarColor + '18' }}
        >
          <Text className="font-poppins-bold text-lg" style={{ color: avatarColor }}>
            {getInitials(student.name)}
          </Text>

          <View
            className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-card"
            style={{ backgroundColor: student.active ? '#22C55E' : '#9CA3AF' }}
          />
        </View>

        <View className="flex-1">
          <Text className="font-poppins-bold text-base text-foreground">{student.name}</Text>

          <Text className="font-poppins-regular text-xs text-muted-foreground">{student.id}</Text>

          <Text className="font-poppins-medium text-[10px] uppercase text-muted-foreground">
            Last active: {student.lastActive}
          </Text>
        </View>

        <TouchableOpacity>
          <MoreVertical size={18} color={c.mutedForeground} />
        </TouchableOpacity>
      </View>

      <View className="mx-4 h-px bg-border" />

      {/* Stats */}
      <View className="flex-row items-center px-4 py-3">
        <View className="flex-1 items-center">
          <View className="flex-row items-center gap-1">
            <Award size={12} color={c.primary} />
            <Text className="font-poppins-bold text-base" style={{ color: c.primary }}>
              {student.missions}
            </Text>
          </View>
          <Text className="text-[9px] uppercase text-muted-foreground">Missions</Text>
        </View>

        <View className="h-8 w-px bg-border" />

        <View className="flex-1 items-center">
          <Text className="font-poppins-bold text-base text-foreground">{student.avg}%</Text>
          <Text className="text-[9px] uppercase text-muted-foreground">Quiz Avg</Text>
        </View>

        <View className="h-8 w-px bg-border" />

        <View className="flex-1 items-center">
          <SimBadge level={student.simLevel} />
          <Text className="mt-0.5 font-poppins-medium text-[9px] uppercase tracking-wider text-muted-foreground">
            Simulator
          </Text>
        </View>
      </View>

      <View className="mx-4 h-px bg-border" />

      {/* Actions */}
      <View className="flex-row items-center gap-2 px-4 py-3">
        <View className="rounded-full border border-primary/20 px-2.5 py-1">
          <Text className="text-[10px]" style={{ color: c.primary }}>
            {student.badges} Badges
          </Text>
        </View>

        <TouchableOpacity>
          <View className="flex-row items-center gap-1 rounded-full border border-border px-2.5 py-1">
            <Eye size={11} color={c.foreground} />
            <Text className="text-[10px] text-foreground">View</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View className="flex-row items-center gap-1 rounded-full border border-border px-2.5 py-1">
            <MessageSquare size={11} color={c.foreground} />
            <Text className="text-[10px] text-foreground">Message</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="ml-auto">
          <View className="flex-row items-center gap-1 rounded-full bg-primary px-3 py-1.5">
            <Zap size={11} color="#FFF" />
            <Text className="text-[10px] text-white">Assign</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
