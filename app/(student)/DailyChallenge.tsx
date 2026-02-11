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
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  ScrollView,
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
  Rect,
  Stop,
  Svg,
  LinearGradient as SvgLinearGradient,
  Text as SvgText,
} from 'react-native-svg';

const { width, height } = Dimensions.get('window');

// ─── Types ─────────────────────────────────────────────────────────
type ChallengeType = 'sort' | 'true-false' | 'pick-one' | 'slider';

interface ChallengeOption {
  id: string;
  text: string;
  emoji?: string;
  category?: 'need' | 'want'; // for sort challenges
}

interface DailyChallenge {
  id: string;
  type: ChallengeType;
  title: string;
  subtitle: string;
  description: string;
  xpReward: number;
  streakBonus: number;
  timeEstimate: string;
  options: ChallengeOption[];
  correctAnswers: string[]; // option ids
  explanation: string;
  tip: string;
}

// ─── Mock Data ─────────────────────────────────────────────────────
const CHALLENGE: DailyChallenge = {
  id: 'dc-2026-02-09',
  type: 'sort',
  title: 'Needs vs Wants',
  subtitle: 'Daily Challenge',
  description:
    'Sort these items into the right category. Which are things you need, and which are things you want?',
  xpReward: 25,
  streakBonus: 10,
  timeEstimate: '~2 min',
  options: [
    { id: 'o1', text: 'School lunch', emoji: '🍱', category: 'need' },
    { id: 'o2', text: 'New trainers', emoji: '👟', category: 'want' },
    { id: 'o3', text: 'Bus pass', emoji: '🚌', category: 'need' },
    { id: 'o4', text: 'Streaming sub', emoji: '📺', category: 'want' },
    { id: 'o5', text: 'Winter coat', emoji: '🧥', category: 'need' },
  ],
  correctAnswers: ['o1', 'o3', 'o5'], // these are "needs"
  explanation:
    'Needs are things you must have to stay safe, healthy, and able to get to school. Wants are nice extras — you can live without them even if they feel important!',
  tip: "A good trick: ask yourself 'Could I survive and stay well without this?' If yes, it's probably a want.",
};

const STREAK_DATA = {
  current: 3,
  best: 7,
  weekDays: [
    { day: 'M', completed: true },
    { day: 'T', completed: true },
    { day: 'W', completed: true },
    { day: 'T', completed: false },
    { day: 'F', completed: false },
    { day: 'S', completed: false },
    { day: 'S', completed: false },
  ],
};

const PAST_CHALLENGES = [
  { id: '1', title: 'Budget Buster', emoji: '💰', xp: 25, completed: true },
  { id: '2', title: 'Saving Sprint', emoji: '🏃', xp: 25, completed: true },
  { id: '3', title: 'Scam Spotter', emoji: '🔍', xp: 30, completed: true },
];

// ─── Floating Coin ─────────────────────────────────────────────────
const FloatingCoin = ({
  delay,
  startX,
  startY,
  size,
  opacity,
}: {
  delay: number;
  startX: number;
  startY: number;
  size: number;
  opacity: number;
}) => {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const fadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 800,
      delay: delay + 600,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2400 + delay * 0.5,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2400 + delay * 0.5,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -18],
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: startX,
        top: startY,
        opacity: Animated.multiply(fadeIn, opacity),
        transform: [{ translateY }],
        zIndex: 0,
      }}
    >
      <Svg width={size} height={size} viewBox="0 0 40 40">
        <Defs>
          <SvgLinearGradient id={`dcCoin-${delay}`} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#FFD700" />
            <Stop offset="1" stopColor="#F5A623" />
          </SvgLinearGradient>
        </Defs>
        <Circle cx="20" cy="20" r="18" fill={`url(#dcCoin-${delay})`} />
        <Circle cx="20" cy="20" r="14" fill="none" stroke="#E8960C" strokeWidth="1.5" />
        <SvgText x="20" y="26" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#B8760A">
          £
        </SvgText>
      </Svg>
    </Animated.View>
  );
};

