import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import { ScreenWrapper, GradientButton } from '@/components/ui';
import { MascotCelebration } from '@/components/student/shared';
import { MascotWaving, MascotThinking } from '@/svg/illustrations';
import { ChevronLeft, Clock, Zap, CheckCircle, XCircle, Trophy } from 'lucide-react-native';
import { useTheme } from '@/context';
import { colors } from '@/constants/colors';

// ── Challenge data ──
interface ChallengeStep {
  type: 'info' | 'quiz' | 'input';
  title: string;
  content: string;
  // quiz fields
  options?: { key: string; text: string }[];
  correctKey?: string;
  // input fields
  correctAnswer?: string;
  placeholder?: string;
  explanation?: string;
}

const CHALLENGE_STEPS: ChallengeStep[] = [
  {
    type: 'info',
    title: 'The Scenario',
    content:
      "You invest £100 in a savings account that earns 10% compound interest per year. The bank adds interest to your balance, and next year you earn interest on the NEW total. Let's see how this works!",
  },
  {
    type: 'quiz',
    title: 'Year 1',
    content: 'You start with £100 and earn 10% interest. How much do you have after Year 1?',
    options: [
      { key: 'a', text: '£100' },
      { key: 'b', text: '£110' },
      { key: 'c', text: '£120' },
      { key: 'd', text: '£105' },
    ],
    correctKey: 'b',
    explanation: '10% of £100 = £10. So £100 + £10 = £110.',
  },
  {
    type: 'quiz',
    title: 'Year 2',
    content:
      'Now you have £110. You earn 10% interest again, but this time on £110, not £100. How much after Year 2?',
    options: [
      { key: 'a', text: '£120' },
      { key: 'b', text: '£121' },
      { key: 'c', text: '£115' },
      { key: 'd', text: '£125' },
    ],
    correctKey: 'b',
    explanation: "10% of £110 = £11. So £110 + £11 = £121. That's £1 more than simple interest!",
  },
  {
    type: 'input',
    title: 'Year 5 — You Solve It!',
    content:
      'After 5 years of 10% compound interest on £100, how much will you have? Round to the nearest whole pound. (Hint: keep multiplying by 1.10)',
    correctAnswer: '161',
    placeholder: 'Type your answer...',
    explanation:
      "£100 → £110 → £121 → £133 → £146 → £161. That's £11 more than simple interest would give!",
  },
];

