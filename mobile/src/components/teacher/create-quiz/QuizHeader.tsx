import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import { ArrowLeft, Eye } from 'lucide-react-native';
import { useTheme } from '@/context';
import { colors } from '@/constants/colors';

interface QuizHeaderProps {
  onBack?: () => void;
  onPreview?: () => void;
}

export function QuizHeader({ onBack, onPreview }: QuizHeaderProps) {
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <MotiView
      from={{ opacity: 0, translateY: -10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'spring', damping: 16, stiffness: 130 }}
    >
      <View className="mb-4 flex-row items-center justify-between px-6">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity onPress={onBack} activeOpacity={0.7}>
            <ArrowLeft size={22} color={c.foreground} strokeWidth={2} />
          </TouchableOpacity>
          <Text className="font-fredoka text-xl text-foreground">Create Quiz</Text>
        </View>
        <TouchableOpacity onPress={onPreview} activeOpacity={0.7}>
          <View className="flex-row items-center gap-1 rounded-full border border-border px-3 py-1.5">
            <Eye size={14} color={c.foreground} strokeWidth={2} />
            <Text className="font-poppins-medium text-xs text-foreground">Preview</Text>
          </View>
        </TouchableOpacity>
      </View>
    </MotiView>
  );
}
