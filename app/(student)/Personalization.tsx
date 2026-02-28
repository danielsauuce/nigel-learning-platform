import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, StatusBar, Text, View } from 'react-native';

import { CompassIcon, TargetIcon } from '@/components/illustrations';
import { GoldButton } from '@/components/ui/gold-button';
import { MiniProgressBar } from '@/components/ui/mini-progress-bar';
import {
  FloatingSparkle,
  GradientBackground,
  StarField,
  WaveDecoration,
} from '@/components/ui/screen-background';
import {
  DEFAULT_OPTION_COLORS,
  SelectableOptionCard,
  type SelectableOption,
} from '@/components/ui/selectable-option-card';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants/app';
import { useAppFonts } from '@/hooks/use-app-fonts';
import { SAFE_BOTTOM, SAFE_TOP } from '@/lib/safe-area';

// Questions data
interface Question {
  id: string;
  question: string;
  subtitle: string;
  options: SelectableOption[];
}

const QUESTIONS: Question[] = [
  {
    id: 'worry',
    question: 'What worries you most\nabout money right now?',
    subtitle: 'Pick the one that feels most like you',
    options: [
      { id: 'not-enough', emoji: '😟', label: 'Not having enough' },
      { id: 'understanding', emoji: '🤔', label: 'Not understanding it' },
      { id: 'spending', emoji: '💸', label: 'Spending too much' },
      { id: 'future', emoji: '🔮', label: "What happens when I'm older" },
    ],
  },
  {
    id: 'improve',
    question: 'What would you like\nto get better at?',
    subtitle: 'This helps us personalise your journey',
    options: [
      { id: 'saving', emoji: '🐷', label: 'Saving money' },
      { id: 'budgeting', emoji: '📊', label: 'Budgeting & planning' },
      { id: 'earning', emoji: '💰', label: 'Understanding earning' },
      { id: 'smart-spending', emoji: '🛒', label: 'Spending wisely' },
    ],
  },
];

const QUESTION_ICONS: Record<number, React.ComponentType> = {
  0: CompassIcon,
  1: TargetIcon,
};

