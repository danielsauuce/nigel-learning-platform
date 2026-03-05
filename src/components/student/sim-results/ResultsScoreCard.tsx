import React from 'react';
import { Platform, Text, View } from 'react-native';
import { MotiView } from 'moti';
import Svg, { Circle } from 'react-native-svg';

interface ResultsScoreCardProps {
  score: number;
}

function ScoreRing({ score }: { score: number }) {
  const size = 120;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const color =
    score >= 80 ? 'rgb(34, 197, 94)' : score >= 60 ? 'rgb(245, 158, 11)' : 'rgb(239, 68, 68)';

  return (
    <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="rgb(229, 231, 235)"
        strokeWidth={strokeWidth}
        fill="none"
        opacity={0.3}
      />
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={`${circumference}`}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function getGrade(score: number): { letter: string; label: string; colorClass: string } {
  if (score >= 90) return { letter: 'A+', label: 'Money Master!', colorClass: 'text-success' };
  if (score >= 80) return { letter: 'A', label: 'Budget Pro', colorClass: 'text-success' };
  if (score >= 70) return { letter: 'B', label: 'Solid Effort', colorClass: 'text-primary' };
  if (score >= 60) return { letter: 'C', label: 'Getting There', colorClass: 'text-warning' };
  return { letter: 'D', label: 'Needs Work', colorClass: 'text-destructive' };
}

export function ResultsScoreCard({ score }: ResultsScoreCardProps) {
  const grade = getGrade(score);

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', damping: 14, stiffness: 100, delay: 200 }}
    >
      <View
        className="mx-6 items-center rounded-3xl border border-border bg-card px-6 py-8"
        style={Platform.select({
          ios: {
            shadowColor: 'rgb(108, 92, 231)',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.1,
            shadowRadius: 16,
          },
          android: { elevation: 5 },
        })}
      >
        {/* Score ring */}
        <View className="mb-4 items-center justify-center">
          <ScoreRing score={score} />
          <View className="absolute items-center">
            <Text className={`font-fredoka text-3xl ${grade.colorClass}`}>{grade.letter}</Text>
          </View>
        </View>

        {/* Score number */}
        <MotiView
          from={{ opacity: 0, translateY: 8 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 500 }}
          className="items-center"
        >
          <Text className="font-fredoka text-4xl text-foreground">{score}/100</Text>
          <Text className={`mt-1 font-poppins-bold text-sm ${grade.colorClass}`}>
            {grade.label}
          </Text>
        </MotiView>
      </View>
    </MotiView>
  );
}
