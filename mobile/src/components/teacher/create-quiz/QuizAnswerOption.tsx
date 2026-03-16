import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { CheckCircle, Circle } from 'lucide-react-native';
import { useTheme } from '@/context';
import { colors } from '@/constants/colors';
import type { Answer } from './types/quiz';

interface QuizAnswerOptionProps {
  answer: Answer;
  index: number;
  isTrueFalse: boolean;
  onToggleCorrect: () => void;
  onChangeText: (text: string) => void;
}

export function QuizAnswerOption({
  answer,
  index,
  isTrueFalse,
  onToggleCorrect,
  onChangeText,
}: QuizAnswerOptionProps) {
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <View className="flex-row items-center gap-2">
      <TouchableOpacity onPress={onToggleCorrect} activeOpacity={0.7}>
        {answer.correct ? (
          <CheckCircle size={20} color={colors.success} strokeWidth={2} />
        ) : (
          <Circle size={20} color={c.border} strokeWidth={2} />
        )}
      </TouchableOpacity>
      <View className="flex-1 rounded-lg border border-border px-3 py-2">
        <TextInput
          value={answer.text}
          onChangeText={onChangeText}
          placeholder={isTrueFalse ? answer.text : `Option ${String.fromCharCode(65 + index)}`}
          placeholderTextColor={c.mutedForeground}
          editable={!isTrueFalse}
          className="font-poppins-regular text-xs text-foreground"
        />
      </View>
    </View>
  );
}
