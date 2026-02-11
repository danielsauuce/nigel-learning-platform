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
  Alert,
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

// ═══════════════════════════════════════════════════════════════════
// ─── TYPES ────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════
type ShareStep = 'overview' | 'consent' | 'generate';

interface ActiveLink {
  id: string;
  code: string;
  createdAt: string;
  expiresAt: string;
  viewed: boolean;
  feedbackReceived: boolean;
}

// ═══════════════════════════════════════════════════════════════════
// ─── MOCK DATA ────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════
const STUDENT = {
  nickname: 'Explorer',
  firstName: 'Alex',
};

const SUMMARY_PREVIEW = {
  headline: 'Great progress this week! 🎉',
  highlights: [
    'Completed the Budgeting Basics island — showing real confidence with money planning!',
    'Scored 85% on the latest Saving Goals quiz — strong understanding of saving strategies.',
  ],
  badges: [
    { emoji: '🌟', label: 'First Steps', description: 'Completed first mission' },
    { emoji: '📊', label: 'Budget Boss', description: 'Finished Budgeting Basics' },
    { emoji: '🧠', label: 'Quiz Whiz', description: 'Scored 90%+ on a quiz' },
    { emoji: '🔥', label: 'On Fire', description: '3-day learning streak' },
  ],
  conversationStarters: [
    "Ask: What's one thing you'd save up for if you could?",
    "Chat about: What's the difference between something you need and something you want?",
    'Try: Together, look at a household bill and talk about what the different parts mean.',
  ],
};

const ACTIVE_LINKS: ActiveLink[] = [
  {
    id: '1',
    code: 'FAMILY-7K9X',
    createdAt: '2026-02-07',
    expiresAt: '2026-02-14',
    viewed: true,
    feedbackReceived: true,
  },
];

const CONSENT_ITEMS = [
  {
    id: 'name',
    emoji: '👤',
    label: 'Your first name',
    detail: 'Only your first name is shown — no surname, school, or personal details.',
  },
  {
    id: 'badges',
    emoji: '🏅',
    label: "Badges you've earned",
    detail: "Shows which achievements you've unlocked, like 'Budget Boss' or 'Quiz Whiz'.",
  },
  {
    id: 'highlights',
    emoji: '✨',
    label: 'Positive highlights',
    detail: "1–2 encouraging sentences about what you've done well. No mistakes are shown.",
  },
  {
    id: 'starters',
    emoji: '💬',
    label: 'Conversation starters',
    detail: "2–3 friendly questions your family can ask, like 'What would you save up for?'",
  },
];

const NOT_SHARED = [
  'Quiz scores or grades',
  'Mistakes or wrong answers',
  'How long you spend on the app',
  'Any personal or school data',
];

// ═══════════════════════════════════════════════════════════════════
// ─── AMBIENT COMPONENTS ───────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════
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
      delay: delay + 400,
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
  const translateY = floatAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -18] });
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
          <SvgLinearGradient id={`fsCoin-${delay}`} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#FFD700" />
            <Stop offset="1" stopColor="#F5A623" />
          </SvgLinearGradient>
        </Defs>
        <Circle cx="20" cy="20" r="18" fill={`url(#fsCoin-${delay})`} />
        <Circle cx="20" cy="20" r="14" fill="none" stroke="#E8960C" strokeWidth="1.5" />
        <SvgText x="20" y="26" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#B8760A">
          £
        </SvgText>
      </Svg>
    </Animated.View>
  );
};

