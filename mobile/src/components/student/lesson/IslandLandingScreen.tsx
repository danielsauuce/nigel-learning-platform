import React from 'react';
import { Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ChevronLeft,
  CheckCircle,
  Lock,
  PlayCircle,
  PiggyBank,
  ShoppingCart,
  Briefcase,
  CreditCard,
  TrendingUp,
  DollarSign,
  Landmark,
  Target,
  Scale,
  AlertTriangle,
  Award,
  Tag,
  List,
  XCircle,
  Shield,
  Percent,
  Banknote,
  Star,
  FileText,
  Building2,
  Users,
  BarChart2,
  ShieldAlert,
  Leaf,
  Zap,
  Activity,
  CalendarDays,
  type LucideIcon,
} from 'lucide-react-native';
import { ScreenWrapper } from '@/components/ui';
import { MascotThinking, MascotCelebrating } from '@/svg/illustrations';
import { colors } from '@/constants/colors';
import { useTheme, useLearning } from '@/context';
import { LEARNING_PATHS } from '@/constants/learning-paths';

const PATH_ICONS: Record<string, LucideIcon> = {
  saving_basics: PiggyBank,
  smart_spending: ShoppingCart,
  earning_income: Briefcase,
  borrowing_debt: CreditCard,
  investing_future: TrendingUp,
};

const LESSON_ICONS: Record<string, LucideIcon> = {
  // Saving Basics
  sb1: DollarSign,
  sb2: Landmark,
  sb3: PiggyBank,
  sb4: Target,
  sb5: Scale,
  sb6: AlertTriangle,
  sb7: TrendingUp,
  sb8: Award,
  // Smart Spending
  ss1: Scale,
  ss2: Tag,
  ss3: List,
  ss4: XCircle,
  ss5: Shield,
  ss6: Percent,
  ss7: Award,
  // Earning Income
  ei1: Banknote,
  ei2: Briefcase,
  ei3: Star,
  ei4: FileText,
  ei5: Building2,
  ei6: Award,
  // Borrowing & Debt
  bd1: Users,
  bd2: BarChart2,
  bd3: CreditCard,
  bd4: Scale,
  bd5: ShieldAlert,
  bd6: Award,
  // Investing & Future
  if1: Leaf,
  if2: TrendingUp,
  if3: Zap,
  if4: Activity,
  if5: CalendarDays,
  if6: Award,
};

