import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';

interface GoldButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  showArrow?: boolean;
}

export function GoldButton({ label, onPress, disabled = false, showArrow = true }: GoldButtonProps) {
  return (
    <TouchableOpacity
      className="w-full overflow-hidden rounded-[28px]"
      style={
        !disabled
          ? Platform.select({
              ios: { shadowColor: '#F5A623', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.35, shadowRadius: 14 },
              android: { elevation: 8 },
            })
          : Platform.select({
              ios: { shadowOpacity: 0 },
              android: { elevation: 0 },
            })
      }
      activeOpacity={disabled ? 1 : 0.85}
      onPress={disabled ? undefined : onPress}
    >
      <LinearGradient
        colors={disabled ? ['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.06)'] : ['#FFD700', '#F5A623']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-row items-center justify-center gap-2.5 px-8 py-4"
      >
        <Text
          className={`font-poppins-bold text-lg tracking-wide ${disabled ? 'text-white/30' : 'text-navy'}`}
        >
          {label}
        </Text>
        {showArrow && (
          <Text
            className={`font-poppins-bold text-xl ${disabled ? 'text-white/30' : 'text-navy'}`}
          >
            →
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}