// ─── Bottom Wave ───────────────────────────────────────────────────
const BottomWave = () => {
  const waveOffset = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(waveOffset, { toValue: 1, duration: 3000, useNativeDriver: true }),
        Animated.timing(waveOffset, { toValue: 0, duration: 3000, useNativeDriver: true }),
      ]),
    ).start();
  }, []);

  const waveTranslateX = waveOffset.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -30],
  });

  return (
    <Animated.View
      style={[styles.waveContainer, { transform: [{ translateX: waveTranslateX }] }]}
      pointerEvents="none"
    >
      <Svg width={width + 60} height={140} viewBox={`0 0 ${width + 60} 140`}>
        <Path
          d={`M0 60 Q${width * 0.15} 30 ${width * 0.3} 55 Q${width * 0.45} 80 ${width * 0.6} 50 Q${width * 0.75} 20 ${width * 0.9} 55 Q${width * 1.05} 90 ${width + 60} 50 L${width + 60} 140 L0 140 Z`}
          fill="#4FC3F7"
          opacity={0.12}
        />
        <Path
          d={`M0 80 Q${width * 0.2} 55 ${width * 0.35} 75 Q${width * 0.5} 95 ${width * 0.65} 70 Q${width * 0.8} 45 ${width * 0.95} 75 L${width + 60} 65 L${width + 60} 140 L0 140 Z`}
          fill="#4FC3F7"
          opacity={0.08}
        />
      </Svg>
    </Animated.View>
  );
};

// ─── Mini Progress Bar ─────────────────────────────────────────────
const MiniProgressBar = ({ progress, color }: { progress: number; color: string }) => (
  <View style={styles.miniProgressTrack}>
    <View
      style={[styles.miniProgressFill, { width: `${progress * 100}%`, backgroundColor: color }]}
    />
  </View>
);

// ─── Trophy Icon SVG ───────────────────────────────────────────────
const TrophyIcon = ({ size = 48 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48">
    <Defs>
      <SvgLinearGradient id="trophyGrad" x1="0" y1="0" x2="0" y2="1">
        <Stop offset="0" stopColor="#FFD700" />
        <Stop offset="1" stopColor="#F5A623" />
      </SvgLinearGradient>
    </Defs>
    {/* Cup body */}
    <Path d="M14 8 L34 8 L31 26 Q30 30 24 32 Q18 30 17 26 Z" fill="url(#trophyGrad)" />
    {/* Handles */}
    <Path
      d="M14 12 Q6 12 6 20 Q6 24 12 24"
      fill="none"
      stroke="#F5A623"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <Path
      d="M34 12 Q42 12 42 20 Q42 24 36 24"
      fill="none"
      stroke="#F5A623"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Stem */}
    <Rect x="21" y="32" width="6" height="6" fill="#E8960C" />
    {/* Base */}
    <Rect x="16" y="38" width="16" height="4" rx="2" fill="#F5A623" />
    {/* Star */}
    <Path
      d="M24 14 L25.5 18 L30 18 L26.5 21 L28 25 L24 22 L20 25 L21.5 21 L18 18 L22.5 18 Z"
      fill="#FFFFFF"
      opacity={0.8}
    />
  </Svg>
);

