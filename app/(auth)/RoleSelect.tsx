import React, { useState } from 'react';
import { Animated, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

import { StudentIllustration, TeacherIllustration } from '@/components/illustrations';
import { GlassCard } from '@/components/ui/glass-card';
import { GoldButton } from '@/components/ui/gold-button';
import { RadioIndicator } from '@/components/ui/radio-indicator';
import { ScreenBackground } from '@/components/ui/screen-background';
import type { RoleType } from '@/constants/app';
import { useAppFonts } from '@/hooks/use-app-fonts';
import { usePulse } from '@/hooks/use-animations';
import { useStaggeredEntrance } from '@/hooks/use-staggered-entrance';
import { SAFE_BOTTOM, SAFE_TOP } from '@/lib/safe-area';

// ─── Role card configuration ────────────────────────────────────────

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

const DEFAULT_GRADIENT: [string, string] = ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.04)'];

// ─── Screen ─────────────────────────────────────────────────────────

export default function RoleSelectScreen() {
  const router = useRouter();
  const [fontsLoaded] = useAppFonts();
  const [selectedRole, setSelectedRole] = useState<RoleType | null>(null);

  // Entrance animations: header + 2 cards + footer = 4 stages
  const [header, card0, card1, footer] = useStaggeredEntrance([
    { fromY: -20, duration: 450 },
    { fromY: 50, spring: true, friction: 6, tension: 50 },
    { fromY: 50, spring: true, friction: 6, tension: 50 },
    { fromY: 30, duration: 350 },
  ]);

  const cardStages = [card0, card1];

  // Pulse animations for selection feedback
  const studentPulse = usePulse();
  const teacherPulse = usePulse();
  const pulseMap: Record<RoleType, ReturnType<typeof usePulse>> = {
    student: studentPulse,
    teacher: teacherPulse,
  };

  // ─── Handlers ───────────────────────────────────────────────────

  const handleSelect = (role: RoleType) => {
    setSelectedRole(role);
    pulseMap[role].pulse();

    const otherRole: RoleType = role === 'student' ? 'teacher' : 'student';
    pulseMap[otherRole].reset();
  };

  const handleContinue = () => {
    if (!selectedRole) return;
    // TODO: route to next screen based on role
    // router.push(selectedRole === 'student' ? '/(onboarding)/personalization' : '/(auth)/teacher-login');
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
        {/* Header */}
        <Animated.View style={{ marginBottom: 16, paddingHorizontal: 8, ...header.style }}>
          <Text
            className="font-poppins-medium text-sm uppercase"
            style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: 0.5 }}
          >
            Choose your role
          </Text>
          <Text
            className="font-fredoka text-[34px] leading-10 text-white"
            style={{
              marginTop: 4,
              textShadowColor: 'rgba(0,0,0,0.2)',
              textShadowOffset: { width: 0, height: 2 },
              textShadowRadius: 6,
            }}
          >
            Who are you?
          </Text>
          <Text
            className="font-poppins-regular text-sm"
            style={{ color: 'rgba(255,255,255,0.55)', marginTop: 6 }}
          >
            Pick how you'll use Money Islands
          </Text>
        </Animated.View>

        {/* Role cards */}
        <View className="flex-1 justify-center" style={{ gap: 16 }}>
          {ROLES.map((role, index) => {
            const isSelected = selectedRole === role.key;
            const stage = cardStages[index];
            const pulse = pulseMap[role.key];

            return (
              <Animated.View
                key={role.key}
                style={{
                  ...stage.style,
                  transform: [...(stage.style.transform || []), { scale: pulse.scale }],
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleSelect(role.key)}
                  style={{ borderRadius: 20 }}
                >
                  <GlassCard
                    colors={isSelected ? [...role.selectedGradient] : [...DEFAULT_GRADIENT]}
                    borderWidth={isSelected ? 2 : 1.5}
                    borderColor={isSelected ? role.accentColor : 'rgba(255,255,255,0.1)'}
                    borderRadius={20}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 20,
                      paddingHorizontal: 16,
                      gap: 14,
                    }}
                  >
                    {/* Illustration */}
                    <View className="items-center justify-center" style={{ width: 90, height: 90 }}>
                      <role.Illustration />
                    </View>

                    {/* Text content */}
                    <View className="flex-1">
                      <Text
                        className="font-fredoka text-[22px] text-white"
                        style={{ letterSpacing: -0.3 }}
                      >
                        {role.title}
                      </Text>
                      <Text
                        className="font-poppins-regular text-[13px] leading-[19px]"
                        style={{ color: 'rgba(255,255,255,0.6)', marginTop: 4 }}
                      >
                        {role.description}
                      </Text>
                    </View>

                    {/* Selection indicator */}
                    <RadioIndicator selected={isSelected} color={role.accentColor} />
                  </GlassCard>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        {/* Continue button */}
        <Animated.View style={{ paddingTop: 8, ...footer.style }}>
          <GoldButton label="Continue" onPress={handleContinue} disabled={!selectedRole} />
        </Animated.View>
      </View>
    </View>
  );
}
