import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, StatusBar, Text, TouchableOpacity, View } from 'react-native';

import { StudentIllustration, TeacherIllustration } from '@/components/illustrations';
import { GoldButton } from '@/components/ui/gold-button';
import { ScreenBackground } from '@/components/ui/screen-background';
import type { RoleType } from '@/constants/app';
import { useAppFonts } from '@/hooks/use-app-fonts';
import { usePulse } from '@/hooks/use-animations';
import { SAFE_BOTTOM, SAFE_TOP } from '@/lib/safe-area';

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

  // Entrance animations — refs created at top level (not inside map)
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-20)).current;

  const card0Opacity = useRef(new Animated.Value(0)).current;
  const card0Slide = useRef(new Animated.Value(50)).current;
  const card1Opacity = useRef(new Animated.Value(0)).current;
  const card1Slide = useRef(new Animated.Value(50)).current;
  const cardAnims = [
    { opacity: card0Opacity, slide: card0Slide },
    { opacity: card1Opacity, slide: card1Slide },
  ];

  const footerOpacity = useRef(new Animated.Value(0)).current;
  const footerSlide = useRef(new Animated.Value(30)).current;

  const studentPulse = usePulse();
  const teacherPulse = usePulse();
  const pulseMap: Record<RoleType, ReturnType<typeof usePulse>> = {
    student: studentPulse,
    teacher: teacherPulse,
  };

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(headerOpacity, {
          toValue: 1,
          duration: 450,
          useNativeDriver: true,
        }),
        Animated.timing(headerSlide, {
          toValue: 0,
          duration: 450,
          useNativeDriver: true,
        }),
      ]),
      ...cardAnims.map(({ opacity, slide }) =>
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.spring(slide, {
            toValue: 0,
            friction: 6,
            tension: 50,
            useNativeDriver: true,
          }),
        ]),
      ),
      Animated.parallel([
        Animated.timing(footerOpacity, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(footerSlide, {
          toValue: 0,
          duration: 350,
          useNativeDriver: true,
        }),
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
    // TODO: route to next screen
    // router.push(selectedRole === 'student' ? '/(onboarding)/personalization' : '/(auth)/teacher-login');
  };

  if (!fontsLoaded) return null;

  return (
    <View className="flex-1 overflow-hidden">
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ScreenBackground />

      <View
        className="flex-1"
        style={{
          paddingTop: SAFE_TOP,
          paddingBottom: SAFE_BOTTOM,
          paddingHorizontal: 24,
        }}
      >
        {/* Header */}
        <Animated.View
          style={{
            marginBottom: 16,
            paddingHorizontal: 8,
            opacity: headerOpacity,
            transform: [{ translateY: headerSlide }],
          }}
        >
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
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleSelect(role.key)}
                  style={{ borderRadius: 20 }}
                >
                  <LinearGradient
                    colors={isSelected ? [...role.selectedGradient] : [...DEFAULT_GRADIENT]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderRadius: 20,
                      borderWidth: isSelected ? 2 : 1.5,
                      borderColor: isSelected ? role.accentColor : 'rgba(255,255,255,0.1)',
                      paddingVertical: 20,
                      paddingHorizontal: 16,
                      gap: 14,
                    }}
                  >
                    {/* Illustration */}
                    <View className="items-center justify-center" style={{ width: 90, height: 90 }}>
                      <role.Illustration />
                    </View>

                    {/* Text */}
                    <View className="flex-1">
                      <Text
                        className="font-fredoka text-[22px] text-white"
                        style={{ letterSpacing: -0.3 }}
                      >
                        {role.title}
                      </Text>
                      <Text
                        className="font-poppins-regular text-[13px] leading-[19px]"
                        style={{
                          color: 'rgba(255,255,255,0.6)',
                          marginTop: 4,
                        }}
                      >
                        {role.description}
                      </Text>
                    </View>

                    {/* Radio indicator */}
                    <View
                      className="items-center justify-center rounded-full"
                      style={{
                        width: 26,
                        height: 26,
                        borderWidth: 2,
                        borderColor: isSelected ? role.accentColor : 'rgba(255,255,255,0.2)',
                        backgroundColor: isSelected ? `${role.accentColor}26` : 'transparent',
                      }}
                    >
                      {isSelected && (
                        <View
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: 6,
                            backgroundColor: role.accentColor,
                          }}
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
          style={{
            paddingTop: 8,
            opacity: footerOpacity,
            transform: [{ translateY: footerSlide }],
          }}
        >
          <GoldButton label="Continue" onPress={handleContinue} disabled={!selectedRole} />
        </Animated.View>
      </View>
    </View>
  );
}
