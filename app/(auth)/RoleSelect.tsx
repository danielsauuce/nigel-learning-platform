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
  Path,
  Rect,
  Stop,
  Svg,
  LinearGradient as SvgLinearGradient,
  Text as SvgText,
} from "react-native-svg";

const { width, height } = Dimensions.get("window");

// ─── Student Illustration ──────────────────────────────────────────
const StudentIllustration = () => (
  <Svg width={120} height={120} viewBox="0 0 120 120">
    {/* Backpack */}
    <Rect x="38" y="52" width="44" height="50" rx="12" fill="#4FC3F7" />
    <Rect x="38" y="52" width="44" height="50" rx="12" fill="none" stroke="#2196F3" strokeWidth="2" />
    <Rect x="48" y="72" width="24" height="16" rx="4" fill="#FFFFFF" opacity={0.35} />
    {/* Backpack strap */}
    <Path d="M46 52 Q46 40 60 38 Q74 40 74 52" fill="none" stroke="#2196F3" strokeWidth="3" strokeLinecap="round" />
    {/* Head */}
    <Circle cx="60" cy="28" r="18" fill="#FFD3B6" />
    <Circle cx="60" cy="28" r="18" fill="none" stroke="#F0B898" strokeWidth="1.5" />
    {/* Hair */}
    <Path d="M42 22 Q42 8 60 10 Q78 8 78 22 Q75 16 60 15 Q45 16 42 22 Z" fill="#5D4037" />
    {/* Eyes */}
    <Circle cx="52" cy="27" r="3" fill="#FFFFFF" />
    <Circle cx="53" cy="26.5" r="1.8" fill="#1A1B4B" />
    <Circle cx="53.5" cy="25.8" r="0.7" fill="#FFFFFF" />
    <Circle cx="68" cy="27" r="3" fill="#FFFFFF" />
    <Circle cx="69" cy="26.5" r="1.8" fill="#1A1B4B" />
    <Circle cx="69.5" cy="25.8" r="0.7" fill="#FFFFFF" />
    {/* Smile */}
    <Path d="M54 34 Q60 39 66 34" fill="none" stroke="#D4836A" strokeWidth="1.5" strokeLinecap="round" />
    {/* Floating coin */}
    <G>
      <Defs>
        <SvgLinearGradient id="sCoinGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFD700" />
          <Stop offset="1" stopColor="#F5A623" />
        </SvgLinearGradient>
      </Defs>
      <Circle cx="96" cy="18" r="10" fill="url(#sCoinGrad)" />
      <Circle cx="96" cy="18" r="7" fill="none" stroke="#E8960C" strokeWidth="1" />
      <SvgText x="96" y="22" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#B8760A">£</SvgText>
    </G>
    {/* Sparkle */}
    <Circle cx="22" cy="44" r="3" fill="#FFD700" opacity={0.6} />
  </Svg>
);

// ─── Teacher Illustration ──────────────────────────────────────────
const TeacherIllustration = () => (
  <Svg width={120} height={120} viewBox="0 0 120 120">
    {/* Body / shirt */}
    <Path d="M35 102 Q35 72 60 68 Q85 72 85 102 Z" fill="#7000E0" />
    <Path d="M35 102 Q35 72 60 68 Q85 72 85 102 Z" fill="none" stroke="#5B00B8" strokeWidth="1.5" />
    {/* Collar */}
    <Path d="M50 70 L60 80 L70 70" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    {/* Head */}
    <Circle cx="60" cy="38" r="22" fill="#FFD3B6" />
    <Circle cx="60" cy="38" r="22" fill="none" stroke="#F0B898" strokeWidth="1.5" />
    {/* Hair */}
    <Path d="M38 30 Q38 12 60 14 Q82 12 82 30 Q78 20 60 18 Q42 20 38 30 Z" fill="#3E2723" />
    {/* Glasses */}
    <Circle cx="50" cy="37" r="7" fill="none" stroke="#455A64" strokeWidth="2" />
    <Circle cx="70" cy="37" r="7" fill="none" stroke="#455A64" strokeWidth="2" />
    <Path d="M57 37 L63 37" stroke="#455A64" strokeWidth="1.5" />
    <Path d="M43 35 L38 33" stroke="#455A64" strokeWidth="1.5" strokeLinecap="round" />
    <Path d="M77 35 L82 33" stroke="#455A64" strokeWidth="1.5" strokeLinecap="round" />
    {/* Eyes behind glasses */}
    <Circle cx="50" cy="37" r="2" fill="#1A1B4B" />
    <Circle cx="50.5" cy="36.2" r="0.8" fill="#FFFFFF" />
    <Circle cx="70" cy="37" r="2" fill="#1A1B4B" />
    <Circle cx="70.5" cy="36.2" r="0.8" fill="#FFFFFF" />
    {/* Smile */}
    <Path d="M53 46 Q60 51 67 46" fill="none" stroke="#D4836A" strokeWidth="1.5" strokeLinecap="round" />
    {/* Clipboard */}
    <Rect x="88" y="55" width="22" height="28" rx="3" fill="#FFE082" />
    <Rect x="88" y="55" width="22" height="28" rx="3" fill="none" stroke="#E8960C" strokeWidth="1.5" />
    <Rect x="94" y="52" width="10" height="6" rx="2" fill="#D4A056" />
    <Path d="M93 64 L105 64" stroke="#D4A056" strokeWidth="1.5" strokeLinecap="round" />
    <Path d="M93 69 L105 69" stroke="#D4A056" strokeWidth="1.5" strokeLinecap="round" />
    <Path d="M93 74 L100 74" stroke="#D4A056" strokeWidth="1.5" strokeLinecap="round" />
    {/* Sparkle */}
    <Circle cx="18" cy="60" r="3" fill="#FFD700" opacity={0.6} />
  </Svg>
);