export function DailyChallengeScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const c = colors[theme];

  const [step, setStep] = useState(0);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputChecked, setInputChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timer, setTimer] = useState(300); // 5 min

  const current = CHALLENGE_STEPS[step];
  const totalQuestions = CHALLENGE_STEPS.filter((s) => s.type !== 'info').length;

  // Timer
  useEffect(() => {
    if (finished) return;
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [finished]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = useCallback(
    (key: string) => {
      if (answered) return;
      setSelectedKey(key);
      setAnswered(true);
      if (key === current.correctKey) setScore((prev) => prev + 1);
    },
    [answered, current],
  );

  const handleCheckInput = useCallback(() => {
    setInputChecked(true);
    const clean = inputValue.replace(/[£,\s]/g, '');
    if (clean === current.correctAnswer) setScore((prev) => prev + 1);
  }, [inputValue, current]);

  const handleNext = useCallback(() => {
    if (step < CHALLENGE_STEPS.length - 1) {
      setStep((prev) => prev + 1);
      setSelectedKey(null);
      setAnswered(false);
      setInputValue('');
      setInputChecked(false);
    } else {
      setFinished(true);
    }
  }, [step]);

  // ── Finished screen ──
  if (finished) {
    const perfect = score === totalQuestions;
    const xpEarned = score * 20 + (timer > 0 ? 10 : 0);

    return (
      <ScreenWrapper topPadding={16} showDecoration={false}>
        <View className="flex-1 items-center justify-center px-6">
          <MotiView
            from={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 12, stiffness: 100 }}
            className="items-center"
          >
            {perfect ? (
              <MascotCelebration size={130} showConfetti showHurray enableJump />
            ) : (
              <View style={{ alignItems: 'center', marginBottom: 8 }}>
                <MascotWaving size={100} />
              </View>
            )}
            <Text className="mb-2 text-center font-fredoka text-3xl text-foreground">
              {perfect ? 'Perfect Score!' : 'Challenge Complete!'}
            </Text>
            <Text className="mb-4 text-center font-poppins-regular text-sm leading-5 text-muted-foreground">
              You scored {score}/{totalQuestions} on today's challenge.
            </Text>

            {/* XP breakdown */}
            <View className="mb-4 w-full gap-3 rounded-2xl border border-border bg-card p-4">
              {[
                { label: 'Correct answers', value: `+${score * 20} XP`, emoji: '✅' },
                { label: 'Time bonus', value: timer > 0 ? '+10 XP' : '+0 XP', emoji: '⏱️' },
                { label: 'Total earned', value: `+${xpEarned} XP`, emoji: '⚡' },
              ].map((item) => (
                <View key={item.label} className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-2">
                    <Text className="text-sm">{item.emoji}</Text>
                    <Text className="font-poppins-medium text-sm text-foreground">
                      {item.label}
                    </Text>
                  </View>
                  <Text className="font-poppins-bold text-sm text-primary">{item.value}</Text>
                </View>
              ))}
            </View>

            {/* Streak */}
            <View className="w-full flex-row items-center gap-2.5 rounded-xl border border-warning/15 bg-warning/10 px-4 py-3">
              <Text className="text-lg">🔥</Text>
              <View className="flex-1">
                <Text className="font-poppins-semibold text-sm text-foreground">
                  13-day streak!
                </Text>
                <Text className="font-poppins-regular text-xs text-muted-foreground">
                  Come back tomorrow to keep it going
                </Text>
              </View>
            </View>
          </MotiView>
        </View>

        <View className="px-6 pt-2">
          <GradientButton
            label="Back to Dashboard"
            variant="purple"
            onPress={() => router.replace('/(student)/(tabs)' as any)}
            showArrow={false}
          />
        </View>
      </ScreenWrapper>
    );
  }

  // ── Active challenge ──
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
            <Zap size={14} color={c.primary} strokeWidth={2.5} fill={c.primary} />
            <Text className="font-poppins-semibold text-sm text-foreground">Daily Challenge</Text>
          </View>
          <View className="flex-row items-center gap-1 rounded-lg border border-border bg-card px-2.5 py-1">
            <Clock
              size={12}
              color={timer < 60 ? c.destructive : c.mutedForeground}
              strokeWidth={2}
            />
            <Text
              className={`font-poppins-bold text-xs ${timer < 60 ? 'text-destructive' : 'text-muted-foreground'}`}
            >
              {formatTime(timer)}
            </Text>
          </View>
        </View>

        {/* Progress */}
        <View className="mb-4 flex-row gap-1.5 px-5">
          {CHALLENGE_STEPS.map((_, i) => (
            <MotiView
              key={i}
              animate={{
                backgroundColor: i < step ? c.success : i === step ? c.primary : c.border,
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
          key={step}
          from={{ opacity: 0, translateX: 25 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 120 }}
          className="px-6"
        >
          {/* Step title */}
          <View className="mb-3 flex-row items-center gap-2">
            <View className="rounded-lg bg-primary/10 px-2.5 py-1">
              <Text className="font-poppins-bold text-[10px] uppercase tracking-wider text-primary">
                Step {step + 1}/{CHALLENGE_STEPS.length}
              </Text>
            </View>
            <Text className="font-poppins-semibold text-sm text-foreground">{current.title}</Text>
          </View>

          {/* Content */}
          <View className="mb-4 rounded-2xl border border-border bg-card p-5">
            <Text className="font-poppins-regular text-sm leading-6 text-foreground">
              {current.content}
            </Text>
          </View>

          {/* Quiz options */}
          {current.type === 'quiz' && current.options && (
            <View className="gap-2.5">
              {current.options.map((opt, index) => {
                const isSelected = selectedKey === opt.key;
                const isCorrect = opt.key === current.correctKey;
                let borderClass = 'border-border';
                let bgClass = 'bg-card';
                if (answered && isCorrect) {
                  borderClass = 'border-success';
                  bgClass = 'bg-success/5';
                } else if (answered && isSelected && !isCorrect) {
                  borderClass = 'border-destructive';
                  bgClass = 'bg-destructive/5';
                } else if (isSelected && !answered) {
                  borderClass = 'border-primary';
                  bgClass = 'bg-primary/5';
                }

                return (
                  <MotiView
                    key={opt.key}
                    from={{ opacity: 0, translateY: 8 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{
                      type: 'spring',
                      damping: 16,
                      stiffness: 130,
                      delay: 80 + index * 50,
                    }}
                  >
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => handleSelectOption(opt.key)}
                      disabled={answered}
                    >
                      <View
                        className={`flex-row items-center gap-3 rounded-xl border p-4 ${borderClass} ${bgClass}`}
                      >
                        <View
                          className={`h-8 w-8 items-center justify-center rounded-full ${
                            answered && isCorrect
                              ? 'bg-success'
                              : answered && isSelected
                                ? 'bg-destructive'
                                : isSelected
                                  ? 'bg-primary'
                                  : 'bg-muted'
                          }`}
                        >
                          {answered && isCorrect ? (
                            <CheckCircle size={16} color="#FFF" strokeWidth={2.5} />
                          ) : answered && isSelected ? (
                            <XCircle size={16} color="#FFF" strokeWidth={2.5} />
                          ) : (
                            <Text
                              className={`font-poppins-bold text-xs ${isSelected ? 'text-white' : 'text-muted-foreground'}`}
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
          )}

          {/* Input answer */}
          {current.type === 'input' && (
            <View className="gap-3">
              <View className="flex-row items-center gap-3 rounded-xl border border-border bg-card p-3.5">
                <Text className="font-poppins-bold text-base text-muted-foreground">£</Text>
                <TextInput
                  value={inputValue}
                  onChangeText={setInputValue}
                  placeholder={current.placeholder}
                  placeholderTextColor={c.mutedForeground}
                  keyboardType="numeric"
                  editable={!inputChecked}
                  className="flex-1 font-poppins-medium text-base text-foreground"
                />
              </View>
              {!inputChecked && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleCheckInput}
                  disabled={inputValue.trim().length === 0}
                  className={`items-center rounded-xl py-3 ${
                    inputValue.trim().length > 0 ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <Text
                    className={`font-poppins-semibold text-sm ${
                      inputValue.trim().length > 0 ? 'text-white' : 'text-muted-foreground'
                    }`}
                  >
                    Check Answer
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Explanation after answering */}
          {((current.type === 'quiz' && answered) || (current.type === 'input' && inputChecked)) &&
            current.explanation && (
              <MotiView
                from={{ opacity: 0, translateY: 8 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'spring', damping: 16, stiffness: 120 }}
                className="mt-4"
              >
                <View
                  className={`flex-row gap-2.5 rounded-xl border p-3.5 ${
                    (current.type === 'quiz' && selectedKey === current.correctKey) ||
                    (current.type === 'input' &&
                      inputValue.replace(/[£,\s]/g, '') === current.correctAnswer)
                      ? 'border-success/15 bg-success/10'
                      : 'border-destructive/15 bg-destructive/10'
                  }`}
                >
                  <Text className="text-base">
                    {(current.type === 'quiz' && selectedKey === current.correctKey) ||
                    (current.type === 'input' &&
                      inputValue.replace(/[£,\s]/g, '') === current.correctAnswer)
                      ? '✅'
                      : '💡'}
                  </Text>
                  <Text className="flex-1 font-poppins-regular text-xs leading-4 text-muted-foreground">
                    {current.explanation}
                  </Text>
                </View>
              </MotiView>
            )}
        </MotiView>
      </ScrollView>

      {/* Next button */}
      {(current.type === 'info' ||
        (current.type === 'quiz' && answered) ||
        (current.type === 'input' && inputChecked)) && (
        <MotiView
          from={{ opacity: 0, translateY: 16 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 120 }}
        >
          <View className="px-6 pt-2">
            <GradientButton
              label={step < CHALLENGE_STEPS.length - 1 ? 'Next' : 'See Results'}
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
