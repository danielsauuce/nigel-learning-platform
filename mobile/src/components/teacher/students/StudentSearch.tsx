import React from 'react';
import { View, TextInput } from 'react-native';
import { Search } from 'lucide-react-native';
import { useTheme } from '@/context';
import { colors } from '@/constants/colors';

type Props = {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
};

export function StudentSearch({
  value,
  onChange,
  placeholder = 'Search by name or student ID...',
}: Props) {
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <View className="mx-6 mb-4 flex-row items-center gap-2.5 rounded-xl border border-border bg-card px-3.5 py-2.5">
      <Search size={16} color={c.mutedForeground} strokeWidth={2} />

      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={c.mutedForeground}
        className="flex-1 font-poppins-regular text-sm text-foreground"
      />
    </View>
  );
}
