import React from 'react';
import { Platform, Text, View } from 'react-native';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

interface MilestoneBannerProps {
  title: string;
  description: string;
  progress: number;
}

export function MilestoneBanner({ title, description, progress }: MilestoneBannerProps) {
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <MotiView
      from={{ opacity: 0, translateY: 16 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 600 }}
      style={{
        paddingHorizontal: 24,
        marginBottom: 24,
      }}
    >
      <View
        style={{
          borderRadius: 20,
          overflow: 'hidden',
          ...Platform.select({
            ios: {
              shadowColor: c.gradientStart,
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.2,
              shadowRadius: 14,
            },
            android: { elevation: 6 },
          }),
        }}
      >
        <LinearGradient
          colors={[c.gradientStart, c.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ padding: 20 }}
        >
          <Text
            style={{
              fontFamily: 'Fredoka_700Bold',
              fontSize: 18,
              color: '#FFFFFF',
              marginBottom: 4,
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins_400Regular',
              fontSize: 13,
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 19,
              marginBottom: 14,
            }}
          >
            {description}
          </Text>

          {/* Progress bar */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View
              style={{
                flex: 1,
                height: 8,
                borderRadius: 4,
                backgroundColor: 'rgba(255,255,255,0.2)',
                overflow: 'hidden',
              }}
            >
              <MotiView
                from={{ width: '0%' as any }}
                animate={{ width: `${progress}%` as any }}
                transition={{ type: 'timing', duration: 900, delay: 800 }}
                style={{
                  height: '100%',
                  borderRadius: 4,
                  backgroundColor: '#FFFFFF',
                }}
              />
            </View>
            <Text
              style={{
                fontFamily: 'Poppins_700Bold',
                fontSize: 13,
                color: '#FFFFFF',
              }}
            >
              {progress}%
            </Text>
          </View>
        </LinearGradient>
      </View>
    </MotiView>
  );
}
