import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';

interface ProfileCardProps {
  primaryColor: string;
}

export function ProfileCard({ primaryColor }: ProfileCardProps) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 12 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 80 }}
      className="mx-6 mb-5"
    >
      <View
        className="overflow-hidden rounded-2xl"
        style={Platform.select({
          ios: {
            shadowColor: primaryColor,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 12,
          },
          android: { elevation: 4 },
        })}
      >
        <View className="items-center rounded-2xl border border-primary/10 bg-primary/5 px-6 py-5">
          {/* PRO badge */}
          <View className="absolute right-3 top-3 rounded-full bg-primary px-2.5 py-0.5">
            <Text className="font-poppins-bold text-[9px] uppercase tracking-wider text-white">
              Pro User
            </Text>
          </View>

          {/* Avatar */}
          <View className="border-3 mb-2 h-20 w-20 items-center justify-center rounded-full border-primary/20 bg-muted">
            <Text className="font-fredoka text-2xl text-primary">MJ</Text>
            <View
              className="absolute -bottom-0.5 -right-0.5 h-5 w-5 items-center justify-center rounded-full border-2 border-card"
              style={{ backgroundColor: '#22C55E' }}
            >
              <Text className="text-[8px] text-white">✓</Text>
            </View>
          </View>

          <Text className="font-poppins-bold text-lg text-foreground">Marcus Johnson</Text>
          <Text className="font-poppins-regular text-xs text-muted-foreground">
            Teaching Maths • 42 Day Streak
          </Text>

          {/* Edit button */}
          <TouchableOpacity activeOpacity={0.7} className="mt-3 w-full">
            <View className="items-center rounded-xl bg-primary py-3">
              <Text className="font-poppins-semibold text-sm text-white">Edit My Profile</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </MotiView>
  );
}
