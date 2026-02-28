import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import { Bell, Settings } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

interface DashboardGreetingProps {
  name: string;
  level: number;
  streak: number;
  onNotifications?: () => void;
  onSettings?: () => void;
}

export function DashboardGreeting({
  name,
  level,
  streak,
  onNotifications,
  onSettings,
}: DashboardGreetingProps) {
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <MotiView
      from={{ opacity: 0, translateY: -14 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'spring', damping: 16, stiffness: 120 }}
      style={{ paddingHorizontal: 24, marginBottom: 20 }}
    >
      {/* Top row: avatar + name + icons */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 }}>
          {/* Avatar placeholder */}
          <View
            style={{
              width: 46,
              height: 46,
              borderRadius: 23,
              backgroundColor: c.gradientStart,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 2.5,
              borderColor: c.gradientEnd,
            }}
          >
            <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 18, color: '#FFFFFF' }}>
              {name.charAt(0).toUpperCase()}
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{ fontFamily: 'Poppins_400Regular', fontSize: 13, color: c.mutedForeground }}
            >
              Welcome back,
            </Text>
            <Text
              style={{ fontFamily: 'Poppins_700Bold', fontSize: 17, color: c.foreground }}
              numberOfLines={1}
            >
              {name} 👋
            </Text>
          </View>
        </View>

        {/* Icons */}
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onNotifications}
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              backgroundColor: c.card,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: c.border,
            }}
          >
            <Bell size={18} color={c.mutedForeground} strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onSettings}
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              backgroundColor: c.card,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: c.border,
            }}
          >
            <Settings size={18} color={c.mutedForeground} strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Level + Streak badges */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <View
          style={{
            paddingHorizontal: 12,
            paddingVertical: 4,
            borderRadius: 10,
            backgroundColor: c.gradientStart,
          }}
        >
          <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 11.5, color: '#FFFFFF' }}>
            Level {level}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Text style={{ fontSize: 13 }}>🔥</Text>
          <Text
            style={{ fontFamily: 'Poppins_500Medium', fontSize: 12.5, color: c.mutedForeground }}
          >
            {streak} Day Streak
          </Text>
        </View>
      </View>
    </MotiView>
  );
}
