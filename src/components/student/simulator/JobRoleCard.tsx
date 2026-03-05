import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';

export interface JobRole {
  key: string;
  title: string;
  description: string;
  salary: number;
  avatarColor: string;
  initial: string;
}

interface JobRoleCardProps {
  role: JobRole;
  isSelected: boolean;
  onPress: () => void;
  index: number;
}

export function JobRoleCard({ role, isSelected, onPress, index }: JobRoleCardProps) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 18 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'spring', damping: 16, stiffness: 130, delay: 250 + index * 100 }}
    >
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <MotiView
          animate={{
            borderColor: isSelected ? 'rgb(108, 92, 231)' : 'rgb(229, 231, 235)',
            scale: isSelected ? 1.0 : 0.98,
          }}
          transition={{ type: 'spring', damping: 18, stiffness: 200 }}
          className="flex-row items-center gap-3.5 rounded-2xl bg-card p-4"
          style={{
            borderWidth: isSelected ? 2 : 1,
            ...Platform.select({
              ios: {
                shadowColor: isSelected ? 'rgb(108, 92, 231)' : '#000',
                shadowOffset: { width: 0, height: isSelected ? 4 : 1 },
                shadowOpacity: isSelected ? 0.15 : 0.04,
                shadowRadius: isSelected ? 12 : 4,
              },
              android: { elevation: isSelected ? 5 : 1 },
            }),
          }}
        >
          {/* Avatar */}
          <View
            className="h-14 w-14 items-center justify-center rounded-full"
            style={{ backgroundColor: role.avatarColor }}
          >
            <Text className="font-poppins-bold text-lg text-white">{role.initial}</Text>
          </View>

          {/* Text */}
          <View className="flex-1">
            <Text className="mb-0.5 font-poppins-bold text-base text-foreground">{role.title}</Text>
            <Text
              className="font-poppins-regular text-xs leading-4 text-muted-foreground"
              numberOfLines={1}
            >
              {role.description}
            </Text>
            <Text className="mt-1.5 font-poppins-bold text-sm text-primary">
              £{role.salary.toLocaleString()} /mo
            </Text>
          </View>

          {/* Checkmark */}
          <MotiView
            animate={{
              scale: isSelected ? 1 : 0,
              opacity: isSelected ? 1 : 0,
            }}
            transition={{ type: 'spring', damping: 14, stiffness: 180 }}
            className="h-6 w-6 items-center justify-center rounded-full bg-primary"
          >
            <Text className="font-poppins-bold text-xs text-white">✓</Text>
          </MotiView>
        </MotiView>
      </TouchableOpacity>
    </MotiView>
  );
}
