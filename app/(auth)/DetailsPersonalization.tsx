import {
  Fredoka_700Bold,
} from "@expo-google-fonts/fredoka";
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
import { Circle, Defs, Path, Stop, Svg, LinearGradient as SvgLinearGradient } from "react-native-svg";

const { width, height } = Dimensions.get("window");

// ─── Age Range Options ─────────────────────────────────────────────
const AGE_RANGES = [
  { id: "11-12", label: "11–12", emoji: "🌱", subtitle: "Just starting out" },
  { id: "13-14", label: "13–14", emoji: "🌿", subtitle: "Growing strong" },
  { id: "15-16", label: "15–16", emoji: "🌳", subtitle: "Ready to level up" },
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
      ])
    ).start();
  }, []);

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -14],
  });

  return (
    <Animated.View
      style={{
        position: "absolute",
        left: startX,
        top: startY,
        opacity: Animated.multiply(fadeIn, opacity),
        transform: [{ translateY }],
      }}
    >
      <Svg width={size} height={size} viewBox="0 0 40 40">
        <Defs>
          <SvgLinearGradient id={`coinG-${delay}`} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#FFD700" />
            <Stop offset="1" stopColor="#F5A623" />
          </SvgLinearGradient>
        </Defs>
        <Circle cx="20" cy="20" r="18" fill={`url(#coinG-${delay})`} />
        <Circle cx="20" cy="20" r="14" fill="none" stroke="#E8960C" strokeWidth="1.5" />
      </Svg>
    </Animated.View>
  );
};

// ─── Wave Background ───────────────────────────────────────────────
const WaveBackground = () => {
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
      ])
    ).start();
  }, []);

  const translateX = waveOffset.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -30],
  });

  return (
    <Animated.View
      style={[
        styles.waveContainer,
        { transform: [{ translateX }] },
      ]}
    >
      <Svg
        width={width + 60}
        height={120}
        viewBox={`0 0 ${width + 60} 120`}
        style={{ position: "absolute", bottom: 0 }}
      >
        <Path
          d={`M0 50 Q${width * 0.15} 25 ${width * 0.3} 45 Q${width * 0.45} 65 ${width * 0.6} 40 Q${width * 0.75} 15 ${width * 0.9} 45 Q${width * 1.05} 75 ${width + 60} 40 L${width + 60} 120 L0 120 Z`}
          fill="#4FC3F7"
          opacity={0.12}
        />
        <Path
          d={`M0 70 Q${width * 0.2} 50 ${width * 0.35} 65 Q${width * 0.5} 80 ${width * 0.65} 60 Q${width * 0.8} 40 ${width * 0.95} 65 L${width + 60} 55 L${width + 60} 120 L0 120 Z`}
          fill="#4FC3F7"
          opacity={0.08}
        />
      </Svg>
    </Animated.View>
  );
};

