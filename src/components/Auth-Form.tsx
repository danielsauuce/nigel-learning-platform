import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';

interface ErrorBannerProps {
  message: string;
}

export function ErrorBanner({ message }: ErrorBannerProps) {
  return (
    <View
      className="mb-4 flex-row items-center gap-2.5 rounded-[14px] p-3.5"
      style={{
        backgroundColor: 'rgba(239,68,68,0.1)',
        borderWidth: 1,
        borderColor: 'rgba(239,68,68,0.2)',
      }}
    >
      <Text className="text-lg">⚠️</Text>
      <Text className="flex-1 font-poppins-medium text-[13px] text-destructive">{message}</Text>
    </View>
  );
}

interface AuthSubmitButtonProps {
  label: string;
  loadingLabel?: string;
  isLoading?: boolean;
  onPress: () => void;
  colors?: [string, string];
  loadingColors?: [string, string];
}

export function AuthSubmitButton({
  label,
  loadingLabel = 'Signing in...',
  isLoading = false,
  onPress,
  colors = ['#A855F7', '#7C3AED'],
  loadingColors = ['rgba(168,85,247,0.4)', 'rgba(124,58,237,0.3)'],
}: AuthSubmitButtonProps) {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress} disabled={isLoading}>
      <LinearGradient
        colors={isLoading ? loadingColors : colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="items-center justify-center rounded-[20px]"
        style={{
          paddingVertical: 17,
          ...Platform.select({
            ios: {
              shadowColor: colors[1],
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: isLoading ? 0 : 0.35,
              shadowRadius: 14,
            },
            android: { elevation: isLoading ? 0 : 8 },
          }),
        }}
      >
        {isLoading ? (
          <View className="flex-row items-center gap-1.5">
            <View className="h-1.5 w-1.5 rounded-full bg-white/70" />
            <View className="h-1.5 w-1.5 rounded-full bg-white/50" />
            <View className="h-1.5 w-1.5 rounded-full bg-white/30" />
            <Text className="ml-1 font-poppins-bold text-[17px] tracking-wide text-white">
              {loadingLabel}
            </Text>
          </View>
        ) : (
          <Text className="font-poppins-bold text-[17px] tracking-wide text-white">{label}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

export function AuthDivider() {
  return (
    <View className="my-5 flex-row items-center gap-3.5">
      <View className="flex-1" style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.08)' }} />
      <Text
        className="font-poppins-regular text-[13px]"
        style={{ color: 'rgba(255,255,255,0.25)' }}
      >
        or
      </Text>
      <View className="flex-1" style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.08)' }} />
    </View>
  );
}

interface AltLoginButtonProps {
  emoji: string;
  label: string;
  onPress?: () => void;
}

export function AltLoginButton({ emoji, label, onPress }: AltLoginButtonProps) {
  return (
    <TouchableOpacity
      className="flex-row items-center justify-center gap-2.5 rounded-[18px]"
      style={{
        paddingVertical: 16,
        backgroundColor: 'rgba(255,255,255,0.06)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
      }}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Text className="text-xl">{emoji}</Text>
      <Text
        className="font-poppins-semibold text-[15px]"
        style={{ color: 'rgba(255,255,255,0.7)' }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

interface RegisterCTAProps {
  prompt: string;
  linkText: string;
  onPress: () => void;
}

export function RegisterCTA({ prompt, linkText, onPress }: RegisterCTAProps) {
  return (
    <View className="mb-2 mt-7 items-center">
      <Text className="font-poppins-regular text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
        {prompt}
      </Text>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <Text className="mt-1.5 font-poppins-bold text-[15px] text-teacher">{linkText}</Text>
      </TouchableOpacity>
    </View>
  );
}

interface SecurityNoteProps {
  text: string;
}

export function SecurityNote({ text }: SecurityNoteProps) {
  return (
    <View
      className="mt-4 flex-row items-center gap-2.5 rounded-[14px] p-3.5"
      style={{
        backgroundColor: 'rgba(79,195,247,0.06)',
        borderWidth: 1,
        borderColor: 'rgba(79,195,247,0.1)',
      }}
    >
      <Text className="text-base">🔒</Text>
      <Text
        className="flex-1 font-poppins-regular text-[11px] leading-4"
        style={{ color: 'rgba(255,255,255,0.4)' }}
      >
        {text}
      </Text>
    </View>
  );
}
