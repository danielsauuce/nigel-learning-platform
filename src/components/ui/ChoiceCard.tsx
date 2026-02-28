import React from 'react';
import { Platform, Text, TouchableOpacity, View, type ViewStyle } from 'react-native';
import { MotiView } from 'moti';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

interface ChoiceCardProps {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onPress: () => void;
  accentColor?: string;
  style?: ViewStyle;
}

export function ChoiceCard({
  title,
  subtitle,
  icon,
  isSelected,
  onPress,
  accentColor,
  style,
}: ChoiceCardProps) {
  const { theme } = useTheme();
  const c = colors[theme];
  const accent = accentColor ?? c.gradientStart;

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={style}>
      <MotiView
        animate={{
          borderColor: isSelected ? accent : c.border,
          scale: isSelected ? 1.0 : 0.98,
        }}
        transition={{ type: 'spring', damping: 18, stiffness: 200 }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 2,
          borderRadius: 16,
          backgroundColor: c.card,
          paddingVertical: 16,
          paddingHorizontal: 16,
          gap: 14,
          ...Platform.select({
            ios: {
              shadowColor: isSelected ? accent : '#000',
              shadowOffset: { width: 0, height: isSelected ? 4 : 1 },
              shadowOpacity: isSelected ? 0.18 : theme === 'dark' ? 0.2 : 0.04,
              shadowRadius: isSelected ? 12 : 4,
            },
            android: { elevation: isSelected ? 6 : 2 },
          }),
        }}
      >
        {/* Icon circle */}
        <MotiView
          animate={{
            backgroundColor: isSelected ? accent : theme === 'dark' ? c.muted : '#F3F0FF',
          }}
          transition={{ type: 'timing', duration: 200 }}
          style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </MotiView>

        {/* Text */}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: 'Poppins_600SemiBold',
              fontSize: 15,
              color: c.foreground,
              marginBottom: subtitle ? 2 : 0,
            }}
          >
            {title}
          </Text>
          {subtitle && (
            <Text
              style={{
                fontFamily: 'Poppins_400Regular',
                fontSize: 12.5,
                color: c.mutedForeground,
                lineHeight: 18,
              }}
            >
              {subtitle}
            </Text>
          )}
        </View>

        {/* Checkmark */}
        <MotiView
          animate={{
            borderColor: isSelected ? accent : c.border,
            backgroundColor: isSelected ? accent : 'transparent',
          }}
          transition={{ type: 'timing', duration: 200 }}
          style={{
            width: 26,
            height: 26,
            borderRadius: 13,
            borderWidth: 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MotiView
            animate={{ opacity: isSelected ? 1 : 0, scale: isSelected ? 1 : 0.5 }}
            transition={{ type: 'spring', damping: 14, stiffness: 180 }}
          >
            <Text style={{ color: '#FFFFFF', fontSize: 13, fontFamily: 'Poppins_700Bold' }}>✓</Text>
          </MotiView>
        </MotiView>
      </MotiView>
    </TouchableOpacity>
  );
}
