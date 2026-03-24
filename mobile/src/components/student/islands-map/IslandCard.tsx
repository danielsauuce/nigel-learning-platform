import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import { CheckCircle, Lock, PlayCircle } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

export interface IslandData {
  key: string;
  title: string;
  category: string;
  description: string;
  lessonsCompleted: number;
  totalLessons: number;
  status: 'mastered' | 'active' | 'locked';
}

interface IslandCardProps {
  island: IslandData;
  index: number;
  onPress: () => void;
}

const STATUS_CONFIG = {
  mastered: { bg: '#E8F5E9', accent: '#4CAF50', icon: CheckCircle },
  active: { bg: '#F3F0FF', accent: '#B9A7F8', icon: PlayCircle },
  locked: { bg: '#F8F6FB', accent: '#E8E4F0', icon: Lock },
};

export function IslandCard({ island, index, onPress }: IslandCardProps) {
  const { theme } = useTheme();
  const c = colors[theme];
  const config = STATUS_CONFIG[island.status];
  const StatusIcon = config.icon;
  const progress =
    island.totalLessons > 0 ? Math.round((island.lessonsCompleted / island.totalLessons) * 100) : 0;

  return (
    <MotiView
      from={{ opacity: 0, translateX: index % 2 === 0 ? -20 : 20 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 120 + index * 80 }}
    >
      <TouchableOpacity
        activeOpacity={island.status === 'locked' ? 1 : 0.8}
        onPress={onPress}
        style={{
          backgroundColor: theme === 'dark' ? c.card : config.bg,
          borderRadius: 22,
          padding: 20,
          borderWidth: island.status === 'active' ? 2 : 0,
          borderColor: island.status === 'active' ? '#B9A7F8' : 'transparent',
          opacity: island.status === 'locked' ? 0.6 : 1,
          ...Platform.select({
            ios: {
              shadowColor: config.accent,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: island.status === 'active' ? 0.12 : 0.05,
              shadowRadius: 10,
            },
            android: { elevation: island.status === 'active' ? 4 : 2 },
          }),
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 16,
              backgroundColor: `${config.accent}20`,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <StatusIcon size={24} color={config.accent} strokeWidth={2} />
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: 'Poppins_400Regular',
                fontSize: 11,
                color: config.accent,
                textTransform: 'uppercase',
                letterSpacing: 0.8,
                marginBottom: 2,
              }}
            >
              {island.category}
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins_700Bold',
                fontSize: 16,
                color: c.foreground,
                marginBottom: 4,
              }}
            >
              {island.title}
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins_400Regular',
                fontSize: 12,
                color: c.mutedForeground,
                lineHeight: 18,
              }}
              numberOfLines={2}
            >
              {island.description}
            </Text>
          </View>
        </View>

        {/* Progress bar */}
        {island.status !== 'locked' && (
          <View style={{ marginTop: 14 }}>
            <View
              style={{
                height: 6,
                borderRadius: 3,
                backgroundColor: `${config.accent}20`,
                overflow: 'hidden',
              }}
            >
              <View
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  borderRadius: 3,
                  backgroundColor: config.accent,
                }}
              />
            </View>
            <Text
              style={{
                fontFamily: 'Poppins_500Medium',
                fontSize: 11,
                color: c.mutedForeground,
                marginTop: 6,
                textAlign: 'right',
              }}
            >
              {island.lessonsCompleted}/{island.totalLessons} lessons
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </MotiView>
  );
}
