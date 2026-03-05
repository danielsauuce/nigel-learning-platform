import React, { useCallback, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import { ScreenWrapper, GradientButton } from '@/components/ui';
import { SimulatorHeader } from './SimulatorHeader';
import { SimProgressBar } from './SimProgressBar';
import { JobRoleCard, type JobRole } from './JobRoleCard';

// ─── Job data ───────────────────────────────────────────────────
const JOBS: JobRole[] = [
  {
    key: 'apprentice',
    title: 'Trade Apprentice',
    description: 'Learning the ropes. Low pay, high growth potential.',
    salary: 1800,
    avatarColor: '#8B5CF6',
    initial: 'TA',
  },
  {
    key: 'retail',
    title: 'Retail Associate',
    description: 'Entry-level service role. Flexible hours.',
    salary: 2200,
    avatarColor: '#3B82F6',
    initial: 'RA',
  },
  {
    key: 'office',
    title: 'Office Junior',
    description: 'Starting the corporate ladder. Steady income.',
    salary: 2850,
    avatarColor: '#10B981',
    initial: 'OJ',
  },
];

export function SimulatorScreen() {
  const router = useRouter();
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  const handleConfirm = useCallback(() => {
    if (!selectedJob) return;
    router.push('/(student)/payslip' as any);
  }, [selectedJob, router]);

  const handleReset = useCallback(() => {
    setSelectedJob(null);
  }, []);

  return (
    <ScreenWrapper topPadding={16} showDecoration={false}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        bounces
      >
        <SimulatorHeader onReset={handleReset} />
        <SimProgressBar progress={0} />

        {/* Title section */}
        <MotiView
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 150 }}
        >
          <View className="mb-6 px-6">
            <Text className="mb-2 font-fredoka text-2xl text-foreground">
              Pick your starting path
            </Text>
            <Text className="font-poppins-regular text-sm leading-5 text-muted-foreground">
              Each role has a different starting income and lifestyle requirements.
            </Text>
          </View>
        </MotiView>

        {/* Job cards */}
        <View className="gap-3 px-6">
          {JOBS.map((job, index) => (
            <JobRoleCard
              key={job.key}
              role={job}
              isSelected={selectedJob === job.key}
              onPress={() => setSelectedJob(job.key)}
              index={index}
            />
          ))}
        </View>
      </ScrollView>

      {/* Footer */}
      <MotiView
        from={{ opacity: 0, translateY: 16 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 550 }}
      >
        <View className="px-6 pt-2">
          <GradientButton
            label="Confirm Path"
            variant="purple"
            onPress={handleConfirm}
            disabled={!selectedJob}
            showArrow
          />
        </View>
      </MotiView>
    </ScreenWrapper>
  );
}
