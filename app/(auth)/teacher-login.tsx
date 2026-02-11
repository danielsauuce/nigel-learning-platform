import { useRouter } from 'expo-router';
import { Lock, Mail } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import { FloatingCoin } from '@/components/illustrations';
import { TeacherLoginIcon } from '@/components/illustrations/TeacherLoginIcon';
import {
  AltLoginButton,
  AuthDivider,
  AuthSubmitButton,
  ErrorBanner,
  RegisterCTA,
  SecurityNote,
} from '@/components/Auth-Form';
import { BackButton } from '@/components/Back-Button';
import { FormField } from '@/components/Form-Field';
import { GradientBackground, StarField, WaveDecoration } from '@/components/ui/screen-background';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants/app';
import { useAppFonts } from '@/hooks/use-app-fonts';
import { SAFE_TOP } from '@/lib/safe-area';

export default function TeacherLoginScreen() {
  const router = useRouter();
  const [fontsLoaded] = useAppFonts();

  // ── State ──
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // ── Refs ──
  const passwordRef = useRef<TextInput>(null);

  // ── Entrance animations ──
  const fadeAnims = useRef(Array.from({ length: 8 }, () => new Animated.Value(0))).current;
  const slideAnims = useRef(Array.from({ length: 8 }, () => new Animated.Value(30))).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anims = fadeAnims.map((fade, i) =>
      Animated.parallel([
        Animated.timing(fade, {
          toValue: 1,
          duration: 400,
          delay: i * 80,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnims[i], {
          toValue: 0,
          duration: 400,
          delay: i * 80,
          useNativeDriver: true,
        }),
      ]),
    );
    Animated.stagger(50, anims).start();
  }, []);

  /** Animation style helper for staggered entrance */
  const anim = (i: number) => ({
    opacity: fadeAnims[i],
    transform: [{ translateY: slideAnims[i] }],
  });

  // ── Validation ──
  const validate = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 6, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  const handleLogin = () => {
    setLoginError('');
    if (!validate()) {
      triggerShake();
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // router.replace('/(teacher)/(tabs)/dashboard');
    }, 1500);
  };

  if (!fontsLoaded) return null;

  return (
    <View className="flex-1 overflow-hidden">
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Background layers */}
      <GradientBackground />
      <StarField count={10} seed={83} />

      <FloatingCoin
        delay={0}
        startX={SCREEN_WIDTH * 0.08}
        startY={SCREEN_HEIGHT * 0.06}
        size={20}
        opacity={0.25}
      />
      <FloatingCoin
        delay={500}
        startX={SCREEN_WIDTH * 0.84}
        startY={SCREEN_HEIGHT * 0.09}
        size={16}
        opacity={0.2}
      />
      <FloatingCoin
        delay={250}
        startX={SCREEN_WIDTH * 0.68}
        startY={SCREEN_HEIGHT * 0.03}
        size={14}
        opacity={0.18}
      />

      <WaveDecoration />

      {/* Scrollable content */}
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          className="z-[1] flex-1"
          contentContainerStyle={{ paddingTop: SAFE_TOP, paddingHorizontal: 24 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Back button */}
          <Animated.View style={anim(0)}>
            <BackButton onPress={() => router.back()} />
          </Animated.View>

          {/* Header */}
          <Animated.View className="mb-8 items-center" style={anim(1)}>
            <View
              className="mb-5 h-[120px] w-[120px] items-center justify-center rounded-[36px]"
              style={{
                backgroundColor: 'rgba(168,85,247,0.1)',
                borderWidth: 2,
                borderColor: 'rgba(168,85,247,0.2)',
                ...Platform.select({
                  ios: {
                    shadowColor: '#A855F7',
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.25,
                    shadowRadius: 24,
                  },
                  android: { elevation: 8 },
                }),
              }}
            >
              <TeacherLoginIcon />
            </View>

            <Text
              className="text-center font-fredoka text-[32px] text-white"
              style={{
                textShadowColor: 'rgba(0,0,0,0.2)',
                textShadowOffset: { width: 0, height: 2 },
                textShadowRadius: 6,
              }}
            >
              Teacher Login
            </Text>

            <Text
              className="mt-2 px-4 text-center font-poppins-regular text-sm leading-[21px]"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              Sign in to manage your class and track student progress
            </Text>
          </Animated.View>

          {/* Login error banner */}
          {loginError !== '' && (
            <Animated.View style={anim(2)}>
              <ErrorBanner message={loginError} />
            </Animated.View>
          )}

          {/* Form (shakeable) */}
          <Animated.View style={[{ transform: [{ translateX: shakeAnim }] }, anim(2)]}>
            <FormField
              label="Email Address"
              icon={<Mail size={20} color="rgba(255,255,255,0.35)" strokeWidth={1.5} />}
              placeholder="your.email@school.ac.uk"
              value={email}
              onChangeText={(t) => {
                setEmail(t);
                setErrors((e) => ({ ...e, email: undefined }));
                setLoginError('');
              }}
              error={errors.email}
              keyboardType="email-address"
              autoComplete="email"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
            />

            <FormField
              ref={passwordRef}
              label="Password"
              icon={<Lock size={20} color="rgba(255,255,255,0.35)" strokeWidth={1.5} />}
              placeholder="Enter your password"
              value={password}
              onChangeText={(t) => {
                setPassword(t);
                setErrors((e) => ({ ...e, password: undefined }));
                setLoginError('');
              }}
              error={errors.password}
              isPassword
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              autoComplete="password"
              returnKeyType="done"
              onSubmitEditing={handleLogin}
            />

            {/* Forgot password */}
            <View className="mb-1 items-end">
              <Text className="font-poppins-medium text-[13px] text-secondary">
                Forgot password?
              </Text>
            </View>
          </Animated.View>

          {/* Login Button */}
          <Animated.View className="mt-2" style={anim(3)}>
            <AuthSubmitButton
              label="Sign In"
              loadingLabel="Signing in..."
              isLoading={isLoading}
              onPress={handleLogin}
            />
          </Animated.View>

          {/* Divider */}
          <Animated.View style={anim(4)}>
            <AuthDivider />
          </Animated.View>

          {/* School code login */}
          <Animated.View style={anim(5)}>
            <AltLoginButton emoji="🏫" label="Sign in with School Code" />
          </Animated.View>

          {/* Register CTA */}
          <Animated.View style={anim(6)}>
            <RegisterCTA
              prompt="Don't have an account?"
              linkText="Create Teacher Account →"
              onPress={() => router.push('/(auth)/teacher-register')}
            />
          </Animated.View>

          {/* Security note */}
          <Animated.View style={anim(7)}>
            <SecurityNote text="Your data is encrypted and never shared. Teacher accounts are verified by school administrators." />
          </Animated.View>

          {/* Bottom spacer */}
          <View className="h-[60px]" />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
