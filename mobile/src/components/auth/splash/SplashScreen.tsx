import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Dimensions } from 'react-native';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';
import { NigelLogo } from '@/svg/brand';
import { Mascot } from '@/svg/illustrations';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

/**
 * Splash / Onboarding Hero Screen
 * ──────────────────────────────────
 * Matches design screenshot exactly:
 *  • Top-left: Nigel logo + "Nigel" text
 *  • Middle: Large purple puzzle-shaped area with mascot inside
 *  • White "drip" decorations on sides
 *  • Bottom white area: title text + subtitle + dark "Get Started" button
 */
export function SplashScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const c = colors[theme];

  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 300);
    return () => clearTimeout(t);
  }, []);

  const handleGetStarted = useCallback(() => {
    router.replace('/(auth)/welcome');
  }, [router]);

  const purpleBg = c.primary; // #B9A7F8

  return (
    <View style={{ flex: 1, backgroundColor: purpleBg }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* ═══ TOP PURPLE SECTION (≈60% of screen) ═══ */}
      <View style={{ flex: 1.1, paddingTop: insets.top + 16, paddingHorizontal: 24 }}>
        {/* Logo row */}
        <MotiView
          from={{ opacity: 0, translateY: -16 }}
          animate={{ opacity: ready ? 1 : 0, translateY: ready ? 0 : -16 }}
          transition={{ type: 'timing', duration: 500, delay: 200 }}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
        >
          <NigelLogo size={28} />
          <Text
            style={{
              fontFamily: 'Fredoka_700Bold',
              fontSize: 20,
              color: '#FFFFFF',
              letterSpacing: 0.5,
            }}
          >
            Nigel
          </Text>
        </MotiView>

        {/* Mascot — centered, floating */}
        <MotiView
          from={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: ready ? 1 : 0, scale: ready ? 1 : 0.85 }}
          transition={{ type: 'spring', damping: 14, stiffness: 100, delay: 500 }}
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <MotiView
            from={{ translateY: 0 }}
            animate={{ translateY: -10 }}
            transition={{ type: 'timing', duration: 2500, loop: true, repeatReverse: true }}
          >
            <Mascot size={160} />
          </MotiView>
        </MotiView>
      </View>

      {/* ═══ BOTTOM WHITE SECTION ═══ */}
      <View
        style={{
          flex: 0.65,
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: 36,
          borderTopRightRadius: 36,
          paddingHorizontal: 32,
          paddingTop: 32,
          paddingBottom: insets.bottom + 16,
          justifyContent: 'space-between',
        }}
      >
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: ready ? 1 : 0, translateY: ready ? 0 : 20 }}
          transition={{ type: 'timing', duration: 600, delay: 700 }}
        >
          <Text
            style={{
              fontFamily: 'Fredoka_700Bold',
              fontSize: 32,
              color: '#22223B',
              textAlign: 'center',
              lineHeight: 40,
            }}
          >
            Let's learn with{'\n'}lots of fun!
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins_400Regular',
              fontSize: 14,
              color: '#6C6C80',
              textAlign: 'center',
              marginTop: 12,
              lineHeight: 22,
              paddingHorizontal: 16,
            }}
          >
            Learning with us will be fun and make you happy.
          </Text>
        </MotiView>

        {/* Get Started button — dark navy pill */}
        <MotiView
          from={{ opacity: 0, translateY: 16 }}
          animate={{ opacity: ready ? 1 : 0, translateY: ready ? 0 : 16 }}
          transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 900 }}
        >
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleGetStarted}
            style={{
              backgroundColor: '#22223B',
              borderRadius: 28,
              paddingVertical: 16,
              alignItems: 'center',
              shadowColor: '#22223B',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.25,
              shadowRadius: 16,
              elevation: 8,
            }}
          >
            <Text
              style={{
                fontFamily: 'Poppins_700Bold',
                fontSize: 16,
                color: '#FFFFFF',
                letterSpacing: 0.3,
              }}
            >
              Get Started
            </Text>
          </TouchableOpacity>
        </MotiView>
      </View>
    </View>
  );
}
