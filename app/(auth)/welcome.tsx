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
  NativeScrollEvent,
  NativeSyntheticEvent,
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
  Path,
  Rect,
  Stop,
  Svg,
  LinearGradient as SvgLinearGradient,
  Text as SvgText,
} from "react-native-svg";

const { width, height } = Dimensions.get("window");

// ─── Onboarding slide data ─────────────────────────────────────────
const SLIDES = [
  {
    icon: "island",
    title: "Explore Money\nIslands",
    subtitle:
      "Journey through fun-sized lessons on saving, budgeting, and smart spending — one island at a time.",
    accentColor: "#4FC3F7",
  },
  {
    icon: "piggy",
    title: "Build Real\nMoney Skills",
    subtitle:
      "Try our budgeting simulator — pick a job, manage your pay, and handle surprise expenses like a pro.",
    accentColor: "#FFD700",
  },
  {
    icon: "trophy",
    title: "Earn Badges &\nTrack Progress",
    subtitle:
      "Complete missions, ace quizzes, and collect achievements. Share your wins with family too!",
    accentColor: "#10B981",
  },
];

// ─── SVG Illustrations ─────────────────────────────────────────────

const IslandIllustration = () => (
  <Svg width={160} height={140} viewBox="0 0 160 140">
    {/* Ocean */}
    <Path
      d="M10 105 Q40 95 80 105 Q120 115 150 105 L150 130 Q120 120 80 130 Q40 140 10 130 Z"
      fill="#4FC3F7"
      opacity={0.35}
    />
    <Path
      d="M0 112 Q35 102 75 112 Q115 122 155 110"
      fill="none"
      stroke="#4FC3F7"
      strokeWidth="2"
      opacity={0.25}
    />
    {/* Island body */}
    <Path d="M30 105 Q50 70 80 75 Q110 70 130 105 Z" fill="#8BC34A" />
    <Path d="M38 105 Q55 82 80 85 Q105 82 122 105 Z" fill="#FFE082" />
    {/* Palm trunk */}
    <Path
      d="M78 75 Q74 50 70 28"
      stroke="#8D6E63"
      strokeWidth="5"
      strokeLinecap="round"
      fill="none"
    />
    {/* Palm leaves */}
    <Path d="M70 28 Q52 14 34 24" stroke="#4CAF50" strokeWidth="4" strokeLinecap="round" fill="none" />
    <Path d="M70 28 Q74 10 90 14" stroke="#4CAF50" strokeWidth="4" strokeLinecap="round" fill="none" />
    <Path d="M70 28 Q56 34 44 44" stroke="#66BB6A" strokeWidth="3" strokeLinecap="round" fill="none" />
    <Path d="M70 28 Q82 26 94 36" stroke="#66BB6A" strokeWidth="3" strokeLinecap="round" fill="none" />
    {/* Flag */}
    <Path d="M105 60 L105 40" stroke="#E8960C" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <Path d="M105 40 L120 46 L105 52" fill="#FFD700" />
    {/* Sparkle */}
    <Circle cx="42" cy="55" r="2.5" fill="#FFD700" opacity={0.7} />
    <Circle cx="125" cy="72" r="2" fill="#FFD700" opacity={0.5} />
  </Svg>
);

const PiggyIllustration = () => (
  <Svg width={160} height={140} viewBox="0 0 160 140">
    {/* Coin stack background */}
    <Rect x="110" y="70" width="28" height="6" rx="3" fill="#FFD700" opacity={0.5} />
    <Rect x="112" y="62" width="24" height="6" rx="3" fill="#FFD700" opacity={0.6} />
    <Rect x="114" y="54" width="20" height="6" rx="3" fill="#FFD700" opacity={0.7} />
    {/* Piggy body */}
    <G>
      <Circle cx="72" cy="80" r="36" fill="#FF8FAB" />
      <Circle cx="72" cy="80" r="36" fill="none" stroke="#E8728A" strokeWidth="2" />
      {/* Snout */}
      <Rect x="93" y="74" width="20" height="14" rx="7" fill="#FFB3C6" />
      <Circle cx="100" cy="79" r="2" fill="#E8728A" />
      <Circle cx="106" cy="79" r="2" fill="#E8728A" />
      {/* Eye */}
      <Circle cx="84" cy="70" r="4" fill="#FFFFFF" />
      <Circle cx="85" cy="69.5" r="2.5" fill="#1A1B4B" />
      <Circle cx="86" cy="68.5" r="1" fill="#FFFFFF" />
      {/* Ear */}
      <Path d="M58 55 Q52 38 65 42 Q68 48 62 58" fill="#FF8FAB" stroke="#E8728A" strokeWidth="1.5" />
      {/* Coin slot */}
      <Rect x="64" y="44" width="16" height="3" rx="1.5" fill="#E8728A" />
      {/* Legs */}
      <Rect x="52" y="108" width="8" height="12" rx="4" fill="#FF8FAB" stroke="#E8728A" strokeWidth="1.5" />
      <Rect x="80" y="108" width="8" height="12" rx="4" fill="#FF8FAB" stroke="#E8728A" strokeWidth="1.5" />
    </G>
    {/* Floating coin going into piggy */}
    <G>
      <Defs>
        <SvgLinearGradient id="piggyCoinGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFD700" />
          <Stop offset="1" stopColor="#F5A623" />
        </SvgLinearGradient>
      </Defs>
      <Circle cx="72" cy="28" r="12" fill="url(#piggyCoinGrad)" />
      <Circle cx="72" cy="28" r="8.5" fill="none" stroke="#E8960C" strokeWidth="1" />
      <SvgText x="72" y="33" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#B8760A">
        £
      </SvgText>
    </G>
    {/* Sparkles */}
    <Circle cx="28" cy="65" r="2.5" fill="#FFD700" opacity={0.6} />
    <Circle cx="130" cy="48" r="2" fill="#FFD700" opacity={0.5} />
  </Svg>
);

