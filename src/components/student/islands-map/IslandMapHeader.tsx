import React from 'react';
import { Text, View } from 'react-native';
import { MotiView } from 'moti';
import { Flame, Gem } from 'lucide-react-native';
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
      from={{ opacity: 0, translateY: -12 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'spring', damping: 16, stiffness: 130 }}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        marginBottom: 20,
      }}
    >
      {/* Left: avatar + name */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: c.gradientStart,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 2,
            borderColor: c.gradientEnd,
          }}
        >
          <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 16, color: '#FFFFFF' }}>
            {name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontFamily: 'Poppins_400Regular',
              fontSize: 11,
              color: c.mutedForeground,
              letterSpacing: 0.3,
              textTransform: 'uppercase',
            }}
          >
            Level {level}
          </Text>
          <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 15, color: c.foreground }}>
            Explorer {name}
          </Text>
        </View>
      </View>

      {/* Right: stats */}
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
            backgroundColor: c.card,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: c.border,
          }}
        >
          <Flame size={14} color="#EF4444" strokeWidth={2.5} />
          <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 13, color: c.foreground }}>
            {streak}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
            backgroundColor: c.card,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: c.border,
          }}
        >
          <Gem size={14} color={c.gradientStart} strokeWidth={2.5} />
          <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 13, color: c.foreground }}>
            {gems}
          </Text>
        </View>
      </View>
    </MotiView>
  );
}
