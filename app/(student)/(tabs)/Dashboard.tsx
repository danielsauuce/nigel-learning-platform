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
import React, { useEffect, useRef } from 'react';
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
const CARD_GAP = 12;

// ─── Mock Data ─────────────────────────────────────────────────────
const STUDENT = {
  nickname: 'Explorer',
  overallProgress: 0.35,
  missionsCompleted: 7,
  totalMissions: 20,
  quizAverage: 82,
  currentStreak: 3,
};

const DAILY_CHALLENGE = {
  title: 'Quick Quiz: Needs vs Wants',
  description: 'Can you sort these 5 items correctly?',
  xpReward: 25,
  completed: false,
};

const NEXT_MISSION = {
  islandName: 'Saving Goals',
  islandEmoji: '🎯',
  missionTitle: 'Mission 3: The 50/30/20 Rule',
  islandColor: '#10B981',
  progress: 0.6,
};

const RECENT_BADGES = [
  { id: '1', emoji: '🌟', label: 'First Steps', color: '#FFD700' },
  { id: '2', emoji: '📊', label: 'Budget Boss', color: '#4FC3F7' },
  { id: '3', emoji: '🧠', label: 'Quiz Whiz', color: '#A855F7' },
];

const ISLANDS_PREVIEW = [
  { id: 'budgeting', name: 'Budgeting Basics', emoji: '💰', color: '#4FC3F7', progress: 1.0 },
  { id: 'needs-wants', name: 'Needs vs Wants', emoji: '⚖️', color: '#FF2E91', progress: 0.75 },
  { id: 'saving', name: 'Saving Goals', emoji: '🎯', color: '#10B981', progress: 0.6 },
  { id: 'banking', name: 'Banking & Cards', emoji: '💳', color: '#A855F7', progress: 0.0 },
  { id: 'interest', name: 'Interest', emoji: '📈', color: '#F59E0B', progress: 0.0 },
];

// ─── Floating Coin (matches splash aesthetic) ──────────────────────
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
          <SvgLinearGradient id={`coinGrad-${delay}`} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#FFD700" />
            <Stop offset="1" stopColor="#F5A623" />
          </SvgLinearGradient>
        </Defs>
        <Circle cx="20" cy="20" r="18" fill={`url(#coinGrad-${delay})`} />
        <Circle cx="20" cy="20" r="14" fill="none" stroke="#E8960C" strokeWidth="1.5" />
        <SvgText x="20" y="26" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#B8760A">
          £
        </SvgText>
      </Svg>
    </Animated.View>
  );
};

