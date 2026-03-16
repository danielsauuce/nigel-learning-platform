import React, { useState } from 'react';
import { Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import { ScreenWrapper, GradientButton } from '@/components/ui';
import { Mail, Lock, Eye, EyeOff, Globe, ShieldCheck, ArrowRight } from 'lucide-react-native';
import { useTheme } from '@/context';
import { colors } from '@/constants/colors';
import { NigelLogo } from '@/svg/brand/NigelLogo';

export function TeacherLoginScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const c = colors[theme];

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const canSubmit = email.trim().length > 0 && password.length >= 8;

  const handleSignIn = () => {
    if (canSubmit) {
      router.replace('/(teacher)/(tabs)' as any);
    }
  };

  return (
    <ScreenWrapper topPadding={12} showDecoration={false}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        bounces
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo */}
        <MotiView
          from={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 14, stiffness: 120 }}
          className="mb-6 items-center"
        >
          <NigelLogo size={48} />
        </MotiView>

        {/* Welcome text */}
        <MotiView
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 130, delay: 80 }}
          className="mb-8 px-7"
        >
          <Text className="mb-1.5 font-fredoka text-3xl text-foreground">Welcome Back</Text>
          <Text className="font-poppins-regular text-sm text-muted-foreground">
            Empowering your teaching journey every day.
          </Text>
        </MotiView>

        {/* Form */}
        <MotiView
          from={{ opacity: 0, translateY: 12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 160 }}
          className="px-7"
        >
          {/* Email */}
          <View className="mb-4">
            <Text className="mb-1.5 font-poppins-semibold text-sm text-foreground">
              Teacher Email
            </Text>
            <View className="flex-row items-center gap-2.5 rounded-xl border border-border bg-card px-3.5 py-3">
              <Mail size={18} color={c.mutedForeground} strokeWidth={1.8} />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="name@school.edu"
                placeholderTextColor={c.mutedForeground}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                className="flex-1 font-poppins-regular text-sm text-foreground"
              />
            </View>
          </View>

          {/* Password */}
          <View className="mb-4">
            <View className="mb-1.5 flex-row items-center justify-between">
              <Text className="font-poppins-semibold text-sm text-foreground">Password</Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text className="font-poppins-semibold text-xs text-primary">Forgot password?</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center gap-2.5 rounded-xl border border-border bg-card px-3.5 py-3">
              <Lock size={18} color={c.mutedForeground} strokeWidth={1.8} />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor={c.mutedForeground}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                className="flex-1 font-poppins-regular text-sm text-foreground"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                activeOpacity={0.7}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                {showPassword ? (
                  <Eye size={18} color={c.mutedForeground} strokeWidth={1.8} />
                ) : (
                  <EyeOff size={18} color={c.mutedForeground} strokeWidth={1.8} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Keep me signed in */}
          <TouchableOpacity
            onPress={() => setKeepSignedIn(!keepSignedIn)}
            activeOpacity={0.7}
            className="mb-6 flex-row items-center gap-2.5"
          >
            <View
              className={`h-5 w-5 items-center justify-center rounded border-2 ${
                keepSignedIn ? 'border-primary bg-primary' : 'border-border'
              }`}
            >
              {keepSignedIn && <Text className="text-[10px] font-bold text-white">✓</Text>}
            </View>
            <Text className="font-poppins-regular text-sm text-muted-foreground">
              Keep me signed in
            </Text>
          </TouchableOpacity>

          {/* Sign In button */}
          <GradientButton
            label="Sign In"
            variant="purple"
            onPress={handleSignIn}
            disabled={!canSubmit}
            showArrow
          />

          {/* OR divider */}
          <View className="my-5 flex-row items-center">
            <View className="h-px flex-1 bg-border" />
            <Text className="mx-3 font-poppins-semibold text-[10px] uppercase tracking-widest text-muted-foreground">
              Or access via
            </Text>
            <View className="h-px flex-1 bg-border" />
          </View>

          {/* SSO */}
          <TouchableOpacity
            activeOpacity={0.7}
            className="flex-row items-center justify-center gap-2.5 rounded-xl border border-border bg-card py-3.5"
          >
            <Globe size={18} color={c.foreground} strokeWidth={1.8} />
            <Text className="font-poppins-semibold text-sm text-foreground">
              Sign in with School SSO
            </Text>
          </TouchableOpacity>

          {/* Create account link */}
          <View className="mt-5 flex-row items-center justify-center gap-1">
            <Text className="font-poppins-regular text-sm text-muted-foreground">
              Don't have an account yet?
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/(auth)/teacher-register' as any)}
              activeOpacity={0.7}
            >
              <Text className="font-poppins-bold text-sm text-primary">Create Account</Text>
            </TouchableOpacity>
          </View>
        </MotiView>

        {/* Security footer */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 500, delay: 600 }}
          className="mt-6 items-center px-7"
        >
          <View className="mb-1 flex-row items-center gap-1.5">
            <ShieldCheck size={13} color={c.mutedForeground} strokeWidth={2} />
            <Text className="font-poppins-semibold text-[10px] uppercase tracking-wider text-muted-foreground">
              TeacherConnect Security
            </Text>
          </View>
          <Text className="leading-3.5 text-center font-poppins-regular text-[10px] text-muted-foreground">
            By signing in, you agree to our <Text className="text-primary">Terms of Service</Text>{' '}
            and <Text className="text-primary">Privacy Policy</Text> regarding educational data
            protection.
          </Text>
        </MotiView>
      </ScrollView>
    </ScreenWrapper>
  );
}