// ─── Floating sparkle (reused pattern) ─────────────────────────────
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

// ─── Main Role Selection Screen ────────────────────────────────────
export default function RoleSelectScreen() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Fredoka_700Bold,
  });

  const [selectedRole, setSelectedRole] = useState<"student" | "teacher" | null>(null);

  // Entrance animations
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-20)).current;
  const studentCardOpacity = useRef(new Animated.Value(0)).current;
  const studentCardSlide = useRef(new Animated.Value(50)).current;
  const teacherCardOpacity = useRef(new Animated.Value(0)).current;
  const teacherCardSlide = useRef(new Animated.Value(50)).current;
  const footerOpacity = useRef(new Animated.Value(0)).current;
  const footerSlide = useRef(new Animated.Value(30)).current;
  const waveOffset = useRef(new Animated.Value(0)).current;

  // Selection pulse
  const studentPulse = useRef(new Animated.Value(1)).current;
  const teacherPulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(headerOpacity, { toValue: 1, duration: 450, useNativeDriver: true }),
        Animated.timing(headerSlide, { toValue: 0, duration: 450, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(studentCardOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.spring(studentCardSlide, { toValue: 0, friction: 6, tension: 50, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(teacherCardOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.spring(teacherCardSlide, { toValue: 0, friction: 6, tension: 50, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(footerOpacity, { toValue: 1, duration: 350, useNativeDriver: true }),
        Animated.timing(footerSlide, { toValue: 0, duration: 350, useNativeDriver: true }),
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

  const handleSelect = (role: "student" | "teacher") => {
    setSelectedRole(role);
    const pulseAnim = role === "student" ? studentPulse : teacherPulse;
    const otherPulse = role === "student" ? teacherPulse : studentPulse;

    // Reset other
    Animated.timing(otherPulse, { toValue: 1, duration: 150, useNativeDriver: true }).start();

    // Bounce selected
    Animated.sequence([
      Animated.timing(pulseAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.spring(pulseAnim, { toValue: 1, friction: 3, tension: 100, useNativeDriver: true }),
    ]).start();
  };

  const handleContinue = () => {
    if (!selectedRole) return;
    if (selectedRole === "student") {
      //router.push("/(onboarding)/personalization");
    } else {
      //router.push("/(auth)/teacher-login");
    }
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

      {/* Background stars */}
      {[...Array(10)].map((_, i) => (
        <View
          key={`star-${i}`}
          style={[
            styles.star,
            {
              left: (i * 89 + 31) % width,
              top: (i * 67 + 12) % (height * 0.35),
              width: i % 3 === 0 ? 3 : 2,
              height: i % 3 === 0 ? 3 : 2,
              opacity: 0.2 + (i % 4) * 0.1,
            },
          ]}
        />
      ))}

      {/* Floating sparkles */}
      <FloatingSparkle delay={0} x={width * 0.07} y={height * 0.12} size={6} color="#FFD700" />
      <FloatingSparkle delay={350} x={width * 0.88} y={height * 0.08} size={5} color="#4FC3F7" />
      <FloatingSparkle delay={200} x={width * 0.75} y={height * 0.28} size={4} color="#FF2E91" />
      <FloatingSparkle delay={500} x={width * 0.12} y={height * 0.35} size={5} color="#10B981" />

      {/* Bottom wave */}
      <Animated.View
        style={[styles.waveContainer, { transform: [{ translateX: waveTranslateX }] }]}
      >
        <Svg
          width={width + 50}
          height={120}
          viewBox={`0 0 ${width + 50} 120`}
          style={{ position: "absolute", bottom: 0 }}
        >
          <Path
            d={`M0 50 Q${width * 0.15} 25 ${width * 0.3} 45 Q${width * 0.45} 65 ${width * 0.6} 40 Q${width * 0.75} 15 ${width * 0.9} 45 Q${width * 1.05} 75 ${width + 50} 40 L${width + 50} 120 L0 120 Z`}
            fill="#4FC3F7"
            opacity={0.12}
          />
          <Path
            d={`M0 70 Q${width * 0.2} 50 ${width * 0.35} 65 Q${width * 0.5} 80 ${width * 0.65} 60 Q${width * 0.8} 40 ${width * 0.95} 65 L${width + 50} 55 L${width + 50} 120 L0 120 Z`}
            fill="#4FC3F7"
            opacity={0.08}
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
          <Text style={styles.headerLabel}>Choose your role</Text>
          <Text style={styles.headerTitle}>Who are you?</Text>
          <Text style={styles.headerSubtitle}>
            Pick how you'll use Money Islands
          </Text>
        </Animated.View>

        {/* Role cards */}
        <View style={styles.cardsSection}>
          {/* Student card */}
          <Animated.View
            style={{
              opacity: studentCardOpacity,
              transform: [
                { translateY: studentCardSlide },
                { scale: studentPulse },
              ],
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleSelect("student")}
              style={styles.cardTouchable}
            >
              <LinearGradient
                colors={
                  selectedRole === "student"
                    ? ["rgba(79,195,247,0.25)", "rgba(79,195,247,0.08)"]
                    : ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.04)"]
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[
                  styles.card,
                  selectedRole === "student" && styles.cardSelected,
                ]}
              >
                <View style={styles.cardIllustration}>
                  <StudentIllustration />
                </View>
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTitle}>I'm a Student</Text>
                  <Text style={styles.cardDescription}>
                    Learn about money through fun missions, quizzes, and a budgeting simulator
                  </Text>
                </View>
                {/* Selection indicator */}
                <View
                  style={[
                    styles.radioOuter,
                    selectedRole === "student" && styles.radioOuterSelected,
                  ]}
                >
                  {selectedRole === "student" && <View style={styles.radioInner} />}
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          {/* Teacher card */}
          <Animated.View
            style={{
              opacity: teacherCardOpacity,
              transform: [
                { translateY: teacherCardSlide },
                { scale: teacherPulse },
              ],
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleSelect("teacher")}
              style={styles.cardTouchable}
            >
              <LinearGradient
                colors={
                  selectedRole === "teacher"
                    ? ["rgba(168,85,247,0.25)", "rgba(168,85,247,0.08)"]
                    : ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.04)"]
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[
                  styles.card,
                  selectedRole === "teacher" && styles.cardSelectedTeacher,
                ]}
              >
                <View style={styles.cardIllustration}>
                  <TeacherIllustration />
                </View>
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTitle}>I'm a Teacher</Text>
                  <Text style={styles.cardDescription}>
                    Track student progress, create quizzes, and manage your class dashboard
                  </Text>
                </View>
                <View
                  style={[
                    styles.radioOuter,
                    selectedRole === "teacher" && styles.radioOuterSelectedTeacher,
                  ]}
                >
                  {selectedRole === "teacher" && <View style={styles.radioInnerTeacher} />}
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Continue button */}
        <Animated.View
          style={[
            styles.footer,
            { opacity: footerOpacity, transform: [{ translateY: footerSlide }] },
          ]}
        >
          <TouchableOpacity
            style={[styles.ctaButton, !selectedRole && styles.ctaButtonDisabled]}
            activeOpacity={selectedRole ? 0.85 : 1}
            onPress={handleContinue}
          >
            <LinearGradient
              colors={
                selectedRole
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
                  !selectedRole && styles.ctaTextDisabled,
                ]}
              >
                Continue
              </Text>
              <Text
                style={[
                  styles.ctaArrow,
                  !selectedRole && styles.ctaTextDisabled,
                ]}
              >
                →
              </Text>
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
    height: 120,
  },
  content: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight ?? 0) + 20 : 64,
    paddingBottom: Platform.OS === "android" ? 24 : 40,
    paddingHorizontal: 24,
  },

  // ── Header ──
  header: {
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  headerLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "rgba(255,255,255,0.5)",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  headerTitle: {
    fontFamily: "Fredoka_700Bold",
    fontSize: 34,
    color: "#FFFFFF",
    lineHeight: 40,
    marginTop: 4,
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  headerSubtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "rgba(255,255,255,0.55)",
    marginTop: 6,
  },

  // ── Cards ──
  cardsSection: {
    flex: 1,
    justifyContent: "center",
    gap: 16,
  },
  cardTouchable: {
    borderRadius: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.1)",
    paddingVertical: 20,
    paddingHorizontal: 16,
    gap: 14,
  },
  cardSelected: {
    borderColor: "#4FC3F7",
    borderWidth: 2,
  },
  cardSelectedTeacher: {
    borderColor: "#A855F7",
    borderWidth: 2,
  },
  cardIllustration: {
    width: 90,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: "Fredoka_700Bold",
    fontSize: 22,
    color: "#FFFFFF",
    letterSpacing: -0.3,
  },
  cardDescription: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "rgba(255,255,255,0.6)",
    marginTop: 4,
    lineHeight: 19,
  },

  // ── Radio indicator ──
  radioOuter: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterSelected: {
    borderColor: "#4FC3F7",
    backgroundColor: "rgba(79,195,247,0.15)",
  },
  radioOuterSelectedTeacher: {
    borderColor: "#A855F7",
    backgroundColor: "rgba(168,85,247,0.15)",
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#4FC3F7",
  },
  radioInnerTeacher: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#A855F7",
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
      ios: {
        shadowOpacity: 0,
      },
      android: {
        elevation: 0,
      },
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
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    color: "#1A1B4B",
  },
});


