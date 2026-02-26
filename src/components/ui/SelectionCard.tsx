import React from 'react';
import { Platform, Text, TouchableOpacity, View, type ViewStyle } from 'react-native';
import { MotiView } from 'moti';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

interface SelectionCardProps {
  title: string;
  subtitle?: string;
  isSelected: boolean;
  onPress: () => void;
  /** Illustration / icon rendered above the title */
  illustration?: React.ReactNode;
  /** Accent colour for the selected state border + glow */
  accentColor?: string;
  style?: ViewStyle;
}

export function SelectionCard({
  title,
  subtitle,
  isSelected,
  onPress,
  illustration,
  accentColor,
  style,
}: SelectionCardProps) {
  const { theme } = useTheme();
  const c = colors[theme];
  const accent = accentColor ?? c.gradientStart;

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={style}>
      <MotiView
        animate={{
          scale: isSelected ? 1 : 0.97,
          borderColor: isSelected ? accent : theme === 'dark' ? c.border : '#E5E7EB',
        }}
        transition={{ type: 'spring', damping: 18, stiffness: 200 }}
        style={{
          borderWidth: 2.5,
          borderRadius: 22,
          backgroundColor: c.card,
          overflow: 'hidden',
          ...Platform.select({
            ios: {
              shadowColor: isSelected ? accent : '#000',
              shadowOffset: { width: 0, height: isSelected ? 6 : 2 },
              shadowOpacity: isSelected ? 0.25 : theme === 'dark' ? 0.3 : 0.06,
              shadowRadius: isSelected ? 16 : 8,
            },
            android: { elevation: isSelected ? 8 : 3 },
          }),
        }}
      >
        {/* Selected accent glow strip at top */}
        <MotiView
          animate={{
            opacity: isSelected ? 1 : 0,
            height: isSelected ? 4 : 0,
          }}
          transition={{ type: 'timing', duration: 250 }}
          style={{
            backgroundColor: accent,
            width: '100%',
          }}
        />

        <View style={{ alignItems: 'center', paddingVertical: 24, paddingHorizontal: 20 }}>
          {/* Illustration */}
          {illustration && (
            <MotiView
              animate={{ scale: isSelected ? 1.05 : 1 }}
              transition={{ type: 'spring', damping: 14, stiffness: 140 }}
              style={{ marginBottom: 16 }}
            >
              {illustration}
            </MotiView>
          )}

          {/* Title */}
          <Text
            style={{
              fontFamily: 'Poppins_700Bold',
              fontSize: 18,
              color: isSelected ? accent : c.foreground,
              textAlign: 'center',
              marginBottom: subtitle ? 6 : 0,
            }}
          >
            {title}
          </Text>

          {/* Subtitle */}
          {subtitle && (
            <Text
              style={{
                fontFamily: 'Poppins_400Regular',
                fontSize: 13,
                color: c.mutedForeground,
                textAlign: 'center',
                lineHeight: 19,
              }}
            >
              {subtitle}
            </Text>
          )}

          {/* Selection indicator */}
          <MotiView
            animate={{
              scale: isSelected ? 1 : 0,
              opacity: isSelected ? 1 : 0,
            }}
            transition={{ type: 'spring', damping: 12, stiffness: 160 }}
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              width: 24,
              height: 24,
              borderRadius: 12,
              backgroundColor: accent,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: '#FFFFFF', fontSize: 14, fontFamily: 'Poppins_700Bold' }}>✓</Text>
          </MotiView>
        </View>
      </MotiView>
    </TouchableOpacity>
  );
}
