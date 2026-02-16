import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Animated, ScrollView, StatusBar, Text, View } from 'react-native';
import { ShieldIcon } from '@/components/illustrations/ShieldIcon';
import { ConsentCard, type ConsentItem } from '@/components/ui/consent-card';
import { GoldButton } from '@/components/ui/gold-button';
import {
  FloatingSparkle,
  GradientBackground,
  StarField,
  WaveDecoration,
} from '@/components/ui/screen-background';
import { StepProgressBar } from '@/components/StepProgressBar';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants/app';
import { useAppFonts } from '@/hooks/use-app-fonts';
import { useStaggeredEntrance } from '@/hooks/use-staggered-entrance';
import { SAFE_BOTTOM, SAFE_TOP } from '@/lib/safe-area';

const CONSENT_ITEMS: ConsentItem[] = [
  {
    id: 'data-use',
    emoji: '📊',
    title: 'How we use your info',
    description:
      'We only save your nickname, progress, and quiz scores. Nothing personal like your real name or address.',
    required: true,
  },
  {
    id: 'no-real-money',
    emoji: '🔒',
    title: 'No real money involved',
    description:
      'Everything in Money Islands uses pretend money. We never ask for bank details or real payments.',
    required: true,
  },
  {
    id: 'teacher-visibility',
    emoji: '👩‍🏫',
    title: 'Your teacher can see progress',
    description:
      "Your teacher can view which missions you've completed and your quiz scores to help support your learning.",
    required: true,
  },
  {
    id: 'family-sharing',
    emoji: '👨‍👩‍👧',
    title: 'Family sharing is your choice',
    description:
      "You can choose to share a summary of your achievements with family. You're always in control and can stop sharing at any time.",
    required: false,
  },
];

const ACCENT_COLORS = ['#4FC3F7', '#10B981', '#A855F7', '#FFD700'];

export default function PrivacyConsentScreen() {
  const router = useRouter();
  const [fontsLoaded] = useAppFonts();

  const [consents, setConsents] = useState<Record<string, boolean>>({
    'data-use': false,
    'no-real-money': false,
    'teacher-visibility': false,
    'family-sharing': false,
  });

  // Entrance animations
  const [header, shield, list, footer] = useStaggeredEntrance([
    { fromY: -20, duration: 400 },
    { fromScale: 0.5, spring: true, friction: 4, tension: 60 },
    { fromY: 40, spring: true, friction: 6, tension: 50 },
    { fromY: 20, duration: 300 },
  ]);

  // Handlers
  const toggleConsent = (id: string) => {
    setConsents((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const allRequiredAccepted = CONSENT_ITEMS.filter((c) => c.required).every((c) => consents[c.id]);

  const handleAgree = () => {
    if (!allRequiredAccepted) return;
    router.replace('/(student)/(tabs)/Dashboard');
  };

  if (!fontsLoaded) return null;

  return (
    <View className="flex-1 overflow-hidden">
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Background layers */}
      <GradientBackground />
      <StarField count={10} seed={87} />
      <FloatingSparkle
        delay={0}
        x={SCREEN_WIDTH * 0.06}
        y={SCREEN_HEIGHT * 0.09}
        size={6}
        color="#4FC3F7"
      />
      <FloatingSparkle
        delay={300}
        x={SCREEN_WIDTH * 0.88}
        y={SCREEN_HEIGHT * 0.06}
        size={5}
        color="#FFD700"
      />
      <FloatingSparkle
        delay={150}
        x={SCREEN_WIDTH * 0.8}
        y={SCREEN_HEIGHT * 0.22}
        size={4}
        color="#10B981"
      />
      <FloatingSparkle
        delay={450}
        x={SCREEN_WIDTH * 0.08}
        y={SCREEN_HEIGHT * 0.3}
        size={5}
        color="#FF2E91"
      />
      <WaveDecoration />

      <View className="flex-1 px-6" style={{ paddingTop: SAFE_TOP, paddingBottom: SAFE_BOTTOM }}>
        {/* Step progress */}
        <Animated.View className="mb-2" style={header.style}>
          <StepProgressBar totalSteps={3} currentStep={1} />
        </Animated.View>

        {/* Header */}
        <Animated.View className="mb-2" style={header.style}>
          <Text
            className="font-poppins-medium text-sm uppercase tracking-wide"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            Almost there!
          </Text>

          <Text
            className="mt-1 font-fredoka text-[30px] leading-9 text-white"
            style={{
              textShadowColor: 'rgba(0,0,0,0.2)',
              textShadowOffset: { width: 0, height: 2 },
              textShadowRadius: 6,
            }}
          >
            Your Privacy Matters
          </Text>
        </Animated.View>

        {/* Shield illustration */}
        <Animated.View className="mb-3 items-center" style={shield.style}>
          <ShieldIcon />
          <Text
            className="mt-2.5 text-center font-poppins-regular leading-5"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            Money Islands is a safe space.{'\n'}Here's what you need to know:
          </Text>
        </Animated.View>

        {/* Consent list */}
        <Animated.View className="flex-1" style={list.style}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ gap: 10, paddingBottom: 8 }}
          >
            {CONSENT_ITEMS.map((item, index) => (
              <ConsentCard
                key={item.id}
                item={item}
                isChecked={consents[item.id]}
                accentColor={ACCENT_COLORS[index % ACCENT_COLORS.length]}
                onToggle={() => toggleConsent(item.id)}
              />
            ))}
          </ScrollView>
        </Animated.View>

        <Animated.View className="pt-2" style={footer.style}>
          <GoldButton
            label="I Agree, Let's Go! 🏝️"
            onPress={handleAgree}
            disabled={!allRequiredAccepted}
            showArrow={false}
          />

          <Text
            className="mt-3 text-center font-poppins-regular text-xs tracking-wide"
            style={{ color: 'rgba(255,255,255,0.35)' }}
          >
            You can change these choices any time in Settings.
          </Text>
        </Animated.View>
      </View>
    </View>
  );
}
