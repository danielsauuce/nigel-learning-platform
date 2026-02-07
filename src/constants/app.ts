import { Dimensions } from 'react-native';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ─── Onboarding slides ─────────────────────────────────────────────
export const ONBOARDING_SLIDES = [
  {
    icon: 'island' as const,
    title: 'Explore Money\nIslands',
    subtitle:
      'Journey through fun-sized lessons on saving, budgeting, and smart spending — one island at a time.',
    accentColor: '#4FC3F7',
  },
  {
    icon: 'piggy' as const,
    title: 'Build Real\nMoney Skills',
    subtitle:
      'Try our budgeting simulator — pick a job, manage your pay, and handle surprise expenses like a pro.',
    accentColor: '#FFD700',
  },
  {
    icon: 'trophy' as const,
    title: 'Earn Badges &\nTrack Progress',
    subtitle:
      'Complete missions, ace quizzes, and collect achievements. Share your wins with family too!',
    accentColor: '#10B981',
  },
] as const;

export type SlideIcon = (typeof ONBOARDING_SLIDES)[number]['icon'];
export type RoleType = 'student' | 'teacher';
