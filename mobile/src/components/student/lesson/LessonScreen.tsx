import React, { useCallback, useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Platform } from 'react-native';
import { MotiView } from 'moti';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScreenWrapper, GradientButton } from '@/components/ui';
import { Mascot, MascotThinking } from '@/svg/illustrations';
import { MascotCelebration } from '@/components/student/shared';
import { ChevronLeft, ChevronRight, BookOpen, Brain, Lightbulb, CheckCircle } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useTheme, useLearning } from '@/context';
import { LEARNING_PATHS } from '@/constants/learning-paths';

interface LessonStep {
  title: string;
  content: string;
  tip?: string;
  icon: React.ReactNode;
}

/** Generate lesson content based on the lesson title */
function generateSteps(lessonTitle: string): LessonStep[] {
  return [
    {
      icon: <BookOpen size={36} color="#B9A7F8" strokeWidth={1.5} />,
      title: `Introduction to ${lessonTitle}`,
      content: `Welcome to "${lessonTitle}"! In this lesson, you'll learn important concepts that will help you make smarter decisions with money. Let's dive in!`,
      tip: "Take your time — there's no rush. Read each section carefully.",
    },
    {
      icon: <Brain size={36} color="#B9A7F8" strokeWidth={1.5} />,
      title: 'Key Concepts',
      content: `Every financial decision involves thinking about what you need now versus what you might need later. Understanding this balance is a core part of ${lessonTitle.toLowerCase()}.`,
      tip: 'Try to think of examples from your own life as you read.',
    },
    {
      icon: <Lightbulb size={36} color="#F59E0B" strokeWidth={1.5} />,
      title: 'Real World Example',
      content:
        'Imagine you receive £20 for your birthday. You could spend it all on sweets, save half and spend half, or save it all for something bigger. Each choice has different outcomes!',
    },
    {
      icon: <CheckCircle size={36} color="rgb(34, 197, 94)" strokeWidth={1.5} />,
      title: 'What You Learned',
      content: `Great job! You now understand the basics of ${lessonTitle.toLowerCase()}. Remember: small smart choices today lead to big results tomorrow. Keep going!`,
      tip: 'Review this lesson anytime from your learning path.',
    },
  ];
}

