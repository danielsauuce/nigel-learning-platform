import React, { useRef } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

// ── Types ──────────────────────────────────────────────────────────

export interface SelectableOption {
  id: string;
  emoji: string;
  label: string;
}

export interface OptionColorSet {
  bg: string;
  border: string;
  selected: string;
}

interface SelectableOptionCardProps {
  option: SelectableOption;
  colors: OptionColorSet;
  isSelected: boolean;
  onPress: () => void;
}

/** Default rotating color palette for option cards. */
export const DEFAULT_OPTION_COLORS: OptionColorSet[] = [
  { bg: 'rgba(79,195,247,0.15)', border: 'rgba(79,195,247,0.3)', selected: '#4FC3F7' },
  { bg: 'rgba(255,215,0,0.12)', border: 'rgba(255,215,0,0.3)', selected: '#FFD700' },
  { bg: 'rgba(255,46,145,0.12)', border: 'rgba(255,46,145,0.3)', selected: '#FF2E91' },
  { bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)', selected: '#10B981' },
];

// ── Component ──────────────────────────────────────────────────────

/**
 * Selectable option card for quizzes and surveys.
 * Shows an emoji icon, label, and animated check circle.
 * Bounces on press for tactile feedback.
 */
export function SelectableOptionCard({
  option,
  colors,
  isSelected,
  onPress,
}: SelectableOptionCardProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.95, duration: 80, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 3, tension: 120, useNativeDriver: true }),
    ]).start();
    onPress();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
        <View
          className="flex-row items-center gap-3 rounded-2xl px-3.5 py-3.5"
          style={{
            backgroundColor: isSelected ? colors.bg : 'rgba(255,255,255,0.06)',
            borderWidth: isSelected ? 2 : 1.5,
            borderColor: isSelected ? colors.selected : 'rgba(255,255,255,0.1)',
          }}
        >
          {/* Emoji icon */}
          <View
            className="h-11 w-11 items-center justify-center rounded-xl"
            style={{ backgroundColor: isSelected ? colors.bg : 'rgba(255,255,255,0.06)' }}
          >
            <Text className="text-[22px]">{option.emoji}</Text>
          </View>

          {/* Label */}
          <Text
            className="flex-1 font-poppins-semibold text-[15px] tracking-tight"
            style={{ color: isSelected ? '#FFFFFF' : 'rgba(255,255,255,0.75)' }}
          >
            {option.label}
          </Text>

          {/* Check circle */}
          <View
            className="h-6 w-6 items-center justify-center rounded-full"
            style={{
              borderWidth: 2,
              borderColor: isSelected ? colors.selected : 'rgba(255,255,255,0.15)',
              backgroundColor: isSelected ? colors.selected : 'transparent',
            }}
          >
            {isSelected && (
              <Svg width={12} height={12} viewBox="0 0 12 12">
                <Path
                  d="M2.5 6 L5 8.5 L9.5 3.5"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
