import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Platform, Text, TouchableOpacity } from 'react-native';

interface GoldButtonProps {
  /** Button label text. */
  label: string;
  /** Press handler. Ignored when disabled. */
  onPress: () => void;
  /** Visually dims the button and disables interaction. */
  disabled?: boolean;
  /** Show a right-arrow indicator. Defaults to true. */
  showArrow?: boolean;
}

/**
 * Primary CTA button with a gold gradient.
 * Used across splash, welcome, role select, and onboarding screens.
 */
export function GoldButton({
  label,
  onPress,
  disabled = false,
  showArrow = true,
}: GoldButtonProps) {
  const shadowStyle = !disabled
    ? Platform.select({
        ios: {
          shadowColor: '#F5A623',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.35,
          shadowRadius: 14,
        },
        android: { elevation: 8 },
      })
    : Platform.select({
        ios: { shadowOpacity: 0 },
        android: { elevation: 0 },
      });

  return (
    <TouchableOpacity
      className="w-full overflow-hidden rounded-[28px]"
      style={shadowStyle}
      activeOpacity={disabled ? 1 : 0.85}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
    >
      <LinearGradient
        colors={
          disabled ? ['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.06)'] : ['#FFD700', '#F5A623']
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-row items-center justify-center py-[16px]"
      >
        <Text
          className="p-2 font-poppins-bold text-lg tracking-wide"
          style={{ color: disabled ? 'rgba(255,255,255,0.3)' : '#1A1B4B' }}
        >
          {label}
        </Text>

        {showArrow && (
          <Text
            className="ml-2 font-poppins-bold text-lg leading-[22px]"
            style={{ color: disabled ? 'rgba(255,255,255,0.3)' : '#1A1B4B' }}
          >
            →
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}
