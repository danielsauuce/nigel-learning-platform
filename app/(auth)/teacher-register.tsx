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
  Text as SvgText,
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
        <Defs><SvgLinearGradient id={`trCoin-${delay}`} x1="0" y1="0" x2="0" y2="1"><Stop offset="0" stopColor="#FFD700" /><Stop offset="1" stopColor="#F5A623" /></SvgLinearGradient></Defs>
        <Circle cx="20" cy="20" r="18" fill={`url(#trCoin-${delay})`} />
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

// ── SVG Input Icons ──
const PersonIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20">
    <Circle cx="10" cy="7" r="4" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
    <Path d="M3 18 Q3 13 10 12 Q17 13 17 18" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" />
  </Svg>
);

const EmailIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20">
    <Rect x="2" y="4" width="16" height="12" rx="2.5" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
    <Path d="M2 6 L10 11 L18 6" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const SchoolIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20">
    <Path d="M2 18 L2 9 L10 4 L18 9 L18 18" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <Rect x="7" y="12" width="6" height="6" rx="1" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
    <Path d="M10 4 L10 2" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" />
  </Svg>
);

const CodeIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20">
    <Path d="M7 5 L3 10 L7 15" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M13 5 L17 10 L13 15" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

// ── Strength Indicator ──
const PasswordStrength = ({ password }: { password: string }) => {
  let strength = 0;
  if (password.length >= 6) strength++;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  const labels = ["", "Weak", "Fair", "Good", "Strong", "Excellent"];
  const colors = ["transparent", "#EF4444", "#F59E0B", "#F59E0B", "#10B981", "#10B981"];
  const label = labels[strength] || "";
  const color = colors[strength] || "transparent";

  if (!password) return null;

  return (
    <View style={styles.strengthRow}>
      <View style={styles.strengthBarTrack}>
        {Array.from({ length: 5 }).map((_, i) => (
          <View key={i} style={[styles.strengthBarSegment, { backgroundColor: i < strength ? color : "rgba(255,255,255,0.06)" }]} />
        ))}
      </View>
      <Text style={[styles.strengthLabel, { color }]}>{label}</Text>
    </View>
  );
};

