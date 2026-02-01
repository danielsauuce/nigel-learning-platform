import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import { ReactNode } from 'react';

interface PrimaryButtonProps {
  onPress: () => void;
  title: string;
  icon?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  accessibilityLabel?: string;
}

export function PrimaryButton({
  onPress,
  title,
  icon = null,
  disabled = false,
  loading = false,
  style,
  textStyle,
  accessibilityLabel,
}: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.85}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityRole="button"
      className={`
        w-full rounded-2xl py-4 px-6 items-center justify-center flex-row gap-3
        shadow-lg
        ${disabled || loading ? 'bg-primary/60' : 'bg-primary active:bg-primary/90'}
      `}
      style={style}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        // <Text className="text-white text-lg font-semibold">Loading...</Text>
        <>
          <Text className="text-white text-lg font-semibold" style={textStyle}>
            {title}
          </Text>
          {icon}
        </>
      )}
    </TouchableOpacity>
  );
}
