import React, { useCallback, useState } from 'react';
import { Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import { ScreenWrapper, GradientButton, TextButton } from '@/components/ui';
import { MascotWaving } from '@/svg/illustrations';
import { ChevronLeft, Copy, Check, Share2, Eye, Clock, Link2 } from 'lucide-react-native';
import { useTheme } from '@/context';
import { colors } from '@/constants/colors';

const MOCK_LINK = 'nigel.app/family/a7x9k2m';

export function LinkGeneratedScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const c = colors[theme];
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const handlePreview = useCallback(() => {
    router.push('/(student)/parent-summary' as any);
  }, [router]);

  const handleDone = useCallback(() => {
    router.replace('/(student)/(tabs)/settings' as any);
  }, [router]);

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
            <Text className="font-poppins-semibold text-base text-foreground">Link Ready</Text>
          </View>
        </MotiView>

        {/* Success hero */}
        <MotiView
          from={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 12, stiffness: 100, delay: 100 }}
          className="mb-5 items-center px-6"
        >
          <View className="mb-3" style={{ alignItems: 'center' }}>
            <MotiView
              from={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 10, stiffness: 120, delay: 300 }}
            >
              <MascotWaving size={70} />
            </MotiView>
          </View>
          <Text className="mb-2 text-center font-fredoka text-2xl text-foreground">
            Link Created!
          </Text>
          <Text className="text-center font-poppins-regular text-sm leading-5 text-muted-foreground">
            Share this link with your parent or guardian so they can see your progress.
          </Text>
        </MotiView>

        {/* Link card */}
        <MotiView
          from={{ opacity: 0, translateY: 12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 300 }}
          className="mx-6 mb-4"
        >
          <View
            className="rounded-2xl border border-border bg-card p-4"
            style={Platform.select({
              ios: {
                shadowColor: c.primary,
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.06,
                shadowRadius: 10,
              },
              android: { elevation: 2 },
            })}
          >
            {/* Link display */}
            <View className="mb-3 flex-row items-center justify-between rounded-xl bg-background px-4 py-3">
              <View className="flex-1 flex-row items-center gap-2">
                <Link2 size={14} color={c.primary} strokeWidth={2} />
                <Text className="flex-1 font-poppins-medium text-sm text-primary" numberOfLines={1}>
                  {MOCK_LINK}
                </Text>
              </View>
              <TouchableOpacity
                onPress={handleCopy}
                activeOpacity={0.7}
                className={`flex-row items-center gap-1.5 rounded-lg px-3 py-1.5 ${
                  copied ? 'bg-success/10' : 'bg-primary/10'
                }`}
              >
                {copied ? (
                  <>
                    <Check size={14} color={c.success} strokeWidth={2.5} />
                    <Text className="font-poppins-semibold text-xs text-success">Copied</Text>
                  </>
                ) : (
                  <>
                    <Copy size={14} color={c.primary} strokeWidth={2} />
                    <Text className="font-poppins-semibold text-xs text-primary">Copy</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            {/* Expiry info */}
            <View className="flex-row items-center gap-2">
              <Clock size={13} color={c.mutedForeground} strokeWidth={2} />
              <Text className="font-poppins-regular text-xs text-muted-foreground">
                Expires in 7 days · Single-use · Read-only
              </Text>
            </View>
          </View>
        </MotiView>

        {/* Share button */}
        <MotiView
          from={{ opacity: 0, translateY: 12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 400 }}
          className="mx-6 mb-5"
        >
          <TouchableOpacity
            activeOpacity={0.7}
            className="flex-row items-center justify-center gap-2.5 rounded-xl border border-primary/15 bg-primary/5 p-4"
          >
            <Share2 size={18} color={c.primary} strokeWidth={2} />
            <Text className="font-poppins-semibold text-sm text-primary">
              Share via Message or Email
            </Text>
          </TouchableOpacity>
        </MotiView>

        {/* What they'll see preview */}
        <MotiView
          from={{ opacity: 0, translateY: 12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 500 }}
          className="mx-6 mb-4"
        >
          <Text className="mb-2.5 font-poppins-bold text-sm text-foreground">
            What your family will see
          </Text>
          <View className="gap-3 rounded-2xl border border-border bg-card p-4">
            {[
              { emoji: '📊', text: '68% overall progress' },
              { emoji: '🏆', text: '4 badges earned' },
              { emoji: '🔥', text: '12-day learning streak' },
              { emoji: '⭐', text: 'Budget simulation: B grade' },
            ].map((item, index) => (
              <MotiView
                key={item.text}
                from={{ opacity: 0, translateX: -8 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{
                  type: 'spring',
                  damping: 16,
                  stiffness: 130,
                  delay: 600 + index * 50,
                }}
              >
                <View className="flex-row items-center gap-3">
                  <Text className="text-base">{item.emoji}</Text>
                  <Text className="font-poppins-medium text-sm text-foreground">{item.text}</Text>
                </View>
              </MotiView>
            ))}
          </View>
        </MotiView>

        {/* Preview link */}
        <MotiView
          from={{ opacity: 0, translateY: 8 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 700 }}
          className="mx-6"
        >
          <TouchableOpacity
            onPress={handlePreview}
            activeOpacity={0.7}
            className="flex-row items-center justify-center gap-2 py-2"
          >
            <Eye size={16} color={c.primary} strokeWidth={2} />
            <Text className="font-poppins-semibold text-sm text-primary">
              Preview what they'll see
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
          <GradientButton label="Done" variant="purple" onPress={handleDone} showArrow={false} />
        </View>
      </MotiView>
    </ScreenWrapper>
  );
}
