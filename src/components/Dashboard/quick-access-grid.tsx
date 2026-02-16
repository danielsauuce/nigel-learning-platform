import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export interface QuickAccessItem {
  key: string;
  Icon: React.ComponentType;
  label: string;
  colors: [string, string];
  onPress: () => void;
}

interface QuickAccessGridProps {
  items: QuickAccessItem[];
}

export function QuickAccessGrid({ items }: QuickAccessGridProps) {
  return (
    <View className="flex-row" style={{ gap: 12 }}>
      {items.map(({ key, Icon, label, colors, onPress }) => (
        <TouchableOpacity
          key={key}
          className="flex-1 overflow-hidden rounded-[18px]"
          activeOpacity={0.85}
          onPress={onPress}
        >
          <LinearGradient
            colors={colors}
            className="items-center justify-center rounded-[18px] px-2 py-5"
            style={{
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.06)',
              minHeight: 120,
              gap: 10,
            }}
          >
            <Icon />
            <Text
              className="text-center font-poppins-semibold text-xs leading-4"
              style={{ color: 'rgba(255,255,255,0.75)' }}
            >
              {label}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      ))}
    </View>
  );
}