export function IslandLandingScreen() {
  const { theme } = useTheme();
  const c = colors[theme];
  const router = useRouter();
  const params = useLocalSearchParams<{ pathKey: string }>();
  const learning = useLearning();

  const path = LEARNING_PATHS.find((p) => p.key === params.pathKey) || LEARNING_PATHS[0];
  const { completed, total } = learning.getPathProgress(path.key);
  const isCompleted = learning.isPathCompleted(path.key);
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  const PathIcon = PATH_ICONS[path.key] ?? PiggyBank;

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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 20,
              marginBottom: 16,
            }}
          >
            <TouchableOpacity
              onPress={() => router.back()}
              activeOpacity={0.7}
              style={{ position: 'absolute', left: 20, padding: 4 }}
            >
              <ChevronLeft size={24} color={c.foreground} strokeWidth={2.5} />
            </TouchableOpacity>
            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: c.foreground }}>
              {path.title}
            </Text>
          </View>
        </MotiView>

        {/* Hero card */}
        <MotiView
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 14, stiffness: 110, delay: 100 }}
          style={{ paddingHorizontal: 24, marginBottom: 24 }}
        >
          <View
            style={{
              backgroundColor: path.color + '15',
              borderRadius: 24,
              padding: 24,
              alignItems: 'center',
              borderWidth: 1.5,
              borderColor: path.color + '30',
            }}
          >
            {isCompleted ? <MascotCelebrating size={90} /> : <MascotThinking size={80} />}

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                marginTop: 12,
              }}
            >
              <PathIcon size={26} color={path.color} strokeWidth={2} />
              <Text
                style={{
                  fontFamily: 'Fredoka_700Bold',
                  fontSize: 28,
                  color: c.foreground,
                  textAlign: 'center',
                }}
              >
                {path.title}
              </Text>
            </View>

            <Text
              style={{
                fontFamily: 'Poppins_400Regular',
                fontSize: 13,
                color: c.mutedForeground,
                textAlign: 'center',
                marginTop: 6,
                lineHeight: 20,
                paddingHorizontal: 8,
              }}
            >
              {isCompleted
                ? "All lessons completed! You're a master!"
                : `${completed}/${total} lessons completed`}
            </Text>

            {/* Progress bar */}
            <View
              style={{
                width: '100%',
                height: 8,
                borderRadius: 4,
                backgroundColor: c.border,
                marginTop: 16,
              }}
            >
              <MotiView
                from={{ width: '0%' as any }}
                animate={{ width: `${percent}%` as any }}
                transition={{ type: 'timing', duration: 600, delay: 400 }}
                style={{ height: 8, borderRadius: 4, backgroundColor: path.color }}
              />
            </View>
          </View>
        </MotiView>

        {/* Lesson list */}
        <View style={{ paddingHorizontal: 24 }}>
          <Text
            style={{
              fontFamily: 'Poppins_700Bold',
              fontSize: 16,
              color: c.foreground,
              marginBottom: 14,
            }}
          >
            Lessons
          </Text>

          {path.lessons.map((lesson, idx) => {
            const isDone = learning.completedLessons.has(lesson.id);
            const isUnlocked = learning.isLessonUnlocked(lesson.id);
            const isCurrent = !isDone && isUnlocked;
            const LessonIcon = LESSON_ICONS[lesson.id] ?? DollarSign;

            return (
              <MotiView
                key={lesson.id}
                from={{ opacity: 0, translateX: -12 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 150 + idx * 60 }}
              >
                <TouchableOpacity
                  activeOpacity={isUnlocked ? 0.7 : 1}
                  onPress={() => {
                    if (isUnlocked && !isDone) {
                      router.push({
                        pathname: '/(student)/lesson',
                        params: { lessonId: lesson.id, pathKey: path.key },
                      } as any);
                    }
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 14,
                    backgroundColor: isCurrent
                      ? path.color + '12'
                      : theme === 'dark'
                        ? c.card
                        : '#FFFFFF',
                    borderRadius: 16,
                    padding: 16,
                    marginBottom: 10,
                    borderWidth: isCurrent ? 2 : 1,
                    borderColor: isCurrent ? path.color : theme === 'dark' ? c.border : '#F0EDF5',
                    opacity: isUnlocked ? 1 : 0.5,
                    ...Platform.select({
                      ios: isCurrent
                        ? {
                            shadowColor: path.color,
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: 0.15,
                            shadowRadius: 8,
                          }
                        : {},
                      android: isCurrent ? { elevation: 3 } : {},
                    }),
                  }}
                >
                  {/* Number / status */}
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      backgroundColor: isDone
                        ? '#E8F5E9'
                        : isCurrent
                          ? path.color + '20'
                          : '#F8F6FB',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {isDone ? (
                      <CheckCircle size={20} color="#4CAF50" strokeWidth={2.5} />
                    ) : !isUnlocked ? (
                      <Lock size={16} color="#A0A0B8" strokeWidth={2} />
                    ) : (
                      <LessonIcon size={18} color={path.color} strokeWidth={2} />
                    )}
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: 'Poppins_600SemiBold',
                        fontSize: 14,
                        color: isUnlocked ? c.foreground : c.mutedForeground,
                      }}
                    >
                      {lesson.title}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Poppins_400Regular',
                        fontSize: 11,
                        color: c.mutedForeground,
                        marginTop: 1,
                      }}
                    >
                      {isDone ? 'Completed' : isCurrent ? 'Start this lesson →' : 'Locked'}
                    </Text>
                  </View>

                  {isCurrent && <PlayCircle size={22} color={path.color} strokeWidth={2} />}
                </TouchableOpacity>
              </MotiView>
            );
          })}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
