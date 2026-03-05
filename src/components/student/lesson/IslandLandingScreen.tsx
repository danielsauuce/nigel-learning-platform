import React, { useCallback } from 'react';
import { Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import { ScreenWrapper, GradientButton } from '@/components/ui';
import { ChevronLeft, CheckCircle, Lock, PlayCircle, BookOpen } from 'lucide-react-native';

interface Lesson {
  key: string;
  title: string;
  duration: string;
  status: 'completed' | 'current' | 'locked';
}

const ISLAND_LESSONS: Lesson[] = [
  { key: 'l1', title: 'What is Money?', duration: '5 min', status: 'completed' },
  { key: 'l2', title: 'Needs vs Wants', duration: '7 min', status: 'completed' },
  { key: 'l3', title: 'Setting Savings Goals', duration: '6 min', status: 'completed' },
  { key: 'l4', title: 'Where to Keep Your Money', duration: '8 min', status: 'current' },
  { key: 'l5', title: 'Tracking Your Spending', duration: '6 min', status: 'locked' },
  { key: 'l6', title: 'The Power of Compound Interest', duration: '10 min', status: 'locked' },
];

export function IslandLandingScreen() {
  const router = useRouter();
  const completedCount = ISLAND_LESSONS.filter((l) => l.status === 'completed').length;
  const totalCount = ISLAND_LESSONS.length;
  const progress = Math.round((completedCount / totalCount) * 100);

  const handleStartLesson = useCallback(() => {
    router.push('/(student)/lesson' as any);
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
            <Text className="font-poppins-semibold text-base text-foreground">Island Details</Text>
          </View>
        </MotiView>

        {/* Island hero */}
        <MotiView
          from={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 14, stiffness: 110, delay: 100 }}
          className="mx-6 mb-5"
        >
          <View
            className="items-center rounded-3xl border border-primary/15 bg-primary/10 p-6 dark:bg-primary/5"
            style={Platform.select({
              ios: {
                shadowColor: 'rgb(108, 92, 231)',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.08,
                shadowRadius: 12,
              },
              android: { elevation: 3 },
            })}
          >
            <View className="mb-3 h-16 w-16 items-center justify-center rounded-2xl bg-primary/15">
              <BookOpen size={30} color="rgb(108, 92, 231)" strokeWidth={2} />
            </View>
            <Text className="mb-1 font-fredoka text-2xl text-foreground">Smart Spending</Text>
            <Text className="mb-3 font-poppins-medium text-xs uppercase tracking-wider text-primary">
              Core Goal
            </Text>
            <Text className="mb-4 text-center font-poppins-regular text-sm leading-5 text-muted-foreground">
              Learn to tell needs from wants, compare prices, and make every pound count.
            </Text>
            <View className="w-full">
              <View className="mb-1.5 flex-row justify-between">
                <Text className="font-poppins-semibold text-xs text-foreground">Progress</Text>
                <Text className="font-poppins-bold text-xs text-primary">{progress}%</Text>
              </View>
              <View className="h-2 overflow-hidden rounded-full bg-border">
                <MotiView
                  from={{ width: '0%' as any }}
                  animate={{ width: `${progress}%` as any }}
                  transition={{ type: 'timing', duration: 700, delay: 400 }}
                  className="h-full rounded-full bg-primary"
                />
              </View>
              <Text className="mt-1.5 font-poppins-regular text-[10px] text-muted-foreground">
                {completedCount}/{totalCount} lessons completed
              </Text>
            </View>
          </View>
        </MotiView>

        {/* Lessons list */}
        <View className="px-6">
          <Text className="mb-3 font-poppins-bold text-base text-foreground">Lessons</Text>
          {ISLAND_LESSONS.map((lesson, index) => {
            const isCompleted = lesson.status === 'completed';
            const isCurrent = lesson.status === 'current';
            const isLocked = lesson.status === 'locked';
            return (
              <MotiView
                key={lesson.key}
                from={{ opacity: 0, translateX: -14 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{
                  type: 'spring',
                  damping: 16,
                  stiffness: 130,
                  delay: 250 + index * 60,
                }}
              >
                <TouchableOpacity
                  activeOpacity={isLocked ? 1 : 0.7}
                  onPress={isCurrent ? handleStartLesson : undefined}
                  disabled={isLocked}
                >
                  <View
                    className={`mb-2 flex-row items-center gap-3 rounded-xl border p-3.5 ${isCurrent ? 'border-primary/20 bg-primary/5' : 'border-border bg-card'}`}
                    style={{ opacity: isLocked ? 0.5 : 1 }}
                  >
                    <View
                      className={`h-9 w-9 items-center justify-center rounded-full ${isCompleted ? 'bg-success/15' : isCurrent ? 'bg-primary/15' : 'bg-muted'}`}
                    >
                      {isCompleted ? (
                        <CheckCircle size={18} color="rgb(34, 197, 94)" strokeWidth={2.5} />
                      ) : isCurrent ? (
                        <PlayCircle size={18} color="rgb(108, 92, 231)" strokeWidth={2.5} />
                      ) : (
                        <Lock size={14} color="rgb(107, 114, 128)" strokeWidth={2} />
                      )}
                    </View>
                    <View className="flex-1">
                      <Text
                        className={`font-poppins-semibold text-sm ${isLocked ? 'text-muted-foreground' : 'text-foreground'}`}
                      >
                        {lesson.title}
                      </Text>
                      <Text className="font-poppins-regular text-xs text-muted-foreground">
                        {lesson.duration}
                      </Text>
                    </View>
                    {isCurrent && (
                      <View className="rounded-full bg-primary px-2.5 py-1">
                        <Text className="font-poppins-bold text-[10px] uppercase text-white">
                          Next
                        </Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              </MotiView>
            );
          })}
        </View>
      </ScrollView>

      <MotiView
        from={{ opacity: 0, translateY: 16 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 600 }}
      >
        <View className="px-6 pt-2">
          <GradientButton
            label="Start Next Lesson"
            variant="purple"
            onPress={handleStartLesson}
            showArrow
          />
        </View>
      </MotiView>
    </ScreenWrapper>
  );
}
