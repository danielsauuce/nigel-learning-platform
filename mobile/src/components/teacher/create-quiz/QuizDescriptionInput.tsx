import React from 'react';
import { TextInput } from 'react-native';
import { useTheme } from '@/context';
import { colors } from '@/constants/colors';

interface QuizDescriptionInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

export function QuizDescriptionInput({ value, onChangeText }: QuizDescriptionInputProps) {
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder="Add a description (optional)"
      placeholderTextColor={c.mutedForeground}
      multiline
      className="mb-3 font-poppins-regular text-xs text-muted-foreground"
    />
  );
}
