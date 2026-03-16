import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import { MascotWaving } from '@/svg/illustrations';
import { Zap } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

interface DailyChallengeProps {
  onStart: () => void;
}

export function DailyChallenge({ onStart }: DailyChallengeProps) {
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <MotiView
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 350 }}
      style={{ paddingHorizontal: 24, marginBottom: 20 }}
    >
      <View
        style={{
          backgroundColor: '#22223B',
          borderRadius: 22,
          padding: 20,
          flexDirection: 'row',
          alignItems: 'center',
          overflow: 'hidden',
          ...Platform.select({
            ios: {
              shadowColor: '#22223B',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.25,
              shadowRadius: 14,
            },
            android: { elevation: 6 },
          }),
        }}
      >
        <View style={{ flex: 1, marginRight: 12 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <Zap size={14} color="#F7E6B6" fill="#F7E6B6" />
            <Text
              style={{
                fontFamily: 'Poppins_600SemiBold',
                fontSize: 11,
                color: '#F7E6B6',
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}
            >
              Daily Challenge
            </Text>
          </View>
          <Text
            style={{
              fontFamily: 'Fredoka_700Bold',
              fontSize: 18,
              color: '#FFFFFF',
              lineHeight: 24,
              marginBottom: 12,
            }}
          >
            The Power of Compound Interest
          </Text>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onStart}
            style={{
              backgroundColor: '#B9A7F8',
              borderRadius: 16,
              paddingVertical: 10,
              paddingHorizontal: 20,
              alignSelf: 'flex-start',
            }}
          >
            <Text
              style={{
                fontFamily: 'Poppins_700Bold',
                fontSize: 13,
                color: '#FFFFFF',
              }}
            >
              Start →
            </Text>
          </TouchableOpacity>
        </View>

        {/* Mascot waving */}
        <MotiView
          from={{ translateY: 10, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 14, stiffness: 100, delay: 500 }}
        >
          <MascotWaving size={70} />
        </MotiView>
      </View>
    </MotiView>
  );
}
