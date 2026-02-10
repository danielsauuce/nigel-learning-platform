import { Fredoka_700Bold } from "@expo-google-fonts/fredoka";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
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
} from "react-native";
import {
  Circle,
  Defs,
  G,
  Line,
  Path,
  Rect,
  Stop,
  Svg,
  LinearGradient as SvgLinearGradient,
  Text as SvgText,
} from "react-native-svg";

const { width, height } = Dimensions.get("window");
const CHART_WIDTH = width - 72;

// ═══════════════════════════════════════════════════════════════════
// ─── MOCK DATA ────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════
const STUDENT = {
  nickname: "Explorer",
  level: 5,
  xp: 425,
  xpToNextLevel: 600,
  overallProgress: 0.35,
  missionsCompleted: 7,
  totalMissions: 20,
  quizzesCompleted: 6,
  totalQuizzes: 15,
  quizAverage: 82,
  currentStreak: 3,
  longestStreak: 7,
  totalDaysActive: 14,
  simulatorRuns: 3,
  joinedDate: "2026-01-27",
};

const ISLANDS = [
  { id: "budgeting", name: "Budgeting Basics", emoji: "💰", color: "#4FC3F7", missionsCompleted: 3, totalMissions: 3, quizAvg: 90, progress: 1.0 },
  { id: "needs-wants", name: "Needs vs Wants", emoji: "⚖️", color: "#FF2E91", missionsCompleted: 2, totalMissions: 3, quizAvg: 78, progress: 0.75 },
  { id: "saving", name: "Saving Goals", emoji: "🎯", color: "#10B981", missionsCompleted: 2, totalMissions: 4, quizAvg: 85, progress: 0.6 },
  { id: "banking", name: "Banking & Cards", emoji: "💳", color: "#A855F7", missionsCompleted: 0, totalMissions: 3, quizAvg: 0, progress: 0.0 },
  { id: "interest", name: "Interest", emoji: "📈", color: "#F59E0B", missionsCompleted: 0, totalMissions: 3, quizAvg: 0, progress: 0.0 },
  { id: "debt", name: "Borrowing & Debt", emoji: "💳", color: "#EF4444", missionsCompleted: 0, totalMissions: 2, quizAvg: 0, progress: 0.0 },
  { id: "scams", name: "Fraud & Scams", emoji: "🔍", color: "#3B82F6", missionsCompleted: 0, totalMissions: 2, quizAvg: 0, progress: 0.0 },
  { id: "payslip", name: "First Payslip", emoji: "📄", color: "#8B5CF6", missionsCompleted: 0, totalMissions: 2, quizAvg: 0, progress: 0.0 },
];

const QUIZ_HISTORY = [
  { id: "1", island: "Budgeting Basics", emoji: "💰", score: 90, date: "3 Feb", color: "#4FC3F7" },
  { id: "2", island: "Budgeting Basics", emoji: "💰", score: 85, date: "4 Feb", color: "#4FC3F7" },
  { id: "3", island: "Needs vs Wants", emoji: "⚖️", score: 78, date: "5 Feb", color: "#FF2E91" },
  { id: "4", island: "Budgeting Basics", emoji: "💰", score: 95, date: "6 Feb", color: "#4FC3F7" },
  { id: "5", island: "Saving Goals", emoji: "🎯", score: 85, date: "7 Feb", color: "#10B981" },
  { id: "6", island: "Needs vs Wants", emoji: "⚖️", score: 80, date: "9 Feb", color: "#FF2E91" },
];

const WEEKLY_ACTIVITY = [
  { day: "Mon", minutes: 12, challenges: 1 },
  { day: "Tue", minutes: 18, challenges: 1 },
  { day: "Wed", minutes: 8, challenges: 1 },
  { day: "Thu", minutes: 0, challenges: 0 },
  { day: "Fri", minutes: 25, challenges: 1 },
  { day: "Sat", minutes: 5, challenges: 0 },
  { day: "Sun", minutes: 0, challenges: 0 },
];

const SIMULATOR_HISTORY = [
  { id: "1", job: "Apprentice", emoji: "🔧", stars: 3, date: "2 Feb", badge: "Smart Planner" },
  { id: "2", job: "Retail Assistant", emoji: "🛍️", stars: 4, date: "5 Feb", badge: "Budget Master" },
  { id: "3", job: "Office Junior", emoji: "💻", stars: 2, date: "8 Feb", badge: "Smart Planner" },
];

