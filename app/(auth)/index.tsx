import { Fredoka_700Bold } from "@expo-google-fonts/fredoka";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
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
  Path,
  Rect,
  Stop,
  Svg,
  LinearGradient as SvgLinearGradient,
  Text as SvgText,
} from "react-native-svg";

const { width, height } = Dimensions.get("window");

// ─── Animated Floating Coin ────────────────────────────────────────
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
      ])
    ).start();
  }, []);

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -18],
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
          <SvgLinearGradient id={`coinGrad${delay}`} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#FFD700" />
            <Stop offset="1" stopColor="#F5A623" />
          </SvgLinearGradient>
        </Defs>
        <Circle cx="20" cy="20" r="18" fill={`url(#coinGrad${delay})`} />
        <Circle cx="20" cy="20" r="14" fill="none" stroke="#E8960C" strokeWidth="1.5" />
        <SvgText
          x="20"
          y="26"
          textAnchor="middle"
          fontSize="16"
          fontWeight="bold"
          fill="#B8760A"
        >
          £
        </SvgText>
      </Svg>
    </Animated.View>
  );
};

// ─── Island SVG Icon ───────────────────────────────────────────────
const IslandIcon = () => (
  <Svg width={120} height={100} viewBox="0 0 120 100">
    <Path
      d="M10 75 Q30 68 60 75 Q90 82 110 75 L110 95 Q90 88 60 95 Q30 102 10 95 Z"
      fill="#4FC3F7"
      opacity={0.5}
    />
    <Path d="M25 75 Q40 55 60 58 Q80 55 95 75 Z" fill="#8BC34A" />
    <Path d="M30 75 Q45 65 60 67 Q75 65 90 75 Z" fill="#FFE082" />
    <Path
      d="M58 58 Q55 40 52 25"
      stroke="#8D6E63"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
    <Path d="M52 25 Q40 15 28 22" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round" fill="none" />
    <Path d="M52 25 Q55 10 68 12" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round" fill="none" />
    <Path d="M52 25 Q42 28 35 35" stroke="#66BB6A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <Path d="M52 25 Q60 22 70 28" stroke="#66BB6A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <Rect x="62" y="62" width="14" height="10" rx="2" fill="#D4A056" />
    <Rect x="62" y="62" width="14" height="4" rx="1" fill="#C6893A" />
    <Circle cx="69" cy="67" r="1.5" fill="#FFD700" />
  </Svg>
);

