import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Plus } from 'lucide-react-native';
import { useTheme } from '@/context';
import { colors } from '@/constants/colors';

interface AddQuestionButtonProps {
  onPress: () => void;
}

export function AddQuestionButton({ onPress }: AddQuestionButtonProps) {
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} className="mx-6 mb-4">
      <View className="flex-row items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary/30 py-3">
        <Plus size={18} color={c.primary} strokeWidth={2} />
        <Text className="font-poppins-semibold text-sm text-primary">Add Question</Text>
      </View>
    </TouchableOpacity>
  );
}