const ALL_BADGES = [
  { id: "1", emoji: "🌟", label: "First Steps", description: "Complete your first mission", color: "#FFD700", earned: true, date: "28 Jan" },
  { id: "2", emoji: "📊", label: "Budget Boss", description: "Complete Budgeting island", color: "#4FC3F7", earned: true, date: "3 Feb" },
  { id: "3", emoji: "🧠", label: "Quiz Whiz", description: "Score 90%+ on a quiz", color: "#A855F7", earned: true, date: "6 Feb" },
  { id: "4", emoji: "🔥", label: "On Fire", description: "3-day streak", color: "#F59E0B", earned: true, date: "9 Feb" },
  { id: "5", emoji: "🏆", label: "Budget Master", description: "4+ stars in simulator", color: "#FFD700", earned: true, date: "5 Feb" },
  { id: "6", emoji: "💪", label: "Resilient", description: "Handle a life event in simulator", color: "#10B981", earned: true, date: "5 Feb" },
  { id: "7", emoji: "🎯", label: "Sharp Saver", description: "Complete Saving Goals island", color: "#10B981", earned: false, date: null },
  { id: "8", emoji: "🛡️", label: "Scam Proof", description: "Complete Fraud & Scams island", color: "#3B82F6", earned: false, date: null },
  { id: "9", emoji: "⚡", label: "Speed Demon", description: "7-day streak", color: "#FF2E91", earned: false, date: null },
  { id: "10", emoji: "🏅", label: "Grand Master", description: "Complete all islands", color: "#FFD700", earned: false, date: null },
];

// ═══════════════════════════════════════════════════════════════════
// ─── SHARED AMBIENT COMPONENTS ────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════
const FloatingCoin = ({ delay, startX, startY, size, opacity }: { delay: number; startX: number; startY: number; size: number; opacity: number }) => {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const fadeIn = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeIn, { toValue: 1, duration: 800, delay: delay + 400, useNativeDriver: true }).start();
    Animated.loop(Animated.sequence([
      Animated.timing(floatAnim, { toValue: 1, duration: 2400 + delay * 0.5, useNativeDriver: true }),
      Animated.timing(floatAnim, { toValue: 0, duration: 2400 + delay * 0.5, useNativeDriver: true }),
    ])).start();
  }, []);
  const translateY = floatAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -18] });
  return (
    <Animated.View style={{ position: "absolute", left: startX, top: startY, opacity: Animated.multiply(fadeIn, opacity), transform: [{ translateY }], zIndex: 0 }}>
      <Svg width={size} height={size} viewBox="0 0 40 40">
        <Defs>
          <SvgLinearGradient id={`pCoin-${delay}`} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#FFD700" />
            <Stop offset="1" stopColor="#F5A623" />
          </SvgLinearGradient>
        </Defs>
        <Circle cx="20" cy="20" r="18" fill={`url(#pCoin-${delay})`} />
        <Circle cx="20" cy="20" r="14" fill="none" stroke="#E8960C" strokeWidth="1.5" />
        <SvgText x="20" y="26" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#B8760A">£</SvgText>
      </Svg>
    </Animated.View>
  );
};

const BottomWave = () => {
  const wo = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(Animated.sequence([
      Animated.timing(wo, { toValue: 1, duration: 3000, useNativeDriver: true }),
      Animated.timing(wo, { toValue: 0, duration: 3000, useNativeDriver: true }),
    ])).start();
  }, []);
  const tx = wo.interpolate({ inputRange: [0, 1], outputRange: [0, -30] });
  return (
    <Animated.View style={[styles.waveContainer, { transform: [{ translateX: tx }] }]} pointerEvents="none">
      <Svg width={width + 60} height={140} viewBox={`0 0 ${width + 60} 140`}>
        <Path d={`M0 60 Q${width * 0.15} 30 ${width * 0.3} 55 Q${width * 0.45} 80 ${width * 0.6} 50 Q${width * 0.75} 20 ${width * 0.9} 55 Q${width * 1.05} 90 ${width + 60} 50 L${width + 60} 140 L0 140 Z`} fill="#4FC3F7" opacity={0.12} />
        <Path d={`M0 80 Q${width * 0.2} 55 ${width * 0.35} 75 Q${width * 0.5} 95 ${width * 0.65} 70 Q${width * 0.8} 45 ${width * 0.95} 75 L${width + 60} 65 L${width + 60} 140 L0 140 Z`} fill="#4FC3F7" opacity={0.08} />
      </Svg>
    </Animated.View>
  );
};