export function LessonScreen() {
  const { theme } = useTheme();
  const c = colors[theme];
  const router = useRouter();
  const params = useLocalSearchParams<{ lessonId: string; pathKey: string }>();
  const learning = useLearning();

  const path = LEARNING_PATHS.find((p) => p.key === params.pathKey) || LEARNING_PATHS[0];
  const lesson = path.lessons.find((l) => l.id === params.lessonId) || path.lessons[0];
  const steps = useMemo(() => generateSteps(lesson.title), [lesson.title]);

  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = useCallback(() => {
    if (isLastStep) {
      learning.completeLesson(lesson.id);
      setCompleted(true);
    } else {
      setCurrentStep((s) => s + 1);
    }
  }, [isLastStep, lesson.id, learning]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
    else router.back();
  }, [currentStep, router]);

  if (completed) {
    // Check if the whole path is now completed
    const pathDone = path.lessons.every((l) => learning.completedLessons.has(l.id));

    return (
      <ScreenWrapper topPadding={12} showDecoration={false}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 }}>
          <MascotCelebration size={140} showConfetti showHurray enableJump />
          <Text
            style={{
              fontFamily: 'Fredoka_700Bold',
              fontSize: 26,
              color: c.foreground,
              textAlign: 'center',
              marginTop: 20,
            }}
          >
            Lesson Complete!
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins_400Regular',
              fontSize: 14,
              color: c.mutedForeground,
              textAlign: 'center',
              marginTop: 8,
              lineHeight: 22,
            }}
          >
            {pathDone
              ? `Amazing! You've completed all of ${path.title}! The next path is now unlocked.`
              : `You finished "${lesson.title}"! Keep going to unlock the next lesson.`}
          </Text>
          <View style={{ width: '100%', marginTop: 24, gap: 12 }}>
            <GradientButton
              label={pathDone ? 'Back to Map' : 'Next Lesson'}
              variant="primary"
              onPress={() => {
                if (pathDone) {
                  router.replace('/(student)/(tabs)/map' as any);
                } else {
                  router.back();
                }
              }}
              showArrow
            />
            <GradientButton label="Back to Path" variant="ghost" onPress={() => router.back()} />
          </View>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper topPadding={12} showDecoration={false}>
      {/* Header */}
      <MotiView
        from={{ opacity: 0, translateY: -12 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'spring', damping: 16, stiffness: 130 }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 20,
            marginBottom: 8,
          }}
        >
          <TouchableOpacity
            onPress={handleBack}
            activeOpacity={0.7}
            style={{ position: 'absolute', left: 20, padding: 4 }}
          >
            <ChevronLeft size={24} color={c.foreground} strokeWidth={2.5} />
          </TouchableOpacity>
          <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 15, color: c.foreground }}>
            {lesson.title}
          </Text>
        </View>
      </MotiView>

      {/* Progress dots */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 6,
          marginBottom: 16,
          paddingHorizontal: 24,
        }}
      >
        {steps.map((_, i) => (
          <View
            key={i}
            style={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              backgroundColor: i <= currentStep ? path.color || '#B9A7F8' : c.border,
            }}
          />
        ))}
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        bounces
      >
        {/* Step card */}
        <MotiView
          key={`step-${currentStep}`}
          from={{ opacity: 0, translateX: 30 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 120 }}
        >
          <View
            style={{
              backgroundColor: theme === 'dark' ? c.card : '#FFFFFF',
              borderRadius: 24,
              padding: 24,
              borderWidth: 1,
              borderColor: theme === 'dark' ? c.border : '#F0EDF5',
              ...Platform.select({
                ios: {
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.06,
                  shadowRadius: 12,
                },
                android: { elevation: 2 },
              }),
            }}
          >
            <View style={{ alignItems: 'center', marginBottom: 12 }}>
              {step.icon}
            </View>
            <Text
              style={{
                fontFamily: 'Fredoka_700Bold',
                fontSize: 22,
                color: c.foreground,
                textAlign: 'center',
                marginBottom: 12,
              }}
            >
              {step.title}
            </Text>

            {/* Mascot thinking alongside content */}
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
              <MascotThinking size={44} />
              <Text
                style={{
                  flex: 1,
                  fontFamily: 'Poppins_400Regular',
                  fontSize: 14,
                  color: c.foreground,
                  lineHeight: 24,
                }}
              >
                {step.content}
              </Text>
            </View>
          </View>
        </MotiView>

        {/* Tip box */}
        {step.tip && (
          <MotiView
            key={`tip-${currentStep}`}
            from={{ opacity: 0, translateY: 12 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 400, delay: 200 }}
            style={{
              flexDirection: 'row',
              gap: 12,
              marginTop: 20,
              backgroundColor: theme === 'dark' ? c.muted : '#FFF8E8',
              borderRadius: 16,
              padding: 16,
              alignItems: 'flex-start',
            }}
          >
            <Mascot size={36} />
            <Text
              style={{
                flex: 1,
                fontFamily: 'Poppins_500Medium',
                fontSize: 13,
                color: c.foreground,
                lineHeight: 20,
              }}
            >
              {step.tip}
            </Text>
          </MotiView>
        )}
      </ScrollView>

      {/* Navigation */}
      <View style={{ flexDirection: 'row', gap: 12, paddingHorizontal: 24, paddingBottom: 8 }}>
        {currentStep > 0 && (
          <TouchableOpacity
            onPress={handleBack}
            activeOpacity={0.7}
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              paddingVertical: 14,
              borderRadius: 26,
              borderWidth: 2,
              borderColor: c.border,
            }}
          >
            <ChevronLeft size={18} color={c.mutedForeground} />
            <Text
              style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 15, color: c.mutedForeground }}
            >
              Back
            </Text>
          </TouchableOpacity>
        )}
        <View
          style={{
            flex: currentStep > 0 ? 1 : undefined,
            width: currentStep > 0 ? undefined : '100%',
          }}
        >
          <GradientButton
            label={isLastStep ? 'Complete Lesson' : 'Continue'}
            variant="primary"
            onPress={handleNext}
            showArrow={!isLastStep}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}