const BottomWave = () => {
  const wo = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(wo, { toValue: 1, duration: 3000, useNativeDriver: true }),
        Animated.timing(wo, { toValue: 0, duration: 3000, useNativeDriver: true }),
      ]),
    ).start();
  }, []);
  const tx = wo.interpolate({ inputRange: [0, 1], outputRange: [0, -30] });
  return (
    <Animated.View
      style={[styles.waveContainer, { transform: [{ translateX: tx }] }]}
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

// ── Fade/Slide helper ──
const useFadeSlide = (count: number) => {
  const fades = useRef(Array.from({ length: count }, () => new Animated.Value(0))).current;
  const slides = useRef(Array.from({ length: count }, () => new Animated.Value(28))).current;
  const play = useCallback(() => {
    fades.forEach((f) => f.setValue(0));
    slides.forEach((s) => s.setValue(28));
    Animated.stagger(
      50,
      fades.map((fade, i) =>
        Animated.parallel([
          Animated.timing(fade, {
            toValue: 1,
            duration: 380,
            delay: i * 80,
            useNativeDriver: true,
          }),
          Animated.timing(slides[i], {
            toValue: 0,
            duration: 380,
            delay: i * 80,
            useNativeDriver: true,
          }),
        ]),
      ),
    ).start();
  }, []);
  const anim = (i: number) => ({ opacity: fades[i], transform: [{ translateY: slides[i] }] });
  return { play, anim };
};

// ── SVG Icons ──
const ShieldIcon = ({ size = 48 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48">
    <Path
      d="M24 4 L40 12 L40 24 Q40 36 24 44 Q8 36 8 24 L8 12 Z"
      fill="none"
      stroke="#10B981"
      strokeWidth="2.5"
    />
    <Path
      d="M24 8 L36 14 L36 24 Q36 34 24 40 Q12 34 12 24 L12 14 Z"
      fill="#10B981"
      opacity={0.12}
    />
    <Path
      d="M17 24 L22 29 L31 19"
      fill="none"
      stroke="#10B981"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const LinkIcon = ({ size = 40 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 40 40">
    <Path d="M16 24 L24 16" fill="none" stroke="#A855F7" strokeWidth="2.5" strokeLinecap="round" />
    <Path
      d="M22 14 L26 10 Q30 6 34 10 L30 14 Q34 18 30 22 L26 26"
      fill="none"
      stroke="#A855F7"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <Path
      d="M18 26 L14 30 Q10 34 6 30 L10 26 Q6 22 10 18 L14 14"
      fill="none"
      stroke="#A855F7"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </Svg>
);

const QRPlaceholder = () => (
  <Svg width={140} height={140} viewBox="0 0 140 140">
    <Rect
      x="4"
      y="4"
      width="132"
      height="132"
      rx="12"
      fill="rgba(255,255,255,0.06)"
      stroke="rgba(255,255,255,0.1)"
      strokeWidth="2"
    />
    {/* Simplified QR pattern */}
    <Rect x="16" y="16" width="32" height="32" rx="4" fill="rgba(255,255,255,0.7)" />
    <Rect x="22" y="22" width="20" height="20" rx="2" fill="#1A1B4B" />
    <Rect x="28" y="28" width="8" height="8" rx="1" fill="rgba(255,255,255,0.7)" />

    <Rect x="92" y="16" width="32" height="32" rx="4" fill="rgba(255,255,255,0.7)" />
    <Rect x="98" y="22" width="20" height="20" rx="2" fill="#1A1B4B" />
    <Rect x="104" y="28" width="8" height="8" rx="1" fill="rgba(255,255,255,0.7)" />

    <Rect x="16" y="92" width="32" height="32" rx="4" fill="rgba(255,255,255,0.7)" />
    <Rect x="22" y="98" width="20" height="20" rx="2" fill="#1A1B4B" />
    <Rect x="28" y="104" width="8" height="8" rx="1" fill="rgba(255,255,255,0.7)" />

    {/* Data dots */}
    {[56, 68, 80, 92, 104].map((x) =>
      [56, 68, 80, 92, 104].map((y) => {
        const show = (x + y) % 24 < 16;
        return show ? (
          <Rect
            key={`${x}-${y}`}
            x={x}
            y={y}
            width="8"
            height="8"
            rx="1"
            fill="rgba(255,255,255,0.5)"
          />
        ) : null;
      }),
    )}
    {[56, 68, 80].map((x) =>
      [16, 28, 40].map((y) => {
        const show = (x * y) % 7 < 4;
        return show ? (
          <Rect
            key={`t-${x}-${y}`}
            x={x}
            y={y}
            width="8"
            height="8"
            rx="1"
            fill="rgba(255,255,255,0.4)"
          />
        ) : null;
      }),
    )}
    {[16, 28, 40].map((x) =>
      [56, 68, 80].map((y) => {
        const show = (x + y) % 5 < 3;
        return show ? (
          <Rect
            key={`l-${x}-${y}`}
            x={x}
            y={y}
            width="8"
            height="8"
            rx="1"
            fill="rgba(255,255,255,0.4)"
          />
        ) : null;
      }),
    )}
  </Svg>
);

// ═══════════════════════════════════════════════════════════════════
// ─── STEP 1: OVERVIEW ─────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════
const OverviewStep = ({
  onContinue,
  activeLinks,
  onRevokeLink,
}: {
  onContinue: () => void;
  activeLinks: ActiveLink[];
  onRevokeLink: (id: string) => void;
}) => {
  const { play, anim } = useFadeSlide(9);
  useEffect(() => {
    play();
  }, []);

  const hasActiveLinks = activeLinks.length > 0;

  return (
    <>
      {/* Header */}
      <Animated.View style={anim(0)}>
        <View style={styles.stepHeaderRow}>
          <View
            style={[
              styles.stepIconCircle,
              { backgroundColor: 'rgba(16,185,129,0.12)', borderColor: 'rgba(16,185,129,0.18)' },
            ]}
          >
            <Text style={{ fontSize: 30 }}>👨‍👩‍👧</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.stepTitle}>Share with Family</Text>
            <Text style={styles.stepSubtitle}>Let your family celebrate with you</Text>
          </View>
        </View>
      </Animated.View>

      <Animated.View style={anim(1)}>
        <Text style={styles.stepDescription}>
          You can share a simple, positive summary of your learning progress with a parent or
          guardian. It's completely optional and you're always in control.
        </Text>
      </Animated.View>

      {/* Preview card — What they'll see */}
      <Animated.View style={anim(2)}>
        <Text style={styles.sectionTitle}>👀 What your family will see</Text>
        <View style={styles.previewCard}>
          {/* Mock summary */}
          <Text style={styles.previewHeadline}>{SUMMARY_PREVIEW.headline}</Text>

          <View style={styles.previewSection}>
            <Text style={styles.previewLabel}>HIGHLIGHTS</Text>
            {SUMMARY_PREVIEW.highlights.map((h, i) => (
              <View key={i} style={styles.previewHighlightRow}>
                <Text style={styles.previewBullet}>✨</Text>
                <Text style={styles.previewHighlightText}>{h}</Text>
              </View>
            ))}
          </View>

          <View style={styles.previewSection}>
            <Text style={styles.previewLabel}>BADGES EARNED</Text>
            <View style={styles.previewBadgeRow}>
              {SUMMARY_PREVIEW.badges.map((b, i) => (
                <View key={i} style={styles.previewBadge}>
                  <Text style={styles.previewBadgeEmoji}>{b.emoji}</Text>
                  <Text style={styles.previewBadgeName}>{b.label}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.previewSection}>
            <Text style={styles.previewLabel}>CONVERSATION STARTERS</Text>
            {SUMMARY_PREVIEW.conversationStarters.map((c, i) => (
              <View key={i} style={styles.previewStarterRow}>
                <Text style={styles.previewStarterEmoji}>💬</Text>
                <Text style={styles.previewStarterText}>{c}</Text>
              </View>
            ))}
          </View>
        </View>
      </Animated.View>

      {/* What is NOT shared */}
      <Animated.View style={anim(3)}>
        <View style={styles.notSharedCard}>
          <ShieldIcon size={36} />
          <View style={{ flex: 1 }}>
            <Text style={styles.notSharedTitle}>What is NOT shared</Text>
            {NOT_SHARED.map((item, i) => (
              <View key={i} style={styles.notSharedRow}>
                <Text style={styles.notSharedX}>✕</Text>
                <Text style={styles.notSharedText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      </Animated.View>

      {/* Your controls */}
      <Animated.View style={anim(4)}>
        <View style={styles.controlsCard}>
          <Text style={styles.controlsTitle}>🔐 You're always in control</Text>
          <View style={styles.controlItem}>
            <Text style={styles.controlEmoji}>⏰</Text>
            <Text style={styles.controlText}>Links expire automatically after 7 days</Text>
          </View>
          <View style={styles.controlItem}>
            <Text style={styles.controlEmoji}>🚫</Text>
            <Text style={styles.controlText}>You can revoke any link at any time</Text>
          </View>
          <View style={styles.controlItem}>
            <Text style={styles.controlEmoji}>🔒</Text>
            <Text style={styles.controlText}>Each link can only be used once</Text>
          </View>
          <View style={styles.controlItem}>
            <Text style={styles.controlEmoji}>👤</Text>
            <Text style={styles.controlText}>No personal data beyond your first name</Text>
          </View>
        </View>
      </Animated.View>

      {/* Active links */}
      {hasActiveLinks && (
        <Animated.View style={anim(5)}>
          <Text style={styles.sectionTitle}>📎 Active Links</Text>
          {activeLinks.map((link) => {
            const expiresDate = new Date(link.expiresAt);
            const daysLeft = Math.max(
              0,
              Math.ceil((expiresDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
            );
            return (
              <View key={link.id} style={styles.activeLinkCard}>
                <View style={styles.activeLinkTop}>
                  <View style={styles.activeLinkCodeWrap}>
                    <Text style={styles.activeLinkCodeLabel}>Code</Text>
                    <Text style={styles.activeLinkCode}>{link.code}</Text>
                  </View>
                  <View style={styles.activeLinkMeta}>
                    <Text style={styles.activeLinkMetaText}>
                      {daysLeft > 0 ? `Expires in ${daysLeft} days` : 'Expired'}
                    </Text>
                    {link.viewed && (
                      <View style={styles.viewedPill}>
                        <Text style={styles.viewedPillText}>👁️ Viewed</Text>
                      </View>
                    )}
                    {link.feedbackReceived && (
                      <View
                        style={[styles.viewedPill, { backgroundColor: 'rgba(16,185,129,0.15)' }]}
                      >
                        <Text style={[styles.viewedPillText, { color: '#10B981' }]}>
                          💬 Feedback
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => onRevokeLink(link.id)}
                  style={styles.revokeButton}
                  activeOpacity={0.7}
                >
                  <Text style={styles.revokeButtonText}>Revoke Link</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </Animated.View>
      )}

      {/* CTA */}
      <Animated.View style={anim(hasActiveLinks ? 6 : 5)}>
        <TouchableOpacity activeOpacity={0.85} onPress={onContinue} style={{ marginTop: 8 }}>
          <LinearGradient
            colors={['#10B981', '#059669']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.ctaButton}
          >
            <Text style={styles.ctaText}>
              {hasActiveLinks ? 'Create Another Link' : 'Share My Progress'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

// ═══════════════════════════════════════════════════════════════════
// ─── STEP 2: CONSENT ──────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════
const ConsentStep = ({ onAccept, onBack }: { onAccept: () => void; onBack: () => void }) => {
  const { play, anim } = useFadeSlide(7);
  useEffect(() => {
    play();
  }, []);

  const [consented, setConsented] = useState<Record<string, boolean>>({});
  const allConsented = CONSENT_ITEMS.every((item) => consented[item.id]);

  const toggleConsent = (id: string) => {
    setConsented((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <Animated.View style={anim(0)}>
        <View style={styles.stepHeaderRow}>
          <View
            style={[
              styles.stepIconCircle,
              { backgroundColor: 'rgba(168,85,247,0.12)', borderColor: 'rgba(168,85,247,0.18)' },
            ]}
          >
            <ShieldIcon size={36} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.stepTitle}>Your Consent</Text>
            <Text style={styles.stepSubtitle}>You choose what gets shared</Text>
          </View>
        </View>
      </Animated.View>

      <Animated.View style={anim(1)}>
        <Text style={styles.stepDescription}>
          Before creating a share link, please review and agree to each item below. This is your
          data and you're in charge.
        </Text>
      </Animated.View>

      {/* Consent items */}
      {CONSENT_ITEMS.map((item, i) => (
        <Animated.View key={item.id} style={anim(i + 2)}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => toggleConsent(item.id)}
            style={[styles.consentItem, consented[item.id] && styles.consentItemActive]}
          >
            <View style={styles.consentCheckbox}>
              {consented[item.id] ? (
                <View style={styles.consentChecked}>
                  <Text style={styles.consentCheckmark}>✓</Text>
                </View>
              ) : (
                <View style={styles.consentUnchecked} />
              )}
            </View>
            <View style={styles.consentContent}>
              <View style={styles.consentLabelRow}>
                <Text style={styles.consentEmoji}>{item.emoji}</Text>
                <Text style={styles.consentLabel}>{item.label}</Text>
              </View>
              <Text style={styles.consentDetail}>{item.detail}</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      ))}

      {/* Important note */}
      <Animated.View style={anim(6)}>
        <View style={styles.importantNote}>
          <Text style={styles.importantNoteEmoji}>ℹ️</Text>
          <Text style={styles.importantNoteText}>
            You can revoke the link at any time from this page. The link expires automatically after
            7 days.
          </Text>
        </View>
      </Animated.View>

      {/* Buttons */}
      <Animated.View style={anim(6)}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onAccept}
          disabled={!allConsented}
          style={{ marginTop: 8 }}
        >
          <LinearGradient
            colors={
              allConsented
                ? ['#10B981', '#059669']
                : ['rgba(16,185,129,0.25)', 'rgba(5,150,105,0.15)']
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.ctaButton, !allConsented && { opacity: 0.5 }]}
          >
            <Text style={[styles.ctaText, !allConsented && { color: 'rgba(255,255,255,0.5)' }]}>
              {allConsented ? 'I Agree — Create Link ✓' : 'Tick all boxes to continue'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={onBack} style={styles.secondaryButton} activeOpacity={0.7}>
          <Text style={styles.secondaryButtonText}>← Go Back</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

// ═══════════════════════════════════════════════════════════════════
// ─── STEP 3: GENERATE LINK ───────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════
const GenerateStep = ({
  generatedCode,
  onDone,
  onCopyCode,
}: {
  generatedCode: string;
  onDone: () => void;
  onCopyCode: () => void;
}) => {
  const { play, anim } = useFadeSlide(7);
  useEffect(() => {
    play();
  }, []);

  // Success burst animation
  const burstScale = useRef(new Animated.Value(0.5)).current;
  const burstOpacity = useRef(new Animated.Value(0)).current;
  const confettiAnims = useRef(Array.from({ length: 8 }, () => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(burstScale, { toValue: 1, friction: 5, tension: 50, useNativeDriver: true }),
      Animated.timing(burstOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();

    confettiAnims.forEach((ca, i) => {
      Animated.sequence([
        Animated.delay(300 + i * 50),
        Animated.timing(ca, { toValue: 1, duration: 900, useNativeDriver: true }),
      ]).start();
    });
  }, []);

  return (
    <>
      {/* Confetti */}
      {confettiAnims.map((ca, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const dist = 60 + (i % 3) * 20;
        const translateX = ca.interpolate({
          inputRange: [0, 1],
          outputRange: [0, Math.cos(angle) * dist],
        });
        const translateY = ca.interpolate({
          inputRange: [0, 1],
          outputRange: [0, Math.sin(angle) * dist - 30],
        });
        const opacity = ca.interpolate({ inputRange: [0, 0.6, 1], outputRange: [1, 1, 0] });
        const colors = [
          '#10B981',
          '#FFD700',
          '#FF2E91',
          '#4FC3F7',
          '#A855F7',
          '#F59E0B',
          '#10B981',
          '#FFD700',
        ];
        return (
          <Animated.View
            key={`c-${i}`}
            pointerEvents="none"
            style={{
              position: 'absolute',
              left: width / 2 - 4,
              top: 200,
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

      {/* Success header */}
      <Animated.View
        style={[
          anim(0),
          { alignItems: 'center', transform: [{ scale: burstScale }], opacity: burstOpacity },
        ]}
      >
        <View style={styles.successIconCircle}>
          <Text style={{ fontSize: 44 }}>🔗</Text>
        </View>
        <Text style={styles.successTitle}>Link Created! 🎉</Text>
        <Text style={styles.successSubtitle}>
          Share this code or QR with your parent or guardian
        </Text>
      </Animated.View>

      {/* Code display */}
      <Animated.View style={anim(1)}>
        <View style={styles.codeCard}>
          <Text style={styles.codeCardLabel}>SHARE CODE</Text>
          <Text style={styles.codeCardValue}>{generatedCode}</Text>
          <TouchableOpacity onPress={onCopyCode} style={styles.copyButton} activeOpacity={0.7}>
            <Text style={styles.copyButtonText}>📋 Copy Code</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* QR Code */}
      <Animated.View style={anim(2)}>
        <View style={styles.qrCard}>
          <Text style={styles.qrCardLabel}>OR SCAN QR CODE</Text>
          <View style={styles.qrPlaceholder}>
            <QRPlaceholder />
          </View>
          <Text style={styles.qrHint}>Your family can scan this with their phone camera</Text>
        </View>
      </Animated.View>

      {/* How to share */}
      <Animated.View style={anim(3)}>
        <Text style={styles.sectionTitle}>📤 How to share</Text>
        <View style={styles.howToCard}>
          {[
            { emoji: '💬', text: 'Send the code via text message' },
            { emoji: '📧', text: 'Share it by email' },
            { emoji: '📱', text: 'Show the QR code on your screen' },
            { emoji: '📝', text: 'Write the code down and hand it over' },
          ].map((item, i) => (
            <View key={i} style={styles.howToRow}>
              <Text style={styles.howToEmoji}>{item.emoji}</Text>
              <Text style={styles.howToText}>{item.text}</Text>
            </View>
          ))}
        </View>
      </Animated.View>

      {/* Expiry & safety reminder */}
      <Animated.View style={anim(4)}>
        <View style={styles.reminderCard}>
          <Text style={styles.reminderTitle}>🔒 Remember</Text>
          <Text style={styles.reminderText}>
            This link will expire in{' '}
            <Text style={{ color: '#FFD700', fontFamily: 'Poppins_700Bold' }}>7 days</Text>. You can
            revoke it at any time from the Share with Family page. Only the summary shown in the
            preview is visible — no scores, mistakes, or personal data.
          </Text>
        </View>
      </Animated.View>

      {/* Done button */}
      <Animated.View style={anim(5)}>
        <TouchableOpacity activeOpacity={0.85} onPress={onDone} style={{ marginTop: 8 }}>
          <LinearGradient
            colors={['#FFD700', '#F5A623']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.ctaButton}
          >
            <Text style={[styles.ctaText, { color: '#1A1B4B' }]}>Done ✓</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

// ═══════════════════════════════════════════════════════════════════
// ─── MAIN SCREEN ──────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════
export default function FamilyShareScreen() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Fredoka_700Bold,
  });

  const scrollRef = useRef<ScrollView>(null);
  const [step, setStep] = useState<ShareStep>('overview');
  const [activeLinks, setActiveLinks] = useState<ActiveLink[]>(ACTIVE_LINKS);
  const [generatedCode, setGeneratedCode] = useState('');

  const goToStep = (s: ShareStep) => {
    setStep(s);
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handleContinueToConsent = () => goToStep('consent');

  const handleConsentAccepted = () => {
    // Generate a random code
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'FAMILY-';
    for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
    setGeneratedCode(code);

    // Add to active links
    const now = new Date();
    const expires = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    setActiveLinks((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        code,
        createdAt: now.toISOString().split('T')[0],
        expiresAt: expires.toISOString().split('T')[0],
        viewed: false,
        feedbackReceived: false,
      },
    ]);

    goToStep('generate');
  };

  const handleRevokeLink = (id: string) => {
    Alert.alert(
      'Revoke Link',
      "Are you sure? Your family won't be able to view the summary any more.",
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Revoke',
          style: 'destructive',
          onPress: () => setActiveLinks((prev) => prev.filter((l) => l.id !== id)),
        },
      ],
    );
  };

  const handleCopyCode = () => {
    // In production: Clipboard.setStringAsync(generatedCode)
    Alert.alert('Copied!', `Code "${generatedCode}" copied to clipboard.`);
  };

  const handleDone = () => goToStep('overview');

  const stepIndex = ['overview', 'consent', 'generate'].indexOf(step);

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

      {[...Array(10)].map((_, i) => (
        <View
          key={`s-${i}`}
          style={[
            styles.star,
            {
              left: (i * 79 + 43) % width,
              top: (i * 61 + 21) % (height * 0.3),
              width: i % 3 === 0 ? 4 : 2,
              height: i % 3 === 0 ? 4 : 2,
              opacity: 0.1 + (i % 4) * 0.05,
            },
          ]}
        />
      ))}

      <FloatingCoin
        delay={100}
        startX={width * 0.07}
        startY={height * 0.04}
        size={18}
        opacity={0.22}
      />
      <FloatingCoin
        delay={400}
        startX={width * 0.85}
        startY={height * 0.08}
        size={14}
        opacity={0.18}
      />

      <BottomWave />

      <ScrollView
        ref={scrollRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top bar */}
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => {
              if (step === 'overview') router.back();
              else goToStep(step === 'generate' ? 'overview' : 'overview');
            }}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <View style={styles.topBarCenter}>
            <Text style={styles.topBarTitle}>Share with Family</Text>
          </View>
          <View style={{ width: 40 }} />
        </View>

        {/* Step indicator */}
        <View style={styles.stepIndicator}>
          {['Preview', 'Consent', 'Share'].map((label, i) => (
            <View key={label} style={styles.stepDotRow}>
              <View
                style={[
                  styles.stepDot,
                  i < stepIndex && styles.stepDotDone,
                  i === stepIndex && styles.stepDotActive,
                ]}
              >
                {i < stepIndex ? (
                  <Text style={styles.stepDotCheck}>✓</Text>
                ) : (
                  <Text style={[styles.stepDotNumber, i === stepIndex && { color: '#1A1B4B' }]}>
                    {i + 1}
                  </Text>
                )}
              </View>
              <Text
                style={[
                  styles.stepDotLabel,
                  (i === stepIndex || i < stepIndex) && { color: 'rgba(255,255,255,0.6)' },
                ]}
              >
                {label}
              </Text>
              {i < 2 && (
                <View style={[styles.stepLine, i < stepIndex && { backgroundColor: '#10B981' }]} />
              )}
            </View>
          ))}
        </View>

        {/* Step content */}
        {step === 'overview' && (
          <OverviewStep
            onContinue={handleContinueToConsent}
            activeLinks={activeLinks}
            onRevokeLink={handleRevokeLink}
          />
        )}

        {step === 'consent' && (
          <ConsentStep onAccept={handleConsentAccepted} onBack={() => goToStep('overview')} />
        )}

        {step === 'generate' && (
          <GenerateStep
            generatedCode={generatedCode}
            onDone={handleDone}
            onCopyCode={handleCopyCode}
          />
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
  container: { flex: 1, overflow: 'hidden' },
  star: { position: 'absolute', borderRadius: 4, backgroundColor: '#FFFFFF', zIndex: 0 },
  waveContainer: { position: 'absolute', bottom: 0, left: -30, right: -30, height: 140, zIndex: 0 },
  scrollView: { flex: 1, zIndex: 1 },
  scrollContent: {
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + 12 : 56,
    paddingHorizontal: 20,
  },

  // ── Top Bar ──
  topBar: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, gap: 12 },
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
  backArrow: { fontFamily: 'Poppins_600SemiBold', fontSize: 20, color: '#FFFFFF', marginTop: -2 },
  topBarCenter: { flex: 1, alignItems: 'center' },
  topBarTitle: {
    fontFamily: 'Fredoka_700Bold',
    fontSize: 20,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },

  // ── Step Indicator ──
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  stepDotRow: { flexDirection: 'row', alignItems: 'center' },
  stepDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepDotActive: { backgroundColor: '#10B981', borderColor: '#10B981' },
  stepDotDone: { backgroundColor: 'rgba(16,185,129,0.2)', borderColor: '#10B981' },
  stepDotCheck: { fontFamily: 'Poppins_700Bold', fontSize: 13, color: '#10B981' },
  stepDotNumber: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 12,
    color: 'rgba(255,255,255,0.35)',
  },
  stepDotLabel: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 10,
    color: 'rgba(255,255,255,0.25)',
    position: 'absolute',
    top: 34,
    width: 60,
    textAlign: 'center',
    left: -15,
  },
  stepLine: { width: 36, height: 2, backgroundColor: 'rgba(255,255,255,0.1)', marginHorizontal: 6 },

  // ── Step Header ──
  stepHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 10,
    marginTop: 8,
  },
  stepIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  stepTitle: {
    fontFamily: 'Fredoka_700Bold',
    fontSize: 24,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  stepSubtitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
    color: 'rgba(255,255,255,0.45)',
    marginTop: 2,
  },
  stepDescription: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    lineHeight: 22,
    marginBottom: 20,
  },

  // ── Section Title ──
  sectionTitle: {
    fontFamily: 'Fredoka_700Bold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 12,
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },

  // ── Preview Card ──
  previewCard: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 20,
    marginBottom: 16,
  },
  previewHeadline: {
    fontFamily: 'Fredoka_700Bold',
    fontSize: 20,
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 18,
  },
  previewSection: { marginBottom: 16 },
  previewLabel: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 10,
    color: 'rgba(255,255,255,0.3)',
    letterSpacing: 1,
    marginBottom: 8,
  },
  previewHighlightRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  previewBullet: { fontSize: 14 },
  previewHighlightText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
    color: 'rgba(255,255,255,0.65)',
    flex: 1,
    lineHeight: 20,
  },
  previewBadgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  previewBadge: {
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  previewBadgeEmoji: { fontSize: 22 },
  previewBadgeName: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 10,
    color: 'rgba(255,255,255,0.5)',
  },
  previewStarterRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  previewStarterEmoji: { fontSize: 14 },
  previewStarterText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    flex: 1,
    lineHeight: 20,
    fontStyle: 'italic',
  },

  // ── Not Shared Card ──
  notSharedCard: {
    flexDirection: 'row',
    gap: 14,
    backgroundColor: 'rgba(16,185,129,0.06)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.12)',
    padding: 18,
    marginBottom: 16,
  },
  notSharedTitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 14,
    color: '#10B981',
    marginBottom: 8,
  },
  notSharedRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  notSharedX: { fontFamily: 'Poppins_700Bold', fontSize: 12, color: 'rgba(239,68,68,0.7)' },
  notSharedText: { fontFamily: 'Poppins_400Regular', fontSize: 12, color: 'rgba(255,255,255,0.5)' },

  // ── Controls Card ──
  controlsCard: {
    backgroundColor: 'rgba(168,85,247,0.06)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(168,85,247,0.12)',
    padding: 18,
    marginBottom: 16,
  },
  controlsTitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 14,
    color: '#A855F7',
    marginBottom: 12,
  },
  controlItem: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  controlEmoji: { fontSize: 16 },
  controlText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    flex: 1,
  },

  // ── Active Links ──
  activeLinkCard: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 16,
    marginBottom: 10,
  },
  activeLinkTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  activeLinkCodeWrap: {},
  activeLinkCodeLabel: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 10,
    color: 'rgba(255,255,255,0.35)',
    letterSpacing: 0.5,
  },
  activeLinkCode: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 18,
    color: '#FFD700',
    marginTop: 2,
    letterSpacing: 1.5,
  },
  activeLinkMeta: { alignItems: 'flex-end', gap: 4 },
  activeLinkMetaText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 11,
    color: 'rgba(255,255,255,0.35)',
  },
  viewedPill: {
    backgroundColor: 'rgba(79,195,247,0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  viewedPillText: { fontFamily: 'Poppins_500Medium', fontSize: 10, color: '#4FC3F7' },
  revokeButton: {
    backgroundColor: 'rgba(239,68,68,0.1)',
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.15)',
  },
  revokeButtonText: { fontFamily: 'Poppins_600SemiBold', fontSize: 13, color: '#EF4444' },

  // ── CTA Button ──
  ctaButton: {
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#10B981',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: { elevation: 6 },
    }),
  },
  ctaText: { fontFamily: 'Poppins_700Bold', fontSize: 16, color: '#FFFFFF', letterSpacing: 0.3 },

  // ── Secondary Button ──
  secondaryButton: {
    borderRadius: 20,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginTop: 8,
  },
  secondaryButtonText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
  },

  // ── Consent Items ──
  consentItem: {
    flexDirection: 'row',
    gap: 14,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.06)',
    padding: 16,
    marginBottom: 10,
  },
  consentItemActive: {
    borderColor: 'rgba(16,185,129,0.35)',
    backgroundColor: 'rgba(16,185,129,0.06)',
  },
  consentCheckbox: { marginTop: 2 },
  consentUnchecked: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  consentChecked: {
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  consentCheckmark: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: -1,
  },
  consentContent: { flex: 1 },
  consentLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  consentEmoji: { fontSize: 18 },
  consentLabel: { fontFamily: 'Poppins_600SemiBold', fontSize: 14, color: '#FFFFFF' },
  consentDetail: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: 'rgba(255,255,255,0.45)',
    lineHeight: 18,
  },

  // ── Important Note ──
  importantNote: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: 'rgba(79,195,247,0.06)',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(79,195,247,0.1)',
    marginBottom: 16,
    marginTop: 8,
  },
  importantNoteEmoji: { fontSize: 16 },
  importantNoteText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    flex: 1,
    lineHeight: 18,
  },

  // ── Generate Step ──
  successIconCircle: {
    width: 90,
    height: 90,
    borderRadius: 28,
    backgroundColor: 'rgba(16,185,129,0.15)',
    borderWidth: 2,
    borderColor: 'rgba(16,185,129,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    marginTop: 8,
  },
  successTitle: {
    fontFamily: 'Fredoka_700Bold',
    fontSize: 28,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 6,
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  successSubtitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
    marginBottom: 24,
  },

  // ── Code Card ──
  codeCard: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,215,0,0.08)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.15)',
    padding: 24,
    marginBottom: 16,
  },
  codeCardLabel: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 10,
    color: 'rgba(255,255,255,0.35)',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  codeCardValue: {
    fontFamily: 'Fredoka_700Bold',
    fontSize: 36,
    color: '#FFD700',
    letterSpacing: 3,
    marginBottom: 16,
    textShadowColor: 'rgba(255,215,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  copyButton: {
    backgroundColor: 'rgba(255,215,0,0.15)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.2)',
  },
  copyButtonText: { fontFamily: 'Poppins_600SemiBold', fontSize: 14, color: '#FFD700' },

  // ── QR Card ──
  qrCard: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 24,
    marginBottom: 16,
  },
  qrCardLabel: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 10,
    color: 'rgba(255,255,255,0.3)',
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  qrPlaceholder: { marginBottom: 12 },
  qrHint: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: 'rgba(255,255,255,0.35)',
    textAlign: 'center',
  },

  // ── How To Card ──
  howToCard: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    padding: 18,
    marginBottom: 16,
  },
  howToRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  howToEmoji: { fontSize: 20 },
  howToText: { fontFamily: 'Poppins_500Medium', fontSize: 13, color: 'rgba(255,255,255,0.6)' },

  // ── Reminder Card ──
  reminderCard: {
    backgroundColor: 'rgba(168,85,247,0.06)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(168,85,247,0.12)',
    padding: 18,
    marginBottom: 8,
  },
  reminderTitle: { fontFamily: 'Poppins_700Bold', fontSize: 14, color: '#A855F7', marginBottom: 8 },
  reminderText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
    color: 'rgba(255,255,255,0.55)',
    lineHeight: 20,
  },
});
