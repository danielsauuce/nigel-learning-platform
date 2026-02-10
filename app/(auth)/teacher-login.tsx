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
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Circle,
  Defs,
  Path,
  Rect,
  Stop,
  Svg,
  LinearGradient as SvgLinearGradient,
  Text as SvgText
} from "react-native-svg";

const { width, height } = Dimensions.get("window");

// ═══════════════════════════════════════════════════════════════════
// ─── AMBIENT COMPONENTS ───────────────────────────────────────────
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
        <Defs><SvgLinearGradient id={`tlCoin-${delay}`} x1="0" y1="0" x2="0" y2="1"><Stop offset="0" stopColor="#FFD700" /><Stop offset="1" stopColor="#F5A623" /></SvgLinearGradient></Defs>
        <Circle cx="20" cy="20" r="18" fill={`url(#tlCoin-${delay})`} />
        <Circle cx="20" cy="20" r="14" fill="none" stroke="#E8960C" strokeWidth="1.5" />
        <SvgText x="20" y="26" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#B8760A">£</SvgText>
      </Svg>
    </Animated.View>
  );
};

const BottomWave = () => {
  const wo = useRef(new Animated.Value(0)).current;
  useEffect(() => { Animated.loop(Animated.sequence([Animated.timing(wo, { toValue: 1, duration: 3000, useNativeDriver: true }), Animated.timing(wo, { toValue: 0, duration: 3000, useNativeDriver: true })])).start(); }, []);
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

// ── Teacher Icon SVG ──
const TeacherIcon = () => (
  <Svg width={80} height={80} viewBox="0 0 80 80">
    <Defs>
      <SvgLinearGradient id="teacherGrad" x1="0" y1="0" x2="0" y2="1">
        <Stop offset="0" stopColor="#A855F7" />
        <Stop offset="1" stopColor="#7C3AED" />
      </SvgLinearGradient>
    </Defs>
    {/* Head */}
    <Circle cx="40" cy="26" r="14" fill="url(#teacherGrad)" opacity={0.3} />
    <Circle cx="40" cy="26" r="14" fill="none" stroke="#A855F7" strokeWidth="2.5" />
    {/* Body */}
    <Path d="M16 68 Q16 48 40 44 Q64 48 64 68" fill="url(#teacherGrad)" opacity={0.15} />
    <Path d="M16 68 Q16 48 40 44 Q64 48 64 68" fill="none" stroke="#A855F7" strokeWidth="2.5" strokeLinecap="round" />
    {/* Glasses */}
    <Circle cx="34" cy="25" r="5" fill="none" stroke="#A855F7" strokeWidth="1.5" />
    <Circle cx="46" cy="25" r="5" fill="none" stroke="#A855F7" strokeWidth="1.5" />
    <Path d="M39 25 L41 25" stroke="#A855F7" strokeWidth="1.5" />
    {/* Book */}
    <Rect x="30" y="52" width="20" height="14" rx="2" fill="#A855F7" opacity={0.25} />
    <Path d="M40 52 L40 66" stroke="#A855F7" strokeWidth="1" opacity={0.5} />
    <Path d="M33 56 L37 56" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeLinecap="round" />
    <Path d="M43 56 L47 56" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeLinecap="round" />
    <Path d="M33 59 L37 59" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round" />
    <Path d="M43 59 L47 59" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round" />
  </Svg>
);

// ── Input field icons ──
const EmailIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20">
    <Rect x="2" y="4" width="16" height="12" rx="2.5" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
    <Path d="M2 6 L10 11 L18 6" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const LockIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20">
    <Rect x="4" y="9" width="12" height="9" rx="2" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
    <Path d="M7 9 L7 6 Q7 3 10 3 Q13 3 13 6 L13 9" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" />
    <Circle cx="10" cy="13.5" r="1.5" fill="rgba(255,255,255,0.35)" />
  </Svg>
);

