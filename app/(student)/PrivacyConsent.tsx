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
  Path,
  Stop,
  Svg,
  LinearGradient as SvgLinearGradient
} from "react-native-svg";

const { width, height } = Dimensions.get("window");

// ─── Consent items ─────────────────────────────────────────────────
const CONSENT_ITEMS = [
  {
    id: "data-use",
    emoji: "📊",
    title: "How we use your info",
    description:
      "We only save your nickname, progress, and quiz scores. Nothing personal like your real name or address.",
    required: true,
  },
  {
    id: "no-real-money",
    emoji: "🔒",
    title: "No real money involved",
    description:
      "Everything in Money Islands uses pretend money. We never ask for bank details or real payments.",
    required: true,
  },
  {
    id: "teacher-visibility",
    emoji: "👩‍🏫",
    title: "Your teacher can see progress",
    description:
      "Your teacher can view which missions you've completed and your quiz scores to help support your learning.",
    required: true,
  },
  {
    id: "family-sharing",
    emoji: "👨‍👩‍👧",
    title: "Family sharing is your choice",
    description:
      "You can choose to share a summary of your achievements with family. You're always in control and can stop sharing at any time.",
    required: false,
  },
];

// ─── Shield SVG illustration ───────────────────────────────────────
const ShieldIcon = () => (
  <Svg width={72} height={80} viewBox="0 0 72 80">
    <Defs>
      <SvgLinearGradient id="shieldGrad" x1="0" y1="0" x2="0" y2="1">
        <Stop offset="0" stopColor="#4FC3F7" />
        <Stop offset="1" stopColor="#2196F3" />
      </SvgLinearGradient>
      <SvgLinearGradient id="shieldInner" x1="0" y1="0" x2="0" y2="1">
        <Stop offset="0" stopColor="#FFD700" />
        <Stop offset="1" stopColor="#F5A623" />
      </SvgLinearGradient>
    </Defs>
    {/* Shield body */}
    <Path
      d="M36 4 L66 18 L66 40 Q66 62 36 76 Q6 62 6 40 L6 18 Z"
      fill="url(#shieldGrad)"
    />
    <Path
      d="M36 4 L66 18 L66 40 Q66 62 36 76 Q6 62 6 40 L6 18 Z"
      fill="none"
      stroke="rgba(255,255,255,0.3)"
      strokeWidth="2"
    />
    {/* Inner shield */}
    <Path
      d="M36 14 L58 24 L58 40 Q58 56 36 66 Q14 56 14 40 L14 24 Z"
      fill="rgba(255,255,255,0.12)"
    />
    {/* Tick mark */}
    <Path
      d="M24 40 L32 48 L48 30"
      fill="none"
      stroke="url(#shieldInner)"
      strokeWidth="4.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Sparkle top-right */}
    <Circle cx="60" cy="10" r="3" fill="#FFD700" opacity={0.7} />
    <Circle cx="8" cy="14" r="2" fill="#FFD700" opacity={0.5} />
  </Svg>
);

