import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import React, { useCallback, useState } from 'react';
import { ScrollView, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GradientButton, ScreenHeader, SelectionCard } from '@/components/ui';
import type { RoleType } from '@/constants/app';
import { useAuth } from '@/context';
import { StudentIllustration, TeacherIllustration } from '@/svg/illustrations';

const ROLES: { key: RoleType; title: string; subtitle: string; accent: string }[] = [
  {
    key: 'student',
    title: "I'm a Student",
    subtitle: 'Learn about money, budgeting, and saving through fun missions and challenges.',
    accent: '#4FC3F7',
  },
  {
    key: 'teacher',
    title: "I'm a Teacher",
    subtitle: 'Manage classes, assign content, track student progress, and create quizzes.',
    accent: '#8E7CFF',
  },
];

export default function RoleSelectRoute() {
  const router = useRouter();
  const { setRole } = useAuth();

  const [selected, setSelected] = useState<RoleType | null>(null);

  const handleContinue = useCallback(() => {
    if (!selected) return;

    setRole(selected);

    if (selected === 'student') {
      router.push('/(auth)/personalization' as any);
    } else {
      router.push('/(auth)/teacher-login' as any);
    }
  }, [selected, setRole, router]);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" />

      <View className="flex-1 justify-between px-6">
        {/* Header */}
        <ScreenHeader
          title="Who are you?"
          subtitle="Choose your role to get the right experience."
          onBack={() => router.back()}
        />

        {/* Role Cards */}
        <View className="flex-1 justify-center gap-4">
          {ROLES.map((role, index) => (
            <MotiView key={role.key}>
              <SelectionCard
                title={role.title}
                subtitle={role.subtitle}
                isSelected={selected === role.key}
                onPress={() => setSelected(role.key)}
                accentColor={role.accent}
                illustration={
                  role.key === 'student' ? (
                    <StudentIllustration size={60} />
                  ) : (
                    <TeacherIllustration size={60} />
                  )
                }
              />
            </MotiView>
          ))}
        </View>

        {/* Continue Button */}
        <MotiView className="pb-6">
          <GradientButton
            label="Continue"
            variant="gold"
            onPress={handleContinue}
            disabled={!selected}
            showArrow
          />
        </MotiView>
      </View>
    </SafeAreaView>
  );
}