const EyeIcon = ({ visible }: { visible: boolean }) => (
  <Svg width={22} height={22} viewBox="0 0 22 22">
    {visible ? (
      <>
        <Path d="M2 11 Q6 5 11 5 Q16 5 20 11 Q16 17 11 17 Q6 17 2 11 Z" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
        <Circle cx="11" cy="11" r="3" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
      </>
    ) : (
      <>
        <Path d="M2 11 Q6 5 11 5 Q16 5 20 11 Q16 17 11 17 Q6 17 2 11 Z" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
        <Circle cx="11" cy="11" r="3" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
        <Path d="M4 18 L18 4" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" />
      </>
    )}
  </Svg>
);

// ═══════════════════════════════════════════════════════════════════
// ─── MAIN LOGIN SCREEN ────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════
export default function TeacherLoginScreen() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    Poppins_700Bold, Poppins_400Regular, Poppins_500Medium,
    Poppins_600SemiBold, Fredoka_700Bold,
  });

  // ── State ──
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // ── Refs ──
  const passwordRef = useRef<TextInput>(null);

  // ── Animations ──
  const fadeAnims = useRef(Array.from({ length: 8 }, () => new Animated.Value(0))).current;
  const slideAnims = useRef(Array.from({ length: 8 }, () => new Animated.Value(30))).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anims = fadeAnims.map((fade, i) =>
      Animated.parallel([
        Animated.timing(fade, { toValue: 1, duration: 400, delay: i * 80, useNativeDriver: true }),
        Animated.timing(slideAnims[i], { toValue: 0, duration: 400, delay: i * 80, useNativeDriver: true }),
      ])
    );
    Animated.stagger(50, anims).start();
  }, []);

  const anim = (i: number) => ({ opacity: fadeAnims[i], transform: [{ translateY: slideAnims[i] }] });

  // ── Validation ──
  const validate = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Enter a valid email address";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    setLoginError("");
    if (!validate()) {
      // Shake form
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 6, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Mock: accept any valid-looking credentials
      // router.replace("/(teacher)/(tabs)/dashboard");
      setLoginError(""); // Success in production
    }, 1500);
  };

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <LinearGradient colors={["#1A1B4B", "#2D3A8C", "#4158D0"]} start={{ x: 0.2, y: 0 }} end={{ x: 0.8, y: 1 }} style={StyleSheet.absoluteFillObject} />

      {/* Sparkle dots */}
      {[...Array(10)].map((_, i) => (
        <View key={`s-${i}`} style={[styles.star, { left: (i * 83 + 37) % width, top: (i * 59 + 23) % (height * 0.35), width: i % 3 === 0 ? 4 : 2, height: i % 3 === 0 ? 4 : 2, opacity: 0.1 + (i % 4) * 0.05 }]} />
      ))}

      <FloatingCoin delay={0} startX={width * 0.08} startY={height * 0.06} size={20} opacity={0.25} />
      <FloatingCoin delay={500} startX={width * 0.84} startY={height * 0.09} size={16} opacity={0.2} />
      <FloatingCoin delay={250} startX={width * 0.68} startY={height * 0.03} size={14} opacity={0.18} />

      <BottomWave />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

          {/* Back button */}
          <Animated.View style={anim(0)}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton} activeOpacity={0.7}>
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Header */}
          <Animated.View style={[styles.headerSection, anim(1)]}>
            <View style={styles.iconCircle}>
              <TeacherIcon />
            </View>
            <Text style={styles.title}>Teacher Login</Text>
            <Text style={styles.subtitle}>Sign in to manage your class and track student progress</Text>
          </Animated.View>

          {/* Login error banner */}
          {loginError !== "" && (
            <Animated.View style={anim(2)}>
              <View style={styles.errorBanner}>
                <Text style={styles.errorBannerEmoji}>⚠️</Text>
                <Text style={styles.errorBannerText}>{loginError}</Text>
              </View>
            </Animated.View>
          )}

          {/* Form */}
          <Animated.View style={[{ transform: [{ translateX: shakeAnim }] }, anim(2)]}>
            {/* Email */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Email Address</Text>
              <View style={[styles.inputRow, errors.email ? styles.inputRowError : null]}>
                <View style={styles.inputIcon}><EmailIcon /></View>
                <TextInput
                  style={styles.input}
                  placeholder="your.email@school.ac.uk"
                  placeholderTextColor="rgba(255,255,255,0.2)"
                  value={email}
                  onChangeText={(t) => { setEmail(t); setErrors((e) => ({ ...e, email: undefined })); setLoginError(""); }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef.current?.focus()}
                />
              </View>
              {errors.email && <Text style={styles.fieldError}>{errors.email}</Text>}
            </View>

            {/* Password */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Password</Text>
              <View style={[styles.inputRow, errors.password ? styles.inputRowError : null]}>
                <View style={styles.inputIcon}><LockIcon /></View>
                <TextInput
                  ref={passwordRef}
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor="rgba(255,255,255,0.2)"
                  value={password}
                  onChangeText={(t) => { setPassword(t); setErrors((e) => ({ ...e, password: undefined })); setLoginError(""); }}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoComplete="password"
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton} activeOpacity={0.6}>
                  <EyeIcon visible={showPassword} />
                </TouchableOpacity>
              </View>
              {errors.password && <Text style={styles.fieldError}>{errors.password}</Text>}
            </View>

            {/* Forgot password */}
            <TouchableOpacity style={styles.forgotRow} activeOpacity={0.6}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Login Button */}
          <Animated.View style={anim(3)}>
            <TouchableOpacity activeOpacity={0.85} onPress={handleLogin} disabled={isLoading} style={{ marginTop: 8 }}>
              <LinearGradient
                colors={isLoading ? ["rgba(168,85,247,0.4)", "rgba(124,58,237,0.3)"] : ["#A855F7", "#7C3AED"]}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                style={styles.loginButton}
              >
                {isLoading ? (
                  <View style={styles.loadingRow}>
                    <View style={styles.loadingDot} />
                    <View style={[styles.loadingDot, { opacity: 0.7 }]} />
                    <View style={[styles.loadingDot, { opacity: 0.4 }]} />
                    <Text style={styles.loginButtonText}>Signing in...</Text>
                  </View>
                ) : (
                  <Text style={styles.loginButtonText}>Sign In</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          {/* Divider */}
          <Animated.View style={[styles.dividerRow, anim(4)]}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </Animated.View>

          {/* School code login */}
          <Animated.View style={anim(5)}>
            <TouchableOpacity style={styles.altLoginButton} activeOpacity={0.7}>
              <Text style={styles.altLoginEmoji}>🏫</Text>
              <Text style={styles.altLoginText}>Sign in with School Code</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Register CTA */}
          <Animated.View style={[styles.registerSection, anim(6)]}>
            <Text style={styles.registerPrompt}>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => router.push("/(auth)/teacher-register")}
              activeOpacity={0.7}
            >
              <Text style={styles.registerLink}>Create Teacher Account →</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Security note */}
          <Animated.View style={anim(7)}>
            <View style={styles.securityNote}>
              <Text style={styles.securityNoteEmoji}>🔒</Text>
              <Text style={styles.securityNoteText}>
                Your data is encrypted and never shared. Teacher accounts are verified by school administrators.
              </Text>
            </View>
          </Animated.View>

          <View style={{ height: 60 }} />
        </ScrollView>
      </KeyboardAvoidingView>
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
    paddingHorizontal: 24,
  },

  // ── Back ──
  backButton: {
    width: 42, height: 42, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.06)", marginBottom: 16,
  },
  backArrow: { fontFamily: "Poppins_600SemiBold", fontSize: 20, color: "#FFFFFF", marginTop: -2 },

  // ── Header ──
  headerSection: { alignItems: "center", marginBottom: 32 },
  iconCircle: {
    width: 120, height: 120, borderRadius: 36, backgroundColor: "rgba(168,85,247,0.1)",
    borderWidth: 2, borderColor: "rgba(168,85,247,0.2)", alignItems: "center", justifyContent: "center", marginBottom: 20,
    ...Platform.select({
      ios: { shadowColor: "#A855F7", shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.25, shadowRadius: 24 },
      android: { elevation: 8 },
    }),
  },
  title: {
    fontFamily: "Fredoka_700Bold", fontSize: 32, color: "#FFFFFF", textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.2)", textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 6,
  },
  subtitle: {
    fontFamily: "Poppins_400Regular", fontSize: 14, color: "rgba(255,255,255,0.5)",
    textAlign: "center", marginTop: 8, lineHeight: 21, paddingHorizontal: 16,
  },

  // ── Error Banner ──
  errorBanner: {
    flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: "rgba(239,68,68,0.1)",
    borderRadius: 14, padding: 14, borderWidth: 1, borderColor: "rgba(239,68,68,0.2)", marginBottom: 16,
  },
  errorBannerEmoji: { fontSize: 18 },
  errorBannerText: { fontFamily: "Poppins_500Medium", fontSize: 13, color: "#EF4444", flex: 1 },

  // ── Field ──
  fieldGroup: { marginBottom: 18 },
  fieldLabel: { fontFamily: "Poppins_600SemiBold", fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 8, marginLeft: 4 },
  inputRow: {
    flexDirection: "row", alignItems: "center", backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 16, borderWidth: 1.5, borderColor: "rgba(255,255,255,0.08)", height: 56, paddingHorizontal: 16,
  },
  inputRowError: { borderColor: "rgba(239,68,68,0.5)" },
  inputIcon: { marginRight: 12 },
  input: {
    flex: 1, fontFamily: "Poppins_500Medium", fontSize: 15, color: "#FFFFFF", height: "100%",
  },
  eyeButton: { padding: 4, marginLeft: 8 },
  fieldError: { fontFamily: "Poppins_400Regular", fontSize: 12, color: "#EF4444", marginTop: 6, marginLeft: 4 },

  // ── Forgot ──
  forgotRow: { alignItems: "flex-end", marginBottom: 4 },
  forgotText: { fontFamily: "Poppins_500Medium", fontSize: 13, color: "#4FC3F7" },

  // ── Login Button ──
  loginButton: {
    borderRadius: 20, paddingVertical: 17, alignItems: "center", justifyContent: "center",
    ...Platform.select({
      ios: { shadowColor: "#7C3AED", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.35, shadowRadius: 14 },
      android: { elevation: 8 },
    }),
  },
  loginButtonText: { fontFamily: "Poppins_700Bold", fontSize: 17, color: "#FFFFFF", letterSpacing: 0.5 },
  loadingRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  loadingDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.7)" },

  // ── Divider ──
  dividerRow: { flexDirection: "row", alignItems: "center", marginVertical: 20, gap: 14 },
  dividerLine: { flex: 1, height: 1, backgroundColor: "rgba(255,255,255,0.08)" },
  dividerText: { fontFamily: "Poppins_400Regular", fontSize: 13, color: "rgba(255,255,255,0.25)" },

  // ── Alt Login ──
  altLoginButton: {
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10,
    backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 18, paddingVertical: 16,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.08)",
  },
  altLoginEmoji: { fontSize: 20 },
  altLoginText: { fontFamily: "Poppins_600SemiBold", fontSize: 15, color: "rgba(255,255,255,0.7)" },

  // ── Register CTA ──
  registerSection: { alignItems: "center", marginTop: 28, marginBottom: 8 },
  registerPrompt: { fontFamily: "Poppins_400Regular", fontSize: 14, color: "rgba(255,255,255,0.4)" },
  registerLink: { fontFamily: "Poppins_700Bold", fontSize: 15, color: "#A855F7", marginTop: 6 },

  // ── Security Note ──
  securityNote: {
    flexDirection: "row", alignItems: "center", gap: 10, marginTop: 16,
    backgroundColor: "rgba(79,195,247,0.06)", borderRadius: 14, padding: 14,
    borderWidth: 1, borderColor: "rgba(79,195,247,0.1)",
  },
  securityNoteEmoji: { fontSize: 16 },
  securityNoteText: { fontFamily: "Poppins_400Regular", fontSize: 11, color: "rgba(255,255,255,0.4)", flex: 1, lineHeight: 16 },
});