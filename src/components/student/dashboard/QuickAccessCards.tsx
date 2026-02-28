import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import { Map, Gamepad2 } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

interface QuickCardData {
  key: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  accentBg: string;
  onPress: () => void;
}

interface QuickAccessCardsProps {
  onMapPress: () => void;
  onSimulatorPress: () => void;
}

export function QuickAccessCards({ onMapPress, onSimulatorPress }: QuickAccessCardsProps) {
  const { theme } = useTheme();
  const c = colors[theme];

  const cards: QuickCardData[] = [
    {
      key: 'map',
      title: 'Islands Map',
      subtitle: 'Explore the 5 financial archipelagoes and learn.',
      icon: <Map size={26} color={c.gradientStart} strokeWidth={2} />,
      accentBg: theme === 'dark' ? `${c.gradientStart}20` : '#F0EDFF',
      onPress: onMapPress,
    },
    {
      key: 'simulator',
      title: 'Simulator',
      subtitle: 'Master your monthly budget in 3D city life.',
      icon: <Gamepad2 size={26} color={c.gradientStart} strokeWidth={2} />,
      accentBg: theme === 'dark' ? `${c.gradientStart}20` : '#F0EDFF',
      onPress: onSimulatorPress,
    },
  ];

  return (
    <View style={{ flexDirection: 'row', paddingHorizontal: 24, gap: 12, marginBottom: 20 }}>
      {cards.map((card, index) => (
        <MotiView
          key={card.key}
          from={{ opacity: 0, translateY: 16 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 200 + index * 100 }}
          style={{ flex: 1 }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={card.onPress}
            style={{
              backgroundColor: c.card,
              borderRadius: 18,
              padding: 18,
              borderWidth: 1,
              borderColor: c.border,
              ...Platform.select({
                ios: {
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: theme === 'dark' ? 0.2 : 0.05,
                  shadowRadius: 6,
                },
                android: { elevation: 2 },
              }),
            }}
          >
            {/* Icon */}
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                backgroundColor: card.accentBg,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 12,
              }}
            >
              {card.icon}
            </View>

            {/* Title */}
            <Text
              style={{
                fontFamily: 'Poppins_700Bold',
                fontSize: 15,
                color: c.foreground,
                marginBottom: 4,
              }}
            >
              {card.title}
            </Text>

            {/* Subtitle */}
            <Text
              style={{
                fontFamily: 'Poppins_400Regular',
                fontSize: 12,
                color: c.mutedForeground,
                lineHeight: 17,
                marginBottom: 10,
              }}
              numberOfLines={2}
            >
              {card.subtitle}
            </Text>

            {/* Arrow */}
            <Text style={{ color: c.mutedForeground, fontSize: 16 }}>→</Text>
          </TouchableOpacity>
        </MotiView>
      ))}
    </View>
  );
}
