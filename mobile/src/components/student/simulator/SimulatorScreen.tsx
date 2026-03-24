import React, { useCallback, useState } from 'react';
import { ScrollView, Text, View, Platform } from 'react-native';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import { ScreenWrapper, GradientButton } from '@/components/ui';
import { GraduationCap, Laptop, Hospital, Palette, Briefcase } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';
import { SimulatorHeader } from './SimulatorHeader';
import { MascotThinking } from '@/svg/illustrations';
import { JobRoleCard } from './JobRoleCard';

interface JobRole {
  key: string;
  title: string;
  icon: React.ReactNode;
  salary: string;
  description: string;
  bg: string;
}

const JOBS: JobRole[] = [
  {
    key: 'teacher',
    title: 'Teacher',
    icon: <GraduationCap size={24} color="#B9A7F8" strokeWidth={2} />,
    salary: '£28,000',
    description: 'Educate and inspire students',
    bg: '#F3F0FF',
  },
  {
    key: 'developer',
    title: 'Developer',
    icon: <Laptop size={24} color="#F97316" strokeWidth={2} />,
    salary: '£38,000',
    description: 'Build websites and apps',
    bg: '#FDE8E4',
  },
  {
    key: 'nurse',
    title: 'Nurse',
    icon: <Hospital size={24} color="#F59E0B" strokeWidth={2} />,
    salary: '£30,000',
    description: 'Care for patients in hospitals',
    bg: '#FFF8E8',
  },
  {
    key: 'designer',
    title: 'Designer',
    icon: <Palette size={24} color="#B9A7F8" strokeWidth={2} />,
    salary: '£32,000',
    description: 'Create visual experiences',
    bg: '#F3F0FF',
  },
];

export function SimulatorScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const c = colors[theme];
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  const handleContinue = useCallback(() => {
    if (!selectedJob) return;
    router.push('/(student)/payslip' as any);
  }, [selectedJob, router]);

  return (
    <ScreenWrapper topPadding={12}>
      <SimulatorHeader onBack={() => router.back()} step={1} totalSteps={5} />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        bounces
      >
        <MotiView
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 80 }}
          style={{ marginBottom: 24, alignItems: 'center' }}
        >
          <Briefcase size={48} color="#B9A7F8" strokeWidth={1.5} style={{ marginBottom: 12 }} />
          <Text
            style={{
              fontFamily: 'Poppins_700Bold',
              fontSize: 24,
              color: c.foreground,
              textAlign: 'center',
              marginBottom: 6,
            }}
          >
            Choose a Career
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins_400Regular',
              fontSize: 14,
              color: c.mutedForeground,
              textAlign: 'center',
              lineHeight: 22,
            }}
          >
            Pick a job to see what your monthly pay looks like and practice budgeting.
          </Text>
        </MotiView>

        {JOBS.map((job, i) => (
          <MotiView
            key={job.key}
            from={{ opacity: 0, translateX: i % 2 === 0 ? -16 : 16 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 150 + i * 60 }}
          >
            <JobRoleCard
              title={job.title}
              icon={job.icon}
              salary={job.salary}
              description={job.description}
              bg={job.bg}
              isSelected={selectedJob === job.key}
              onPress={() => setSelectedJob(job.key)}
            />
          </MotiView>
        ))}
      </ScrollView>

      <MotiView
        from={{ opacity: 0, translateY: 16 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 450 }}
        style={{ paddingHorizontal: 24, paddingTop: 8 }}
      >
        <GradientButton
          label="See Your Payslip"
          variant="navy"
          onPress={handleContinue}
          disabled={!selectedJob}
          showArrow
        />
      </MotiView>
    </ScreenWrapper>
  );
}
