import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { MotiView } from 'moti';
import { User } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';
import { AgePicker } from './AgePicker';
import { StudentIdPreview } from './StudentIdPreview';

interface StudentSetupFormProps {
  firstName: string;
  onFirstNameChange: (text: string) => void;
  age: number | null;
  onAgeChange: (age: number) => void;
  studentId: string;
  showPreview: boolean;
}

export function StudentSetupForm({
  firstName,
  onFirstNameChange,
  age,
  onAgeChange,
  studentId,
  showPreview,
}: StudentSetupFormProps) {
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <View style={{ paddingHorizontal: 24, gap: 22 }}>
      {/* First Name */}
      <MotiView
        from={{ opacity: 0, translateX: -14 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ type: 'spring', damping: 16, stiffness: 140, delay: 200 }}
      >
        <Text
          style={{
            fontFamily: 'Poppins_600SemiBold',
            fontSize: 14,
            color: c.foreground,
            marginBottom: 8,
          }}
        >
          What's your first name?
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1.5,
            borderRadius: 14,
            borderColor: c.border,
            backgroundColor: c.card,
            paddingHorizontal: 14,
            height: 52,
            gap: 10,
          }}
        >
          <User size={18} color={c.mutedForeground} strokeWidth={2} style={{ opacity: 0.5 }} />
          <TextInput
            value={firstName}
            onChangeText={onFirstNameChange}
            placeholder="e.g. Alex"
            placeholderTextColor={c.mutedForeground}
            autoCapitalize="words"
            autoCorrect={false}
            maxLength={20}
            style={{
              flex: 1,
              fontFamily: 'Poppins_400Regular',
              fontSize: 15,
              color: c.foreground,
              paddingVertical: 0,
            }}
          />
        </View>
      </MotiView>

      {/* Age */}
      <MotiView
        from={{ opacity: 0, translateX: -14 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ type: 'spring', damping: 16, stiffness: 140, delay: 280 }}
      >
        <Text
          style={{
            fontFamily: 'Poppins_600SemiBold',
            fontSize: 14,
            color: c.foreground,
            marginBottom: 8,
          }}
        >
          How old are you?
        </Text>
        <AgePicker selectedAge={age} onSelect={onAgeChange} />
      </MotiView>

      {/* Student ID Preview */}
      <StudentIdPreview name={firstName} studentId={studentId} visible={showPreview} />
    </View>
  );
}
