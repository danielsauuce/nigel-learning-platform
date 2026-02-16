import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Animated, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface AgeRange {
  id: string;
  label: string;
  emoji: string;
  subtitle: string;
}

interface AgeRangeCardProps {
  range: AgeRange;
  isSelected: boolean;
  scale: Animated.Value;
  onPress: () => void;
}

export function AgeRangeCard({ range, isSelected, scale, onPress }: AgeRangeCardProps) {
  return (
    <Animated.View className="flex-1" style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        className="items-center overflow-hidden rounded-[18px] px-2 py-5"
        style={[
          {
            backgroundColor: 'rgba(255, 255, 255, 0.07)',
            borderWidth: 1.5,
            borderColor: 'rgba(255, 255, 255, 0.1)',
          },
          isSelected && {
            borderColor: '#FFD700',
            backgroundColor: 'rgba(255, 215, 0, 0.06)',
            ...Platform.select({
              ios: {
                shadowColor: '#FFD700',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.25,
                shadowRadius: 16,
              },
              android: { elevation: 6 },
            }),
          },
        ]}
        activeOpacity={0.8}
        onPress={onPress}
      >
        {/* Selected gold gradient overlay */}
        {isSelected && (
          <LinearGradient
            colors={['rgba(255, 215, 0, 0.15)', 'rgba(245, 166, 35, 0.08)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />
        )}

        <Text className="mb-2 text-[28px]">{range.emoji}</Text>

        <Text
          className="text-center font-fredoka text-[22px]"
          style={{ color: isSelected ? '#FFD700' : 'rgba(255, 255, 255, 0.8)' }}
        >
          {range.label}
        </Text>

        <Text
          className="mt-1 text-center font-poppins-regular text-[11px] tracking-wide"
          style={{ color: isSelected ? 'rgba(255, 215, 0, 0.7)' : 'rgba(255, 255, 255, 0.4)' }}
        >
          {range.subtitle}
        </Text>

        {/* Check badge */}
        {isSelected && (
          <View className="absolute right-2 top-2 h-5 w-5 items-center justify-center rounded-full bg-gold">
            <Text className="-mt-px font-poppins-bold text-xs text-navy">✓</Text>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}
