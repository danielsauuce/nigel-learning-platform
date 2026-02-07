import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Platform, StatusBar, Text, TouchableOpacity, View } from 'react-native';

import { StudentIllustration, TeacherIllustration } from '@/components/ui/illustrations';
import { GoldButton } from '@/components/ui/gold-button';
import { ScreenBackground } from '@/components/ui/screen-background';
import type { RoleType } from '@/constants/app';
import { useAppFonts } from '@/hooks/use-app-fonts';
import { usePulse } from '@/hooks/use-animations';

// ─── Role card config ───────────────────────────────────────────────
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

export default function RoleSelectScreen() {
  const router = useRouter();
  const [fontsLoaded] = useAppFonts();
  const [selectedRole, setSelectedRole] = useState<RoleType | null>(null);

  // Entrance animations
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-20)).current;
  const cardAnims = ROLES.map(() => ({
    opacity: useRef(new Animated.Value(0)).current,
    slide: useRef(new Animated.Value(50)).current,
  }));
  const footerOpacity = useRef(new Animated.Value(0)).current;
  const footerSlide = useRef(new Animated.Value(30)).current;

  const studentPulse = usePulse();
  const teacherPulse = usePulse();
  const pulseMap = { student: studentPulse, teacher: teacherPulse };

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(headerOpacity, { toValue: 1, duration: 450, useNativeDriver: true }),
        Animated.timing(headerSlide, { toValue: 0, duration: 450, useNativeDriver: true }),
      ]),
      ...cardAnims.map(({ opacity, slide }) =>
        Animated.parallel([
          Animated.timing(opacity, { toValue: 1, duration: 400, useNativeDriver: true }),
          Animated.spring(slide, { toValue: 0, friction: 6, tension: 50, useNativeDriver: true }),
        ]),
      ),
      Animated.parallel([
        Animated.timing(footerOpacity, { toValue: 1, duration: 350, useNativeDriver: true }),
        Animated.timing(footerSlide, { toValue: 0, duration: 350, useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  const handleSelect = (role: RoleType) => {
    setSelectedRole(role);
    pulseMap[role].pulse();
    const otherRole: RoleType = role === 'student' ? 'teacher' : 'student';
    pulseMap[otherRole].reset();
  };

  const handleContinue = () => {
    if (!selectedRole) return;
    // router.push(selectedRole === 'student' ? '/(onboarding)/personalization' : '/(auth)/teacher-login');
  };

  if (!fontsLoaded) return null;

  return (
    <View className="flex-1 overflow-hidden">
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ScreenBackground />

      <View
        className="flex-1 px-6"
        style={{
          paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + 20 : 64,
          paddingBottom: Platform.OS === 'android' ? 24 : 40,
        }}
      >
        {/* Header */}
        <Animated.View
          className="mb-4 px-2"
          style={{ opacity: headerOpacity, transform: [{ translateY: headerSlide }] }}
        >
          <Text className="font-poppins-medium text-sm uppercase tracking-wide text-white/50">
            Choose your role
          </Text>
          <Text
            className="mt-1 font-fredoka text-[34px] leading-10 text-white"
            style={{ textShadowColor: 'rgba(0,0,0,0.2)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 6 }}
          >
            Who are you?
          </Text>
          <Text className="mt-1.5 font-poppins-regular text-sm text-white/55">
            Pick how you'll use Money Islands
          </Text>
        </Animated.View>

        {/* Role cards */}
        <View className="flex-1 justify-center gap-4">
          {ROLES.map((role, index) => {
            const isSelected = selectedRole === role.key;
            const anim = cardAnims[index];
            const pulse = pulseMap[role.key];

            return (
              <Animated.View
                key={role.key}
                style={{
                  opacity: anim.opacity,
                  transform: [{ translateY: anim.slide }, { scale: pulse.scale }],
                }}
              >
                <TouchableOpacity activeOpacity={0.8} onPress={() => handleSelect(role.key)} className="rounded-[20px]">
                  <LinearGradient
                    colors={isSelected ? [...role.selectedGradient] : [...DEFAULT_GRADIENT]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    className="flex-row items-center gap-3.5 rounded-[20px] border-[1.5px] px-4 py-5"
                    style={{ borderColor: isSelected ? role.accentColor : 'rgba(255,255,255,0.1)', borderWidth: isSelected ? 2 : 1.5 }}
                  >
                    {/* Illustration */}
                    <View className="h-[90px] w-[90px] items-center justify-center">
                      <role.Illustration />
                    </View>

                    {/* Text */}
                    <View className="flex-1">
                      <Text className="font-fredoka text-[22px] text-white" style={{ letterSpacing: -0.3 }}>
                        {role.title}
                      </Text>
                      <Text className="mt-1 font-poppins-regular text-[13px] leading-[19px] text-white/60">
                        {role.description}
                      </Text>
                    </View>

                    {/* Radio */}
                    <View
                      className="h-[26px] w-[26px] items-center justify-center rounded-full border-2"
                      style={{
                        borderColor: isSelected ? role.accentColor : 'rgba(255,255,255,0.2)',
                        backgroundColor: isSelected ? `${role.accentColor}26` : 'transparent',
                      }}
                    >
                      {isSelected && (
                        <View
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: role.accentColor }}
                        />
                      )}
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        {/* Continue */}
        <Animated.View
          className="pt-2"
          style={{ opacity: footerOpacity, transform: [{ translateY: footerSlide }] }}
        >
          <GoldButton
            label="Continue"
            onPress={handleContinue}
            disabled={!selectedRole}
          />
        </Animated.View>
      </View>
    </View>
  );
}