// ── Progress Ring ──
const ProgressRing = ({ progress, size, strokeWidth, color }: { progress: number; size: number; strokeWidth: number; color: string }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference * (1 - progress);
  return (
    <Svg width={size} height={size} style={{ transform: [{ rotate: "-90deg" }] }}>
      <Circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={strokeWidth} />
      <Circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth} strokeDasharray={`${circumference}`} strokeDashoffset={dashoffset} strokeLinecap="round" />
    </Svg>
  );
};

// ── Mini Bar ──
const MiniBar = ({ progress, color }: { progress: number; color: string }) => (
  <View style={styles.miniBarTrack}>
    <View style={[styles.miniBarFill, { width: `${Math.min(progress, 1) * 100}%`, backgroundColor: color }]} />
  </View>
);

// ── Animated entrance helper ──
const useFadeSlide = (count: number) => {
  const fades = useRef(Array.from({ length: count }, () => new Animated.Value(0))).current;
  const slides = useRef(Array.from({ length: count }, () => new Animated.Value(26))).current;
  useEffect(() => {
    const anims = fades.map((fade, i) =>
      Animated.parallel([
        Animated.timing(fade, { toValue: 1, duration: 380, delay: i * 90, useNativeDriver: true }),
        Animated.timing(slides[i], { toValue: 0, duration: 380, delay: i * 90, useNativeDriver: true }),
      ])
    );
    Animated.stagger(60, anims).start();
  }, []);
  const anim = (i: number) => ({ opacity: fades[i], transform: [{ translateY: slides[i] }] });
  return anim;
};

const formatPound = (n: number) => `£${n.toLocaleString("en-GB")}`;

// ═══════════════════════════════════════════════════════════════════
// ─── SVG BAR CHART (Quiz Scores) ──────────────────────────────────
// ═══════════════════════════════════════════════════════════════════
const QuizBarChart = () => {
  const barWidth = 28;
  const chartHeight = 120;
  const gap = (CHART_WIDTH - QUIZ_HISTORY.length * barWidth) / (QUIZ_HISTORY.length + 1);

  return (
    <View style={styles.chartContainer}>
      <Svg width={CHART_WIDTH} height={chartHeight + 30}>
        {/* Guide lines */}
        {[50, 70, 90].map((val) => {
          const y = chartHeight - (val / 100) * chartHeight;
          return (
            <G key={val}>
              <Line x1={0} y1={y} x2={CHART_WIDTH} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
              <SvgText x={CHART_WIDTH + 2} y={y + 4} fontSize="9" fill="rgba(255,255,255,0.25)">{val}%</SvgText>
            </G>
          );
        })}
        {/* Pass line */}
        <Line x1={0} y1={chartHeight - (70 / 100) * chartHeight} x2={CHART_WIDTH} y2={chartHeight - (70 / 100) * chartHeight} stroke="rgba(255,215,0,0.2)" strokeWidth={1} strokeDasharray="4,4" />

        {/* Bars */}
        {QUIZ_HISTORY.map((q, i) => {
          const barH = (q.score / 100) * chartHeight;
          const x = gap + i * (barWidth + gap);
          const y = chartHeight - barH;
          return (
            <G key={q.id}>
              <Defs>
                <SvgLinearGradient id={`qbar-${q.id}`} x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor={q.color} stopOpacity="0.9" />
                  <Stop offset="1" stopColor={q.color} stopOpacity="0.4" />
                </SvgLinearGradient>
              </Defs>
              <Rect x={x} y={y} width={barWidth} height={barH} rx={6} fill={`url(#qbar-${q.id})`} />
              <SvgText x={x + barWidth / 2} y={y - 5} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#FFFFFF">{q.score}%</SvgText>
              <SvgText x={x + barWidth / 2} y={chartHeight + 14} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.35)">{q.date}</SvgText>
            </G>
          );
        })}
      </Svg>
    </View>
  );
};

