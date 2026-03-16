import React from 'react';
import { Text, View } from 'react-native';
import { MotiView } from 'moti';
import { ChoiceCard } from '@/components/ui';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';
import type { PersonalizationQuestion as QuestionData } from '@/constants/app';
import {
  Wallet,
  GraduationCap,
  Shield,
  TrendingUp,
  Zap,
  BookOpen,
  Gamepad2,
  Trophy,
} from 'lucide-react-native';

// ─── Icon resolver ──────────────────────────────────────────────
const ICON_MAP: Record<
  string,
  React.ComponentType<{ size: number; color: string; strokeWidth?: number }>
> = {
  wallet: Wallet,
  'graduation-cap': GraduationCap,
  shield: Shield,
  'trending-up': TrendingUp,
  zap: Zap,
  'book-open': BookOpen,
  'gamepad-2': Gamepad2,
  trophy: Trophy,
};

function ChoiceIcon({
  name,
  isSelected,
  accent,
}: {
  name: string;
  isSelected: boolean;
  accent: string;
}) {
  const IconComp = ICON_MAP[name];
  if (!IconComp) return null;
  return <IconComp size={22} color={isSelected ? '#FFFFFF' : accent} strokeWidth={2} />;
}

// ─── Component ──────────────────────────────────────────────────
interface PersonalizationQuestionProps {
  data: QuestionData;
  selectedAnswer: string | null;
  onSelectAnswer: (key: string) => void;
}

export function PersonalizationQuestion({
  data,
  selectedAnswer,
  onSelectAnswer,
}: PersonalizationQuestionProps) {
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <>
      {/* Title + Subtitle */}
      <MotiView
        from={{ opacity: 0, translateY: 12 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 400, delay: 250 }}
        style={{ paddingHorizontal: 24, alignItems: 'center', marginBottom: 20 }}
      >
        <Text
          style={{
            fontFamily: 'Fredoka_700Bold',
            fontSize: 26,
            color: c.foreground,
            textAlign: 'center',
            marginBottom: 8,
          }}
        >
          {data.title}
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins_400Regular',
            fontSize: 14,
            color: c.mutedForeground,
            textAlign: 'center',
            lineHeight: 22,
            paddingHorizontal: 8,
          }}
        >
          {data.subtitle}
        </Text>
      </MotiView>

      {/* Section Label */}
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing', duration: 300, delay: 350 }}
        style={{ paddingHorizontal: 24, marginBottom: 8 }}
      >
        <Text
          style={{
            fontFamily: 'Poppins_600SemiBold',
            fontSize: 13,
            color: c.gradientStart,
            letterSpacing: 0.3,
          }}
        >
          {data.sectionLabel}
        </Text>
      </MotiView>

      {/* Question */}
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing', duration: 300, delay: 380 }}
        style={{ paddingHorizontal: 24, marginBottom: 16 }}
      >
        <Text
          style={{
            fontFamily: 'Poppins_600SemiBold',
            fontSize: 16,
            color: c.foreground,
            lineHeight: 24,
          }}
        >
          {data.question}
        </Text>
      </MotiView>

      {/* Options */}
      <View style={{ paddingHorizontal: 24, gap: 10 }}>
        {data.options.map((option, index) => (
          <MotiView
            key={option.key}
            from={{ opacity: 0, translateX: -16 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{
              type: 'spring',
              damping: 16,
              stiffness: 140,
              delay: 420 + index * 80,
            }}
          >
            <ChoiceCard
              title={option.title}
              subtitle={option.subtitle}
              icon={
                <ChoiceIcon
                  name={option.iconName}
                  isSelected={selectedAnswer === option.key}
                  accent={c.gradientStart}
                />
              }
              isSelected={selectedAnswer === option.key}
              onPress={() => onSelectAnswer(option.key)}
              accentColor={c.gradientStart}
            />
          </MotiView>
        ))}
      </View>
    </>
  );
}
