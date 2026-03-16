import React, { useCallback } from 'react';
import { Platform, ScrollView, Text, View } from 'react-native';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import { ScreenWrapper, GradientButton, TextButton } from '@/components/ui';
import { MascotCelebration } from '@/components/student/shared';
import { CheckCircle, Clock, Zap, Award } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

export function LessonPassedScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const c = colors[theme];

  const handleContinue = useCallback(() => {
    router.replace('/(student)/(tabs)/map' as any);
  }, [router]);

  const handleReview = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <ScreenWrapper topPadding={0} showDecoration={false}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        bounces
      >
        {/* ═══ Mascot Celebration: jumping + grad cap + confetti ═══ */}
        <MascotCelebration size={150} showConfetti enableJump />

        {/* Title */}
        <MotiView
          from={{ opacity: 0, translateY: 12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 600 }}
          style={{ alignItems: 'center', paddingHorizontal: 24, marginTop: 16 }}
        >
          <Text
            style={{
              fontFamily: 'Fredoka_700Bold',
              fontSize: 30,
              color: c.primary,
              textAlign: 'center',
            }}
          >
            Lesson Passed!
          </Text>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 8 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 700 }}
          style={{ alignItems: 'center', paddingHorizontal: 32, marginBottom: 24, marginTop: 8 }}
        >
          <Text
            style={{
              fontFamily: 'Poppins_400Regular',
              fontSize: 14,
              color: c.mutedForeground,
              textAlign: 'center',
              lineHeight: 22,
            }}
          >
            You're learning faster than 85% of students. Keep it up!
          </Text>
        </MotiView>

        {/* Achievement card */}
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 14, stiffness: 110, delay: 800 }}
          style={{ marginHorizontal: 24, marginBottom: 20 }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 14,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: theme === 'dark' ? '#2A2A4020' : '#E8E4F0',
              backgroundColor: c.card,
              padding: 16,
              ...Platform.select({
                ios: {
                  shadowColor: '#B9A7F8',
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 0.08,
                  shadowRadius: 10,
                },
                android: { elevation: 3 },
              }),
            }}
          >
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                backgroundColor: '#FFF8E8',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Award size={24} color="rgb(245, 158, 11)" strokeWidth={2} />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: 'Poppins_500Medium',
                  fontSize: 11,
                  color: c.mutedForeground,
                  marginBottom: 2,
                }}
              >
                New Achievement
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins_700Bold',
                  fontSize: 16,
                  color: c.foreground,
                }}
              >
                Savings Scholar
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins_400Regular',
                  fontSize: 12,
                  color: c.mutedForeground,
                }}
              >
                Completed "Where to Keep Your Money"
              </Text>
            </View>
          </View>
        </MotiView>

        {/* Stats row */}
        <View style={{ flexDirection: 'row', gap: 12, marginHorizontal: 24 }}>
          {[
            {
              icon: <CheckCircle size={20} color="#B9A7F8" strokeWidth={2} />,
              label: 'Accuracy',
              value: '94%',
              delay: 900,
            },
            {
              icon: <Clock size={20} color="#B9A7F8" strokeWidth={2} />,
              label: 'Time',
              value: '4:12',
              delay: 980,
            },
            {
              icon: <Zap size={20} color="rgb(245, 158, 11)" strokeWidth={2.5} />,
              label: 'EXP',
              value: '+250',
              delay: 1060,
            },
          ].map((stat) => (
            <MotiView
              key={stat.label}
              from={{ opacity: 0, translateY: 8 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'spring', damping: 16, stiffness: 130, delay: stat.delay }}
              style={{ flex: 1 }}
            >
              <View
                style={{
                  alignItems: 'center',
                  borderRadius: 18,
                  borderWidth: 1,
                  borderColor: theme === 'dark' ? '#2A2A4020' : '#E8E4F0',
                  backgroundColor: c.card,
                  paddingVertical: 16,
                }}
              >
                <View style={{ marginBottom: 8 }}>{stat.icon}</View>
                <Text
                  style={{
                    fontFamily: 'Poppins_600SemiBold',
                    fontSize: 10,
                    color: c.mutedForeground,
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                    marginBottom: 4,
                  }}
                >
                  {stat.label}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins_700Bold',
                    fontSize: 20,
                    color: c.foreground,
                  }}
                >
                  {stat.value}
                </Text>
              </View>
            </MotiView>
          ))}
        </View>
      </ScrollView>

      {/* Footer */}
      <MotiView
        from={{ opacity: 0, translateY: 16 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 1100 }}
      >
        <View style={{ gap: 8, paddingHorizontal: 24, paddingTop: 8 }}>
          <GradientButton
            label="Continue"
            variant="purple"
            onPress={handleContinue}
            showArrow={false}
          />
          <TextButton
            label="Review Lesson"
            onPress={handleReview}
            color="muted"
            size="sm"
            style={{ alignSelf: 'center' }}
          />
        </View>
      </MotiView>
    </ScreenWrapper>
  );
}
