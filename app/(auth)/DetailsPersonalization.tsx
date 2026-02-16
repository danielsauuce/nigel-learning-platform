import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import { FloatingCoin } from '@/components/illustrations';
import { AgeRangeCard, type AgeRange } from '@/components/AgeRangeCard';
import { GoldButton } from '@/components/ui/gold-button';
import { GradientBackground, StarField, WaveDecoration } from '@/components/ui/screen-background';
import { StepProgressBar } from '@/components/StepProgressBar';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants/app';
import { useAppFonts } from '@/hooks/use-app-fonts';
import { useStaggeredEntrance } from '@/hooks/use-staggered-entrance';
import { SAFE_BOTTOM, SAFE_TOP } from '@/lib/safe-area';

// Constants
const AGE_RANGES: AgeRange[] = [
  { id: '11-12', label: '11–12', emoji: '🌱', subtitle: 'Just starting out' },
  { id: '13-14', label: '13–14', emoji: '🌿', subtitle: 'Growing strong' },
  { id: '15-16', label: '15–16', emoji: '🌳', subtitle: 'Ready to level up' },
];

const COIN_POSITIONS = [
  { delay: 0, startX: SCREEN_WIDTH * 0.06, startY: SCREEN_HEIGHT * 0.05, size: 24, opacity: 0.45 },
  { delay: 300, startX: SCREEN_WIDTH * 0.82, startY: SCREEN_HEIGHT * 0.08, size: 20, opacity: 0.4 },
  { delay: 500, startX: SCREEN_WIDTH * 0.7, startY: SCREEN_HEIGHT * 0.02, size: 18, opacity: 0.3 },
] as const;

export default function PersonalizationScreen() {
  const router = useRouter();
  const [fontsLoaded] = useAppFonts();
  const [name, setName] = useState('');
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [nameIsFocused, setNameIsFocused] = useState(false);

  // Entrance animations
  const [progress, header, nameField, ageSection, cta] = useStaggeredEntrance([
    { fromY: 15, duration: 400 },
    { fromY: 20, duration: 500 },
    { fromY: 25, duration: 450 },
    { fromY: 25, duration: 450 },
    { fromY: 30, duration: 400 },
  ]);

  // Age card bounce animations on click
  const ageScales = useRef(AGE_RANGES.map(() => new Animated.Value(1))).current;

  const handleAgeSelect = (id: string, index: number) => {
    setSelectedAge(id);
    Animated.sequence([
      Animated.timing(ageScales[index], {
        toValue: 0.93,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(ageScales[index], {
        toValue: 1,
        friction: 4,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const isFormValid = name.trim().length >= 2 && selectedAge !== null;

  const handleContinue = () => {
    if (!isFormValid) return;
    router.push('/(student)/PrivacyConsent');
  };

  if (!fontsLoaded) return null;

  return (
    <View className="flex-1 overflow-hidden">
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <GradientBackground />
      <StarField count={8} seed={113} />
      {COIN_POSITIONS.map((coin) => (
        <FloatingCoin key={coin.delay} {...coin} />
      ))}
      <WaveDecoration />

      {/* Content */}
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          className="z-[1] flex-1"
          contentContainerStyle={{
            flexGrow: 1,
            paddingTop: SAFE_TOP,
            paddingBottom: SAFE_BOTTOM + 20,
            paddingHorizontal: 24,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Step progress */}
          <Animated.View className="mb-8" style={progress.style}>
            <StepProgressBar totalSteps={3} currentStep={0} />
          </Animated.View>

          {/* Header */}
          <Animated.View style={header.style}>
            <Text
              className="font-fredoka text-[32px] text-white"
              style={{
                letterSpacing: -0.5,
                textShadowColor: 'rgba(0, 0, 0, 0.2)',
                textShadowOffset: { width: 0, height: 2 },
                textShadowRadius: 6,
              }}
            >
              Hey there, explorer! 👋
            </Text>

            <Text
              className="mt-2 font-poppins-regular text-base leading-6 tracking-wide"
              style={{ color: 'rgba(255, 255, 255, 0.65)' }}
            >
              Let's get to know you before{'\n'}we set sail
            </Text>
          </Animated.View>

          {/* Name input */}
          <Animated.View className="mt-8" style={nameField.style}>
            <Text
              className="mb-3 ml-1 font-poppins-semibold text-[15px] tracking-wide"
              style={{ color: 'rgba(255, 255, 255, 0.85)' }}
            >
              What should we call you?
            </Text>

            <View
              className="h-14 flex-row items-center rounded-2xl px-4"
              style={[
                {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  borderWidth: 1.5,
                  borderColor: 'rgba(255, 255, 255, 0.12)',
                },
                nameIsFocused && {
                  borderColor: 'rgba(255, 215, 0, 0.5)',
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                },
              ]}
            >
              <Text className="mr-3 text-xl">🏝️</Text>
              <TextInput
                className="h-full flex-1 font-poppins-medium text-base tracking-wide text-white"
                placeholder="Your first name or nickname"
                placeholderTextColor="rgba(255, 255, 255, 0.35)"
                value={name}
                onChangeText={setName}
                onFocus={() => setNameIsFocused(true)}
                onBlur={() => setNameIsFocused(false)}
                maxLength={20}
                autoCapitalize="words"
                autoCorrect={false}
                returnKeyType="done"
              />
            </View>

            <Text
              className="ml-1 mt-2 font-poppins-regular text-xs tracking-wide"
              style={{ color: 'rgba(255, 255, 255, 0.35)' }}
            >
              This is just a nickname, no personal data stored
            </Text>
          </Animated.View>

          {/* Age range selection */}
          <Animated.View className="mt-8" style={ageSection.style}>
            <Text
              className="mb-3 ml-1 font-poppins-semibold text-[15px] tracking-wide"
              style={{ color: 'rgba(255, 255, 255, 0.85)' }}
            >
              How old are you?
            </Text>

            <View className="flex-row" style={{ gap: 12 }}>
              {AGE_RANGES.map((range, index) => (
                <AgeRangeCard
                  key={range.id}
                  range={range}
                  isSelected={selectedAge === range.id}
                  scale={ageScales[index]}
                  onPress={() => handleAgeSelect(range.id, index)}
                />
              ))}
            </View>
          </Animated.View>
          <Animated.View className="mt-10 items-center" style={cta.style}>
            <GoldButton label="Continue" onPress={handleContinue} disabled={!isFormValid} />

            {isFormValid && (
              <Text
                className="mt-3.5 font-poppins-regular text-[13px] tracking-wide"
                style={{ color: 'rgba(255, 215, 0, 0.6)' }}
              >
                All set, {name.trim()}! Let's go 🚀
              </Text>
            )}
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
