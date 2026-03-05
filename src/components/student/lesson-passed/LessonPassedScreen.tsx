import React, { useCallback } from 'react';
import { Platform, ScrollView, Text, View } from 'react-native';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import { ScreenWrapper, GradientButton, TextButton } from '@/components/ui';
import { CheckCircle, Clock, Zap, Award } from 'lucide-react-native';

export function LessonPassedScreen() {
  const router = useRouter();

  const handleContinue = useCallback(() => {
    router.replace('/(student)/(tabs)/map' as any);
  }, [router]);

  const handleReview = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <ScreenWrapper topPadding={24} showDecoration={false}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        bounces
      >
        {/* Mascot celebration */}
        <MotiView
          from={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 10, stiffness: 80, delay: 100 }}
          className="mb-4 items-center"
        >
          <View className="h-28 w-28 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/5">
            <MotiView
              from={{ rotateZ: '-12deg' }}
              animate={{ rotateZ: ['0deg', '-6deg', '6deg', '0deg'] }}
              transition={{ type: 'timing', duration: 800, delay: 400 }}
            >
              <Text className="text-6xl">🎓</Text>
            </MotiView>
          </View>
        </MotiView>

        {/* Title */}
        <MotiView
          from={{ opacity: 0, translateY: 12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 300 }}
          className="mb-2 items-center px-6"
        >
          <Text className="text-center font-fredoka text-3xl text-primary">Lesson Passed!</Text>
        </MotiView>
        <MotiView
          from={{ opacity: 0, translateY: 8 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 400 }}
          className="mb-6 items-center px-6"
        >
          <Text className="text-center font-poppins-regular text-sm leading-5 text-muted-foreground">
            You're learning faster than 85% of students. Keep it up!
          </Text>
        </MotiView>

        {/* Achievement card */}
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 14, stiffness: 110, delay: 500 }}
          className="mx-6 mb-5"
        >
          <View
            className="flex-row items-center gap-3.5 rounded-2xl border border-border bg-card p-4"
            style={Platform.select({
              ios: {
                shadowColor: 'rgb(108, 92, 231)',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.08,
                shadowRadius: 10,
              },
              android: { elevation: 3 },
            })}
          >
            <View className="h-12 w-12 items-center justify-center rounded-xl bg-warning/15">
              <Award size={24} color="rgb(245, 158, 11)" strokeWidth={2} />
            </View>
            <View className="flex-1">
              <Text className="mb-0.5 font-poppins-medium text-xs text-muted-foreground">
                New Achievement
              </Text>
              <Text className="font-poppins-bold text-base text-foreground">Savings Scholar</Text>
              <Text className="font-poppins-regular text-xs text-muted-foreground">
                Completed "Where to Keep Your Money"
              </Text>
            </View>
          </View>
        </MotiView>

        {/* Stats row */}
        <MotiView
          from={{ opacity: 0, translateY: 12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 650 }}
          className="mx-6 flex-row gap-3"
        >
          {[
            {
              icon: <CheckCircle size={20} color="rgb(108, 92, 231)" strokeWidth={2} />,
              label: 'Accuracy',
              value: '94%',
            },
            {
              icon: <Clock size={20} color="rgb(108, 92, 231)" strokeWidth={2} />,
              label: 'Time',
              value: '4:12',
            },
            {
              icon: <Zap size={20} color="rgb(245, 158, 11)" strokeWidth={2.5} />,
              label: 'EXP',
              value: '+250',
            },
          ].map((stat, index) => (
            <MotiView
              key={stat.label}
              from={{ opacity: 0, translateY: 8 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'spring', damping: 16, stiffness: 130, delay: 700 + index * 80 }}
              className="flex-1"
            >
              <View className="items-center rounded-2xl border border-border bg-card py-4">
                <View className="mb-2">{stat.icon}</View>
                <Text className="mb-1 font-poppins-semibold text-[10px] uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </Text>
                <Text className="font-poppins-bold text-xl text-foreground">{stat.value}</Text>
              </View>
            </MotiView>
          ))}
        </MotiView>
      </ScrollView>

      {/* Footer */}
      <MotiView
        from={{ opacity: 0, translateY: 16 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 900 }}
      >
        <View className="gap-2 px-6 pt-2">
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