// ═══════════════════════════════════════════════════════════════════
// ─── MAIN REGISTER SCREEN ─────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════
export default function TeacherRegisterScreen() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    Poppins_700Bold, Poppins_400Regular, Poppins_500Medium,
    Poppins_600SemiBold, Fredoka_700Bold,
  });

  // ── State ──
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [schoolCode, setSchoolCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // ── Refs ──
  const emailRef = useRef<TextInput>(null);
  const schoolNameRef = useRef<TextInput>(null);
  const schoolCodeRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmRef = useRef<TextInput>(null);

  // ── Animations ──
  const fadeAnims = useRef(Array.from({ length: 12 }, () => new Animated.Value(0))).current;
  const slideAnims = useRef(Array.from({ length: 12 }, () => new Animated.Value(28))).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const successScale = useRef(new Animated.Value(0.5)).current;
  const successOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(50,
      fadeAnims.map((fade, i) =>
        Animated.parallel([
          Animated.timing(fade, { toValue: 1, duration: 380, delay: i * 70, useNativeDriver: true }),
          Animated.timing(slideAnims[i], { toValue: 0, duration: 380, delay: i * 70, useNativeDriver: true }),
        ])
      )
    ).start();
  }, []);

  const anim = (i: number) => ({ opacity: fadeAnims[i], transform: [{ translateY: slideAnims[i] }] });

  // ── Validation ──
  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!fullName.trim()) e.fullName = "Full name is required";
    if (!email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = "Enter a valid email address";
    if (!schoolName.trim()) e.schoolName = "School name is required";
    if (!schoolCode.trim()) e.schoolCode = "School code is required";
    else if (schoolCode.trim().length < 4) e.schoolCode = "School code must be at least 4 characters";
    if (!password) e.password = "Password is required";
    else if (password.length < 8) e.password = "Password must be at least 8 characters";
    if (!confirmPassword) e.confirmPassword = "Please confirm your password";
    else if (password !== confirmPassword) e.confirmPassword = "Passwords don't match";
    if (!acceptedTerms) e.terms = "You must accept the terms to continue";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const clearError = (key: string) => setErrors((prev) => { const n = { ...prev }; delete n[key]; return n; });

  const handleRegister = () => {
    if (!validate()) {
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 6, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      Animated.parallel([
        Animated.spring(successScale, { toValue: 1, friction: 5, tension: 50, useNativeDriver: true }),
        Animated.timing(successOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      ]).start();
    }, 2000);
  };

  if (!fontsLoaded) return null;

  // ═══ SUCCESS STATE ═══
  if (showSuccess) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
        <LinearGradient colors={["#1A1B4B", "#2D3A8C", "#4158D0"]} start={{ x: 0.2, y: 0 }} end={{ x: 0.8, y: 1 }} style={StyleSheet.absoluteFillObject} />
        {[...Array(8)].map((_, i) => (<View key={`s-${i}`} style={[styles.star, { left: (i * 83 + 37) % width, top: (i * 59 + 23) % (height * 0.35), width: i % 3 === 0 ? 4 : 2, height: i % 3 === 0 ? 4 : 2, opacity: 0.1 + (i % 4) * 0.05 }]} />))}
        <BottomWave />

        <View style={styles.successContainer}>
          <Animated.View style={{ alignItems: "center", opacity: successOpacity, transform: [{ scale: successScale }] }}>
            <View style={styles.successCircle}>
              <Text style={{ fontSize: 52 }}>🎉</Text>
            </View>
            <Text style={styles.successTitle}>Account Created!</Text>
            <Text style={styles.successSubtitle}>
              Welcome, {fullName.split(" ")[0]}! Your teacher account is ready. You can now sign in and start managing your class.
            </Text>

            <View style={styles.successInfoCard}>
              <View style={styles.successInfoRow}>
                <Text style={styles.successInfoEmoji}>📧</Text>
                <View>
                  <Text style={styles.successInfoLabel}>Email</Text>
                  <Text style={styles.successInfoValue}>{email}</Text>
                </View>
              </View>
              <View style={styles.successInfoRow}>
                <Text style={styles.successInfoEmoji}>🏫</Text>
                <View>
                  <Text style={styles.successInfoLabel}>School</Text>
                  <Text style={styles.successInfoValue}>{schoolName}</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => router.replace("/(auth)/teacher-login")}
              style={{ width: "100%", marginTop: 20 }}
            >
              <LinearGradient colors={["#A855F7", "#7C3AED"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Go to Sign In →</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    );
  }

  // ═══ REGISTRATION FORM ═══
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <LinearGradient colors={["#1A1B4B", "#2D3A8C", "#4158D0"]} start={{ x: 0.2, y: 0 }} end={{ x: 0.8, y: 1 }} style={StyleSheet.absoluteFillObject} />

      {[...Array(10)].map((_, i) => (<View key={`s-${i}`} style={[styles.star, { left: (i * 79 + 41) % width, top: (i * 53 + 25) % (height * 0.3), width: i % 3 === 0 ? 4 : 2, height: i % 3 === 0 ? 4 : 2, opacity: 0.1 + (i % 4) * 0.05 }]} />))}
      <FloatingCoin delay={0} startX={width * 0.06} startY={height * 0.05} size={18} opacity={0.22} />
      <FloatingCoin delay={400} startX={width * 0.86} startY={height * 0.08} size={14} opacity={0.18} />
      <BottomWave />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

          {/* Back */}
          <Animated.View style={anim(0)}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton} activeOpacity={0.7}>
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Header */}
          <Animated.View style={[styles.headerSection, anim(1)]}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Set up your teacher account to manage students, track progress, and assign content</Text>
          </Animated.View>

          {/* Form */}
          <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>

            {/* Full Name */}
            <Animated.View style={anim(2)}>
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Full Name</Text>
                <View style={[styles.inputRow, errors.fullName && styles.inputRowError]}>
                  <View style={styles.inputIcon}><PersonIcon /></View>
                  <TextInput style={styles.input} placeholder="e.g. Ms Sarah Jones" placeholderTextColor="rgba(255,255,255,0.2)" value={fullName}
                    onChangeText={(t) => { setFullName(t); clearError("fullName"); }} autoCapitalize="words" returnKeyType="next" onSubmitEditing={() => emailRef.current?.focus()} />
                </View>
                {errors.fullName && <Text style={styles.fieldError}>{errors.fullName}</Text>}
              </View>
            </Animated.View>

            {/* Email */}
            <Animated.View style={anim(3)}>
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>School Email Address</Text>
                <View style={[styles.inputRow, errors.email && styles.inputRowError]}>
                  <View style={styles.inputIcon}><EmailIcon /></View>
                  <TextInput ref={emailRef} style={styles.input} placeholder="your.email@school.ac.uk" placeholderTextColor="rgba(255,255,255,0.2)" value={email}
                    onChangeText={(t) => { setEmail(t); clearError("email"); }} keyboardType="email-address" autoCapitalize="none" returnKeyType="next" onSubmitEditing={() => schoolNameRef.current?.focus()} />
                </View>
                {errors.email && <Text style={styles.fieldError}>{errors.email}</Text>}
              </View>
            </Animated.View>

            {/* School Name */}
            <Animated.View style={anim(4)}>
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>School Name</Text>
                <View style={[styles.inputRow, errors.schoolName && styles.inputRowError]}>
                  <View style={styles.inputIcon}><SchoolIcon /></View>
                  <TextInput ref={schoolNameRef} style={styles.input} placeholder="e.g. Westfield Academy" placeholderTextColor="rgba(255,255,255,0.2)" value={schoolName}
                    onChangeText={(t) => { setSchoolName(t); clearError("schoolName"); }} autoCapitalize="words" returnKeyType="next" onSubmitEditing={() => schoolCodeRef.current?.focus()} />
                </View>
                {errors.schoolName && <Text style={styles.fieldError}>{errors.schoolName}</Text>}
              </View>
            </Animated.View>

            {/* School Code */}
            <Animated.View style={anim(5)}>
              <View style={styles.fieldGroup}>
                <View style={styles.fieldLabelRow}>
                  <Text style={styles.fieldLabel}>School Code</Text>
                  <TouchableOpacity activeOpacity={0.6}>
                    <Text style={styles.fieldHintLink}>What's this?</Text>
                  </TouchableOpacity>
                </View>
                <View style={[styles.inputRow, errors.schoolCode && styles.inputRowError]}>
                  <View style={styles.inputIcon}><CodeIcon /></View>
                  <TextInput ref={schoolCodeRef} style={styles.input} placeholder="e.g. WFA-2026" placeholderTextColor="rgba(255,255,255,0.2)" value={schoolCode}
                    onChangeText={(t) => { setSchoolCode(t.toUpperCase()); clearError("schoolCode"); }} autoCapitalize="characters" returnKeyType="next" onSubmitEditing={() => passwordRef.current?.focus()} />
                </View>
                {errors.schoolCode && <Text style={styles.fieldError}>{errors.schoolCode}</Text>}
                <Text style={styles.fieldHint}>Your school administrator will have provided this code</Text>
              </View>
            </Animated.View>

            {/* Password */}
            <Animated.View style={anim(6)}>
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Create Password</Text>
                <View style={[styles.inputRow, errors.password && styles.inputRowError]}>
                  <View style={styles.inputIcon}><LockIcon /></View>
                  <TextInput ref={passwordRef} style={styles.input} placeholder="Min. 8 characters" placeholderTextColor="rgba(255,255,255,0.2)" value={password}
                    onChangeText={(t) => { setPassword(t); clearError("password"); }} secureTextEntry={!showPassword} autoCapitalize="none" returnKeyType="next" onSubmitEditing={() => confirmRef.current?.focus()} />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton} activeOpacity={0.6}>
                    <EyeIcon visible={showPassword} />
                  </TouchableOpacity>
                </View>
                <PasswordStrength password={password} />
                {errors.password && <Text style={styles.fieldError}>{errors.password}</Text>}
              </View>
            </Animated.View>

            {/* Confirm Password */}
            <Animated.View style={anim(7)}>
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Confirm Password</Text>
                <View style={[styles.inputRow, errors.confirmPassword && styles.inputRowError]}>
                  <View style={styles.inputIcon}><LockIcon /></View>
                  <TextInput ref={confirmRef} style={styles.input} placeholder="Re-enter your password" placeholderTextColor="rgba(255,255,255,0.2)" value={confirmPassword}
                    onChangeText={(t) => { setConfirmPassword(t); clearError("confirmPassword"); }} secureTextEntry={!showPassword} autoCapitalize="none" returnKeyType="done" />
                  {confirmPassword.length > 0 && password === confirmPassword && (
                    <Text style={{ fontSize: 16 }}>✅</Text>
                  )}
                </View>
                {errors.confirmPassword && <Text style={styles.fieldError}>{errors.confirmPassword}</Text>}
              </View>
            </Animated.View>

          </Animated.View>

          {/* Terms */}
          <Animated.View style={anim(8)}>
            <TouchableOpacity onPress={() => { setAcceptedTerms(!acceptedTerms); clearError("terms"); }} activeOpacity={0.7} style={styles.termsRow}>
              <View style={styles.termsCheckbox}>
                {acceptedTerms ? (
                  <View style={styles.termsChecked}><Text style={styles.termsCheckmark}>✓</Text></View>
                ) : (
                  <View style={[styles.termsUnchecked, errors.terms && { borderColor: "rgba(239,68,68,0.5)" }]} />
                )}
              </View>
              <Text style={styles.termsText}>
                I agree to the <Text style={styles.termsLink}>Terms of Service</Text> and <Text style={styles.termsLink}>Privacy Policy</Text>, and confirm I am an authorised staff member at the school above.
              </Text>
            </TouchableOpacity>
            {errors.terms && <Text style={[styles.fieldError, { marginLeft: 40 }]}>{errors.terms}</Text>}
          </Animated.View>

          {/* Register Button */}
          <Animated.View style={anim(9)}>
            <TouchableOpacity activeOpacity={0.85} onPress={handleRegister} disabled={isLoading} style={{ marginTop: 12 }}>
              <LinearGradient
                colors={isLoading ? ["rgba(168,85,247,0.4)", "rgba(124,58,237,0.3)"] : ["#A855F7", "#7C3AED"]}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                style={styles.loginButton}
              >
                {isLoading ? (
                  <View style={styles.loadingRow}>
                    <View style={styles.loadingDot} /><View style={[styles.loadingDot, { opacity: 0.7 }]} /><View style={[styles.loadingDot, { opacity: 0.4 }]} />
                    <Text style={styles.loginButtonText}>Creating account...</Text>
                  </View>
                ) : (
                  <Text style={styles.loginButtonText}>Create Account</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          {/* Login CTA */}
          <Animated.View style={[styles.loginCTASection, anim(10)]}>
            <Text style={styles.loginCTAPrompt}>Already have an account?</Text>
            <TouchableOpacity onPress={() => router.replace("/(auth)/teacher-login")} activeOpacity={0.7}>
              <Text style={styles.loginCTALink}>Sign In Instead →</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Info note */}
          <Animated.View style={anim(11)}>
            <View style={styles.infoNote}>
              <Text style={styles.infoNoteEmoji}>ℹ️</Text>
              <Text style={styles.infoNoteText}>
                Teacher accounts require a valid school code for verification. Contact your school administrator if you don't have one.
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
  scrollContent: { paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight ?? 0) + 12 : 56, paddingHorizontal: 24 },

  // ── Back ──
  backButton: { width: 42, height: 42, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.08)", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.06)", marginBottom: 16 },
  backArrow: { fontFamily: "Poppins_600SemiBold", fontSize: 20, color: "#FFFFFF", marginTop: -2 },

  // ── Header ──
  headerSection: { marginBottom: 28 },
  title: { fontFamily: "Fredoka_700Bold", fontSize: 30, color: "#FFFFFF", textShadowColor: "rgba(0,0,0,0.2)", textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 6 },
  subtitle: { fontFamily: "Poppins_400Regular", fontSize: 14, color: "rgba(255,255,255,0.5)", marginTop: 8, lineHeight: 21 },

  // ── Field ──
  fieldGroup: { marginBottom: 16 },
  fieldLabel: { fontFamily: "Poppins_600SemiBold", fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 8, marginLeft: 4 },
  fieldLabelRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8, marginLeft: 4, marginRight: 4 },
  fieldHintLink: { fontFamily: "Poppins_500Medium", fontSize: 12, color: "#4FC3F7" },
  inputRow: { flexDirection: "row", alignItems: "center", backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 16, borderWidth: 1.5, borderColor: "rgba(255,255,255,0.08)", height: 54, paddingHorizontal: 16 },
  inputRowError: { borderColor: "rgba(239,68,68,0.5)" },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, fontFamily: "Poppins_500Medium", fontSize: 15, color: "#FFFFFF", height: "100%" },
  eyeButton: { padding: 4, marginLeft: 8 },
  fieldError: { fontFamily: "Poppins_400Regular", fontSize: 12, color: "#EF4444", marginTop: 6, marginLeft: 4 },
  fieldHint: { fontFamily: "Poppins_400Regular", fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 6, marginLeft: 4 },

  // ── Password Strength ──
  strengthRow: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 8, marginLeft: 4 },
  strengthBarTrack: { flexDirection: "row", gap: 4, flex: 1 },
  strengthBarSegment: { flex: 1, height: 4, borderRadius: 2 },
  strengthLabel: { fontFamily: "Poppins_500Medium", fontSize: 11, width: 60 },

  // ── Terms ──
  termsRow: { flexDirection: "row", gap: 14, marginTop: 4, marginBottom: 4 },
  termsCheckbox: { marginTop: 2 },
  termsUnchecked: { width: 24, height: 24, borderRadius: 8, borderWidth: 2, borderColor: "rgba(255,255,255,0.2)", backgroundColor: "rgba(255,255,255,0.04)" },
  termsChecked: { width: 24, height: 24, borderRadius: 8, backgroundColor: "#A855F7", alignItems: "center", justifyContent: "center" },
  termsCheckmark: { fontFamily: "Poppins_700Bold", fontSize: 14, color: "#FFFFFF", marginTop: -1 },
  termsText: { fontFamily: "Poppins_400Regular", fontSize: 12, color: "rgba(255,255,255,0.45)", flex: 1, lineHeight: 18 },
  termsLink: { color: "#4FC3F7", fontFamily: "Poppins_500Medium" },

  // ── Button ──
  loginButton: {
    borderRadius: 20, paddingVertical: 17, alignItems: "center", justifyContent: "center",
    ...Platform.select({ ios: { shadowColor: "#7C3AED", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.35, shadowRadius: 14 }, android: { elevation: 8 } }),
  },
  loginButtonText: { fontFamily: "Poppins_700Bold", fontSize: 17, color: "#FFFFFF", letterSpacing: 0.5 },
  loadingRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  loadingDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.7)" },

  // ── Login CTA ──
  loginCTASection: { alignItems: "center", marginTop: 24, marginBottom: 8 },
  loginCTAPrompt: { fontFamily: "Poppins_400Regular", fontSize: 14, color: "rgba(255,255,255,0.4)" },
  loginCTALink: { fontFamily: "Poppins_700Bold", fontSize: 15, color: "#A855F7", marginTop: 6 },

  // ── Info Note ──
  infoNote: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 16, backgroundColor: "rgba(79,195,247,0.06)", borderRadius: 14, padding: 14, borderWidth: 1, borderColor: "rgba(79,195,247,0.1)" },
  infoNoteEmoji: { fontSize: 16 },
  infoNoteText: { fontFamily: "Poppins_400Regular", fontSize: 11, color: "rgba(255,255,255,0.4)", flex: 1, lineHeight: 16 },

  // ── Success ──
  successContainer: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 32, zIndex: 1 },
  successCircle: { width: 100, height: 100, borderRadius: 32, backgroundColor: "rgba(168,85,247,0.15)", borderWidth: 2, borderColor: "rgba(168,85,247,0.25)", alignItems: "center", justifyContent: "center", marginBottom: 20 },
  successTitle: { fontFamily: "Fredoka_700Bold", fontSize: 32, color: "#FFFFFF", textAlign: "center", marginBottom: 8, textShadowColor: "rgba(0,0,0,0.2)", textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 6 },
  successSubtitle: { fontFamily: "Poppins_400Regular", fontSize: 14, color: "rgba(255,255,255,0.55)", textAlign: "center", lineHeight: 22, marginBottom: 24, paddingHorizontal: 8 },
  successInfoCard: { backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 18, borderWidth: 1, borderColor: "rgba(255,255,255,0.08)", padding: 18, width: "100%", gap: 14 },
  successInfoRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  successInfoEmoji: { fontSize: 20 },
  successInfoLabel: { fontFamily: "Poppins_400Regular", fontSize: 11, color: "rgba(255,255,255,0.4)" },
  successInfoValue: { fontFamily: "Poppins_600SemiBold", fontSize: 14, color: "#FFFFFF", marginTop: 1 },
});