// ─── Animated checkbox toggle ──────────────────────────────────────
const ConsentToggle = ({
  checked,
  onToggle,
  accentColor,
}: {
  checked: boolean;
  onToggle: () => void;
  accentColor: string;
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.85, duration: 80, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 3, tension: 120, useNativeDriver: true }),
    ]).start();
    onToggle();
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
      <Animated.View
        style={[
          styles.toggleOuter,
          {
            backgroundColor: checked ? accentColor : "transparent",
            borderColor: checked ? accentColor : "rgba(255,255,255,0.2)",
            transform: [{ scale }],
          },
        ]}
      >
        {checked && (
          <Svg width={14} height={14} viewBox="0 0 14 14">
            <Path
              d="M2.5 7 L5.5 10 L11.5 4"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

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
        Animated.timing(floatAnim, { toValue: 1, duration: 2200 + delay * 0.4, useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 0, duration: 2200 + delay * 0.4, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -12],
  });

  return (
    <Animated.View
      style={{
        position: "absolute",
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

// ─── Main Privacy & Consent Screen ─────────────────────────────────
export default function StudentPrivacyConsentScreen() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Fredoka_700Bold,
  });

  const [consents, setConsents] = useState<Record<string, boolean>>({
    "data-use": false,
    "no-real-money": false,
    "teacher-visibility": false,
    "family-sharing": false,
  });

  // Entrance animations
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-20)).current;
  const shieldOpacity = useRef(new Animated.Value(0)).current;
  const shieldScale = useRef(new Animated.Value(0.5)).current;
  const listOpacity = useRef(new Animated.Value(0)).current;
  const listSlide = useRef(new Animated.Value(40)).current;
  const footerOpacity = useRef(new Animated.Value(0)).current;
  const footerSlide = useRef(new Animated.Value(20)).current;
  const waveOffset = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(headerOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(headerSlide, { toValue: 0, duration: 400, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(shieldOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.spring(shieldScale, { toValue: 1, friction: 4, tension: 60, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(listOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.spring(listSlide, { toValue: 0, friction: 6, tension: 50, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(footerOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(footerSlide, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(waveOffset, { toValue: 1, duration: 3500, useNativeDriver: true }),
        Animated.timing(waveOffset, { toValue: 0, duration: 3500, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const waveTranslateX = waveOffset.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -25],
  });

  const toggleConsent = (id: string) => {
    setConsents((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // All required items must be checked
  const requiredIds = CONSENT_ITEMS.filter((c) => c.required).map((c) => c.id);
  const allRequiredAccepted = requiredIds.every((id) => consents[id]);

  const handleAgree = () => {
    if (!allRequiredAccepted) return;
    // TODO: Store consent state in onboardingStore
    // router.replace("/(student)/(tabs)/dashboard");
  };

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <LinearGradient
        colors={["#1A1B4B", "#2D3A8C", "#4158D0"]}
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
              left: (i * 87 + 22) % width,
              top: (i * 61 + 14) % (height * 0.28),
              width: i % 3 === 0 ? 3 : 2,
              height: i % 3 === 0 ? 3 : 2,
              opacity: 0.2 + (i % 4) * 0.1,
            },
          ]}
        />
      ))}

      {/* Sparkles */}
      <FloatingSparkle delay={0} x={width * 0.06} y={height * 0.09} size={6} color="#4FC3F7" />
      <FloatingSparkle delay={300} x={width * 0.88} y={height * 0.06} size={5} color="#FFD700" />
      <FloatingSparkle delay={150} x={width * 0.8} y={height * 0.22} size={4} color="#10B981" />
      <FloatingSparkle delay={450} x={width * 0.08} y={height * 0.3} size={5} color="#FF2E91" />

      {/* Wave */}
      <Animated.View
        style={[styles.waveContainer, { transform: [{ translateX: waveTranslateX }] }]}
      >
        <Svg
          width={width + 50}
          height={100}
          viewBox={`0 0 ${width + 50} 100`}
          style={{ position: "absolute", bottom: 0 }}
        >
          <Path
            d={`M0 40 Q${width * 0.15} 20 ${width * 0.3} 36 Q${width * 0.45} 52 ${width * 0.6} 32 Q${width * 0.75} 12 ${width * 0.9} 36 Q${width * 1.05} 60 ${width + 50} 32 L${width + 50} 100 L0 100 Z`}
            fill="#4FC3F7"
            opacity={0.12}
          />
          <Path
            d={`M0 56 Q${width * 0.2} 42 ${width * 0.35} 52 Q${width * 0.5} 62 ${width * 0.65} 48 Q${width * 0.8} 34 ${width * 0.95} 52 L${width + 50} 44 L${width + 50} 100 L0 100 Z`}
            fill="#4FC3F7"
            opacity={0.07}
          />
        </Svg>
      </Animated.View>

      {/* ── Content ──────────────────────────────────────────── */}
      <View style={styles.content}>
        {/* Header */}
        <Animated.View
          style={[
            styles.header,
            { opacity: headerOpacity, transform: [{ translateY: headerSlide }] },
          ]}
        >
          <Text style={styles.stepLabel}>Almost there!</Text>
          <Text style={styles.headerTitle}>Your Privacy Matters</Text>
        </Animated.View>

        {/* Shield illustration */}
        <Animated.View
          style={[
            styles.shieldContainer,
            {
              opacity: shieldOpacity,
              transform: [{ scale: shieldScale }],
            },
          ]}
        >
          <ShieldIcon />
          <Text style={styles.shieldCaption}>
            Money Islands is a safe space.{"\n"}Here's what you need to know:
          </Text>
        </Animated.View>

        {/* Consent list */}
        <Animated.View
          style={[
            styles.listWrapper,
            { opacity: listOpacity, transform: [{ translateY: listSlide }] },
          ]}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          >
            {CONSENT_ITEMS.map((item, index) => {
              const isChecked = consents[item.id];
              const accentColor = ["#4FC3F7", "#10B981", "#A855F7", "#FFD700"][index % 4];

              return (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.8}
                  onPress={() => toggleConsent(item.id)}
                  style={[
                    styles.consentCard,
                    {
                      borderColor: isChecked ? accentColor : "rgba(255,255,255,0.08)",
                      backgroundColor: isChecked
                        ? `rgba(${accentColor === "#4FC3F7" ? "79,195,247" : accentColor === "#10B981" ? "16,185,129" : accentColor === "#A855F7" ? "168,85,247" : "255,215,0"},0.08)`
                        : "rgba(255,255,255,0.05)",
                    },
                  ]}
                >
                  <View style={styles.consentRow}>
                    <View style={styles.emojiCircle}>
                      <Text style={styles.emoji}>{item.emoji}</Text>
                    </View>
                    <View style={styles.consentTextContainer}>
                      <View style={styles.titleRow}>
                        <Text style={styles.consentTitle}>{item.title}</Text>
                        {item.required && (
                          <View style={styles.requiredBadge}>
                            <Text style={styles.requiredText}>Required</Text>
                          </View>
                        )}
                      </View>
                      <Text style={styles.consentDescription}>{item.description}</Text>
                    </View>
                    <ConsentToggle
                      checked={isChecked}
                      onToggle={() => toggleConsent(item.id)}
                      accentColor={accentColor}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </Animated.View>

        {/* Footer */}
        <Animated.View
          style={[
            styles.footer,
            { opacity: footerOpacity, transform: [{ translateY: footerSlide }] },
          ]}
        >
          <TouchableOpacity
            style={[styles.ctaButton, !allRequiredAccepted && styles.ctaButtonDisabled]}
            activeOpacity={allRequiredAccepted ? 0.85 : 1}
            onPress={handleAgree}
          >
            <LinearGradient
              colors={
                allRequiredAccepted
                  ? ["#FFD700", "#F5A623"]
                  : ["rgba(255,255,255,0.12)", "rgba(255,255,255,0.06)"]
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.ctaGradient}
            >
              <Text
                style={[
                  styles.ctaText,
                  !allRequiredAccepted && styles.ctaTextDisabled,
                ]}
              >
                I Agree — Let's Go!
              </Text>
              <Text
                style={[
                  styles.ctaArrow,
                  !allRequiredAccepted && styles.ctaTextDisabled,
                ]}
              >
                🏝️
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.legalNote}>
            You can change these choices any time in Settings.
          </Text>
        </Animated.View>
      </View>
    </View>
  );
}

// ─── Styles ────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
  },
  star: {
    position: "absolute",
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
  },
  waveContainer: {
    position: "absolute",
    bottom: 0,
    left: -25,
    right: -25,
    height: 100,
  },
  content: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight ?? 0) + 16 : 60,
    paddingBottom: Platform.OS === "android" ? 20 : 34,
    paddingHorizontal: 24,
  },

  // ── Header ──
  header: {
    marginBottom: 8,
  },
  stepLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "rgba(255,255,255,0.5)",
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  headerTitle: {
    fontFamily: "Fredoka_700Bold",
    fontSize: 30,
    color: "#FFFFFF",
    lineHeight: 36,
    marginTop: 4,
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },

  // ── Shield ──
  shieldContainer: {
    alignItems: "center",
    marginBottom: 12,
  },
  shieldCaption: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 20,
  },

  // ── Consent List ──
  listWrapper: {
    flex: 1,
  },
  listContent: {
    gap: 10,
    paddingBottom: 8,
  },
  consentCard: {
    borderRadius: 16,
    borderWidth: 1.5,
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  consentRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  emojiCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.06)",
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: 20,
  },
  consentTextContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  consentTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#FFFFFF",
    letterSpacing: 0.1,
  },
  requiredBadge: {
    backgroundColor: "rgba(255,46,145,0.2)",
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  requiredText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 10,
    color: "#FF2E91",
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  consentDescription: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
    marginTop: 4,
    lineHeight: 17,
  },

  // ── Toggle ──
  toggleOuter: {
    width: 26,
    height: 26,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },

  // ── Footer ──
  footer: {
    paddingTop: 8,
  },
  ctaButton: {
    borderRadius: 28,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#F5A623",
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 32,
    gap: 10,
  },
  ctaText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    color: "#1A1B4B",
    letterSpacing: 0.3,
  },
  ctaTextDisabled: {
    color: "rgba(255,255,255,0.3)",
  },
  ctaArrow: {
    fontSize: 20,
  },
  legalNote: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "rgba(255,255,255,0.35)",
    textAlign: "center",
    marginTop: 12,
    letterSpacing: 0.2,
  },
});