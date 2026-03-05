import React, { useCallback, useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import { ScreenWrapper, GradientButton } from '@/components/ui';
import { useAuth, useTheme } from '@/context';
import { colors } from '@/constants/colors';
import { StudentSetupHeader } from './StudentSetupHeader';
import { StudentSetupMascot } from './StudentSetupMascot';
import { StudentSetupForm } from './StudentSetupForm';

function generateStudentId(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `STU-${num}`;
}

export function StudentSetupScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { completeOnboarding } = useAuth();
  const c = colors[theme];

  const [firstName, setFirstName] = useState('');
  const [age, setAge] = useState<number | null>(null);

  const studentId = useMemo(() => generateStudentId(), []);

  const isFormComplete = firstName.trim().length >= 2 && age !== null;
  const showPreview = firstName.trim().length >= 2 && age !== null;

  const handleContinue = useCallback(() => {
    if (!isFormComplete) return;
    completeOnboarding();
    router.replace('/(student)' as any);
  }, [isFormComplete, completeOnboarding, router]);

  return (
    <ScreenWrapper topPadding={12}>
      <StudentSetupHeader onBack={() => router.back()} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={10}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
          bounces={false}
          keyboardShouldPersistTaps="handled"
        >
          <StudentSetupMascot />

          {/* Title */}
          <MotiView
            from={{ opacity: 0, translateY: 12 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 150 }}
            style={{ paddingHorizontal: 24, alignItems: 'center', marginBottom: 28 }}
          >
            <Text
              style={{
                fontFamily: 'Fredoka_700Bold',
                fontSize: 26,
                color: c.foreground,
                textAlign: 'center',
                marginBottom: 8,
              }}
            >
              Let's Get You Set Up
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins_400Regular',
                fontSize: 14,
                color: c.mutedForeground,
                textAlign: 'center',
                lineHeight: 22,
              }}
            >
              Just your name and age — that's all we need to get started!
            </Text>
          </MotiView>

          <StudentSetupForm
            firstName={firstName}
            onFirstNameChange={setFirstName}
            age={age}
            onAgeChange={setAge}
            studentId={studentId}
            showPreview={showPreview}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Footer */}
      <MotiView
        from={{ opacity: 0, translateY: 16 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 450 }}
        style={{ paddingHorizontal: 24, paddingTop: 8 }}
      >
        <GradientButton
          label="Let's Go!"
          variant="purple"
          onPress={handleContinue}
          disabled={!isFormComplete}
          showArrow
        />
      </MotiView>
    </ScreenWrapper>
  );
}
