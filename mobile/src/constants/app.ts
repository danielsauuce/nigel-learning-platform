import { Dimensions } from 'react-native';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const ONBOARDING_SLIDES = [
  {
    icon: 'island' as const,
    title: 'Explore Money\nIslands',
    subtitle:
      'Journey through fun-sized lessons on saving, budgeting, and smart spending — one island at a time.',
    accentColor: '#B9A7F8',
  },
  {
    icon: 'piggy' as const,
    title: 'Build Real\nMoney Skills',
    subtitle:
      'Try our budgeting simulator — pick a job, manage your pay, and handle surprise expenses like a pro.',
    accentColor: '#F9D6D0',
  },
  {
    icon: 'trophy' as const,
    title: 'Earn Badges &\nTrack Progress',
    subtitle:
      'Complete missions, ace quizzes, and collect achievements. Share your wins with family too!',
    accentColor: '#F7E6B6',
  },
] as const;

export type SlideIcon = (typeof ONBOARDING_SLIDES)[number]['icon'];
export type RoleType = 'student' | 'teacher';

// Student Personalization
export interface PersonalizationOption {
  key: string;
  title: string;
  subtitle: string;
  iconName: string;
}

export interface PersonalizationQuestion {
  mascotText: string;
  title: string;
  subtitle: string;
  sectionLabel: string;
  question: string;
  options: PersonalizationOption[];
}

export const PERSONALIZATION_STEPS: PersonalizationQuestion[] = [
  {
    mascotText: 'Hi there!',
    title: 'Money Worries?',
    subtitle:
      "Don't worry, every student goes through this! Identifying your concern is the first step to mastering your cash.",
    sectionLabel: 'Personalization',
    question: 'What worries you most about money right now?',
    options: [
      {
        key: 'living_expenses',
        title: 'Living Expenses',
        subtitle: 'Rent, groceries, and daily costs',
        iconName: 'wallet',
      },
      {
        key: 'student_loans',
        title: 'Student Loans',
        subtitle: 'Debt management and repayment',
        iconName: 'graduation-cap',
      },
      {
        key: 'emergency_fund',
        title: 'Emergency Fund',
        subtitle: 'Savings for unexpected events',
        iconName: 'shield',
      },
      {
        key: 'future_wealth',
        title: 'Future Wealth',
        subtitle: 'Investing and long-term goals',
        iconName: 'trending-up',
      },
    ],
  },
  {
    mascotText: 'Great pick!',
    title: 'Learning Style?',
    subtitle: 'Everyone learns differently. This helps us tailor your missions and challenges.',
    sectionLabel: 'Personalization',
    question: 'How do you prefer to learn new things?',
    options: [
      {
        key: 'bite_sized',
        title: 'Bite-Sized Lessons',
        subtitle: 'Quick 5-minute daily missions',
        iconName: 'zap',
      },
      {
        key: 'deep_dive',
        title: 'Deep Dives',
        subtitle: 'Longer, detailed explorations',
        iconName: 'book-open',
      },
      {
        key: 'hands_on',
        title: 'Hands-On Practice',
        subtitle: 'Simulators and real scenarios',
        iconName: 'gamepad-2',
      },
      {
        key: 'challenges',
        title: 'Competitive Challenges',
        subtitle: 'Quizzes, streaks, and leaderboards',
        iconName: 'trophy',
      },
    ],
  },
];