// ═══════════════════════════════════════════════════════════════════
// ─── SVG ACTIVITY CHART (Weekly) ──────────────────────────────────
// ═══════════════════════════════════════════════════════════════════
const WeeklyActivityChart = () => {
  const barWidth = 24;
  const chartHeight = 80;
  const maxMin = Math.max(...WEEKLY_ACTIVITY.map((d) => d.minutes), 1);
  const gap = (CHART_WIDTH - WEEKLY_ACTIVITY.length * barWidth) / (WEEKLY_ACTIVITY.length + 1);

  return (
    <View style={styles.chartContainer}>
      <Svg width={CHART_WIDTH} height={chartHeight + 28}>
        {WEEKLY_ACTIVITY.map((d, i) => {
          const barH = Math.max((d.minutes / maxMin) * chartHeight, 3);
          const x = gap + i * (barWidth + gap);
          const y = chartHeight - barH;
          const isActive = d.minutes > 0;
          return (
            <G key={d.day}>
              <Rect x={x} y={y} width={barWidth} height={barH} rx={6}
                fill={isActive ? "#A855F7" : "rgba(255,255,255,0.04)"}
                opacity={isActive ? 0.7 + (d.minutes / maxMin) * 0.3 : 1}
              />
              {isActive && (
                <SvgText x={x + barWidth / 2} y={y - 4} textAnchor="middle" fontSize="9" fontWeight="bold" fill="rgba(255,255,255,0.7)">
                  {d.minutes}m
                </SvgText>
              )}
              <SvgText x={x + barWidth / 2} y={chartHeight + 14} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.4)">
                {d.day}
              </SvgText>
              {d.challenges > 0 && (
                <Circle cx={x + barWidth / 2} cy={chartHeight + 24} r={3} fill="#FFD700" />
              )}
            </G>
          );
        })}
      </Svg>
      <View style={styles.chartLegendRow}>
        <View style={styles.chartLegendItem}>
          <View style={[styles.chartLegendDot, { backgroundColor: "#A855F7" }]} />
          <Text style={styles.chartLegendText}>Minutes active</Text>
        </View>
        <View style={styles.chartLegendItem}>
          <View style={[styles.chartLegendDot, { backgroundColor: "#FFD700", borderRadius: 4 }]} />
          <Text style={styles.chartLegendText}>Daily challenge done</Text>
        </View>
      </View>
    </View>
  );
};

