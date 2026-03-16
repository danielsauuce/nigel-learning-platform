import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import { ScreenWrapper, GradientButton } from '@/components/ui';
import { ChevronLeft, ShieldCheck, User, Mail, Lock, Eye, EyeOff, Info } from 'lucide-react-native';
import { useTheme } from '@/context';
import { colors } from '@/constants/colors';

export function TeacherRegisterScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const c = colors[theme];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const canSubmit =
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    password.length >= 8 &&
    password === confirmPassword &&
    agreeTerms;

  const handleCreate = () => {
    if (canSubmit) {
      router.replace('/(teacher)/(tabs)' as any);
    }
  };

  return (
    <ScreenWrapper topPadding={8} showDecoration={false}>
      {/* Header */}
      <MotiView
        from={{ opacity: 0, translateY: -8 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'spring', damping: 16, stiffness: 130 }}
      >
        <View className="mb-4 flex-row items-center justify-center px-5">
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            className="absolute left-5 p-1"
          >
            <ChevronLeft size={24} className="text-foreground" strokeWidth={2.5} />
          </TouchableOpacity>
          <Text className="font-poppins-semibold text-base text-foreground">Create Account</Text>
        </View>
      </MotiView>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        bounces
        keyboardShouldPersistTaps="handled"
      >
        {/* Hero */}
        <MotiView
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 130, delay: 80 }}
          className="mb-6 px-7"
        >
          <View className="mb-3 h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <ShieldCheck size={24} color={c.primary} strokeWidth={2} />
          </View>
          <Text className="mb-1 font-fredoka text-2xl text-foreground">Join TeacherConnect</Text>
          <Text className="font-poppins-regular text-sm leading-5 text-muted-foreground">
            Register your educator account to access shared lesson plans and peer networking.
          </Text>
        </MotiView>

        {/* Form */}
        <MotiView
          from={{ opacity: 0, translateY: 12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 160 }}
          className="px-7"
        >
          {/* Full Name */}
          <View className="mb-4">
            <Text className="mb-1.5 font-poppins-semibold text-sm text-foreground">
              Full Name <Text className="text-destructive">*</Text>
            </Text>
            <View className="flex-row items-center gap-2.5 rounded-xl border border-border bg-card px-3.5 py-3">
              <User size={18} color={c.mutedForeground} strokeWidth={1.8} />
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="e.g. Sarah Jenkins"
                placeholderTextColor={c.mutedForeground}
                autoCapitalize="words"
                className="flex-1 font-poppins-regular text-sm text-foreground"
              />
            </View>
          </View>

          {/* Work Email */}
          <View className="mb-4">
            <Text className="mb-1.5 font-poppins-semibold text-sm text-foreground">
              Work Email <Text className="text-destructive">*</Text>
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

          {/* Create Password */}
          <View className="mb-4">
            <Text className="mb-1.5 font-poppins-semibold text-sm text-foreground">
              Create Password <Text className="text-destructive">*</Text>
            </Text>
            <View className="flex-row items-center gap-2.5 rounded-xl border border-border bg-card px-3.5 py-3">
              <Lock size={18} color={c.mutedForeground} strokeWidth={1.8} />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Min. 8 characters"
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

          {/* Confirm Password */}
          <View className="mb-5">
            <Text className="mb-1.5 font-poppins-semibold text-sm text-foreground">
              Confirm Password <Text className="text-destructive">*</Text>
            </Text>
            <View className="flex-row items-center gap-2.5 rounded-xl border border-border bg-card px-3.5 py-3">
              <Lock size={18} color={c.mutedForeground} strokeWidth={1.8} />
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Repeat password"
                placeholderTextColor={c.mutedForeground}
                secureTextEntry={!showConfirm}
                autoCapitalize="none"
                className="flex-1 font-poppins-regular text-sm text-foreground"
              />
              <TouchableOpacity
                onPress={() => setShowConfirm(!showConfirm)}
                activeOpacity={0.7}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                {showConfirm ? (
                  <Eye size={18} color={c.mutedForeground} strokeWidth={1.8} />
                ) : (
                  <EyeOff size={18} color={c.mutedForeground} strokeWidth={1.8} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Terms checkbox */}
          <TouchableOpacity
            onPress={() => setAgreeTerms(!agreeTerms)}
            activeOpacity={0.7}
            className="mb-5 flex-row items-start gap-2.5"
          >
            <View
              className={`mt-0.5 h-5 w-5 items-center justify-center rounded border-2 ${
                agreeTerms ? 'border-primary bg-primary' : 'border-border'
              }`}
            >
              {agreeTerms && <Text className="text-[10px] font-bold text-white">✓</Text>}
            </View>
            <Text className="flex-1 font-poppins-regular text-xs leading-4 text-muted-foreground">
              I agree to the <Text className="text-primary">Terms of Service</Text> and{' '}
              <Text className="text-primary">Privacy Policy</Text>. I understand that my data will
              be used to verify my teaching credentials.
            </Text>
          </TouchableOpacity>

          {/* Verified & Secure card */}
          <MotiView
            from={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 14, stiffness: 120, delay: 300 }}
            className="mb-5"
          >
            <View className="flex-row gap-3 rounded-xl border border-primary/10 bg-primary/5 p-4">
              <View className="h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                <Info size={18} color={c.primary} strokeWidth={2} />
              </View>
              <View className="flex-1">
                <Text className="mb-0.5 font-poppins-bold text-sm text-foreground">
                  Verified & Secure
                </Text>
                <Text className="font-poppins-regular text-xs leading-4 text-muted-foreground">
                  Your information is protected under teacher data safety regulations. We never
                  share your personal email or credentials with third parties.
                </Text>
              </View>
            </View>
          </MotiView>

          {/* Create Account button */}
          <GradientButton
            label="Create My Account"
            variant="purple"
            onPress={handleCreate}
            disabled={!canSubmit}
            showArrow
          />

          {/* Sign in link */}
          <View className="mt-5 flex-row items-center justify-center gap-1">
            <Text className="font-poppins-regular text-sm text-muted-foreground">
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
              <Text className="font-poppins-bold text-sm text-primary">Sign In</Text>
            </TouchableOpacity>
          </View>
        </MotiView>
      </ScrollView>
    </ScreenWrapper>
  );
}