// ─── Bottom Wave Decoration (matches splash) ───────────────────────
const BottomWave = () => {
  const waveOffset = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(waveOffset, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(waveOffset, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
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
      <Svg
        width={width + 60}
        height={140}
        viewBox={`0 0 ${width + 60} 140`}
        style={{ position: 'absolute', bottom: 0 }}
      >
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

// ─── Progress Ring SVG ─────────────────────────────────────────────
const ProgressRing = ({
  progress,
  size,
  strokeWidth,
  color,
}: {
  progress: number;
  size: number;
  strokeWidth: number;
  color: string;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={strokeWidth}
      />
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference}`}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
      />
    </Svg>
  );
};

// ─── Small inline progress bar ─────────────────────────────────────
const MiniProgressBar = ({ progress, color }: { progress: number; color: string }) => (
  <View style={styles.miniProgressTrack}>
    <View
      style={[styles.miniProgressFill, { width: `${progress * 100}%`, backgroundColor: color }]}
    />
  </View>
);

// ─── Quick-access card icons (SVG) ─────────────────────────────────
const SimulatorIcon = () => (
  <Svg width={36} height={36} viewBox="0 0 36 36">
    <Rect x="4" y="8" width="28" height="22" rx="4" fill="none" stroke="#FFD700" strokeWidth="2" />
    <Path d="M4 15 L32 15" stroke="#FFD700" strokeWidth="1.5" />
    <Rect x="8" y="19" width="8" height="3" rx="1" fill="#FFD700" opacity={0.6} />
    <Rect x="8" y="24" width="12" height="3" rx="1" fill="#FFD700" opacity={0.4} />
    <Circle cx="27" cy="23" r="3.5" fill="#FFD700" opacity={0.7} />
    <SvgText x="27" y="25.5" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#1A1B4B">
      £
    </SvgText>
  </Svg>
);

const AchievementsIcon = () => (
  <Svg width={36} height={36} viewBox="0 0 36 36">
    <Path
      d="M18 4 L21 13 L31 13 L23 19 L26 28 L18 22 L10 28 L13 19 L5 13 L15 13 Z"
      fill="none"
      stroke="#FF2E91"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <Path
      d="M18 8 L20 13.5 L26 13.5 L21 17.5 L23 23 L18 19 L13 23 L15 17.5 L10 13.5 L16 13.5 Z"
      fill="#FF2E91"
      opacity={0.25}
    />
  </Svg>
);

const FamilyIcon = () => (
  <Svg width={36} height={36} viewBox="0 0 36 36">
    <Circle cx="12" cy="12" r="5" fill="none" stroke="#10B981" strokeWidth="2" />
    <Circle cx="24" cy="12" r="5" fill="none" stroke="#10B981" strokeWidth="2" />
    <Path
      d="M4 30 Q4 22 12 20 Q16 19 18 20"
      fill="none"
      stroke="#10B981"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Path
      d="M32 30 Q32 22 24 20 Q20 19 18 20"
      fill="none"
      stroke="#10B981"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Circle cx="18" cy="26" r="3" fill="#10B981" opacity={0.4} />
  </Svg>
);

// ─── Main Dashboard ────────────────────────────────────────────────
export default function StudentDashboard() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Fredoka_700Bold,
  });

  // Staggered entrance
  const fadeAnims = useRef(Array.from({ length: 6 }, () => new Animated.Value(0))).current;
  const slideAnims = useRef(Array.from({ length: 6 }, () => new Animated.Value(25))).current;

  useEffect(() => {
    const animations = fadeAnims.map((fade, i) =>
      Animated.parallel([
        Animated.timing(fade, { toValue: 1, duration: 350, delay: i * 100, useNativeDriver: true }),
        Animated.timing(slideAnims[i], {
          toValue: 0,
          duration: 350,
          delay: i * 100,
          useNativeDriver: true,
        }),
      ]),
    );
    Animated.stagger(80, animations).start();
  }, []);

  const anim = (index: number) => ({
    opacity: fadeAnims[index],
    transform: [{ translateY: slideAnims[index] }],
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* ── Full-screen gradient background (matches splash) ── */}
      <LinearGradient
        colors={['#1A1B4B', '#2D3A8C', '#4158D0']}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      {/* ── Sparkle dots (matches splash) ── */}
      {[...Array(12)].map((_, i) => (
        <View
          key={`star-${i}`}
          style={[
            styles.star,
            {
              left: (i * 97 + 23) % width,
              top: (i * 71 + 15) % (height * 0.4),
              width: i % 3 === 0 ? 4 : 2,
              height: i % 3 === 0 ? 4 : 2,
              opacity: 0.15 + (i % 4) * 0.08,
            },
          ]}
        />
      ))}

      {/* ── Floating coins (subtle, behind content) ── */}
      <FloatingCoin
        delay={0}
        startX={width * 0.05}
        startY={height * 0.06}
        size={22}
        opacity={0.3}
      />
      <FloatingCoin
        delay={400}
        startX={width * 0.82}
        startY={height * 0.04}
        size={18}
        opacity={0.25}
      />
      <FloatingCoin
        delay={200}
        startX={width * 0.7}
        startY={height * 0.15}
        size={16}
        opacity={0.2}
      />

      {/* ── Bottom wave decoration ── */}
      <BottomWave />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header: Greeting + Progress Ring ──────────────── */}
        <Animated.View style={[styles.headerSection, anim(0)]}>
          <View style={styles.greetingRow}>
            <View style={styles.greetingText}>
              <Text style={styles.greetingLabel}>Welcome back,</Text>
              <Text style={styles.greetingName}>{STUDENT.nickname} 👋</Text>
              <Text style={styles.streakBadge}>🔥 {STUDENT.currentStreak} day streak</Text>
            </View>
            <View style={styles.progressRingContainer}>
              <ProgressRing
                progress={STUDENT.overallProgress}
                size={76}
                strokeWidth={7}
                color="#FFD700"
              />
              <View style={styles.progressRingLabel}>
                <Text style={styles.progressPercent}>
                  {Math.round(STUDENT.overallProgress * 100)}%
                </Text>
                <Text style={styles.progressCaption}>done</Text>
              </View>
            </View>
          </View>

          {/* Quick stats row */}
          <View style={styles.quickStats}>
            <View style={styles.statPill}>
              <Text style={styles.statValue}>
                {STUDENT.missionsCompleted}/{STUDENT.totalMissions}
              </Text>
              <Text style={styles.statLabel}>Missions</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statPill}>
              <Text style={styles.statValue}>{STUDENT.quizAverage}%</Text>
              <Text style={styles.statLabel}>Quiz Avg</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statPill}>
              <Text style={styles.statValue}>{RECENT_BADGES.length}</Text>
              <Text style={styles.statLabel}>Badges</Text>
            </View>
          </View>
        </Animated.View>

        {/* ── Daily Challenge ───────────────────────────────── */}
        <Animated.View style={anim(1)}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => {
              router.push('/DailyChallenge');
            }}
          >
            <LinearGradient
              colors={['rgba(255,215,0,0.18)', 'rgba(245,166,35,0.06)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.dailyChallengeCard}
            >
              <View style={styles.dailyChallengeIcon}>
                <Text style={{ fontSize: 28 }}>⚡</Text>
              </View>
              <View style={styles.dailyChallengeText}>
                <Text style={styles.dailyChallengeLabel}>Daily Challenge</Text>
                <Text style={styles.dailyChallengeTitle}>{DAILY_CHALLENGE.title}</Text>
                <Text style={styles.dailyChallengeDesc}>{DAILY_CHALLENGE.description}</Text>
              </View>
              <View style={styles.xpBadge}>
                <Text style={styles.xpText}>+{DAILY_CHALLENGE.xpReward} XP</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* ── Continue Learning ─────────────────────────────── */}
        <Animated.View style={anim(2)}>
          <Text style={styles.sectionTitle}>Continue Learning</Text>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => {
              // router.push("/(student)/(tabs)/islands")
            }}
          >
            <LinearGradient
              colors={[`${NEXT_MISSION.islandColor}22`, `${NEXT_MISSION.islandColor}08`]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.continueLearningCard}
            >
              <View
                style={[
                  styles.islandEmojiCircle,
                  { backgroundColor: `${NEXT_MISSION.islandColor}25` },
                ]}
              >
                <Text style={{ fontSize: 30 }}>{NEXT_MISSION.islandEmoji}</Text>
              </View>
              <View style={styles.continueLearningText}>
                <Text style={styles.continueIslandName}>{NEXT_MISSION.islandName}</Text>
                <Text style={styles.continueMissionTitle}>{NEXT_MISSION.missionTitle}</Text>
                <MiniProgressBar
                  progress={NEXT_MISSION.progress}
                  color={NEXT_MISSION.islandColor}
                />
              </View>
              <View style={styles.playButton}>
                <LinearGradient
                  colors={[NEXT_MISSION.islandColor, `${NEXT_MISSION.islandColor}CC`]}
                  style={styles.playButtonGradient}
                >
                  <Text style={styles.playArrow}>▶</Text>
                </LinearGradient>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* ── Quick Access Grid ─────────────────────────────── */}
        <Animated.View style={anim(3)}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <View style={styles.quickAccessGrid}>
            <TouchableOpacity
              style={styles.quickAccessCard}
              activeOpacity={0.85}
              onPress={() => {
                router.push('/BudgetSimulator');
              }}
            >
              <LinearGradient
                colors={['rgba(255,215,0,0.15)', 'rgba(255,215,0,0.04)']}
                style={styles.quickAccessGradient}
              >
                <SimulatorIcon />
                <Text style={styles.quickAccessLabel}>Budget{'\n'}Simulator</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickAccessCard}
              activeOpacity={0.85}
              onPress={() => {
                router.push('/(student)/Progress');
              }}
            >
              <LinearGradient
                colors={['rgba(255,46,145,0.15)', 'rgba(255,46,145,0.04)']}
                style={styles.quickAccessGradient}
              >
                <AchievementsIcon />
                <Text style={styles.quickAccessLabel}>My{'\n'}Achievements</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickAccessCard}
              activeOpacity={0.85}
              onPress={() => {
                router.push('/(student)/FamilyShare');
              }}
            >
              <LinearGradient
                colors={['rgba(16,185,129,0.15)', 'rgba(16,185,129,0.04)']}
                style={styles.quickAccessGradient}
              >
                <FamilyIcon />
                <Text style={styles.quickAccessLabel}>Share with{'\n'}Family</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* ── Islands Overview ──────────────────────────────── */}
        <Animated.View style={anim(4)}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Islands</Text>
            <TouchableOpacity
              onPress={() => {
                // router.push("/(student)/(tabs)/islands")
              }}
            >
              <Text style={styles.seeAllText}>See all →</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.islandsScroll}
          >
            {ISLANDS_PREVIEW.map((island) => (
              <TouchableOpacity
                key={island.id}
                activeOpacity={0.85}
                onPress={() => {
                  // router.push(`/(student)/island/${island.id}`)
                }}
              >
                <View style={styles.islandMiniCard}>
                  <LinearGradient
                    colors={[`${island.color}20`, `${island.color}08`]}
                    style={styles.islandMiniGradient}
                  >
                    <Text style={styles.islandMiniEmoji}>{island.emoji}</Text>
                    <Text style={styles.islandMiniName} numberOfLines={1}>
                      {island.name}
                    </Text>
                    <MiniProgressBar progress={island.progress} color={island.color} />
                    <Text style={styles.islandMiniPercent}>
                      {island.progress === 1
                        ? '✅ Complete'
                        : island.progress === 0
                          ? '🔒 Locked'
                          : `${Math.round(island.progress * 100)}%`}
                    </Text>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>

        {/* ── Recent Badges ─────────────────────────────────── */}
        <Animated.View style={anim(5)}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Badges</Text>
            <TouchableOpacity
              onPress={() => {
                // router.push("/(student)/achievements")
              }}
            >
              <Text style={styles.seeAllText}>View all →</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.badgesRow}>
            {RECENT_BADGES.map((badge) => (
              <View key={badge.id} style={styles.badgeItem}>
                <View style={[styles.badgeCircle, { backgroundColor: `${badge.color}20` }]}>
                  <Text style={styles.badgeEmoji}>{badge.emoji}</Text>
                </View>
                <Text style={styles.badgeLabel}>{badge.label}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Bottom spacer for tab bar */}
        <View style={{ height: 100 }} />
      </ScrollView>
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
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + 16 : 60,
    paddingHorizontal: 20,
  },

  // ── Header ──
  headerSection: {
    marginBottom: 20,
  },
  greetingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greetingText: {
    flex: 1,
  },
  greetingLabel: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: 'rgba(255,255,255,0.55)',
  },
  greetingName: {
    fontFamily: 'Fredoka_700Bold',
    fontSize: 28,
    color: '#FFFFFF',
    lineHeight: 34,
    marginTop: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  streakBadge: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 13,
    color: '#FFD700',
    marginTop: 6,
  },
  progressRingContainer: {
    width: 76,
    height: 76,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressRingLabel: {
    position: 'absolute',
    alignItems: 'center',
  },
  progressPercent: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 20,
  },
  progressCaption: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 10,
    color: 'rgba(255,255,255,0.45)',
    marginTop: -2,
  },
  quickStats: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 8,
    marginTop: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  statPill: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 17,
    color: '#FFFFFF',
  },
  statLabel: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 11,
    color: 'rgba(255,255,255,0.45)',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },

  // ── Daily Challenge ──
  dailyChallengeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.15)',
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 14,
    marginBottom: 24,
  },
  dailyChallengeIcon: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: 'rgba(255,215,0,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dailyChallengeText: {
    flex: 1,
  },
  dailyChallengeLabel: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 11,
    color: '#FFD700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  dailyChallengeTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 2,
  },
  dailyChallengeDesc: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 2,
  },
  xpBadge: {
    backgroundColor: 'rgba(255,215,0,0.18)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  xpText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 12,
    color: '#FFD700',
  },

  // ── Continue Learning ──
  continueLearningCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 14,
    marginBottom: 24,
  },
  islandEmojiCircle: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueLearningText: {
    flex: 1,
  },
  continueIslandName: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 0.3,
  },
  continueMissionTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 2,
    marginBottom: 8,
  },
  playButton: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  playButtonGradient: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playArrow: {
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 2,
  },

  // ── Section titles ──
  sectionTitle: {
    fontFamily: 'Fredoka_700Bold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  seeAllText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 13,
    color: '#4FC3F7',
  },

  // ── Quick Access Grid ──
  quickAccessGrid: {
    flexDirection: 'row',
    gap: CARD_GAP,
    marginBottom: 24,
  },
  quickAccessCard: {
    flex: 1,
    borderRadius: 18,
    overflow: 'hidden',
  },
  quickAccessGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 8,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    gap: 10,
    minHeight: 120,
  },
  quickAccessLabel: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 12,
    color: 'rgba(255,255,255,0.75)',
    textAlign: 'center',
    lineHeight: 16,
  },

  // ── Islands horizontal scroll ──
  islandsScroll: {
    gap: 12,
    paddingRight: 20,
    paddingBottom: 4,
  },
  islandMiniCard: {
    width: 130,
    borderRadius: 16,
    overflow: 'hidden',
  },
  islandMiniGradient: {
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    gap: 6,
  },
  islandMiniEmoji: {
    fontSize: 28,
  },
  islandMiniName: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  islandMiniPercent: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 11,
    color: 'rgba(255,255,255,0.45)',
    marginTop: 2,
  },

  // ── Mini progress bar ──
  miniProgressTrack: {
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',
    width: '100%',
  },
  miniProgressFill: {
    height: '100%',
    borderRadius: 3,
  },

  // ── Recent Badges ──
  badgesRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
  },
  badgeItem: {
    alignItems: 'center',
    gap: 6,
  },
  badgeCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  badgeEmoji: {
    fontSize: 24,
  },
  badgeLabel: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 11,
    color: 'rgba(255,255,255,0.55)',
    textAlign: 'center',
  },
});
