import React from 'react';
import { Text, View } from 'react-native';
import { MotiView } from 'moti';
import { Mascot } from '@/svg/illustrations';
import { Flame, Gem } from 'lucide-react-native';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

interface IslandMapHeaderProps {
  name: string;
  level: number;
  streak: number;
  gems: number;
}

export function IslandMapHeader({ name, level, streak, gems }: IslandMapHeaderProps) {
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <MotiView
      from={{ opacity: 0, translateY: -10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'spring', damping: 16, stiffness: 120 }}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginBottom: 16,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        {/* Mascot avatar */}
        <Mascot size={34} />
        <View>
          <Text
            style={{
              fontFamily: 'Poppins_600SemiBold',
              fontSize: 14,
              color: c.foreground,
            }}
          >
            {name}
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins_400Regular',
              fontSize: 11,
              color: c.mutedForeground,
            }}
          >
            Level {level}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
            backgroundColor: theme === 'dark' ? c.card : '#FDE8E4',
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 12,
          }}
        >
          <Flame size={12} color="#F97316" strokeWidth={2} />
          <Text
            style={{
              fontFamily: 'Poppins_600SemiBold',
              fontSize: 11,
              color: c.foreground,
            }}
          >
            {streak}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
            backgroundColor: theme === 'dark' ? c.card : '#FFF8E8',
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 12,
          }}
        >
          <Gem size={12} color="#F59E0B" strokeWidth={2} />
          <Text
            style={{
              fontFamily: 'Poppins_600SemiBold',
              fontSize: 11,
              color: c.foreground,
            }}
          >
            {gems}
          </Text>
        </View>
        <ThemeToggle variant="pill" />
      </View>
    </MotiView>
  );
}
