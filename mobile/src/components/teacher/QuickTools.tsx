import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { PlusCircle, BookOpen, Download } from 'lucide-react-native';
import { useTheme } from '@/context';
import { colors } from '@/constants/colors';

interface Tool {
  label: string;
  icon: React.ReactNode;
  filled?: boolean;
  onPress?: () => void;
}

export function QuickTools() {
  const { theme } = useTheme();
  const c = colors[theme];

  const tools: Tool[] = [
    {
      label: 'Create Quiz',
      icon: <PlusCircle size={15} color="#FFF" strokeWidth={2} />,
      filled: true,
      onPress: () => console.log('Create Quiz'),
    },
    {
      label: 'Assign Content',
      icon: <BookOpen size={15} color={c.foreground} strokeWidth={2} />,
      onPress: () => console.log('Assign Content'),
    },
    {
      label: 'Export CSV',
      icon: <Download size={15} color={c.foreground} strokeWidth={2} />,
      onPress: () => console.log('Export CSV'),
    },
  ];

  return (
    <View className="mb-5 px-6">
      <Text className="mb-2.5 font-poppins-bold text-sm text-foreground">Quick Tools</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-2.5">
          {tools.map((tool) => (
            <TouchableOpacity key={tool.label} activeOpacity={0.7} onPress={tool.onPress}>
              <View
                className={`flex-row items-center gap-2 rounded-full border px-4 py-2.5 ${
                  tool.filled ? 'border-primary bg-primary' : 'border-border bg-card'
                }`}
              >
                {tool.icon}

                <Text
                  className={`font-poppins-semibold text-xs ${
                    tool.filled ? 'text-white' : 'text-foreground'
                  }`}
                >
                  {tool.label}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
