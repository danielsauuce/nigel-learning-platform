import React, { useCallback, useState } from 'react';
import { View, SafeAreaView, StatusBar } from 'react-native';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';

import { ScreenHeader, SelectionCard, GradientButton } from '@/components/ui';
import { useAuth } from '@/context';
import { StudentIllustration, TeacherIllustration } from '@/svg/illustrations';
import type { RoleType } from '@/constants/app';

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
            <MotiView
              key={role.key}
              from={{ opacity: 0, translateY: 24 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                type: 'spring',
                damping: 16,
                stiffness: 140,
                delay: 300 + index * 150,
              }}
            >
              <SelectionCard
                title={role.title}
                subtitle={role.subtitle}
                isSelected={selected === role.key}
                onPress={() => setSelected(role.key)}
                accentColor={role.accent}
                illustration={
                  role.key === 'student' ? (
                    <StudentIllustration size={90} />
                  ) : (
                    <TeacherIllustration size={90} />
                  )
                }
              />
            </MotiView>
          ))}
        </View>

        {/* Continue Button */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 450, delay: 700 }}
          className="pb-6"
        >
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