// ─── Main Personalization Screen ───────────────────────────────────
export default function DetailsPersonalizationScreen() {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Fredoka_700Bold,
  });

  const [name, setName] = useState("");
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [nameIsFocused, setNameIsFocused] = useState(false);

  // Animations
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(20)).current;
  const nameFieldOpacity = useRef(new Animated.Value(0)).current;
  const nameFieldSlide = useRef(new Animated.Value(25)).current;
  const ageOpacity = useRef(new Animated.Value(0)).current;
  const ageSlide = useRef(new Animated.Value(25)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonSlide = useRef(new Animated.Value(30)).current;

  // Scale animations for age cards
  const ageScalesRef = useRef<Animated.Value[]>(
    AGE_RANGES.map(() => new Animated.Value(1))
  );
  const ageScales = ageScalesRef.current;

  useEffect(() => {
    Animated.stagger(150, [
      Animated.parallel([
        Animated.timing(headerOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(headerSlide, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(nameFieldOpacity, {
          toValue: 1,
          duration: 450,
          useNativeDriver: true,
        }),
        Animated.timing(nameFieldSlide, {
          toValue: 0,
          duration: 450,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(ageOpacity, {
          toValue: 1,
          duration: 450,
          useNativeDriver: true,
        }),
        Animated.timing(ageSlide, {
          toValue: 0,
          duration: 450,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(buttonSlide, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const handleAgeSelect = (id: string, index: number) => {
    setSelectedAge(id);
    // Bounce animation on selection
    Animated.sequence([
      Animated.timing(ageScales[index], {
        toValue: 0.93,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(ageScales[index], {
        toValue: 1,
        friction: 4,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const isFormValid = name.trim().length >= 2 && selectedAge !== null;

  const handleContinue = () => {
    if (!isFormValid) return;

    // TODO: Save personalization data to store
    // e.g. usePersonalization().save({ name: name.trim(), ageRange: selectedAge })

    // Navigate to the next onboarding step (privacy & consent)
    router.push("/(student)/Personalization");
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

      {/* Sparkle dots */}
      {[...Array(8)].map((_, i) => (
        <View
          key={`star-${i}`}
          style={[
            styles.star,
            {
              left: (i * 113 + 31) % width,
              top: (i * 67 + 20) % (height * 0.3),
              width: i % 3 === 0 ? 3 : 2,
              height: i % 3 === 0 ? 3 : 2,
              opacity: 0.25 + (i % 4) * 0.1,
            },
          ]}
        />
      ))}

      {/* Floating coins */}
      <FloatingCoin delay={0} startX={width * 0.06} startY={height * 0.05} size={24} opacity={0.45} />
      <FloatingCoin delay={300} startX={width * 0.82} startY={height * 0.08} size={20} opacity={0.4} />
      <FloatingCoin delay={500} startX={width * 0.7} startY={height * 0.02} size={18} opacity={0.3} />

      {/* Bottom wave */}
      <WaveBackground />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Progress indicator */}
          <View style={styles.progressRow}>
            <View style={styles.progressDotActive} />
            <View style={styles.progressDotInactive} />
            <View style={styles.progressDotInactive} />
          </View>

          {/* Header */}
          <Animated.View
            style={{
              opacity: headerOpacity,
              transform: [{ translateY: headerSlide }],
            }}
          >
            <Text style={styles.greeting}>Hey there, explorer! 👋</Text>
            <Text style={styles.subtitle}>
              Let's get to know you before{"\n"}we set sail
            </Text>
          </Animated.View>

          {/* Name Input */}
          <Animated.View
            style={[
              styles.section,
              {
                opacity: nameFieldOpacity,
                transform: [{ translateY: nameFieldSlide }],
              },
            ]}
          >
            <Text style={styles.label}>What should we call you?</Text>
            <View
              style={[
                styles.inputContainer,
                nameIsFocused && styles.inputContainerFocused,
              ]}
            >
              <Text style={styles.inputIcon}>🏝️</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Your first name or nickname"
                placeholderTextColor="rgba(255, 255, 255, 0.35)"
                value={name}
                onChangeText={setName}
                onFocus={() => setNameIsFocused(true)}
                onBlur={() => setNameIsFocused(false)}
                maxLength={20}
                autoCapitalize="words"
                autoCorrect={false}
                returnKeyType="done"
              />
            </View>
            <Text style={styles.inputHint}>
              This is just a nickname — no personal data stored
            </Text>
          </Animated.View>

          {/* Age Range Selection */}
          <Animated.View
            style={[
              styles.section,
              {
                opacity: ageOpacity,
                transform: [{ translateY: ageSlide }],
              },
            ]}
          >
            <Text style={styles.label}>How old are you?</Text>
            <View style={styles.ageGrid}>
              {AGE_RANGES.map((range, index) => {
                const isSelected = selectedAge === range.id;
                return (
                  <Animated.View
                    key={range.id}
                    style={{ transform: [{ scale: ageScales[index] }] }}
                  >
                    <TouchableOpacity
                      style={[
                        styles.ageCard,
                        isSelected && styles.ageCardSelected,
                      ]}
                      activeOpacity={0.8}
                      onPress={() => handleAgeSelect(range.id, index)}
                    >
                      {isSelected && (
                        <LinearGradient
                          colors={["rgba(255, 215, 0, 0.15)", "rgba(245, 166, 35, 0.08)"]}
                          style={StyleSheet.absoluteFillObject}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                        />
                      )}
                      <Text style={styles.ageEmoji}>{range.emoji}</Text>
                      <Text
                        style={[
                          styles.ageLabel,
                          isSelected && styles.ageLabelSelected,
                        ]}
                      >
                        {range.label}
                      </Text>
                      <Text
                        style={[
                          styles.ageSubtitle,
                          isSelected && styles.ageSubtitleSelected,
                        ]}
                      >
                        {range.subtitle}
                      </Text>
                      {isSelected && (
                        <View style={styles.checkBadge}>
                          <Text style={styles.checkMark}>✓</Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  </Animated.View>
                );
              })}
            </View>
          </Animated.View>

          {/* Continue Button */}
          <Animated.View
            style={[
              styles.buttonWrapper,
              {
                opacity: buttonOpacity,
                transform: [{ translateY: buttonSlide }],
              },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.ctaButton,
                !isFormValid && styles.ctaButtonDisabled,
              ]}
              activeOpacity={0.85}
              onPress={handleContinue}
              disabled={!isFormValid}
            >
              <LinearGradient
                colors={
                  isFormValid
                    ? ["#FFD700", "#F5A623"]
                    : ["rgba(255, 215, 0, 0.3)", "rgba(245, 166, 35, 0.2)"]
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.ctaGradient}
              >
                <Text
                  style={[
                    styles.ctaText,
                    !isFormValid && styles.ctaTextDisabled,
                  ]}
                >
                  Continue
                </Text>
                <Text
                  style={[
                    styles.ctaArrow,
                    !isFormValid && styles.ctaTextDisabled,
                  ]}
                >
                  →
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {isFormValid && (
              <Animated.Text style={styles.readyText}>
                All set, {name.trim()}! Let's go 🚀
              </Animated.Text>
            )}
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

// ─── Styles ────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "ios" ? 70 : 50,
    paddingBottom: 60,
  },
  star: {
    position: "absolute",
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
  },
  waveContainer: {
    position: "absolute",
    bottom: 0,
    left: -30,
    right: -30,
    height: 120,
    zIndex: 0,
  },

  // Progress dots
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 32,
  },
  progressDotActive: {
    width: 28,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FFD700",
  },
  progressDotInactive: {
    width: 12,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },

  // Header
  greeting: {
    fontFamily: "Fredoka_700Bold",
    fontSize: 32,
    color: "#FFFFFF",
    letterSpacing: -0.5,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  subtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.65)",
    marginTop: 8,
    lineHeight: 24,
    letterSpacing: 0.2,
  },

  // Sections
  section: {
    marginTop: 32,
  },
  label: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    color: "rgba(255, 255, 255, 0.85)",
    marginBottom: 12,
    letterSpacing: 0.3,
  },

  // Name input
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.12)",
    paddingHorizontal: 16,
    height: 56,
  },
  inputContainerFocused: {
    borderColor: "rgba(255, 215, 0, 0.5)",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
  },
  inputIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "#FFFFFF",
    letterSpacing: 0.3,
    paddingVertical: 0,
  },
  inputHint: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.35)",
    marginTop: 8,
    marginLeft: 4,
    letterSpacing: 0.2,
  },

  // Age cards
  ageGrid: {
    flexDirection: "row",
    gap: 12,
  },
  ageCard: {
    flex: 1,
    minWidth: (width - 48 - 24) / 3,
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.1)",
    paddingVertical: 20,
    paddingHorizontal: 8,
    alignItems: "center",
    overflow: "hidden",
  },
  ageCardSelected: {
    borderColor: "#FFD700",
    backgroundColor: "rgba(255, 215, 0, 0.06)",
    ...Platform.select({
      ios: {
        shadowColor: "#FFD700",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  ageEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  ageLabel: {
    fontFamily: "Fredoka_700Bold",
    fontSize: 22,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
  },
  ageLabelSelected: {
    color: "#FFD700",
  },
  ageSubtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.4)",
    textAlign: "center",
    marginTop: 4,
    letterSpacing: 0.2,
  },
  ageSubtitleSelected: {
    color: "rgba(255, 215, 0, 0.7)",
  },
  checkBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FFD700",
    alignItems: "center",
    justifyContent: "center",
  },
  checkMark: {
    fontFamily: "Poppins_700Bold",
    fontSize: 12,
    color: "#1A1B4B",
    marginTop: -1,
  },

  // CTA Button
  buttonWrapper: {
    marginTop: 40,
    alignItems: "center",
  },
  ctaButton: {
    borderRadius: 28,
    overflow: "hidden",
    width: "100%",
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
    fontSize: 17,
    color: "#1A1B4B",
    letterSpacing: 0.4,
  },
  ctaTextDisabled: {
    color: "rgba(255, 255, 255, 0.3)",
  },
  ctaArrow: {
    fontFamily: "Poppins_700Bold",
    fontSize: 19,
    color: "#1A1B4B",
  },
  readyText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "rgba(255, 215, 0, 0.6)",
    marginTop: 14,
    letterSpacing: 0.3,
  },
});