const TrophyIllustration = () => (
  <Svg width={160} height={140} viewBox="0 0 160 140">
    {/* Confetti bits */}
    <Circle cx="30" cy="30" r="4" fill="#FF2E91" opacity={0.6} />
    <Circle cx="135" cy="25" r="3" fill="#4FC3F7" opacity={0.6} />
    <Rect x="22" y="55" width="8" height="4" rx="2" fill="#FFD700" opacity={0.5} transform="rotate(-20 26 57)" />
    <Rect x="130" y="60" width="8" height="4" rx="2" fill="#10B981" opacity={0.5} transform="rotate(15 134 62)" />
    <Circle cx="45" cy="110" r="3" fill="#7000E0" opacity={0.4} />
    <Circle cx="120" cy="105" r="2.5" fill="#FF2E91" opacity={0.4} />
    {/* Trophy cup */}
    <Defs>
      <SvgLinearGradient id="trophyGrad" x1="0" y1="0" x2="0" y2="1">
        <Stop offset="0" stopColor="#FFD700" />
        <Stop offset="1" stopColor="#F5A623" />
      </SvgLinearGradient>
    </Defs>
    <Path
      d="M55 35 L55 80 Q55 95 80 95 Q105 95 105 80 L105 35 Z"
      fill="url(#trophyGrad)"
    />
    <Path
      d="M55 35 L55 80 Q55 95 80 95 Q105 95 105 80 L105 35 Z"
      fill="none"
      stroke="#E8960C"
      strokeWidth="2"
    />
    {/* Trophy handles */}
    <Path
      d="M55 45 Q35 45 35 60 Q35 75 55 75"
      fill="none"
      stroke="#E8960C"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <Path
      d="M105 45 Q125 45 125 60 Q125 75 105 75"
      fill="none"
      stroke="#E8960C"
      strokeWidth="3"
      strokeLinecap="round"
    />
    {/* Star on trophy */}
    <Path
      d="M80 50 L83 59 L93 59 L85 65 L88 74 L80 68 L72 74 L75 65 L67 59 L77 59 Z"
      fill="#FFFFFF"
      opacity={0.9}
    />
    {/* Trophy base */}
    <Rect x="70" y="95" width="20" height="8" rx="2" fill="#E8960C" />
    <Rect x="62" y="103" width="36" height="8" rx="3" fill="#D4A056" />
    <Rect x="62" y="103" width="36" height="8" rx="3" fill="none" stroke="#C6893A" strokeWidth="1.5" />
    {/* #1 text */}
    <SvgText x="80" y="115" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#8D6E63">
      #1
    </SvgText>
  </Svg>
);

// ─── Floating sparkle decoration ───────────────────────────────────
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
    outputRange: [0, -14],
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
        opacity: Animated.multiply(fadeIn, 0.5),
        transform: [{ translateY }],
      }}
    />
  );
};

