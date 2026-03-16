import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import { Map, Wallet } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

interface QuickAccessCardsProps {
  onMapPress: () => void;
  onSimulatorPress: () => void;
}

export function QuickAccessCards({ onMapPress, onSimulatorPress }: QuickAccessCardsProps) {
  const { theme } = useTheme();
  const c = colors[theme];

  const cards = [
    {
      title: 'Islands Map',
      subtitle: 'Continue learning',
      emoji: '🗺️',
      bg: '#F9D6D0',
      onPress: onMapPress,
    },
    {
      title: 'Budget Sim',
      subtitle: 'Practice budgeting',
      emoji: '💳',
      bg: '#F3F0FF',
      onPress: onSimulatorPress,
    },
  ];

  return (
    <View style={{ flexDirection: 'row', gap: 14, paddingHorizontal: 24, marginBottom: 20 }}>
      {cards.map((card, i) => (
        <MotiView
          key={card.title}
          from={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 16, stiffness: 130, delay: 250 + i * 80 }}
          style={{ flex: 1 }}
        >
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={card.onPress}
            style={{
              backgroundColor: theme === 'dark' ? c.card : card.bg,
              borderRadius: 20,
              padding: 18,
              minHeight: 100,
              justifyContent: 'space-between',
              ...Platform.select({
                ios: {
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.05,
                  shadowRadius: 8,
                },
                android: { elevation: 2 },
              }),
            }}
          >
            <Text style={{ fontSize: 28, marginBottom: 8 }}>{card.emoji}</Text>
            <View>
              <Text
                style={{
                  fontFamily: 'Poppins_700Bold',
                  fontSize: 15,
                  color: '#22223B',
                }}
              >
                {card.title}
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins_400Regular',
                  fontSize: 12,
                  color: '#6C6C80',
                  marginTop: 2,
                }}
              >
                {card.subtitle}
              </Text>
            </View>
          </TouchableOpacity>
        </MotiView>
      ))}
    </View>
  );
}
