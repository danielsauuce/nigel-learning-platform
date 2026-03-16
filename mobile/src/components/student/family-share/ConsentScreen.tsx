import React, { useCallback, useState } from 'react';
import { Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import { ScreenWrapper, GradientButton } from '@/components/ui';
import { Mascot } from '@/svg/illustrations';
import { ChevronLeft, Eye, EyeOff, Shield, Clock, CheckSquare } from 'lucide-react-native';
import { useTheme } from '@/context';
import { colors } from '@/constants/colors';

const SHARED_ITEMS = [
  { key: 'progress', emoji: '📊', label: 'Learning progress & completion %' },
  { key: 'badges', emoji: '🏆', label: 'Badges and achievements earned' },
  { key: 'streak', emoji: '🔥', label: 'Current streak & activity' },
  { key: 'score', emoji: '⭐', label: 'Quiz scores & simulation grades' },
];

const NOT_SHARED_ITEMS = [
  { key: 'answers', emoji: '🔒', label: 'Your individual quiz answers' },
  { key: 'chat', emoji: '💬', label: 'Messages with teachers or classmates' },
  { key: 'personal', emoji: '🛡️', label: 'Personal settings or preferences' },
];

export function ConsentScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const c = colors[theme];
  const [agreed, setAgreed] = useState(false);

  const handleContinue = useCallback(() => {
    if (!agreed) return;
    router.push('/(student)/family-link' as any);
  }, [agreed, router]);

  return (
    <ScreenWrapper topPadding={12} showDecoration={false}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        bounces
      >
        {/* Header */}
        <MotiView
          from={{ opacity: 0, translateY: -12 }}
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
            <Text className="font-poppins-semibold text-base text-foreground">
              Share with Family
            </Text>
          </View>
        </MotiView>

        {/* Hero */}
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 14, stiffness: 110, delay: 100 }}
          className="mb-5 items-center px-6"
        >
          <View className="mb-3" style={{ alignItems: 'center' }}>
            <Mascot size={70} />
          </View>
          <Text className="mb-2 text-center font-fredoka text-2xl text-foreground">
            Your Data, Your Choice
          </Text>
          <Text className="text-center font-poppins-regular text-sm leading-5 text-muted-foreground">
            You can share a summary of your progress with a parent or guardian. They'll get a
            read-only link that expires in 7 days.
          </Text>
        </MotiView>

        {/* What's shared */}
        <MotiView
          from={{ opacity: 0, translateY: 12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 200 }}
          className="mx-6 mb-4"
        >
          <View className="mb-2.5 flex-row items-center gap-2">
            <Eye size={16} color={c.primary} strokeWidth={2} />
            <Text className="font-poppins-bold text-sm text-foreground">What they'll see</Text>
          </View>
          <View
            className="gap-3 rounded-2xl border border-success/15 bg-success/5 p-4"
            style={Platform.select({
              ios: {
                shadowColor: 'rgb(34, 197, 94)',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.06,
                shadowRadius: 8,
              },
              android: { elevation: 1 },
            })}
          >
            {SHARED_ITEMS.map((item, index) => (
              <MotiView
                key={item.key}
                from={{ opacity: 0, translateX: -10 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{
                  type: 'spring',
                  damping: 16,
                  stiffness: 130,
                  delay: 300 + index * 60,
                }}
              >
                <View className="flex-row items-center gap-3">
                  <Text className="text-base">{item.emoji}</Text>
                  <Text className="flex-1 font-poppins-medium text-sm text-foreground">
                    {item.label}
                  </Text>
                  <Text className="text-xs text-success">✓</Text>
                </View>
              </MotiView>
            ))}
          </View>
        </MotiView>

        {/* What's NOT shared */}
        <MotiView
          from={{ opacity: 0, translateY: 12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 400 }}
          className="mx-6 mb-4"
        >
          <View className="mb-2.5 flex-row items-center gap-2">
            <EyeOff size={16} color={c.mutedForeground} strokeWidth={2} />
            <Text className="font-poppins-bold text-sm text-foreground">What stays private</Text>
          </View>
          <View className="gap-3 rounded-2xl border border-border bg-card p-4">
            {NOT_SHARED_ITEMS.map((item, index) => (
              <MotiView
                key={item.key}
                from={{ opacity: 0, translateX: -10 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{
                  type: 'spring',
                  damping: 16,
                  stiffness: 130,
                  delay: 500 + index * 60,
                }}
              >
                <View className="flex-row items-center gap-3">
                  <Text className="text-base">{item.emoji}</Text>
                  <Text className="flex-1 font-poppins-medium text-sm text-muted-foreground">
                    {item.label}
                  </Text>
                </View>
              </MotiView>
            ))}
          </View>
        </MotiView>

        {/* Expiry notice */}
        <MotiView
          from={{ opacity: 0, translateY: 8 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 600 }}
          className="mx-6 mb-5"
        >
          <View className="bg-warning/8 flex-row gap-2.5 rounded-xl border border-warning/20 p-3">
            <Clock size={16} color="rgb(245, 158, 11)" strokeWidth={2} />
            <Text className="flex-1 font-poppins-regular text-xs leading-4 text-muted-foreground">
              The link will expire after 7 days. You can revoke access at any time from Settings.
            </Text>
          </View>
        </MotiView>

        {/* Consent checkbox */}
        <MotiView
          from={{ opacity: 0, translateY: 8 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 700 }}
          className="mx-6"
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setAgreed((prev) => !prev)}
            className="flex-row items-start gap-3"
          >
            <View
              className={`mt-0.5 h-6 w-6 items-center justify-center rounded-md border-2 ${
                agreed ? 'border-primary bg-primary' : 'border-border bg-card'
              }`}
            >
              {agreed && <CheckSquare size={14} color="#FFFFFF" strokeWidth={3} />}
            </View>
            <Text className="flex-1 font-poppins-medium text-sm leading-5 text-foreground">
              I understand what will be shared and I want to generate a link for my parent or
              guardian.
            </Text>
          </TouchableOpacity>
        </MotiView>
      </ScrollView>

      {/* Footer */}
      <MotiView
        from={{ opacity: 0, translateY: 16 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 800 }}
      >
        <View className="px-6 pt-2">
          <GradientButton
            label="Generate Link"
            variant="purple"
            onPress={handleContinue}
            disabled={!agreed}
            showArrow
          />
        </View>
      </MotiView>
    </ScreenWrapper>
  );
}