// ─── Main Splash Screen ────────────────────────────────────────────
interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Fredoka_700Bold,
  });

  const logoScale = useRef(new Animated.Value(0.3)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const titleSlide = useRef(new Animated.Value(30)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const subtitleSlide = useRef(new Animated.Value(20)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const buttonSlide = useRef(new Animated.Value(40)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const shimmer = useRef(new Animated.Value(0)).current;
  const waveOffset = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 4,
          tension: 60,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(titleSlide, { toValue: 0, duration: 500, useNativeDriver: true }),
        Animated.timing(titleOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(subtitleSlide, { toValue: 0, duration: 400, useNativeDriver: true }),
        Animated.timing(subtitleOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(buttonSlide, { toValue: 0, duration: 400, useNativeDriver: true }),
        Animated.timing(buttonOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      ]),
    ]).start();

    Animated.loop(
      Animated.timing(shimmer, { toValue: 1, duration: 2000, useNativeDriver: true })
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(waveOffset, { toValue: 1, duration: 3000, useNativeDriver: true }),
        Animated.timing(waveOffset, { toValue: 0, duration: 3000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const waveTranslateX = waveOffset.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -30],
  });

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
              opacity: 0.3 + (i % 4) * 0.15,
            },
          ]}
        />
      ))}

      <FloatingCoin delay={0} startX={width * 0.08} startY={height * 0.12} size={32} opacity={0.6} />
      <FloatingCoin delay={400} startX={width * 0.78} startY={height * 0.08} size={26} opacity={0.5} />
      <FloatingCoin delay={200} startX={width * 0.62} startY={height * 0.22} size={22} opacity={0.4} />
      <FloatingCoin delay={600} startX={width * 0.2} startY={height * 0.28} size={20} opacity={0.35} />
      <FloatingCoin delay={300} startX={width * 0.88} startY={height * 0.3} size={28} opacity={0.45} />

      <Animated.View
        style={[styles.waveContainer, { transform: [{ translateX: waveTranslateX }] }]}
      >
        <Svg
          width={width + 60}
          height={140}
          viewBox={`0 0 ${width + 60} 140`}
          style={{ position: "absolute", bottom: 0 }}
        >
          <Path
            d={`M0 60 Q${width * 0.15} 30 ${width * 0.3} 55 Q${width * 0.45} 80 ${width * 0.6} 50 Q${width * 0.75} 20 ${width * 0.9} 55 Q${width * 1.05} 90 ${width + 60} 50 L${width + 60} 140 L0 140 Z`}
            fill="#4FC3F7"
            opacity={0.15}
          />
          <Path
            d={`M0 80 Q${width * 0.2} 55 ${width * 0.35} 75 Q${width * 0.5} 95 ${width * 0.65} 70 Q${width * 0.8} 45 ${width * 0.95} 75 L${width + 60} 65 L${width + 60} 140 L0 140 Z`}
            fill="#4FC3F7"
            opacity={0.1}
          />
        </Svg>
      </Animated.View>

      <View style={styles.content}>
        <Animated.View
          style={[styles.logoContainer, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}
        >
          <View style={styles.logoCircle}>
            <IslandIcon />
          </View>
        </Animated.View>

        <Animated.View style={{ opacity: titleOpacity, transform: [{ translateY: titleSlide }] }}>
          <Text style={styles.appName}>Money</Text>
          <Text style={styles.appNameAccent}>Islands</Text>
        </Animated.View>

        <Animated.View style={{ opacity: subtitleOpacity, transform: [{ translateY: subtitleSlide }] }}>
          <Text style={styles.tagline}>
            Learn to save, spend smart{"\n"}& build your future 🏝️
          </Text>
        </Animated.View>

        <Animated.View
          style={[styles.buttonWrapper, { opacity: buttonOpacity, transform: [{ translateY: buttonSlide }] }]}
        >
          <TouchableOpacity style={styles.ctaButton} activeOpacity={0.85} onPress={() => {
            router.replace("/(auth)/welcome")
          }}>
            <LinearGradient
              colors={["#FFD700", "#F5A623"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.ctaGradient}
            >
              <Text style={styles.ctaText}>Start Your Adventure</Text>
              <Text style={styles.ctaArrow}>→</Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.versionText}>Made for learners aged 11–16</Text>
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
    left: -30,
    right: -30,
    height: 140,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  logoContainer: {
    marginBottom: 28,
  },
  logoCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#4FC3F7",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 30,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  appName: {
    fontFamily: "Fredoka_700Bold",
    fontSize: 52,
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 56,
    letterSpacing: -1,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  appNameAccent: {
    fontFamily: "Fredoka_700Bold",
    fontSize: 52,
    color: "#FFD700",
    textAlign: "center",
    lineHeight: 56,
    letterSpacing: -1,
    marginTop: -4,
    textShadowColor: "rgba(245, 166, 35, 0.4)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 12,
  },
  tagline: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.75)",
    textAlign: "center",
    marginTop: 16,
    lineHeight: 24,
    letterSpacing: 0.3,
  },
  buttonWrapper: {
    marginTop: 48,
    alignItems: "center",
  },
  ctaButton: {
    borderRadius: 28,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#F5A623",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
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
    paddingHorizontal: 36,
    gap: 10,
  },
  ctaText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    color: "#1A1B4B",
    letterSpacing: 0.5,
  },
  ctaArrow: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    color: "#1A1B4B",
  },
  versionText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.4)",
    marginTop: 16,
    letterSpacing: 0.5,
  },
});