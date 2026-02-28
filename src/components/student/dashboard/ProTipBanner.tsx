import React from 'react';
import { Platform, Text, View } from 'react-native';
import { MotiView } from 'moti';
import { BookOpen } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

interface ProTipBannerProps {
  title: string;
  description: string;
}

export function ProTipBanner({ title, description }: ProTipBannerProps) {
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <MotiView
      from={{ opacity: 0, translateY: 14 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 550 }}
      style={{ paddingHorizontal: 24, marginBottom: 24 }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 14,
          backgroundColor: theme === 'dark' ? c.muted : '#FFF8E1',
          borderRadius: 16,
          padding: 16,
          borderWidth: 1,
          borderColor: theme === 'dark' ? c.border : '#FFE082',
          ...Platform.select({
            ios: {
              shadowColor: '#F5A623',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 6,
            },
            android: { elevation: 1 },
          }),
        }}
      >
        {/* Icon */}
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            backgroundColor: theme === 'dark' ? `${c.gradientStart}30` : '#F0EDFF',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <BookOpen size={20} color={c.gradientStart} strokeWidth={2} />
        </View>

        {/* Text */}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: 'Poppins_700Bold',
              fontSize: 14,
              color: c.foreground,
              marginBottom: 2,
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins_400Regular',
              fontSize: 12,
              color: c.mutedForeground,
              lineHeight: 17,
            }}
          >
            {description}
          </Text>
        </View>
      </View>
    </MotiView>
  );
}
