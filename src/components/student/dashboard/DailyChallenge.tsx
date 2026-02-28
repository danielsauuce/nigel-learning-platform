import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import { Zap, Clock } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

interface DailyChallengeProps {
  title: string;
  description: string;
  duration: string;
  xpReward: number;
  onStart: () => void;
}

export function DailyChallenge({
  title,
  description,
  duration,
  xpReward,
  onStart,
}: DailyChallengeProps) {
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <MotiView
      from={{ opacity: 0, translateY: 16 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 350 }}
      style={{ paddingHorizontal: 24, marginBottom: 24 }}
    >
      <View
        style={{
          borderRadius: 22,
          overflow: 'hidden',
          ...Platform.select({
            ios: {
              shadowColor: c.gradientStart,
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.25,
              shadowRadius: 16,
            },
            android: { elevation: 8 },
          }),
        }}
      >
        <LinearGradient
          colors={[c.gradientStart, c.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ padding: 22 }}
        >
          {/* Badge row */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              marginBottom: 12,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                backgroundColor: 'rgba(255,255,255,0.2)',
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 8,
              }}
            >
              <Zap size={13} color="#FFFFFF" strokeWidth={2.5} fill="#FFFFFF" />
              <Text
                style={{
                  fontFamily: 'Poppins_700Bold',
                  fontSize: 11,
                  color: '#FFFFFF',
                  letterSpacing: 0.5,
                  textTransform: 'uppercase',
                }}
              >
                Daily Challenge
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Clock size={12} color="rgba(255,255,255,0.7)" strokeWidth={2} />
              <Text
                style={{
                  fontFamily: 'Poppins_500Medium',
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.7)',
                  textTransform: 'uppercase',
                }}
              >
                {duration}
              </Text>
            </View>
          </View>

          {/* Title */}
          <Text
            style={{
              fontFamily: 'Fredoka_700Bold',
              fontSize: 22,
              color: '#FFFFFF',
              marginBottom: 6,
              lineHeight: 28,
            }}
          >
            {title}
          </Text>

          {/* Description */}
          <Text
            style={{
              fontFamily: 'Poppins_400Regular',
              fontSize: 13,
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 20,
              marginBottom: 16,
            }}
          >
            {description}
          </Text>

          {/* Start button */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onStart}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 14,
              paddingVertical: 13,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontFamily: 'Poppins_700Bold',
                fontSize: 14.5,
                color: c.gradientStart,
                letterSpacing: 0.2,
              }}
            >
              Start Challenge (+{xpReward} XP)
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </MotiView>
  );
}