// ─── Checkmark Icon SVG ────────────────────────────────────────────
const CheckIcon = ({ size = 20, color = '#10B981' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx="12" cy="12" r="10" fill={color} />
    <Path
      d="M7 12.5 L10.5 16 L17 9"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// ─── Lightning Icon SVG ────────────────────────────────────────────
const LightningIcon = ({ size = 24 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M13 2 L4 14 L11 14 L10 22 L20 10 L13 10 Z" fill="#FFD700" />
  </Svg>
);

// ─── Sort Item Component ───────────────────────────────────────────
const SortItem = ({
  option,
  onSort,
  sortedAs,
  isRevealed,
  isCorrect,
}: {
  option: ChallengeOption;
  onSort: (id: string, category: 'need' | 'want') => void;
  sortedAs: 'need' | 'want' | null;
  isRevealed: boolean;
  isCorrect: boolean;
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = (category: 'need' | 'want') => {
    if (isRevealed) return;
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.95, duration: 80, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 4, tension: 100, useNativeDriver: true }),
    ]).start();
    onSort(option.id, category);
  };

  const borderColor = isRevealed
    ? isCorrect
      ? 'rgba(16, 185, 129, 0.5)'
      : 'rgba(239, 68, 68, 0.5)'
    : sortedAs
      ? sortedAs === 'need'
        ? 'rgba(79, 195, 247, 0.35)'
        : 'rgba(255, 46, 145, 0.35)'
      : 'rgba(255,255,255,0.08)';

  const bgColor = isRevealed
    ? isCorrect
      ? 'rgba(16, 185, 129, 0.12)'
      : 'rgba(239, 68, 68, 0.10)'
    : sortedAs
      ? sortedAs === 'need'
        ? 'rgba(79, 195, 247, 0.08)'
        : 'rgba(255, 46, 145, 0.08)'
      : 'rgba(255,255,255,0.04)';

  return (
    <Animated.View
      style={[
        styles.sortItem,
        { borderColor, backgroundColor: bgColor, transform: [{ scale: scaleAnim }] },
      ]}
    >
      <View style={styles.sortItemLeft}>
        <Text style={styles.sortItemEmoji}>{option.emoji}</Text>
        <Text style={styles.sortItemText}>{option.text}</Text>
      </View>

      {isRevealed ? (
        <View style={styles.sortRevealBadge}>
          {isCorrect ? (
            <CheckIcon size={22} color="#10B981" />
          ) : (
            <View style={styles.wrongBadge}>
              <Text style={styles.wrongX}>✕</Text>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.sortButtons}>
          <TouchableOpacity
            onPress={() => handlePress('need')}
            style={[
              styles.sortBtn,
              styles.needBtn,
              sortedAs === 'need' && styles.sortBtnActive,
              sortedAs === 'need' && {
                backgroundColor: 'rgba(79, 195, 247, 0.25)',
                borderColor: '#4FC3F7',
              },
            ]}
            activeOpacity={0.7}
          >
            <Text style={[styles.sortBtnText, sortedAs === 'need' && { color: '#4FC3F7' }]}>
              Need
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handlePress('want')}
            style={[
              styles.sortBtn,
              styles.wantBtn,
              sortedAs === 'want' && styles.sortBtnActive,
              sortedAs === 'want' && {
                backgroundColor: 'rgba(255, 46, 145, 0.25)',
                borderColor: '#FF2E91',
              },
            ]}
            activeOpacity={0.7}
          >
            <Text style={[styles.sortBtnText, sortedAs === 'want' && { color: '#FF2E91' }]}>
              Want
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Animated.View>
  );
};

// ─── Streak Day Dot ────────────────────────────────────────────────
const StreakDay = ({
  day,
  completed,
  isToday,
}: {
  day: string;
  completed: boolean;
  isToday: boolean;
}) => (
  <View style={styles.streakDayContainer}>
    <View
      style={[
        styles.streakDot,
        completed && styles.streakDotCompleted,
        isToday && !completed && styles.streakDotToday,
      ]}
    >
      {completed ? (
        <Text style={styles.streakDotCheck}>✓</Text>
      ) : isToday ? (
        <Text style={styles.streakDotNow}>!</Text>
      ) : null}
    </View>
    <Text style={[styles.streakDayLabel, isToday && { color: '#FFD700' }]}>{day}</Text>
  </View>
);

// ═══════════════════════════════════════════════════════════════════
// ─── MAIN DAILY CHALLENGE SCREEN ──────────────────────────────────
// ═══════════════════════════════════════════════════════════════════
export default function DailyChallengeScreen() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Fredoka_700Bold,
  });

  // ── State ──
  const [sortAnswers, setSortAnswers] = useState<Record<string, 'need' | 'want'>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  // ── Animations ──
  const fadeAnims = useRef(Array.from({ length: 7 }, () => new Animated.Value(0))).current;
  const slideAnims = useRef(Array.from({ length: 7 }, () => new Animated.Value(30))).current;
  const resultScale = useRef(new Animated.Value(0.5)).current;
  const resultOpacity = useRef(new Animated.Value(0)).current;
  const confettiAnims = useRef(Array.from({ length: 8 }, () => new Animated.Value(0))).current;

  useEffect(() => {
    const animations = fadeAnims.map((fade, i) =>
      Animated.parallel([
        Animated.timing(fade, { toValue: 1, duration: 400, delay: i * 90, useNativeDriver: true }),
        Animated.timing(slideAnims[i], {
          toValue: 0,
          duration: 400,
          delay: i * 90,
          useNativeDriver: true,
        }),
      ]),
    );
    Animated.stagger(60, animations).start();
  }, []);

  const anim = (index: number) => ({
    opacity: fadeAnims[index],
    transform: [{ translateY: slideAnims[index] }],
  });

  // ── Handlers ──
  const handleSort = useCallback(
    (id: string, category: 'need' | 'want') => {
      if (isSubmitted) return;
      setSortAnswers((prev) => ({ ...prev, [id]: category }));
    },
    [isSubmitted],
  );

  const allAnswered = CHALLENGE.options.every((opt) => sortAnswers[opt.id]);

  const handleSubmit = () => {
    if (!allAnswered || isSubmitted) return;

    // Calculate score
    let correct = 0;
    CHALLENGE.options.forEach((opt) => {
      const userAnswer = sortAnswers[opt.id];
      const isNeed = CHALLENGE.correctAnswers.includes(opt.id);
      if ((isNeed && userAnswer === 'need') || (!isNeed && userAnswer === 'want')) {
        correct++;
      }
    });
    setScore(correct);
    setIsSubmitted(true);

    // After a short delay, show results
    setTimeout(() => {
      setShowResults(true);
      // Animate results card
      Animated.parallel([
        Animated.spring(resultScale, {
          toValue: 1,
          friction: 5,
          tension: 60,
          useNativeDriver: true,
        }),
        Animated.timing(resultOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      ]).start();

      // Confetti burst
      confettiAnims.forEach((anim, i) => {
        Animated.sequence([
          Animated.delay(i * 60),
          Animated.parallel([
            Animated.timing(anim, { toValue: 1, duration: 800, useNativeDriver: true }),
          ]),
        ]).start();
      });
    }, 600);
  };

  const isPerfect = score === CHALLENGE.options.length;
  const totalXP = isPerfect ? CHALLENGE.xpReward + CHALLENGE.streakBonus : CHALLENGE.xpReward;

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* ── Full-screen gradient background ── */}
      <LinearGradient
        colors={['#1A1B4B', '#2D3A8C', '#4158D0']}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      {/* ── Sparkle dots ── */}
      {[...Array(10)].map((_, i) => (
        <View
          key={`star-${i}`}
          style={[
            styles.star,
            {
              left: (i * 83 + 37) % width,
              top: (i * 61 + 25) % (height * 0.35),
              width: i % 3 === 0 ? 4 : 2,
              height: i % 3 === 0 ? 4 : 2,
              opacity: 0.12 + (i % 4) * 0.06,
            },
          ]}
        />
      ))}

      {/* ── Floating coins ── */}
      <FloatingCoin
        delay={100}
        startX={width * 0.06}
        startY={height * 0.05}
        size={20}
        opacity={0.25}
      />
      <FloatingCoin
        delay={500}
        startX={width * 0.85}
        startY={height * 0.08}
        size={16}
        opacity={0.2}
      />
      <FloatingCoin
        delay={300}
        startX={width * 0.72}
        startY={height * 0.18}
        size={14}
        opacity={0.18}
      />

      {/* ── Bottom wave ── */}
      <BottomWave />

      {/* ── Confetti particles (visible after submit) ── */}
      {showResults &&
        isPerfect &&
        confettiAnims.map((confAnim, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const dist = 80 + (i % 3) * 30;
          const translateX = confAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, Math.cos(angle) * dist],
          });
          const translateY = confAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, Math.sin(angle) * dist - 40],
          });
          const opacity = confAnim.interpolate({
            inputRange: [0, 0.7, 1],
            outputRange: [1, 1, 0],
          });
          const colors = [
            '#FFD700',
            '#FF2E91',
            '#4FC3F7',
            '#10B981',
            '#A855F7',
            '#F59E0B',
            '#FF6B6B',
            '#70E0A0',
          ];
          return (
            <Animated.View
              key={`confetti-${i}`}
              pointerEvents="none"
              style={{
                position: 'absolute',
                left: width / 2 - 4,
                top: height * 0.28,
                width: 8,
                height: 8,
                borderRadius: i % 2 === 0 ? 4 : 1,
                backgroundColor: colors[i],
                opacity,
                transform: [{ translateX }, { translateY }],
                zIndex: 20,
              }}
            />
          );
        })}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Back button + Header ──────────────────────────── */}
        <Animated.View style={[styles.topBar, anim(0)]}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <View style={styles.topBarCenter}>
            <Text style={styles.topBarLabel}>Daily Challenge</Text>
            <Text style={styles.topBarDate}>
              {new Date().toLocaleDateString('en-GB', {
                weekday: 'long',
                day: 'numeric',
                month: 'short',
              })}
            </Text>
          </View>
          <View style={styles.xpPill}>
            <LightningIcon size={16} />
            <Text style={styles.xpPillText}>+{CHALLENGE.xpReward} XP</Text>
          </View>
        </Animated.View>

        {/* ── Streak Tracker ────────────────────────────────── */}
        <Animated.View style={anim(1)}>
          <LinearGradient
            colors={['rgba(255,215,0,0.14)', 'rgba(245,166,35,0.04)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.streakCard}
          >
            <View style={styles.streakHeader}>
              <View style={styles.streakLeft}>
                <Text style={styles.streakEmoji}>🔥</Text>
                <View>
                  <Text style={styles.streakCount}>{STREAK_DATA.current} Day Streak</Text>
                  <Text style={styles.streakBest}>Best: {STREAK_DATA.best} days</Text>
                </View>
              </View>
              {STREAK_DATA.current >= 3 && (
                <View style={styles.bonusPill}>
                  <Text style={styles.bonusText}>+{CHALLENGE.streakBonus} bonus XP</Text>
                </View>
              )}
            </View>
            <View style={styles.streakDays}>
              {STREAK_DATA.weekDays.map((d, i) => (
                <StreakDay
                  key={i}
                  day={d.day}
                  completed={d.completed}
                  isToday={i === STREAK_DATA.current}
                />
              ))}
            </View>
          </LinearGradient>
        </Animated.View>

        {/* ── Challenge Card ────────────────────────────────── */}
        <Animated.View style={anim(2)}>
          <View style={styles.challengeHeader}>
            <View style={styles.challengeIconCircle}>
              <Text style={{ fontSize: 32 }}>⚡</Text>
            </View>
            <View style={styles.challengeHeaderText}>
              <Text style={styles.challengeTitle}>{CHALLENGE.title}</Text>
              <View style={styles.challengeMeta}>
                <Text style={styles.challengeMetaText}>🕐 {CHALLENGE.timeEstimate}</Text>
                <View style={styles.metaDot} />
                <Text style={styles.challengeMetaText}>{CHALLENGE.options.length} items</Text>
              </View>
            </View>
          </View>
          <Text style={styles.challengeDescription}>{CHALLENGE.description}</Text>
        </Animated.View>

        {/* ── Sort Items ────────────────────────────────────── */}
        <Animated.View style={anim(3)}>
          <View style={styles.sortLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#4FC3F7' }]} />
              <Text style={styles.legendText}>Need — Must have</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#FF2E91' }]} />
              <Text style={styles.legendText}>Want — Nice to have</Text>
            </View>
          </View>

          {CHALLENGE.options.map((option) => {
            const isNeed = CHALLENGE.correctAnswers.includes(option.id);
            const userAnswer = sortAnswers[option.id];
            const isCorrectAnswer = isSubmitted
              ? (isNeed && userAnswer === 'need') || (!isNeed && userAnswer === 'want')
              : false;

            return (
              <SortItem
                key={option.id}
                option={option}
                onSort={handleSort}
                sortedAs={sortAnswers[option.id] ?? null}
                isRevealed={isSubmitted}
                isCorrect={isCorrectAnswer}
              />
            );
          })}
        </Animated.View>

        {/* ── Progress indicator ─────────────────────────────── */}
        {!isSubmitted && (
          <Animated.View style={[styles.progressSection, anim(4)]}>
            <View style={styles.progressRow}>
              <Text style={styles.progressLabel}>
                {Object.keys(sortAnswers).length} of {CHALLENGE.options.length} sorted
              </Text>
              <Text style={styles.progressLabel}>{allAnswered ? 'Ready!' : 'Keep going...'}</Text>
            </View>
            <MiniProgressBar
              progress={Object.keys(sortAnswers).length / CHALLENGE.options.length}
              color="#FFD700"
            />
          </Animated.View>
        )}

        {/* ── Submit / Results ──────────────────────────────── */}
        {!showResults && (
          <Animated.View style={anim(5)}>
            <TouchableOpacity
              onPress={handleSubmit}
              activeOpacity={0.85}
              disabled={!allAnswered || isSubmitted}
              style={{ marginTop: 8 }}
            >
              <LinearGradient
                colors={
                  allAnswered && !isSubmitted
                    ? ['#FFD700', '#F5A623']
                    : ['rgba(255,215,0,0.25)', 'rgba(245,166,35,0.15)']
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.submitButton, (!allAnswered || isSubmitted) && { opacity: 0.5 }]}
              >
                <Text
                  style={[styles.submitText, allAnswered && !isSubmitted && { color: '#1A1B4B' }]}
                >
                  {isSubmitted
                    ? 'Checking...'
                    : allAnswered
                      ? 'Check My Answers'
                      : 'Sort all items first'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* ── Results Card ──────────────────────────────────── */}
        {showResults && (
          <Animated.View
            style={[
              styles.resultsCard,
              {
                opacity: resultOpacity,
                transform: [{ scale: resultScale }],
              },
            ]}
          >
            <LinearGradient
              colors={
                isPerfect
                  ? ['rgba(255,215,0,0.20)', 'rgba(16,185,129,0.10)']
                  : ['rgba(79,195,247,0.15)', 'rgba(168,85,247,0.08)']
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.resultsGradient}
            >
              {/* Trophy / Score Header */}
              <View style={styles.resultsHeader}>
                {isPerfect ? (
                  <TrophyIcon size={56} />
                ) : (
                  <View style={styles.scoreCircle}>
                    <Text style={styles.scoreNumber}>
                      {score}/{CHALLENGE.options.length}
                    </Text>
                  </View>
                )}
                <Text style={styles.resultsTitle}>
                  {isPerfect
                    ? 'Perfect Score! 🎉'
                    : score >= CHALLENGE.options.length * 0.6
                      ? 'Nice work! 👏'
                      : 'Good try! 💪'}
                </Text>
                <Text style={styles.resultsSubtitle}>
                  You got {score} out of {CHALLENGE.options.length} correct
                </Text>
              </View>

              {/* XP Earned */}
              <View style={styles.xpEarnedRow}>
                <View style={styles.xpEarnedItem}>
                  <LightningIcon size={20} />
                  <Text style={styles.xpEarnedLabel}>Challenge XP</Text>
                  <Text style={styles.xpEarnedValue}>+{CHALLENGE.xpReward}</Text>
                </View>
                {isPerfect && (
                  <>
                    <View style={styles.xpDivider} />
                    <View style={styles.xpEarnedItem}>
                      <Text style={{ fontSize: 18 }}>🔥</Text>
                      <Text style={styles.xpEarnedLabel}>Streak Bonus</Text>
                      <Text style={[styles.xpEarnedValue, { color: '#FF2E91' }]}>
                        +{CHALLENGE.streakBonus}
                      </Text>
                    </View>
                  </>
                )}
              </View>

              <View style={styles.totalXPBar}>
                <Text style={styles.totalXPLabel}>Total earned</Text>
                <Text style={styles.totalXPValue}>+{totalXP} XP</Text>
              </View>

              {/* Explanation */}
              <View style={styles.explanationBox}>
                <Text style={styles.explanationTitle}>💡 Did you know?</Text>
                <Text style={styles.explanationText}>{CHALLENGE.explanation}</Text>
              </View>

              {/* Tip */}
              <View style={styles.tipBox}>
                <Text style={styles.tipTitle}>🧠 Pro Tip</Text>
                <Text style={styles.tipText}>{CHALLENGE.tip}</Text>
              </View>

              {/* Action buttons */}
              <TouchableOpacity
                onPress={() => router.back()}
                activeOpacity={0.85}
                style={{ marginTop: 16 }}
              >
                <LinearGradient
                  colors={['#FFD700', '#F5A623']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.submitButton}
                >
                  <Text style={[styles.submitText, { color: '#1A1B4B' }]}>Back to Dashboard</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </Animated.View>
        )}

        {/* ── Past Challenges ───────────────────────────────── */}
        {!showResults && (
          <Animated.View style={anim(6)}>
            <Text style={styles.sectionTitle}>Recent Challenges</Text>
            {PAST_CHALLENGES.map((ch) => (
              <View key={ch.id} style={styles.pastChallengeRow}>
                <View style={styles.pastChallengeLeft}>
                  <Text style={styles.pastChallengeEmoji}>{ch.emoji}</Text>
                  <Text style={styles.pastChallengeTitle}>{ch.title}</Text>
                </View>
                <View style={styles.pastChallengeRight}>
                  <Text style={styles.pastChallengeXP}>+{ch.xp} XP</Text>
                  <CheckIcon size={18} />
                </View>
              </View>
            ))}
          </Animated.View>
        )}

        {/* Bottom spacer */}
        <View style={{ height: 120 }} />
      </ScrollView>
    </View>
  );
}

// ═══════════════════════════════════════════════════════════════════
// ─── STYLES ───────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════
const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  star: {
    position: 'absolute',
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    zIndex: 0,
  },
  waveContainer: {
    position: 'absolute',
    bottom: 0,
    left: -30,
    right: -30,
    height: 140,
    zIndex: 0,
  },
  scrollView: {
    flex: 1,
    zIndex: 1,
  },
  scrollContent: {
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + 12 : 56,
    paddingHorizontal: 20,
  },

  // ── Top Bar ──
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  backArrow: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20,
    color: '#FFFFFF',
    marginTop: -2,
  },
  topBarCenter: {
    flex: 1,
  },
  topBarLabel: {
    fontFamily: 'Fredoka_700Bold',
    fontSize: 22,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  topBarDate: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: 'rgba(255,255,255,0.45)',
    marginTop: 1,
  },
  xpPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,215,0,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.2)',
  },
  xpPillText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 13,
    color: '#FFD700',
  },

  // ── Streak Card ──
  streakCard: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.12)',
    padding: 16,
    marginBottom: 24,
  },
  streakHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  streakLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  streakEmoji: {
    fontSize: 28,
  },
  streakCount: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  streakBest: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 11,
    color: 'rgba(255,255,255,0.4)',
    marginTop: 1,
  },
  bonusPill: {
    backgroundColor: 'rgba(255, 46, 145, 0.18)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  bonusText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 11,
    color: '#FF2E91',
  },
  streakDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  streakDayContainer: {
    alignItems: 'center',
    gap: 5,
  },
  streakDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakDotCompleted: {
    backgroundColor: 'rgba(255,215,0,0.2)',
    borderColor: '#FFD700',
  },
  streakDotToday: {
    borderColor: 'rgba(255,215,0,0.5)',
    borderStyle: 'dashed',
  },
  streakDotCheck: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 14,
    color: '#FFD700',
  },
  streakDotNow: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 14,
    color: '#FFD700',
  },
  streakDayLabel: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 11,
    color: 'rgba(255,255,255,0.35)',
  },

  // ── Challenge Header ──
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 12,
  },
  challengeIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: 'rgba(255,215,0,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  challengeHeaderText: {
    flex: 1,
  },
  challengeTitle: {
    fontFamily: 'Fredoka_700Bold',
    fontSize: 24,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  challengeMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  challengeMetaText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: 'rgba(255,255,255,0.45)',
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  challengeDescription: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: 'rgba(255,255,255,0.65)',
    lineHeight: 22,
    marginBottom: 20,
  },

  // ── Sort Legend ──
  sortLegend: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 14,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
  },

  // ── Sort Item ──
  sortItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  sortItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  sortItemEmoji: {
    fontSize: 24,
  },
  sortItemText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 15,
    color: '#FFFFFF',
  },
  sortButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  sortBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.12)',
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  needBtn: {},
  wantBtn: {},
  sortBtnActive: {},
  sortBtnText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
  },
  sortRevealBadge: {
    marginLeft: 12,
  },
  wrongBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(239,68,68,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrongX: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 12,
    color: '#FFFFFF',
    marginTop: -1,
  },

  // ── Progress Section ──
  progressSection: {
    marginTop: 16,
    marginBottom: 8,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    color: 'rgba(255,255,255,0.45)',
  },

  // ── Mini Progress Bar ──
  miniProgressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',
    width: '100%',
  },
  miniProgressFill: {
    height: '100%',
    borderRadius: 3,
  },

  // ── Submit Button ──
  submitButton: {
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#F5A623',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  submitText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 16,
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 0.3,
  },

  // ── Results Card ──
  resultsCard: {
    marginTop: 16,
    borderRadius: 22,
    overflow: 'hidden',
  },
  resultsGradient: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    padding: 24,
  },
  resultsHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  resultsTitle: {
    fontFamily: 'Fredoka_700Bold',
    fontSize: 26,
    color: '#FFFFFF',
    marginTop: 12,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  resultsSubtitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: 'rgba(255,255,255,0.55)',
    marginTop: 4,
    textAlign: 'center',
  },
  scoreCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(79,195,247,0.15)',
    borderWidth: 2,
    borderColor: '#4FC3F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreNumber: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 20,
    color: '#4FC3F7',
  },

  // ── XP Earned ──
  xpEarnedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  xpEarnedItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  xpEarnedLabel: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 11,
    color: 'rgba(255,255,255,0.45)',
  },
  xpEarnedValue: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 18,
    color: '#FFD700',
  },
  xpDivider: {
    width: 1,
    height: 36,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  totalXPBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,215,0,0.1)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.15)',
  },
  totalXPLabel: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
  },
  totalXPValue: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 18,
    color: '#FFD700',
  },

  // ── Explanation & Tip ──
  explanationBox: {
    backgroundColor: 'rgba(79,195,247,0.08)',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(79,195,247,0.12)',
  },
  explanationTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    color: '#4FC3F7',
    marginBottom: 6,
  },
  explanationText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
    color: 'rgba(255,255,255,0.65)',
    lineHeight: 20,
  },
  tipBox: {
    backgroundColor: 'rgba(168,85,247,0.08)',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(168,85,247,0.12)',
  },
  tipTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    color: '#A855F7',
    marginBottom: 6,
  },
  tipText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
    color: 'rgba(255,255,255,0.65)',
    lineHeight: 20,
  },

  // ── Section Title ──
  sectionTitle: {
    fontFamily: 'Fredoka_700Bold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 14,
    marginTop: 28,
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },

  // ── Past Challenges ──
  pastChallengeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  pastChallengeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pastChallengeEmoji: {
    fontSize: 22,
  },
  pastChallengeTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    color: 'rgba(255,255,255,0.75)',
  },
  pastChallengeRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pastChallengeXP: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 13,
    color: '#FFD700',
  },
});
