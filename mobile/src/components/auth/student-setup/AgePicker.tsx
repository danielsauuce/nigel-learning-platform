import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

const AGES = [11, 12, 13, 14];

interface AgePickerProps {
  selectedAge: number | null;
  onSelect: (age: number) => void;
}

export function AgePicker({ selectedAge, onSelect }: AgePickerProps) {
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <View style={{ flexDirection: 'row', gap: 10 }}>
      {AGES.map((age) => {
        const isActive = selectedAge === age;
        return (
          <TouchableOpacity
            key={age}
            activeOpacity={0.7}
            onPress={() => onSelect(age)}
            style={{ flex: 1 }}
          >
            <MotiView
              animate={{
                backgroundColor: isActive ? c.gradientStart : c.card,
                borderColor: isActive ? c.gradientStart : c.border,
                scale: isActive ? 1.04 : 1,
              }}
              transition={{ type: 'spring', damping: 16, stiffness: 180 }}
              style={{
                paddingVertical: 14,
                borderRadius: 14,
                borderWidth: 1.5,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  fontFamily: 'Poppins_700Bold',
                  fontSize: 18,
                  color: isActive ? '#FFFFFF' : c.foreground,
                }}
              >
                {age}
              </Text>
            </MotiView>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
