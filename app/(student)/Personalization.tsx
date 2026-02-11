import { Fredoka_700Bold } from '@expo-google-fonts/fredoka';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Circle,
  Defs,
  Path,
  Stop,
  Svg,
  LinearGradient as SvgLinearGradient,
} from 'react-native-svg';

const { width, height } = Dimensions.get('window');

// ─── Question Data ─────────────────────────────────────────────────
const QUESTIONS = [
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

// ─── Option icon backgrounds ───────────────────────────────────────
const OPTION_COLORS = [
  { bg: 'rgba(79,195,247,0.15)', border: 'rgba(79,195,247,0.3)', selected: '#4FC3F7' },
  { bg: 'rgba(255,215,0,0.12)', border: 'rgba(255,215,0,0.3)', selected: '#FFD700' },
  { bg: 'rgba(255,46,145,0.12)', border: 'rgba(255,46,145,0.3)', selected: '#FF2E91' },
  { bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)', selected: '#10B981' },
];

// ─── Compass SVG (question 1 illustration) ─────────────────────────
const CompassIcon = () => (
  <Svg width={56} height={56} viewBox="0 0 56 56">
    <Circle
      cx="28"
      cy="28"
      r="26"
      fill="rgba(255,255,255,0.08)"
      stroke="rgba(255,255,255,0.15)"
      strokeWidth="1.5"
    />
    <Circle cx="28" cy="28" r="18" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
    <Path d="M28 10 L31 26 L28 28 L25 26 Z" fill="#4FC3F7" />
    <Path d="M28 46 L31 30 L28 28 L25 30 Z" fill="#FF2E91" opacity={0.7} />
    <Circle cx="28" cy="28" r="3" fill="#FFD700" />
  </Svg>
);

// ─── Target SVG (question 2 illustration) ──────────────────────────
const TargetIcon = () => (
  <Svg width={56} height={56} viewBox="0 0 56 56">
    <Circle
      cx="28"
      cy="28"
      r="26"
      fill="rgba(255,255,255,0.08)"
      stroke="rgba(255,255,255,0.15)"
      strokeWidth="1.5"
    />
    <Circle cx="28" cy="28" r="20" fill="none" stroke="rgba(255,215,0,0.3)" strokeWidth="2" />
    <Circle cx="28" cy="28" r="13" fill="none" stroke="rgba(255,215,0,0.4)" strokeWidth="2" />
    <Circle cx="28" cy="28" r="6" fill="#FFD700" opacity={0.8} />
    <Defs>
      <SvgLinearGradient id="arrowGrad" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0" stopColor="#4FC3F7" />
        <Stop offset="1" stopColor="#10B981" />
      </SvgLinearGradient>
    </Defs>
    <Path d="M42 8 L44 18 L34 16 Z" fill="url(#arrowGrad)" />
    <Path d="M43 9 L30 26" stroke="url(#arrowGrad)" strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

// ─── Floating sparkle ──────────────────────────────────────────────
const FloatingSparkle = ({
  delay,
  x,
  y,
  size,
  color,
}: {
  delay: number;
  x: number;
  y: number;
  size: number;
  color: string;
}) => {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const fadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 600,
      delay: delay + 300,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2200 + delay * 0.4,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2200 + delay * 0.4,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -12],
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        opacity: Animated.multiply(fadeIn, 0.45),
        transform: [{ translateY }],
      }}
    />
  );
};

