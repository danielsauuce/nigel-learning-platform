import React from 'react';
import { Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { GripVertical, Trash2, FileQuestion, ToggleLeft, MessageSquare } from 'lucide-react-native';
import { useTheme } from '@/context';
import { colors } from '@/constants/colors';
import type { Question, QuestionType } from '../types/quiz';
import { QuizAnswerOption } from './QuizAnswerOption';

const TYPE_CONFIG: Record<QuestionType, { label: string; icon: any; activeColor: string }> = {
  multiple_choice: { label: 'Multiple Choice', icon: FileQuestion, activeColor: '#6C5CE7' },
  true_false: { label: 'True / False', icon: ToggleLeft, activeColor: '#22C55E' },
  short_answer: { label: 'Short Answer', icon: MessageSquare, activeColor: '#F59E0B' },
};

interface QuizQuestionCardProps {
  question: Question;
  index: number;
  onChangeType: (type: QuestionType) => void;
  onChangeText: (text: string) => void;
  onToggleCorrect: (answerId: string) => void;
  onChangeAnswerText: (answerId: string, text: string) => void;
  onRemove: () => void;
}

export function QuizQuestionCard({
  question,
  index,
  onChangeType,
  onChangeText,
  onToggleCorrect,
  onChangeAnswerText,
  onRemove,
}: QuizQuestionCardProps) {
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <View
      className="mx-6 mb-4 overflow-hidden rounded-2xl border border-border bg-card"
      style={Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.04,
          shadowRadius: 8,
        },
        android: { elevation: 2 },
      })}
    >
      {/* Card header */}
      <View className="flex-row items-center justify-between border-b border-border px-4 py-3">
        <View className="flex-row items-center gap-2">
          <GripVertical size={14} color={c.mutedForeground} strokeWidth={2} />
          <View className="bg-primary/8 rounded-full px-2.5 py-0.5">
            <Text className="font-poppins-bold text-[10px] text-primary">Q{index + 1}</Text>
          </View>
          <View className="rounded-full bg-muted px-2 py-0.5">
            <Text className="font-poppins-medium text-[9px] text-muted-foreground">
              {question.points} pts
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={onRemove} activeOpacity={0.7}>
          <Trash2 size={16} color={c.destructive} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <View className="px-4 py-3">
        {/* Type selector */}
        <View className="mb-3 flex-row gap-2">
          {(Object.keys(TYPE_CONFIG) as QuestionType[]).map((type) => {
            const cfg = TYPE_CONFIG[type];
            const TypeIcon = cfg.icon;
            const active = question.type === type;

            return (
              <TouchableOpacity
                key={type}
                onPress={() => onChangeType(type)}
                activeOpacity={0.7}
                className="flex-1"
              >
                <View
                  className={`flex-row items-center justify-center gap-1.5 rounded-lg border py-2 ${
                    active ? 'border-primary bg-primary/5' : 'border-border bg-card'
                  }`}
                >
                  <TypeIcon
                    size={12}
                    color={active ? cfg.activeColor : c.mutedForeground}
                    strokeWidth={2}
                  />
                  <Text
                    className={`font-poppins-medium text-[9px] ${
                      active ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    {cfg.label}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Question text */}
        <TextInput
          value={question.text}
          onChangeText={onChangeText}
          placeholder="Type your question here..."
          placeholderTextColor={c.mutedForeground}
          multiline
          className="mb-3 min-h-[44px] font-poppins-medium text-sm text-foreground"
        />

        {/* Answers */}
        {question.type !== 'short_answer' && (
          <View className="gap-2">
            {question.answers.map((answer, i) => (
              <QuizAnswerOption
                key={answer.id}
                answer={answer}
                index={i}
                isTrueFalse={question.type === 'true_false'}
                onToggleCorrect={() => onToggleCorrect(answer.id)}
                onChangeText={(text) => onChangeAnswerText(answer.id, text)}
              />
            ))}
          </View>
        )}

        {question.type === 'short_answer' && (
          <View className="items-center rounded-lg border border-dashed border-border px-3 py-4">
            <Text className="font-poppins-regular text-xs text-muted-foreground">
              Students will type their answer here
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
