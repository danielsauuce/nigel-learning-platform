import React, { useCallback, useState } from 'react';
import { Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import { ScreenWrapper, GradientButton } from '@/components/ui';
import { MascotCelebration } from '@/components/student/shared';
import { MascotSad, MascotThinking } from '@/svg/illustrations';
import { ChevronLeft, CheckCircle, XCircle } from 'lucide-react-native';
import { useTheme } from '@/context';
import { colors } from '@/constants/colors';

interface QuizOption {
  key: string;
  text: string;
}
interface QuizQuestion {
  question: string;
  options: QuizOption[];
  correctKey: string;
  explanation: string;
}

const QUESTIONS: QuizQuestion[] = [
  {
    question: 'Which is the safest place to keep your savings?',
    options: [
      { key: 'a', text: 'Under your mattress' },
      { key: 'b', text: 'A bank savings account' },
      { key: 'c', text: "In your friend's wallet" },
      { key: 'd', text: 'In a jar in the kitchen' },
    ],
    correctKey: 'b',
    explanation: 'Banks protect your money with insurance and security, plus you earn interest!',
  },
  {
    question: 'What is interest on a savings account?',
    options: [
      { key: 'a', text: 'A fee the bank charges you' },
      { key: 'b', text: 'Money you pay to open the account' },
      { key: 'c', text: 'Money the bank pays you for saving' },
      { key: 'd', text: 'The minimum balance required' },
    ],
    correctKey: 'c',
    explanation: 'Interest is a reward — the bank pays you a percentage for holding your money.',
  },
  {
    question: 'If you put £100 in an account with 5% interest, how much after one year?',
    options: [
      { key: 'a', text: '£100' },
      { key: 'b', text: '£105' },
      { key: 'c', text: '£150' },
      { key: 'd', text: '£95' },
    ],
    correctKey: 'b',
    explanation: '5% of £100 is £5. So £100 + £5 = £105 after one year.',
  },
  {
    question: 'A text asks for your bank PIN. What should you do?',
    options: [
      { key: 'a', text: 'Reply with your PIN immediately' },
      { key: 'b', text: 'Ignore it and tell a trusted adult' },
      { key: 'c', text: 'Click the link to check if it is real' },
      { key: 'd', text: 'Share it only if the text looks official' },
    ],
    correctKey: 'b',
    explanation: 'Banks never ask for your PIN by text. Always tell a trusted adult.',
  },
];

const PASS_THRESHOLD = 3;

export function QuizScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const c = colors[theme];

  const [currentQ, setCurrentQ] = useState(0);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = QUESTIONS[currentQ];
  const isCorrect = selectedKey === question?.correctKey;
  const passed = score >= PASS_THRESHOLD;

  const handleSelect = useCallback(
    (key: string) => {
      if (answered) return;
      setSelectedKey(key);
      setAnswered(true);
      if (key === question.correctKey) setScore((prev) => prev + 1);
    },
    [answered, question],
  );

  const handleNext = useCallback(() => {
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ((prev) => prev + 1);
      setSelectedKey(null);
      setAnswered(false);
    } else {
      setFinished(true);
    }
  }, [currentQ]);

  const handleFinish = useCallback(() => {
    if (passed) {
      router.push('/(student)/lesson-passed' as any);
    } else {
      // Go back to lesson to review
      router.back();
    }
  }, [passed, router]);

  // ── Finished: Results ──
  if (finished) {
    return (
      <ScreenWrapper topPadding={16} showDecoration={false}>
        <View className="flex-1 items-center justify-center px-6">
          {passed ? (
            <MascotCelebration size={140} showConfetti showHurray enableJump />
          ) : (
            <MotiView
              from={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 12, stiffness: 100 }}
              style={{ alignItems: 'center' }}
            >
              <MascotSad size={120} />
            </MotiView>
          )}

          <MotiView
            from={{ opacity: 0, translateY: 16 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 500, delay: passed ? 1200 : 400 }}
            style={{ alignItems: 'center', marginTop: 16 }}
          >
            <Text className="mb-2 text-center font-fredoka text-3xl text-foreground">
              {passed ? 'Quiz Passed!' : 'Not Quite...'}
            </Text>
            <Text className="mb-2 text-center font-poppins-regular text-sm leading-5 text-muted-foreground">
              You scored {score}/{QUESTIONS.length}
              {passed
                ? '. Amazing work!'
                : `. You need ${PASS_THRESHOLD} to pass. Review the lesson and try again!`}
            </Text>
            <View
              className={`mt-3 rounded-full px-4 py-2 ${
                passed ? 'bg-success/10' : 'bg-destructive/10'
              }`}
            >
              <Text
                className={`font-poppins-bold text-sm ${
                  passed ? 'text-success' : 'text-destructive'
                }`}
              >
                {passed ? '✅ Pass' : '❌ Fail'}
              </Text>
            </View>
          </MotiView>
        </View>

        <View className="px-6 pt-2">
          <GradientButton
            label={passed ? 'Continue' : 'Review Lesson'}
            variant="purple"
            onPress={handleFinish}
            showArrow
          />
        </View>
      </ScreenWrapper>
    );
  }

  // ── Active Quiz ──
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
          <Text className="font-poppins-semibold text-sm text-foreground">Quiz</Text>
          <Text className="font-poppins-medium text-xs text-muted-foreground">
            {currentQ + 1}/{QUESTIONS.length}
          </Text>
        </View>

        {/* Progress dots */}
        <View className="mb-5 flex-row gap-1.5 px-5">
          {QUESTIONS.map((_, i) => (
            <MotiView
              key={i}
              animate={{
                backgroundColor: i < currentQ ? c.success : i === currentQ ? c.primary : c.border,
              }}
              transition={{ type: 'timing', duration: 250 }}
              className="h-1.5 flex-1 rounded-full"
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
          key={currentQ}
          from={{ opacity: 0, translateX: 20 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 120 }}
          className="px-6"
        >
          {/* Question text with mascot */}
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
            <MascotThinking size={50} />
            <Text className="mb-5 flex-1 font-fredoka text-xl leading-7 text-foreground">
              {question.question}
            </Text>
          </View>

          {/* Options */}
          <View className="gap-3">
            {question.options.map((opt, index) => {
              const isSelected = selectedKey === opt.key;
              const isThisCorrect = opt.key === question.correctKey;

              let borderClass = 'border-border';
              let bgClass = 'bg-card';
              if (answered && isThisCorrect) {
                borderClass = 'border-success';
                bgClass = 'bg-success/5';
              } else if (answered && isSelected && !isThisCorrect) {
                borderClass = 'border-destructive';
                bgClass = 'bg-destructive/5';
              } else if (isSelected && !answered) {
                borderClass = 'border-primary';
                bgClass = 'bg-primary/5';
              }

              return (
                <MotiView
                  key={opt.key}
                  from={{ opacity: 0, translateY: 10 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{
                    type: 'spring',
                    damping: 16,
                    stiffness: 130,
                    delay: 100 + index * 60,
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => handleSelect(opt.key)}
                    disabled={answered}
                  >
                    <View
                      className={`flex-row items-center gap-3 rounded-xl border p-4 ${borderClass} ${bgClass}`}
                      style={Platform.select({
                        ios: {
                          shadowColor: '#000',
                          shadowOffset: { width: 0, height: 1 },
                          shadowOpacity: 0.03,
                          shadowRadius: 3,
                        },
                        android: { elevation: 1 },
                      })}
                    >
                      {/* Letter circle */}
                      <View
                        className={`h-8 w-8 items-center justify-center rounded-full ${
                          answered && isThisCorrect
                            ? 'bg-success'
                            : answered && isSelected
                              ? 'bg-destructive'
                              : isSelected
                                ? 'bg-primary'
                                : 'bg-muted'
                        }`}
                      >
                        {answered && isThisCorrect ? (
                          <CheckCircle size={16} color="#FFFFFF" strokeWidth={2.5} />
                        ) : answered && isSelected ? (
                          <XCircle size={16} color="#FFFFFF" strokeWidth={2.5} />
                        ) : (
                          <Text
                            className={`font-poppins-bold text-xs ${
                              isSelected ? 'text-white' : 'text-muted-foreground'
                            }`}
                          >
                            {opt.key.toUpperCase()}
                          </Text>
                        )}
                      </View>

                      <Text className="flex-1 font-poppins-medium text-sm text-foreground">
                        {opt.text}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </MotiView>
              );
            })}
          </View>

          {/* Explanation after answering */}
          {answered && (
            <MotiView
              from={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'spring', damping: 16, stiffness: 120 }}
              className="mt-4"
            >
              <View
                className={`flex-row gap-2.5 rounded-xl border p-3.5 ${
                  isCorrect
                    ? 'border-success/15 bg-success/10'
                    : 'border-destructive/15 bg-destructive/10'
                }`}
              >
                <Text className="text-base">{isCorrect ? '✅' : '💡'}</Text>
                <Text className="flex-1 font-poppins-regular text-xs leading-4 text-muted-foreground">
                  {question.explanation}
                </Text>
              </View>
            </MotiView>
          )}
        </MotiView>
      </ScrollView>

      {/* Next button after answering */}
      {answered && (
        <MotiView
          from={{ opacity: 0, translateY: 16 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 120 }}
        >
          <View className="px-6 pt-2">
            <GradientButton
              label={currentQ < QUESTIONS.length - 1 ? 'Next Question' : 'See Results'}
              variant="purple"
              onPress={handleNext}
              showArrow
            />
          </View>
        </MotiView>
      )}
    </ScreenWrapper>
  );
}
