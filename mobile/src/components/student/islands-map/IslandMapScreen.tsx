import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import { Sparkles } from 'lucide-react-native';
import { ScreenWrapper } from '@/components/ui';
import { colors } from '@/constants/colors';
import { useTheme, useLearning } from '@/context';
import { LEARNING_PATHS } from '@/constants/learning-paths';
import { Mascot } from '@/svg/illustrations';
import { IslandMapHeader } from './IslandMapHeader';
import { IslandCard, type IslandData } from './IslandCard';
import { IslandConnector } from './IslandConnector';
import { MilestoneBanner } from './MilestoneBanner';

export function IslandMapScreen() {
  const { theme } = useTheme();
  const c = colors[theme];
  const router = useRouter();
  const learning = useLearning();

  const islands: IslandData[] = LEARNING_PATHS.map((path) => {
    const { completed, total } = learning.getPathProgress(path.key);
    return {
      key: path.key,
      title: path.title,
      category: path.category,
      description: '',
      lessonsCompleted: completed,
      totalLessons: total,
      status: learning.getPathStatus(path.key),
    };
  });

  // Calculate overall progress for milestone
  const totalLessons = LEARNING_PATHS.reduce((s, p) => s + p.lessons.length, 0);
  const totalCompleted = learning.completedLessons.size;
  const overallPercent = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;

  // Next milestone
  const nextPathToComplete = LEARNING_PATHS.find((p) => !learning.isPathCompleted(p.key));
  const milestoneDesc = nextPathToComplete
    ? `Complete ${nextPathToComplete.title} to earn the next badge!`
    : "You've completed all learning paths!";

  return (
    <ScreenWrapper topPadding={16} showDecoration={false}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        bounces
      >
        <IslandMapHeader
          name="Sarah"
          level={learning.level}
          streak={learning.streak}
          gems={learning.xp}
        />

        <MotiView
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 80 }}
          style={{ paddingHorizontal: 24, marginBottom: 24 }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Mascot size={40} />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: 'Fredoka_700Bold',
                  fontSize: 24,
                  color: c.foreground,
                  marginBottom: 2,
                }}
              >
                Your Learning Path
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Sparkles size={13} color={c.mutedForeground} strokeWidth={2} />
                <Text
                  style={{
                    fontFamily: 'Poppins_400Regular',
                    fontSize: 12,
                    color: c.mutedForeground,
                  }}
                >
                  {totalCompleted}/{totalLessons} lessons completed
                </Text>
              </View>
            </View>
          </View>
        </MotiView>

        <View style={{ paddingHorizontal: 16 }}>
          {islands.map((island, index) => (
            <React.Fragment key={island.key}>
              <IslandCard
                island={island}
                index={index}
                onPress={() => {
                  if (island.status !== 'locked') {
                    router.push({
                      pathname: '/(student)/island-landing',
                      params: { pathKey: island.key },
                    } as any);
                  }
                }}
              />
              {index < islands.length - 1 && (
                <IslandConnector index={index} isCompleted={island.status === 'mastered'} />
              )}
            </React.Fragment>
          ))}
        </View>

        <MilestoneBanner
          title="Next Milestone"
          description={milestoneDesc}
          progress={overallPercent}
        />
      </ScrollView>
    </ScreenWrapper>
  );
}
