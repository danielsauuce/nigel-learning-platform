import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import { ChevronLeft } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

interface StudentSetupHeaderProps {
  onBack: () => void;
}

export function StudentSetupHeader({ onBack }: StudentSetupHeaderProps) {
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <MotiView
      from={{ opacity: 0, translateY: -10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 400 }}
      style={{ paddingHorizontal: 24, marginBottom: 8 }}
    >
      <TouchableOpacity
        onPress={onBack}
        activeOpacity={0.7}
        style={{ padding: 4, alignSelf: 'flex-start' }}
      >
        <ChevronLeft size={24} color={c.foreground} strokeWidth={2.5} />
      </TouchableOpacity>
    </MotiView>
  );
}
