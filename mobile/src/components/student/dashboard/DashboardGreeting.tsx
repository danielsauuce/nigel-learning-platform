import React from 'react';
import { Platform, Text, View } from 'react-native';
import { MotiView } from 'moti';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { GraduationCap, Zap, Flame } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

interface DashboardGreetingProps {
  name: string;
  level: number;
  streak: number;
  onNotifications: () => void;
  onSettings: () => void;
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
      from={{ opacity: 0, translateY: -12 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'spring', damping: 16, stiffness: 120 }}
      style={{ paddingHorizontal: 24, marginBottom: 20 }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: 'Poppins_400Regular',
              fontSize: 14,
              color: c.mutedForeground,
            }}
          >
            Good morning,
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins_700Bold',
              fontSize: 24,
              color: c.foreground,
              marginTop: 2,
            }}
          >
            {name}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          {/* Dark mode toggle */}
          <ThemeToggle variant="pill" />

          {/* Profile avatar */}
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 16,
              backgroundColor: '#22223B',
              alignItems: 'center',
              justifyContent: 'center',
              ...Platform.select({
                ios: {
                  shadowColor: '#22223B',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.15,
                  shadowRadius: 8,
                },
                android: { elevation: 4 },
              }),
            }}
          >
            <GraduationCap size={22} color="#B9A7F8" strokeWidth={2} />
          </View>
        </View>
      </View>

      {/* Level & streak row */}
      <View style={{ flexDirection: 'row', gap: 12, marginTop: 12 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            backgroundColor: theme === 'dark' ? c.card : '#F3F0FF',
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 14,
          }}
        >
          <Zap size={14} color="#B9A7F8" strokeWidth={2} />
          <Text
            style={{
              fontFamily: 'Poppins_600SemiBold',
              fontSize: 12,
              color: c.foreground,
            }}
          >
            Level {level}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            backgroundColor: theme === 'dark' ? c.card : '#FDE8E4',
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 14,
          }}
        >
          <Flame size={14} color="#F97316" strokeWidth={2} />
          <Text
            style={{
              fontFamily: 'Poppins_600SemiBold',
              fontSize: 12,
              color: c.foreground,
            }}
          >
            {streak} day streak
          </Text>
        </View>
      </View>
    </MotiView>
  );
}
