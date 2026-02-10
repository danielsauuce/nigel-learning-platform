import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Animated, StatusBar, View } from 'react-native';

import { StudentIllustration, TeacherIllustration } from '@/components/illustrations';
import { RoleCard } from '@/components/role-cards';
import { RoleSelectHeader } from '@/components/role-select-header';
import { GoldButton } from '@/components/ui/gold-button';
import { ScreenBackground } from '@/components/ui/screen-background';
import type { RoleType } from '@/constants/app';
import { useAppFonts } from '@/hooks/use-app-fonts';
import { useStaggeredEntrance } from '@/hooks/use-staggered-entrance';
import { SAFE_BOTTOM, SAFE_TOP } from '@/lib/safe-area';

const ROLES = [
  {
    key: 'student' as RoleType,
    title: "I'm a Student",
    description: 'Learn about money through fun missions, quizzes, and a budgeting simulator',
    Illustration: StudentIllustration,
    accentColor: '#4FC3F7',
    selectedGradient: ['rgba(79,195,247,0.25)', 'rgba(79,195,247,0.08)'] as [string, string],
  },
  {
    key: 'teacher' as RoleType,
    title: "I'm a Teacher",
    description: 'Track student progress, create quizzes, and manage your class dashboard',
    Illustration: TeacherIllustration,
    accentColor: '#A855F7',
    selectedGradient: ['rgba(168,85,247,0.25)', 'rgba(168,85,247,0.08)'] as [string, string],
  },
] as const;

export default function RoleSelectScreen() {
  const router = useRouter();
  const [fontsLoaded] = useAppFonts();
  const [selectedRole, setSelectedRole] = useState<RoleType | null>(null);

  // Entrance animations
  const [header, card0, card1, footer] = useStaggeredEntrance([
    { fromY: -20, duration: 450 },
    { fromY: 50, spring: true, friction: 6, tension: 50 },
    { fromY: 50, spring: true, friction: 6, tension: 50 },
    { fromY: 30, duration: 350 },
  ]);

  const cardStages = [card0, card1];

  const handleSelect = (role: RoleType) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (!selectedRole) return;
    router.push(
      selectedRole === 'student' ? '/(student)/Personalization' : '/(auth)/teacher-login',
    );
    // router.push('/(student)/Personalization')
  };

  if (!fontsLoaded) return null;

  return (
    <View className="flex-1 overflow-hidden">
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ScreenBackground />

      <View
        className="flex-1"
        style={{ paddingTop: SAFE_TOP, paddingBottom: SAFE_BOTTOM, paddingHorizontal: 24 }}
      >
        <RoleSelectHeader animatedStyle={header.style} />

        <View className="flex-1 justify-center" style={{ gap: 16 }}>
          {ROLES.map((role, index) => (
            <RoleCard
              key={role.key}
              role={role}
              isSelected={selectedRole === role.key}
              animatedStyle={cardStages[index].style}
              onSelect={handleSelect}
            />
          ))}
        </View>

        <Animated.View style={{ paddingTop: 8, ...footer.style }}>
          <GoldButton label="Continue" onPress={handleContinue} disabled={!selectedRole} />
        </Animated.View>
      </View>
    </View>
  );
}
