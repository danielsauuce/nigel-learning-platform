import React from 'react';
import { Text, TouchableOpacity, View, type ViewStyle } from 'react-native';
import { MotiView } from 'moti';
import { ChevronLeft } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  delay?: number;
  style?: ViewStyle;
}

export function ScreenHeader({ title, subtitle, onBack, delay = 200, style }: ScreenHeaderProps) {
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <MotiView
      from={{ opacity: 0, translateY: -12 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 450, delay }}
      style={[{ paddingHorizontal: 24 }, style]}
    >
      {onBack && (
        <TouchableOpacity
          onPress={onBack}
          activeOpacity={0.7}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16,
            alignSelf: 'flex-start',
            paddingVertical: 4,
            paddingRight: 8,
          }}
        >
          <ChevronLeft size={22} color={c.mutedForeground} strokeWidth={2.5} />
          <Text
            style={{
              fontFamily: 'Poppins_500Medium',
              fontSize: 14,
              color: c.mutedForeground,
              marginLeft: 2,
            }}
          >
            Back
          </Text>
        </TouchableOpacity>
      )}

      <Text
        style={{
          fontFamily: 'Fredoka_700Bold',
          fontSize: 28,
          color: c.foreground,
          letterSpacing: 0.3,
          marginBottom: subtitle ? 8 : 0,
        }}
      >
        {title}
      </Text>

      {subtitle && (
        <Text
          style={{
            fontFamily: 'Poppins_400Regular',
            fontSize: 15,
            color: c.mutedForeground,
            lineHeight: 23,
          }}
        >
          {subtitle}
        </Text>
      )}
    </MotiView>
  );
}
