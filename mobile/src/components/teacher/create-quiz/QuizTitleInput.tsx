import React from 'react';
import { TextInput } from 'react-native';
import { useTheme } from '@/context';
import { colors } from '@/constants/colors';

interface QuizTitleInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

export function QuizTitleInput({ value, onChangeText }: QuizTitleInputProps) {
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder="Quiz Title"
      placeholderTextColor={c.mutedForeground}
      className="mb-2 font-fredoka text-lg text-foreground"
    />
  );
}