// ═══════════════════════════════════════════════════════════════════
// ─── MAIN SCREEN ──────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════
export default function ProgressScreen() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    Poppins_700Bold, Poppins_400Regular, Poppins_500Medium,
    Poppins_600SemiBold, Fredoka_700Bold,
  });

  const [activeTab, setActiveTab] = useState<"overview" | "islands" | "badges">("overview");
  const anim = useFadeSlide(10);

  if (!fontsLoaded) return null;

  const earnedBadges = ALL_BADGES.filter((b) => b.earned);
  const lockedBadges = ALL_BADGES.filter((b) => !b.earned);
  const xpPercent = STUDENT.xp / STUDENT.xpToNextLevel;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <LinearGradient colors={["#1A1B4B", "#2D3A8C", "#4158D0"]} start={{ x: 0.2, y: 0 }} end={{ x: 0.8, y: 1 }} style={StyleSheet.absoluteFillObject} />

      {[...Array(10)].map((_, i) => (
        <View key={`s-${i}`} style={[styles.star, { left: (i * 83 + 41) % width, top: (i * 59 + 19) % (height * 0.32), width: i % 3 === 0 ? 4 : 2, height: i % 3 === 0 ? 4 : 2, opacity: 0.1 + (i % 4) * 0.05 }]} />
      ))}

      <FloatingCoin delay={0} startX={width * 0.06} startY={height * 0.05} size={20} opacity={0.25} />
      <FloatingCoin delay={500} startX={width * 0.84} startY={height * 0.07} size={16} opacity={0.2} />

      <BottomWave />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* ── Header ───────────────────────────────────────── */}
        <Animated.View style={[styles.header, anim(0)]}>
          <Text style={styles.headerTitle}>Progress & Stats</Text>
          <Text style={styles.headerSubtitle}>
            Keep going, {STUDENT.nickname}! 🚀
          </Text>
        </Animated.View>

        {/* ── Hero Card: Overall Progress + XP + Level ───── */}
        <Animated.View style={anim(1)}>
          <LinearGradient
            colors={["rgba(255,215,0,0.14)", "rgba(168,85,247,0.08)"]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={styles.heroCard}
          >
            <View style={styles.heroTop}>
              {/* Progress Ring */}
              <View style={styles.heroRingWrap}>
                <ProgressRing progress={STUDENT.overallProgress} size={100} strokeWidth={9} color="#FFD700" />
                <View style={styles.heroRingCenter}>
                  <Text style={styles.heroRingPercent}>{Math.round(STUDENT.overallProgress * 100)}%</Text>
                  <Text style={styles.heroRingLabel}>complete</Text>
                </View>
              </View>

              {/* Stats column */}
              <View style={styles.heroStats}>
                <View style={styles.heroStatRow}>
                  <Text style={styles.heroStatEmoji}>⚡</Text>
                  <View>
                    <Text style={styles.heroStatValue}>Level {STUDENT.level}</Text>
                    <Text style={styles.heroStatLabel}>{STUDENT.xp} / {STUDENT.xpToNextLevel} XP</Text>
                  </View>
                </View>
                <MiniBar progress={xpPercent} color="#FFD700" />

                <View style={[styles.heroStatRow, { marginTop: 14 }]}>
                  <Text style={styles.heroStatEmoji}>🔥</Text>
                  <View>
                    <Text style={styles.heroStatValue}>{STUDENT.currentStreak} day streak</Text>
                    <Text style={styles.heroStatLabel}>Best: {STUDENT.longestStreak} days</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Quick numbers row */}
            <View style={styles.heroNumbers}>
              <View style={styles.heroNumberItem}>
                <Text style={styles.heroNumberValue}>{STUDENT.missionsCompleted}</Text>
                <Text style={styles.heroNumberLabel}>Missions</Text>
              </View>
              <View style={styles.heroNumberDivider} />
              <View style={styles.heroNumberItem}>
                <Text style={styles.heroNumberValue}>{STUDENT.quizzesCompleted}</Text>
                <Text style={styles.heroNumberLabel}>Quizzes</Text>
              </View>
              <View style={styles.heroNumberDivider} />
              <View style={styles.heroNumberItem}>
                <Text style={styles.heroNumberValue}>{STUDENT.quizAverage}%</Text>
                <Text style={styles.heroNumberLabel}>Quiz Avg</Text>
              </View>
              <View style={styles.heroNumberDivider} />
              <View style={styles.heroNumberItem}>
                <Text style={styles.heroNumberValue}>{earnedBadges.length}</Text>
                <Text style={styles.heroNumberLabel}>Badges</Text>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* ── Tab Switcher ─────────────────────────────────── */}
        <Animated.View style={anim(2)}>
          <View style={styles.tabRow}>
            {(["overview", "islands", "badges"] as const).map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                activeOpacity={0.7}
                style={[styles.tabButton, activeTab === tab && styles.tabButtonActive]}
              >
                <Text style={[styles.tabButtonText, activeTab === tab && styles.tabButtonTextActive]}>
                  {tab === "overview" ? "📊 Overview" : tab === "islands" ? "🏝️ Islands" : "🏅 Badges"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* ═══ TAB: OVERVIEW ═══════════════════════════════ */}
        {activeTab === "overview" && (
          <>
            {/* Weekly Activity */}
            <Animated.View style={anim(3)}>
              <Text style={styles.sectionTitle}>📅 This Week</Text>
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>Activity</Text>
                  <Text style={styles.cardSubtitle}>
                    {WEEKLY_ACTIVITY.reduce((s, d) => s + d.minutes, 0)} min total
                  </Text>
                </View>
                <WeeklyActivityChart />
              </View>
            </Animated.View>

            {/* Quiz Performance */}
            <Animated.View style={anim(4)}>
              <Text style={styles.sectionTitle}>🧠 Quiz Scores</Text>
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>Recent Quizzes</Text>
                  <View style={styles.avgPill}>
                    <Text style={styles.avgPillText}>Avg: {STUDENT.quizAverage}%</Text>
                  </View>
                </View>
                <QuizBarChart />
                <View style={styles.passLineNote}>
                  <View style={[styles.chartLegendDot, { backgroundColor: "#FFD700", width: 10, height: 2, borderRadius: 1 }]} />
                  <Text style={styles.chartLegendText}>70% = Pass mark</Text>
                </View>
              </View>
            </Animated.View>

            {/* Simulator History */}
            <Animated.View style={anim(5)}>
              <Text style={styles.sectionTitle}>🎮 Simulator Runs</Text>
              {SIMULATOR_HISTORY.map((sim) => (
                <View key={sim.id} style={styles.simRow}>
                  <View style={styles.simRowLeft}>
                    <Text style={styles.simEmoji}>{sim.emoji}</Text>
                    <View>
                      <Text style={styles.simJob}>{sim.job}</Text>
                      <Text style={styles.simDate}>{sim.date} · {sim.badge}</Text>
                    </View>
                  </View>
                  <View style={styles.simStars}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Text key={i} style={[styles.simStar, i < sim.stars && { opacity: 1 }]}>⭐</Text>
                    ))}
                  </View>
                </View>
              ))}
            </Animated.View>

            {/* Fun Facts */}
            <Animated.View style={anim(6)}>
              <View style={styles.funFactCard}>
                <Text style={styles.funFactTitle}>🎉 Fun Facts</Text>
                <Text style={styles.funFactText}>
                  You've been learning for <Text style={{ color: "#FFD700", fontFamily: "Poppins_700Bold" }}>{STUDENT.totalDaysActive} days</Text> since joining on {new Date(STUDENT.joinedDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}. That's {STUDENT.missionsCompleted} missions and {STUDENT.simulatorRuns} simulator runs!
                </Text>
              </View>
            </Animated.View>
          </>
        )}

        {/* ═══ TAB: ISLANDS ════════════════════════════════ */}
        {activeTab === "islands" && (
          <>
            <Animated.View style={anim(3)}>
              <Text style={styles.sectionTitle}>🏝️ Island Progress</Text>
              <Text style={styles.sectionSubtitle}>
                {ISLANDS.filter((i) => i.progress === 1).length} of {ISLANDS.length} islands complete
              </Text>
            </Animated.View>

            {ISLANDS.map((island, i) => {
              const isLocked = island.progress === 0;
              const isComplete = island.progress === 1;
              return (
                <Animated.View key={island.id} style={anim(Math.min(i + 4, 9))}>
                  <View style={[styles.islandRow, isLocked && { opacity: 0.5 }]}>
                    <View style={[styles.islandEmoji, { backgroundColor: `${island.color}18` }]}>
                      <Text style={{ fontSize: 26 }}>{island.emoji}</Text>
                    </View>
                    <View style={styles.islandInfo}>
                      <View style={styles.islandNameRow}>
                        <Text style={styles.islandName}>{island.name}</Text>
                        {isComplete && <Text style={{ fontSize: 14 }}>✅</Text>}
                        {isLocked && <Text style={{ fontSize: 12 }}>🔒</Text>}
                      </View>
                      <MiniBar progress={island.progress} color={island.color} />
                      <View style={styles.islandMeta}>
                        <Text style={styles.islandMetaText}>
                          {island.missionsCompleted}/{island.totalMissions} missions
                        </Text>
                        {island.quizAvg > 0 && (
                          <>
                            <View style={styles.metaDot} />
                            <Text style={styles.islandMetaText}>Quiz avg: {island.quizAvg}%</Text>
                          </>
                        )}
                      </View>
                    </View>
                    <Text style={[styles.islandPercent, { color: island.color }]}>
                      {Math.round(island.progress * 100)}%
                    </Text>
                  </View>
                </Animated.View>
              );
            })}
          </>
        )}

        {/* ═══ TAB: BADGES ═════════════════════════════════ */}
        {activeTab === "badges" && (
          <>
            <Animated.View style={anim(3)}>
              <Text style={styles.sectionTitle}>🏅 Earned ({earnedBadges.length})</Text>
            </Animated.View>

            <Animated.View style={anim(4)}>
              <View style={styles.badgeGrid}>
                {earnedBadges.map((badge) => (
                  <View key={badge.id} style={styles.badgeCard}>
                    <LinearGradient
                      colors={[`${badge.color}18`, `${badge.color}06`]}
                      style={[styles.badgeCardInner, { borderColor: `${badge.color}25` }]}
                    >
                      <View style={[styles.badgeCircle, { backgroundColor: `${badge.color}20` }]}>
                        <Text style={styles.badgeEmoji}>{badge.emoji}</Text>
                      </View>
                      <Text style={styles.badgeLabel}>{badge.label}</Text>
                      <Text style={styles.badgeDesc}>{badge.description}</Text>
                      <Text style={styles.badgeDate}>{badge.date}</Text>
                    </LinearGradient>
                  </View>
                ))}
              </View>
            </Animated.View>

            <Animated.View style={anim(5)}>
              <Text style={styles.sectionTitle}>🔒 Locked ({lockedBadges.length})</Text>
            </Animated.View>

            <Animated.View style={anim(6)}>
              <View style={styles.badgeGrid}>
                {lockedBadges.map((badge) => (
                  <View key={badge.id} style={[styles.badgeCard, { opacity: 0.45 }]}>
                    <View style={[styles.badgeCardInner, { borderColor: "rgba(255,255,255,0.06)", backgroundColor: "rgba(255,255,255,0.02)" }]}>
                      <View style={[styles.badgeCircle, { backgroundColor: "rgba(255,255,255,0.06)" }]}>
                        <Text style={[styles.badgeEmoji, { opacity: 0.4 }]}>❓</Text>
                      </View>
                      <Text style={styles.badgeLabel}>{badge.label}</Text>
                      <Text style={styles.badgeDesc}>{badge.description}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </Animated.View>
          </>
        )}

        <View style={{ height: 120 }} />
      </ScrollView>
    </View>
  );
}

// ═══════════════════════════════════════════════════════════════════
// ─── STYLES ───────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════
const styles = StyleSheet.create({
  container: { flex: 1, overflow: "hidden" },
  star: { position: "absolute", borderRadius: 4, backgroundColor: "#FFFFFF", zIndex: 0 },
  waveContainer: { position: "absolute", bottom: 0, left: -30, right: -30, height: 140, zIndex: 0 },
  scrollView: { flex: 1, zIndex: 1 },
  scrollContent: {
    paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight ?? 0) + 12 : 56,
    paddingHorizontal: 20,
  },

  // ── Header ──
  header: { marginBottom: 20 },
  headerTitle: {
    fontFamily: "Fredoka_700Bold", fontSize: 28, color: "#FFFFFF",
    textShadowColor: "rgba(0,0,0,0.2)", textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4,
  },
  headerSubtitle: { fontFamily: "Poppins_400Regular", fontSize: 14, color: "rgba(255,255,255,0.5)", marginTop: 4 },

  // ── Hero Card ──
  heroCard: {
    borderRadius: 22, borderWidth: 1, borderColor: "rgba(255,255,255,0.08)",
    padding: 20, marginBottom: 20,
  },
  heroTop: { flexDirection: "row", alignItems: "center", gap: 20, marginBottom: 20 },
  heroRingWrap: { width: 100, height: 100, alignItems: "center", justifyContent: "center" },
  heroRingCenter: { position: "absolute", alignItems: "center" },
  heroRingPercent: { fontFamily: "Poppins_700Bold", fontSize: 22, color: "#FFFFFF", lineHeight: 26 },
  heroRingLabel: { fontFamily: "Poppins_400Regular", fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: -2 },
  heroStats: { flex: 1 },
  heroStatRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  heroStatEmoji: { fontSize: 20 },
  heroStatValue: { fontFamily: "Poppins_700Bold", fontSize: 15, color: "#FFFFFF" },
  heroStatLabel: { fontFamily: "Poppins_400Regular", fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 1 },
  heroNumbers: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 16, paddingVertical: 14,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.06)",
  },
  heroNumberItem: { flex: 1, alignItems: "center" },
  heroNumberValue: { fontFamily: "Poppins_700Bold", fontSize: 18, color: "#FFFFFF" },
  heroNumberLabel: { fontFamily: "Poppins_400Regular", fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 2 },
  heroNumberDivider: { width: 1, height: 30, backgroundColor: "rgba(255,255,255,0.08)" },

  // ── Tab Row ──
  tabRow: {
    flexDirection: "row", gap: 8, marginBottom: 22,
    backgroundColor: "rgba(255,255,255,0.04)", borderRadius: 14, padding: 4,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.06)",
  },
  tabButton: { flex: 1, paddingVertical: 10, borderRadius: 12, alignItems: "center" },
  tabButtonActive: { backgroundColor: "rgba(255,215,0,0.15)" },
  tabButtonText: { fontFamily: "Poppins_600SemiBold", fontSize: 12, color: "rgba(255,255,255,0.4)" },
  tabButtonTextActive: { color: "#FFD700" },

  // ── Section ──
  sectionTitle: {
    fontFamily: "Fredoka_700Bold", fontSize: 20, color: "#FFFFFF", marginBottom: 12,
    textShadowColor: "rgba(0,0,0,0.15)", textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 3,
  },
  sectionSubtitle: { fontFamily: "Poppins_400Regular", fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: -8, marginBottom: 14 },

  // ── Card ──
  card: {
    backgroundColor: "rgba(255,255,255,0.04)", borderRadius: 18, borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)", padding: 18, marginBottom: 20,
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
  cardTitle: { fontFamily: "Poppins_700Bold", fontSize: 15, color: "#FFFFFF" },
  cardSubtitle: { fontFamily: "Poppins_400Regular", fontSize: 12, color: "rgba(255,255,255,0.4)" },

  avgPill: {
    backgroundColor: "rgba(255,215,0,0.15)", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10,
  },
  avgPillText: { fontFamily: "Poppins_600SemiBold", fontSize: 11, color: "#FFD700" },

  // ── Chart ──
  chartContainer: { marginBottom: 4 },
  chartLegendRow: { flexDirection: "row", gap: 16, marginTop: 8 },
  chartLegendItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  chartLegendDot: { width: 8, height: 8, borderRadius: 4 },
  chartLegendText: { fontFamily: "Poppins_400Regular", fontSize: 10, color: "rgba(255,255,255,0.35)" },
  passLineNote: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 6 },

  // ── Mini Bar ──
  miniBarTrack: { height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.06)", overflow: "hidden", width: "100%", marginTop: 6 },
  miniBarFill: { height: "100%", borderRadius: 3 },

  // ── Simulator History ──
  simRow: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,0.04)", borderRadius: 14, borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)", paddingVertical: 14, paddingHorizontal: 16, marginBottom: 8,
  },
  simRowLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  simEmoji: { fontSize: 24 },
  simJob: { fontFamily: "Poppins_600SemiBold", fontSize: 14, color: "rgba(255,255,255,0.8)" },
  simDate: { fontFamily: "Poppins_400Regular", fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 },
  simStars: { flexDirection: "row", gap: 2 },
  simStar: { fontSize: 14, opacity: 0.15 },

  // ── Fun Fact ──
  funFactCard: {
    backgroundColor: "rgba(79,195,247,0.08)", borderRadius: 18, borderWidth: 1,
    borderColor: "rgba(79,195,247,0.12)", padding: 18, marginTop: 8, marginBottom: 8,
  },
  funFactTitle: { fontFamily: "Poppins_700Bold", fontSize: 15, color: "#4FC3F7", marginBottom: 8 },
  funFactText: { fontFamily: "Poppins_400Regular", fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 20 },

  // ── Island Rows ──
  islandRow: {
    flexDirection: "row", alignItems: "center", gap: 14,
    backgroundColor: "rgba(255,255,255,0.04)", borderRadius: 16, borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)", paddingVertical: 14, paddingHorizontal: 14, marginBottom: 10,
  },
  islandEmoji: { width: 50, height: 50, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  islandInfo: { flex: 1 },
  islandNameRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 6 },
  islandName: { fontFamily: "Poppins_600SemiBold", fontSize: 14, color: "#FFFFFF" },
  islandMeta: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 4 },
  islandMetaText: { fontFamily: "Poppins_400Regular", fontSize: 11, color: "rgba(255,255,255,0.35)" },
  metaDot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: "rgba(255,255,255,0.15)" },
  islandPercent: { fontFamily: "Poppins_700Bold", fontSize: 16 },

  // ── Badge Grid ──
  badgeGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 20 },
  badgeCard: { width: (width - 50) / 2 },
  badgeCardInner: {
    borderRadius: 18, borderWidth: 1, padding: 16, alignItems: "center", gap: 6, minHeight: 140,
  },
  badgeCircle: {
    width: 52, height: 52, borderRadius: 26, alignItems: "center", justifyContent: "center",
    borderWidth: 1, borderColor: "rgba(255,255,255,0.06)",
  },
  badgeEmoji: { fontSize: 24 },
  badgeLabel: { fontFamily: "Poppins_600SemiBold", fontSize: 13, color: "#FFFFFF", textAlign: "center" },
  badgeDesc: { fontFamily: "Poppins_400Regular", fontSize: 10, color: "rgba(255,255,255,0.4)", textAlign: "center", lineHeight: 14 },
  badgeDate: { fontFamily: "Poppins_400Regular", fontSize: 10, color: "rgba(255,255,255,0.25)", marginTop: 2 },
});