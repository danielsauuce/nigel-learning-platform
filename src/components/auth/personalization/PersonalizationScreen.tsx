import React, { useCallback, useRef, useState } from 'react';
import { Animated, ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/ui';
import { useAuth } from '@/context';
import { PERSONALIZATION_STEPS } from '@/constants/app';
import { PersonalizationHeader } from './PersonalizationHeader';
import { PersonalizationMascot } from './PersonalizationMascot';
import { PersonalizationQuestion } from './PersonalizationQuestion';
import { PrivacyCheckbox } from './PrivacyCheckbox';
import { PersonalizationFooter } from './PersonalizationFooter';

const TOTAL_STEPS = 3;

export function PersonalizationScreen() {
  const router = useRouter();
  const { completeOnboarding, acceptPrivacy } = useAuth();

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>([null, null]);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const animateTransition = useCallback(
    (nextStep: number) => {
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 0, duration: 180, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 280, useNativeDriver: true }),
      ]).start();
      setTimeout(() => setCurrentStep(nextStep), 190);
    },
    [fadeAnim],
  );

  const handleSelectAnswer = useCallback(
    (key: string) => {
      setAnswers((prev) => {
        const next = [...prev];
        next[currentStep] = key;
        return next;
      });
    },
    [currentStep],
  );

  const handleContinue = useCallback(() => {
    if (currentStep < PERSONALIZATION_STEPS.length - 1) {
      animateTransition(currentStep + 1);
    } else if (currentStep === PERSONALIZATION_STEPS.length - 1) {
      animateTransition(TOTAL_STEPS - 1);
    }
  }, [currentStep, animateTransition]);

  const handleFinish = useCallback(() => {
    acceptPrivacy();
    completeOnboarding();
    router.replace('/(auth)/student-setup' as any);
  }, [acceptPrivacy, completeOnboarding, router]);

  const handleBack = useCallback(() => {
    if (currentStep === 0) {
      router.back();
    } else {
      animateTransition(currentStep - 1);
    }
  }, [currentStep, router, animateTransition]);

  const isQuestionStep = currentStep < PERSONALIZATION_STEPS.length;
  const stepData = isQuestionStep ? PERSONALIZATION_STEPS[currentStep] : null;
  const selectedAnswer = isQuestionStep ? answers[currentStep] : null;
  const isLastQuestion = currentStep === PERSONALIZATION_STEPS.length - 1;

  const canContinue = isQuestionStep
    ? selectedAnswer !== null && (isLastQuestion ? privacyAccepted : true)
    : privacyAccepted;

  return (
    <ScreenWrapper topPadding={12}>
      <PersonalizationHeader
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
        onBack={handleBack}
      />

      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerClassName="pb-8"
        >
          {isQuestionStep && stepData ? (
            <>
              <PersonalizationMascot speechText={stepData.mascotText} />

              <PersonalizationQuestion
                data={stepData}
                selectedAnswer={selectedAnswer}
                onSelectAnswer={handleSelectAnswer}
              />

              {isLastQuestion && (
                <View className="mt-5 px-6">
                  <PrivacyCheckbox
                    checked={privacyAccepted}
                    onToggle={() => setPrivacyAccepted((prev) => !prev)}
                  />
                </View>
              )}
            </>
          ) : (
            <View className="px-6 pt-10">
              <PrivacyCheckbox
                checked={privacyAccepted}
                onToggle={() => setPrivacyAccepted((prev) => !prev)}
              />
            </View>
          )}
        </ScrollView>
      </Animated.View>

      <PersonalizationFooter
        onPress={isLastQuestion ? handleFinish : handleContinue}
        disabled={!canContinue}
      />
    </ScreenWrapper>
  );
}
