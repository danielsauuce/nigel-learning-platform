import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { MotiView } from 'moti';
import { Sparkles } from 'lucide-react-native';
import { ScreenWrapper } from '@/components/ui';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';
import { IslandMapHeader } from './IslandMapHeader';
import { IslandCard, type IslandData } from './IslandCard';
import { IslandConnector } from './IslandConnector';
import { MilestoneBanner } from './MilestoneBanner';

const ISLANDS: IslandData[] = [
  {
    key: 'saving_basics',
    title: 'Saving Basics',
    category: 'Foundation',
    description:
      'Master the art of saving money, setting goals, and building your first emergency fund.',
    lessonsCompleted: 8,
    totalLessons: 8,
    status: 'mastered',
  },
  {
    key: 'smart_spending',
    title: 'Smart Spending',
    category: 'Core Goal',
    description: 'Learn to tell needs from wants, compare prices, and make every pound count.',
    lessonsCompleted: 6,
    totalLessons: 12,
    status: 'active',
  },
  {
    key: 'earning_income',
    title: 'Earning Income',
    category: 'Survival',
    description:
      "Don't just save — learn how people earn money through jobs, side hustles, and skills.",
    lessonsCompleted: 0,
    totalLessons: 10,
    status: 'locked',
  },
  {
    key: 'borrowing_debt',
    title: 'Borrowing & Debt',
    category: 'Advanced',
    description:
      'Understand loans, interest rates, and why borrowing money costs more than you think.',
    lessonsCompleted: 0,
    totalLessons: 14,
    status: 'locked',
  },
  {
    key: 'investing_future',
    title: 'Investing & Future',
    category: 'Expert',
    description:
      'Discover how compound interest, stocks, and long-term planning build real wealth.',
    lessonsCompleted: 0,
    totalLessons: 20,
    status: 'locked',
  },
];

export function IslandMapScreen() {
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <ScreenWrapper topPadding={16} showDecoration={false}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        bounces
      >
        <IslandMapHeader name="Alex" level={12} streak={7} gems={420} />

        {/* Title */}
        <MotiView
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 80 }}
          style={{ paddingHorizontal: 24, marginBottom: 24 }}
        >
          <Text
            style={{
              fontFamily: 'Fredoka_700Bold',
              fontSize: 26,
              color: c.foreground,
              marginBottom: 6,
            }}
          >
            Your Learning Path
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Sparkles size={15} color={c.mutedForeground} strokeWidth={2} />
            <Text
              style={{
                fontFamily: 'Poppins_400Regular',
                fontSize: 13,
                color: c.mutedForeground,
                fontStyle: 'italic',
              }}
            >
              Personalized for your 'Smart Spending' goal
            </Text>
          </View>
        </MotiView>

        {/* Island path */}
        <View style={{ paddingHorizontal: 16 }}>
          {ISLANDS.map((island, index) => (
            <React.Fragment key={island.key}>
              <IslandCard island={island} index={index} onPress={() => {}} />
              {index < ISLANDS.length - 1 && (
                <IslandConnector index={index} isCompleted={island.status === 'mastered'} />
              )}
            </React.Fragment>
          ))}
        </View>

        {/* Milestone */}
        <MilestoneBanner
          title="Next Milestone"
          description="Complete 3 more lessons to unlock the 'Money Master' badge!"
          progress={66}
        />
      </ScrollView>
    </ScreenWrapper>
  );
}
