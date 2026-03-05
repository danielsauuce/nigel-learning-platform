import React, { useCallback, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import { ScreenWrapper, GradientButton } from '@/components/ui';
import { ChevronLeft, ChevronRight, Lightbulb, BookOpen } from 'lucide-react-native';

interface LessonStep {
  title: string;
  content: string;
  tip?: string;
  emoji: string;
}

const LESSON_STEPS: LessonStep[] = [
  {
    emoji: '🏦',
    title: 'Where Can You Keep Money?',
    content:
      'There are several places to keep your money safe. The most common are piggy banks, savings accounts at a bank, and digital wallets. Each has different benefits!',
    tip: 'A bank account is safer than keeping cash at home because banks protect your money.',
  },
  {
    emoji: '💳',
    title: 'Savings Accounts',
    content:
      "A savings account is a special bank account where you put money you don't need right now. The bank pays you a small amount called interest for keeping your money there.",
    tip: 'Even £5 per month in a savings account adds up to £60 in a year — plus interest!',
  },
  {
    emoji: '📈',
    title: 'Why Interest Matters',
    content:
      "Interest is like a reward for saving. If you put £100 in a savings account with 5% interest, after one year you'll have £105. The bank paid you £5 just for saving!",
  },
  {
    emoji: '🔐',
    title: 'Keeping Money Safe',
    content:
      'Never share your bank details or PIN with anyone. If someone asks for your account information online, tell a trusted adult. Scammers try to trick people into giving away money.',
    tip: 'A real bank will never ask for your full password in an email or text message.',
  },
];

export function LessonScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const isLastStep = currentStep === LESSON_STEPS.length - 1;
  const step = LESSON_STEPS[currentStep];

  const handleNext = useCallback(() => {
    if (isLastStep) {
      router.push('/(student)/quiz' as any);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  }, [isLastStep, router]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  }, [currentStep]);

  return (
    <ScreenWrapper topPadding={12} showDecoration={false}>
      {/* Header */}
      <MotiView
        from={{ opacity: 0, translateY: -12 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'spring', damping: 16, stiffness: 130 }}
      >
        <View className="mb-2 flex-row items-center justify-between px-5">
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7} className="p-1">
            <ChevronLeft size={24} className="text-foreground" strokeWidth={2.5} />
          </TouchableOpacity>
          <View className="flex-row items-center gap-1.5">
            <BookOpen size={14} color="rgb(108, 92, 231)" strokeWidth={2} />
            <Text className="font-poppins-semibold text-sm text-foreground">Lesson</Text>
          </View>
          <Text className="font-poppins-medium text-xs text-muted-foreground">
            {currentStep + 1}/{LESSON_STEPS.length}
          </Text>
        </View>

        {/* Step progress */}
        <View className="mb-4 flex-row gap-1.5 px-5">
          {LESSON_STEPS.map((_, i) => (
            <MotiView
              key={i}
              animate={{
                backgroundColor: i <= currentStep ? 'rgb(108, 92, 231)' : 'rgb(229, 231, 235)',
              }}
              transition={{ type: 'timing', duration: 250 }}
              className="h-1 flex-1 rounded-full"
            />
          ))}
        </View>
      </MotiView>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        bounces
      >
        <MotiView
          key={currentStep}
          from={{ opacity: 0, translateX: 30 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 120 }}
          className="px-6"
        >
          {/* Emoji hero */}
          <View className="mb-5 items-center">
            <MotiView
              from={{ scale: 0.7, rotateZ: '-8deg' }}
              animate={{ scale: 1, rotateZ: '0deg' }}
              transition={{ type: 'spring', damping: 12, stiffness: 110, delay: 100 }}
              className="h-20 w-20 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/5"
            >
              <Text className="text-4xl">{step.emoji}</Text>
            </MotiView>
          </View>

          <Text className="mb-4 text-center font-fredoka text-2xl text-foreground">
            {step.title}
          </Text>

          <View className="mb-4 rounded-2xl border border-border bg-card p-5">
            <Text className="font-poppins-regular text-sm leading-6 text-foreground">
              {step.content}
            </Text>
          </View>

          {step.tip && (
            <MotiView
              from={{ opacity: 0, translateY: 8 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 200 }}
            >
              <View className="flex-row gap-2.5 rounded-xl border border-warning/20 bg-warning/10 p-3.5 dark:bg-warning/5">
                <Lightbulb size={18} color="rgb(245, 158, 11)" strokeWidth={2} />
                <Text className="flex-1 font-poppins-medium text-xs leading-4 text-muted-foreground">
                  {step.tip}
                </Text>
              </View>
            </MotiView>
          )}
        </MotiView>
      </ScrollView>

      {/* Footer nav */}
      <MotiView
        from={{ opacity: 0, translateY: 16 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 300 }}
      >
        <View className="flex-row gap-3 px-6 pt-2">
          {currentStep > 0 && (
            <TouchableOpacity
              onPress={handlePrev}
              activeOpacity={0.7}
              className="h-12 w-12 items-center justify-center rounded-xl border border-border bg-card"
            >
              <ChevronLeft size={20} className="text-foreground" strokeWidth={2.5} />
            </TouchableOpacity>
          )}
          <View className="flex-1">
            <GradientButton
              label={isLastStep ? 'Take the Quiz' : 'Next'}
              variant="purple"
              onPress={handleNext}
              showArrow
            />
          </View>
        </View>
      </MotiView>
    </ScreenWrapper>
  );
}
