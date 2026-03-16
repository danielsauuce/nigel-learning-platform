import React from 'react';
import { Text, View } from 'react-native';
import { MotiView } from 'moti';
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
      from={{ opacity: 0, translateY: 12 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 600 }}
      style={{ paddingHorizontal: 24, marginTop: 20 }}
    >
      <View
        style={{
          backgroundColor: theme === 'dark' ? c.card : '#FFF8E8',
          borderRadius: 20,
          padding: 18,
          borderWidth: 1,
          borderColor: '#F7E6B640',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <Text style={{ fontSize: 18 }}>🏆</Text>
          <Text
            style={{
              fontFamily: 'Poppins_700Bold',
              fontSize: 15,
              color: c.foreground,
            }}
          >
            {title}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: 'Poppins_400Regular',
            fontSize: 13,
            color: c.mutedForeground,
            lineHeight: 20,
            marginBottom: 12,
          }}
        >
          {description}
        </Text>
        <View
          style={{
            height: 8,
            borderRadius: 4,
            backgroundColor: '#F7E6B640',
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              height: '100%',
              width: `${progress}%`,
              borderRadius: 4,
              backgroundColor: '#F7E6B6',
            }}
          />
        </View>
      </View>
    </MotiView>
  );
}