// ─── Main Welcome Screen ───────────────────────────────────────────
export default function WelcomeScreen() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Fredoka_700Bold,
  });

  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  // Entrance animations
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-20)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const cardSlide = useRef(new Animated.Value(40)).current;
  const footerOpacity = useRef(new Animated.Value(0)).current;
  const footerSlide = useRef(new Animated.Value(30)).current;
  const waveOffset = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(headerOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(headerSlide, { toValue: 0, duration: 500, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(cardOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(cardSlide, { toValue: 0, duration: 500, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(footerOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(footerSlide, { toValue: 0, duration: 400, useNativeDriver: true }),
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

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / (width - 64));
    setActiveSlide(index);
  };

  const handleGetStarted = () => {
    router.push("/(auth)/RoleSelect");
  };

  const handleNext = () => {
    if (activeSlide < SLIDES.length - 1) {
      scrollRef.current?.scrollTo({ x: (activeSlide + 1) * (width - 64), animated: true });
    } else {
      handleGetStarted();
    }
  };

  const renderIllustration = (icon: string) => {
    switch (icon) {
      case "island":
        return <IslandIllustration />;
      case "piggy":
        return <PiggyIllustration />;
      case "trophy":
        return <TrophyIllustration />;
      default:
        return null;
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
              left: (i * 83 + 17) % width,
              top: (i * 59 + 20) % (height * 0.35),
              width: i % 3 === 0 ? 3 : 2,
              height: i % 3 === 0 ? 3 : 2,
              opacity: 0.2 + (i % 4) * 0.1,
            },
          ]}
        />
      ))}

      {/* Floating sparkles */}
      <FloatingSparkle delay={0} x={width * 0.06} y={height * 0.15} size={6} color="#FFD700" />
      <FloatingSparkle delay={300} x={width * 0.85} y={height * 0.1} size={5} color="#4FC3F7" />
      <FloatingSparkle delay={150} x={width * 0.72} y={height * 0.25} size={4} color="#FF2E91" />
      <FloatingSparkle delay={500} x={width * 0.15} y={height * 0.32} size={5} color="#10B981" />

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
          <Text style={styles.welcomeLabel}>Welcome to</Text>
          <View style={styles.titleRow}>
            <Text style={styles.titleWhite}>Money </Text>
            <Text style={styles.titleGold}>Islands</Text>
          </View>
          <Text style={styles.headerSubtitle}>
            Your adventure in financial literacy starts here
          </Text>
        </Animated.View>

        {/* Swipeable feature cards */}
        <Animated.View
          style={[
            styles.carouselWrapper,
            { opacity: cardOpacity, transform: [{ translateY: cardSlide }] },
          ]}
        >
          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleScroll}
            snapToInterval={width - 64}
            decelerationRate="fast"
            contentContainerStyle={styles.carouselContent}
          >
            {SLIDES.map((slide, index) => (
              <View key={index} style={styles.slideCard}>
                <LinearGradient
                  colors={["rgba(255,255,255,0.12)", "rgba(255,255,255,0.05)"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.slideCardGradient}
                >
                  <View style={styles.illustrationContainer}>
                    {renderIllustration(slide.icon)}
                  </View>
                  <Text style={styles.slideTitle}>{slide.title}</Text>
                  <Text style={styles.slideSubtitle}>{slide.subtitle}</Text>
                </LinearGradient>
              </View>
            ))}
          </ScrollView>

          {/* Dot indicators */}
          <View style={styles.dotsContainer}>
            {SLIDES.map((slide, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      index === activeSlide ? slide.accentColor : "rgba(255,255,255,0.25)",
                    width: index === activeSlide ? 24 : 8,
                  },
                ]}
              />
            ))}
          </View>
        </Animated.View>

        {/* Footer CTA */}
        <Animated.View
          style={[
            styles.footer,
            { opacity: footerOpacity, transform: [{ translateY: footerSlide }] },
          ]}
        >
          <TouchableOpacity
            style={styles.ctaButton}
            activeOpacity={0.85}
            onPress={handleNext}
          >
            <LinearGradient
              colors={["#FFD700", "#F5A623"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.ctaGradient}
            >
              <Text style={styles.ctaText}>
                {activeSlide < SLIDES.length - 1 ? "Next" : "Get Started"}
              </Text>
              <Text style={styles.ctaArrow}>→</Text>
            </LinearGradient>
          </TouchableOpacity>

          {activeSlide < SLIDES.length - 1 && (
            <TouchableOpacity onPress={handleGetStarted} style={styles.skipButton}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          )}
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
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight! + 16 : 60,
    paddingBottom: Platform.OS === "android" ? 24 : 40,
  },

  // ── Header ──
  header: {
    paddingHorizontal: 32,
    marginBottom: 8,
  },
  welcomeLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "rgba(255,255,255,0.6)",
    letterSpacing: 0.5,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 2,
  },
  titleWhite: {
    fontFamily: "Fredoka_700Bold",
    fontSize: 36,
    color: "#FFFFFF",
    lineHeight: 42,
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  titleGold: {
    fontFamily: "Fredoka_700Bold",
    fontSize: 36,
    color: "#FFD700",
    lineHeight: 42,
    textShadowColor: "rgba(245,166,35,0.35)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  headerSubtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "rgba(255,255,255,0.55)",
    marginTop: 6,
    letterSpacing: 0.2,
  },

  // ── Carousel ──
  carouselWrapper: {
    flex: 1,
    justifyContent: "center",
  },
  carouselContent: {
    marginTop: 50,
    paddingHorizontal: 32,
  },
  slideCard: {
    width: width - 64,
    paddingHorizontal: 4,
  },
  slideCardGradient: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  illustrationContainer: {
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 160,
    height: 140,
  },
  slideTitle: {
    fontFamily: "Fredoka_700Bold",
    fontSize: 26,
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 32,
    letterSpacing: -0.5,
    textShadowColor: "rgba(0,0,0,0.15)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  slideSubtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
    marginTop: 12,
    lineHeight: 21,
    letterSpacing: 0.2,
    paddingHorizontal: 8,
  },

  // ── Dots ──
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },

  // ── Footer ──
  footer: {
    alignItems: "center",
    paddingHorizontal: 32,
    paddingTop: 8,
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
  ctaArrow: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    color: "#1A1B4B",
  },
  skipButton: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  skipText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "rgba(255,255,255,0.5)",
    letterSpacing: 0.3,
  },
});