export default function PersonalizationScreen() {
  const router = useRouter();
  const [fontsLoaded] = useAppFonts();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Section animations
  const headerAnim = useRef({
    opacity: new Animated.Value(0),
    slide: new Animated.Value(-20),
  }).current;
  const questionAnim = useRef({
    opacity: new Animated.Value(0),
    slide: new Animated.Value(30),
  }).current;
  const optionsAnim = useRef({
    opacity: new Animated.Value(0),
    slide: new Animated.Value(40),
  }).current;
  const footerAnim = useRef({
    opacity: new Animated.Value(0),
    slide: new Animated.Value(20),
  }).current;

  const runEntrance = () => {
    headerAnim.opacity.setValue(0);
    headerAnim.slide.setValue(-20);
    questionAnim.opacity.setValue(0);
    questionAnim.slide.setValue(30);
    optionsAnim.opacity.setValue(0);
    optionsAnim.slide.setValue(40);
    footerAnim.opacity.setValue(0);
    footerAnim.slide.setValue(20);

    const fadeSlide = (anim: { opacity: Animated.Value; slide: Animated.Value }, duration = 400) =>
      Animated.parallel([
        Animated.timing(anim.opacity, { toValue: 1, duration, useNativeDriver: true }),
        Animated.timing(anim.slide, { toValue: 0, duration, useNativeDriver: true }),
      ]);

    Animated.sequence([
      fadeSlide(headerAnim),
      fadeSlide(questionAnim),
      Animated.parallel([
        Animated.timing(optionsAnim.opacity, { toValue: 1, duration: 350, useNativeDriver: true }),
        Animated.spring(optionsAnim.slide, {
          toValue: 0,
          friction: 6,
          tension: 50,
          useNativeDriver: true,
        }),
      ]),
      fadeSlide(footerAnim, 300),
    ]).start();
  };

  useEffect(() => {
    runEntrance();
  }, []);

  const question = QUESTIONS[currentQuestion];
  const QuestionIcon = QUESTION_ICONS[currentQuestion];

  const handleContinue = () => {
    if (!selectedOption) return;

    const newAnswers = { ...answers, [question.id]: selectedOption };
    setAnswers(newAnswers);

    if (currentQuestion < QUESTIONS.length - 1) {
      Animated.parallel([
        Animated.timing(questionAnim.opacity, { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.timing(optionsAnim.opacity, { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.timing(questionAnim.slide, { toValue: -30, duration: 200, useNativeDriver: true }),
        Animated.timing(optionsAnim.slide, { toValue: -20, duration: 200, useNativeDriver: true }),
      ]).start(() => {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        runEntrance();
      });
    } else {
      // we can decide to store the answers in a database
      router.push('/(student)/PrivacyConsent');
    }
  };

  const animStyle = (anim: { opacity: Animated.Value; slide: Animated.Value }) => ({
    opacity: anim.opacity,
    transform: [{ translateY: anim.slide }],
  });

  if (!fontsLoaded) return null;

  return (
    <View className="flex-1 overflow-hidden">
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Background layers */}
      <GradientBackground />
      <StarField count={10} seed={91} />
      <FloatingSparkle
        delay={0}
        x={SCREEN_WIDTH * 0.05}
        y={SCREEN_HEIGHT * 0.1}
        size={6}
        color="#FFD700"
      />
      <FloatingSparkle
        delay={300}
        x={SCREEN_WIDTH * 0.9}
        y={SCREEN_HEIGHT * 0.07}
        size={5}
        color="#4FC3F7"
      />
      <FloatingSparkle
        delay={150}
        x={SCREEN_WIDTH * 0.78}
        y={SCREEN_HEIGHT * 0.24}
        size={4}
        color="#FF2E91"
      />
      <FloatingSparkle
        delay={450}
        x={SCREEN_WIDTH * 0.1}
        y={SCREEN_HEIGHT * 0.33}
        size={5}
        color="#10B981"
      />
      <WaveDecoration />

      {/* Content */}
      <View className="flex-1 px-6" style={{ paddingTop: SAFE_TOP, paddingBottom: SAFE_BOTTOM }}>
        {/* Progress header */}
        <Animated.View className="mb-3" style={animStyle(headerAnim)}>
          <Text
            className="mb-2 font-poppins-medium text-[13px] tracking-wide"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            Question {currentQuestion + 1} of {QUESTIONS.length}
          </Text>
          <MiniProgressBar
            progress={(currentQuestion + 1) / QUESTIONS.length}
            color="#FFD700"
            height={6}
          />
        </Animated.View>

        {/* Question + illustration */}
        <Animated.View className="mb-5 mt-2 items-center" style={animStyle(questionAnim)}>
          {QuestionIcon && (
            <View className="mb-4">
              <QuestionIcon />
            </View>
          )}

          <Text
            className="text-center font-fredoka text-[28px] leading-[34px] text-white"
            style={{
              letterSpacing: -0.5,
              textShadowColor: 'rgba(0,0,0,0.15)',
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 4,
            }}
          >
            {question.question}
          </Text>

          <Text
            className="mt-2 text-center font-poppins-regular text-sm tracking-wide"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            {question.subtitle}
          </Text>
        </Animated.View>

        {/* Options */}
        <Animated.View
          className="flex-1 justify-center"
          style={[animStyle(optionsAnim), { gap: 12 }]}
        >
          {question.options.map((option, index) => (
            <SelectableOptionCard
              key={option.id}
              option={option}
              colors={DEFAULT_OPTION_COLORS[index % DEFAULT_OPTION_COLORS.length]}
              isSelected={selectedOption === option.id}
              onPress={() => setSelectedOption(option.id)}
            />
          ))}
        </Animated.View>

        {/* Continue button */}
        <Animated.View className="pt-2" style={animStyle(footerAnim)}>
          <GoldButton
            label={currentQuestion < QUESTIONS.length - 1 ? 'Next' : 'Continue'}
            onPress={handleContinue}
            disabled={!selectedOption}
          />
        </Animated.View>
      </View>
    </View>
  );
}
