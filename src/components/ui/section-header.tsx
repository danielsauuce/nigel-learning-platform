import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface SectionHeaderProps {
  title: string;
  linkText?: string;
  onLinkPress?: () => void;
}

export function SectionHeader({ title, linkText, onLinkPress }: SectionHeaderProps) {
  return (
    <View className="mb-3 flex-row items-center justify-between">
      <Text
        className="font-fredoka text-xl text-white"
        style={{
          textShadowColor: 'rgba(0,0,0,0.15)',
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: 3,
        }}
      >
        {title}
      </Text>

      {linkText && onLinkPress && (
        <TouchableOpacity onPress={onLinkPress} activeOpacity={0.7}>
          <Text className="font-poppins-medium text-[13px] text-student">{linkText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
