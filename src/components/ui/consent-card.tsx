import React, { useRef } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

export interface ConsentItem {
  id: string;
  emoji: string;
  title: string;
  description: string;
  required: boolean;
}

interface ConsentCardProps {
  item: ConsentItem;
  isChecked: boolean;
  accentColor: string;
  onToggle: () => void;
}

function ConsentToggle({
  checked,
  accentColor,
  onToggle,
}: {
  checked: boolean;
  accentColor: string;
  onToggle: () => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.85, duration: 80, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 3, tension: 120, useNativeDriver: true }),
    ]).start();
    onToggle();
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
      <Animated.View
        className="mt-0.5 h-[26px] w-[26px] items-center justify-center rounded-lg"
        style={{
          backgroundColor: checked ? accentColor : 'transparent',
          borderWidth: 2,
          borderColor: checked ? accentColor : 'rgba(255,255,255,0.2)',
          transform: [{ scale }],
        }}
      >
        {checked && (
          <Svg width={14} height={14} viewBox="0 0 14 14">
            <Path
              d="M2.5 7 L5.5 10 L11.5 4"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
}

export function ConsentCard({ item, isChecked, accentColor, onToggle }: ConsentCardProps) {
  return (
    <TouchableOpacity
      className="mt-4 flex-row items-start gap-3 rounded-2xl px-3.5 py-3.5"
      style={{
        borderWidth: 1.5,
        borderColor: isChecked ? accentColor : 'rgba(255,255,255,0.08)',
        backgroundColor: isChecked ? `${accentColor}14` : 'rgba(255,255,255,0.05)',
      }}
      activeOpacity={0.8}
      onPress={onToggle}
    >
      {/* Emoji icon */}
      <View
        className="h-10 w-10 items-center justify-center rounded-xl"
        style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
      >
        <Text className="text-xl">{item.emoji}</Text>
      </View>

      {/* Text content */}
      <View className="flex-1">
        <View className="flex-row flex-wrap items-center gap-2">
          <Text className="font-poppins-semibold text-[15px] tracking-tight text-white">
            {item.title}
          </Text>
          {item.required && (
            <View
              className="rounded-md px-1.5 py-0.5"
              style={{ backgroundColor: 'rgba(255,46,145,0.2)' }}
            >
              <Text className="font-poppins-medium text-[10px] uppercase tracking-wide text-pink">
                Required
              </Text>
            </View>
          )}
        </View>

        <Text
          className="mt-1 font-poppins-regular text-[14px] leading-[17px]"
          style={{ color: 'rgba(255,255,255,0.5)' }}
        >
          {item.description}
        </Text>
      </View>

      {/* Toggle */}
      <ConsentToggle checked={isChecked} accentColor={accentColor} onToggle={onToggle} />
    </TouchableOpacity>
  );
}