// ─── Main Personalization Screen ───────────────────────────────────
export default function StudentPersonalizationScreen() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Fredoka_700Bold,
  });

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Entrance animations
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-20)).current;
  const questionOpacity = useRef(new Animated.Value(0)).current;
  const questionSlide = useRef(new Animated.Value(30)).current;
  const optionsOpacity = useRef(new Animated.Value(0)).current;
  const optionsSlide = useRef(new Animated.Value(40)).current;
  const footerOpacity = useRef(new Animated.Value(0)).current;
  const footerSlide = useRef(new Animated.Value(20)).current;
  const waveOffset = useRef(new Animated.Value(0)).current;

  // Option pulse animations
  const optionScales = useRef(QUESTIONS[0].options.map(() => new Animated.Value(1))).current;

  const runEntrance = () => {
    // Reset
    headerOpacity.setValue(0);
    headerSlide.setValue(-20);
    questionOpacity.setValue(0);
    questionSlide.setValue(30);
    optionsOpacity.setValue(0);
    optionsSlide.setValue(40);
    footerOpacity.setValue(0);
    footerSlide.setValue(20);

    Animated.sequence([
      Animated.parallel([
        Animated.timing(headerOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(headerSlide, { toValue: 0, duration: 400, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(questionOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(questionSlide, { toValue: 0, duration: 400, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(optionsOpacity, { toValue: 1, duration: 350, useNativeDriver: true }),
        Animated.spring(optionsSlide, {
          toValue: 0,
          friction: 6,
          tension: 50,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(footerOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(footerSlide, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]),
    ]).start();
  };

  useEffect(() => {
    runEntrance();

    Animated.loop(
      Animated.sequence([
        Animated.timing(waveOffset, { toValue: 1, duration: 3500, useNativeDriver: true }),
        Animated.timing(waveOffset, { toValue: 0, duration: 3500, useNativeDriver: true }),
      ]),
    ).start();
  }, []);

  const waveTranslateX = waveOffset.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -25],
  });

  const question = QUESTIONS[currentQuestion];

  const handleSelectOption = (optionId: string, index: number) => {
    setSelectedOption(optionId);

    // Bounce animation
    Animated.sequence([
      Animated.timing(optionScales[index], { toValue: 0.95, duration: 80, useNativeDriver: true }),
      Animated.spring(optionScales[index], {
        toValue: 1,
        friction: 3,
        tension: 120,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleContinue = () => {
    if (!selectedOption) return;

    const newAnswers = { ...answers, [question.id]: selectedOption };
    setAnswers(newAnswers);

    if (currentQuestion < QUESTIONS.length - 1) {
      // Transition to next question
      Animated.parallel([
        Animated.timing(questionOpacity, { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.timing(optionsOpacity, { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.timing(questionSlide, { toValue: -30, duration: 200, useNativeDriver: true }),
        Animated.timing(optionsSlide, { toValue: -20, duration: 200, useNativeDriver: true }),
      ]).start(() => {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        // Reset scales
        optionScales.forEach((s) => s.setValue(1));
        runEntrance();
      });
    } else {
      // TODO: Store newAnswers in onboardingStore for island ordering
      router.push('/(student)/PrivacyConsent');
    }
  };

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <LinearGradient
        colors={['#1A1B4B', '#2D3A8C', '#4158D0']}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Stars */}
      {[...Array(10)].map((_, i) => (
        <View
          key={`star-${i}`}
          style={[
            styles.star,
            {
              left: (i * 91 + 19) % width,
              top: (i * 63 + 18) % (height * 0.3),
              width: i % 3 === 0 ? 3 : 2,
              height: i % 3 === 0 ? 3 : 2,
              opacity: 0.2 + (i % 4) * 0.1,
            },
          ]}
        />
      ))}

      {/* Sparkles */}
      <FloatingSparkle delay={0} x={width * 0.05} y={height * 0.1} size={6} color="#FFD700" />
      <FloatingSparkle delay={300} x={width * 0.9} y={height * 0.07} size={5} color="#4FC3F7" />
      <FloatingSparkle delay={150} x={width * 0.78} y={height * 0.24} size={4} color="#FF2E91" />
      <FloatingSparkle delay={450} x={width * 0.1} y={height * 0.33} size={5} color="#10B981" />

      {/* Wave */}
      <Animated.View
        style={[styles.waveContainer, { transform: [{ translateX: waveTranslateX }] }]}
      >
        <Svg
          width={width + 50}
          height={110}
          viewBox={`0 0 ${width + 50} 110`}
          style={{ position: 'absolute', bottom: 0 }}
        >
          <Path
            d={`M0 45 Q${width * 0.15} 22 ${width * 0.3} 40 Q${width * 0.45} 58 ${width * 0.6} 36 Q${width * 0.75} 14 ${width * 0.9} 40 Q${width * 1.05} 66 ${width + 50} 36 L${width + 50} 110 L0 110 Z`}
            fill="#4FC3F7"
            opacity={0.12}
          />
          <Path
            d={`M0 62 Q${width * 0.2} 46 ${width * 0.35} 58 Q${width * 0.5} 70 ${width * 0.65} 54 Q${width * 0.8} 38 ${width * 0.95} 58 L${width + 50} 50 L${width + 50} 110 L0 110 Z`}
            fill="#4FC3F7"
            opacity={0.07}
          />
        </Svg>
      </Animated.View>

      {/* ── Content ──────────────────────────────────────────── */}
      <View style={styles.content}>
        {/* Header — progress + step indicator */}
        <Animated.View
          style={[
            styles.header,
            { opacity: headerOpacity, transform: [{ translateY: headerSlide }] },
          ]}
        >
          <View style={styles.progressRow}>
            <Text style={styles.stepLabel}>
              Question {currentQuestion + 1} of {QUESTIONS.length}
            </Text>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` },
                ]}
              />
            </View>
          </View>
        </Animated.View>

        {/* Question + illustration */}
        <Animated.View
          style={[
            styles.questionSection,
            { opacity: questionOpacity, transform: [{ translateY: questionSlide }] },
          ]}
        >
          <View style={styles.illustrationRow}>
            {currentQuestion === 0 ? <CompassIcon /> : <TargetIcon />}
          </View>
          <Text style={styles.questionTitle}>{question.question}</Text>
          <Text style={styles.questionSubtitle}>{question.subtitle}</Text>
        </Animated.View>

        {/* Options */}
        <Animated.View
          style={[
            styles.optionsSection,
            { opacity: optionsOpacity, transform: [{ translateY: optionsSlide }] },
          ]}
        >
          {question.options.map((option, index) => {
            const colors = OPTION_COLORS[index % OPTION_COLORS.length];
            const isSelected = selectedOption === option.id;

            return (
              <Animated.View
                key={option.id}
                style={{ transform: [{ scale: optionScales[index] }] }}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleSelectOption(option.id, index)}
                >
                  <View
                    style={[
                      styles.optionCard,
                      {
                        backgroundColor: isSelected ? colors.bg : 'rgba(255,255,255,0.06)',
                        borderColor: isSelected ? colors.selected : 'rgba(255,255,255,0.1)',
                        borderWidth: isSelected ? 2 : 1.5,
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.emojiContainer,
                        { backgroundColor: isSelected ? colors.bg : 'rgba(255,255,255,0.06)' },
                      ]}
                    >
                      <Text style={styles.emoji}>{option.emoji}</Text>
                    </View>
                    <Text style={[styles.optionLabel, isSelected && { color: '#FFFFFF' }]}>
                      {option.label}
                    </Text>
                    {/* Tick */}
                    <View
                      style={[
                        styles.checkOuter,
                        isSelected && {
                          backgroundColor: colors.selected,
                          borderColor: colors.selected,
                        },
                      ]}
                    >
                      {isSelected && (
                        <Svg width={12} height={12} viewBox="0 0 12 12">
                          <Path
                            d="M2.5 6 L5 8.5 L9.5 3.5"
                            fill="none"
                            stroke="#FFFFFF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </Svg>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </Animated.View>

        {/* Continue button */}
        <Animated.View
          style={[
            styles.footer,
            { opacity: footerOpacity, transform: [{ translateY: footerSlide }] },
          ]}
        >
          <TouchableOpacity
            style={[styles.ctaButton, !selectedOption && styles.ctaButtonDisabled]}
            activeOpacity={selectedOption ? 0.85 : 1}
            onPress={handleContinue}
          >
            <LinearGradient
              colors={
                selectedOption
                  ? ['#FFD700', '#F5A623']
                  : ['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.06)']
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.ctaGradient}
            >
              <Text style={[styles.ctaText, !selectedOption && styles.ctaTextDisabled]}>
                {currentQuestion < QUESTIONS.length - 1 ? 'Next' : 'Continue'}
              </Text>
              <Text style={[styles.ctaArrow, !selectedOption && styles.ctaTextDisabled]}>→</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

// ─── Styles ────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  star: {
    position: 'absolute',
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  waveContainer: {
    position: 'absolute',
    bottom: 0,
    left: -25,
    right: -25,
    height: 110,
  },
  content: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + 16 : 60,
    paddingBottom: Platform.OS === 'android' ? 24 : 40,
    paddingHorizontal: 24,
  },

  // ── Header / Progress ──
  header: {
    marginBottom: 12,
  },
  progressRow: {
    gap: 8,
  },
  stepLabel: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 0.3,
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: '#FFD700',
  },

  // ── Question ──
  questionSection: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  illustrationRow: {
    marginBottom: 16,
  },
  questionTitle: {
    fontFamily: 'Fredoka_700Bold',
    fontSize: 28,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 34,
    letterSpacing: -0.5,
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  questionSubtitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: 'rgba(255,255,255,0.55)',
    textAlign: 'center',
    marginTop: 8,
    letterSpacing: 0.2,
  },

  // ── Options ──
  optionsSection: {
    flex: 1,
    justifyContent: 'center',
    gap: 12,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 14,
    gap: 12,
  },
  emojiContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 22,
  },
  optionLabel: {
    flex: 1,
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 15,
    color: 'rgba(255,255,255,0.75)',
    letterSpacing: 0.1,
  },
  checkOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  // ── Footer ──
  footer: {
    paddingTop: 8,
  },
  ctaButton: {
    borderRadius: 28,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#F5A623',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 14,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  ctaButtonDisabled: {
    ...Platform.select({
      ios: { shadowOpacity: 0 },
      android: { elevation: 0 },
    }),
  },
  ctaGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    gap: 10,
  },
  ctaText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 18,
    color: '#1A1B4B',
    letterSpacing: 0.3,
  },
  ctaTextDisabled: {
    color: 'rgba(255,255,255,0.3)',
  },
  ctaArrow: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 20,
    color: '#1A1B4B',
  },
});
