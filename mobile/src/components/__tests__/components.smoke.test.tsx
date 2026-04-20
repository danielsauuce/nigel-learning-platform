import fs from 'fs';
import path from 'path';
import React from 'react';
import { Text } from 'react-native';
import TestRenderer, { act } from 'react-test-renderer';
import { PERSONALIZATION_STEPS } from '@/constants/app';
import { LEARNING_PATHS } from '@/constants/learning-paths';

const COMPONENTS_ROOT = path.resolve(__dirname, '..');

const sampleStudent = {
  id: 'ST-2024-001',
  name: 'Alex Thompson',
  missions: 24,
  avg: 92,
  badges: 12,
  active: true,
  lastActive: '2 MINS AGO',
  simLevel: 'HIGH' as const,
};

const sampleIsland = {
  key: 'saving-basics',
  title: 'Saving Basics',
  category: 'Foundation',
  description: 'Learn how to build smart saving habits.',
  lessonsCompleted: 3,
  totalLessons: 8,
  status: 'active' as const,
};

const sampleBudgetCategory = {
  key: 'needs',
  label: 'Needs',
  icon: <Text>Needs</Text>,
  color: '#B9A7F8',
  min: 0,
  max: 2000,
  step: 50,
  recommended: 500,
  value: 450,
};

const sampleQuizAnswer = {
  id: 'answer-1',
  text: 'Answer A',
  correct: true,
};

const sampleQuizQuestion = {
  id: 'question-1',
  text: 'What is a budget?',
  type: 'multiple_choice' as const,
  answers: [
    sampleQuizAnswer,
    { id: 'answer-2', text: 'Answer B', correct: false },
    { id: 'answer-3', text: 'Answer C', correct: false },
    { id: 'answer-4', text: 'Answer D', correct: false },
  ],
  points: 10,
};

const sampleLines = [
  { label: 'Gross Salary', amount: 2850, type: 'income' as const },
  { label: 'Income Tax', amount: 342, type: 'deduction' as const },
];

const sampleSegments = [
  { label: 'Take-Home', amount: 2195, color: '#B9A7F8', percentage: 77 },
  { label: 'Tax', amount: 342, color: '#EF4444', percentage: 12 },
];

const sampleStats = [
  { key: 'score', icon: <Text>Score</Text>, label: 'Score', value: '85%' },
  { key: 'coins', icon: <Text>Coins</Text>, label: 'Coins', value: '450' },
];

const sampleFeedbackItems = [
  {
    key: 'housing',
    icon: <Text>House</Text>,
    category: 'Housing',
    message: 'Nice balance between needs and savings.',
    type: 'good' as const,
  },
];

const sampleBadges = [{ key: 'starter', emoji: '🏆', label: 'Starter' }];

const sampleLifeEvent = {
  key: 'unexpected-expense',
  icon: <Text>Expense</Text>,
  title: 'Phone Repair',
  description: 'Your phone screen cracked and needs fixing.',
  amount: 120,
  type: 'expense' as const,
  tip: 'Keep some money aside for surprises like this.',
};

const sampleChildren = <Text>Child content</Text>;

const findComponentFiles = (dir: string): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return findComponentFiles(fullPath);
    }

    if (
      entry.isFile() &&
      entry.name.endsWith('.tsx') &&
      !entry.name.endsWith('.test.tsx') &&
      !fullPath.includes(`${path.sep}__tests__${path.sep}`)
    ) {
      return [fullPath];
    }

    return [];
  });

const componentFiles = findComponentFiles(COMPONENTS_ROOT).sort();

const fallbackFn = jest.fn();

const createMagicItem = (key: string) => {
  if (key.includes('option')) {
    return { key: 'option-1', title: 'Option title', subtitle: 'Option subtitle', iconName: 'wallet' };
  }

  return {
    key: `${key}-1`,
    label: 'Label',
    title: 'Title',
    subtitle: 'Subtitle',
    description: 'Description',
    text: 'Sample text',
    value: 'Value',
    icon: <Text>Icon</Text>,
    message: 'Helpful feedback',
    category: 'Category',
    type: 'good',
    amount: 100,
    color: '#B9A7F8',
    percentage: 50,
    emoji: '⭐',
  };
};

const createMagicArray = (key: string) => {
  if (key === 'categories') return [sampleBudgetCategory];
  if (key === 'lines') return sampleLines;
  if (key === 'segments') return sampleSegments;
  if (key === 'stats') return sampleStats;
  if (key === 'items') return sampleFeedbackItems;
  if (key === 'badges') return sampleBadges;
  if (key === 'options') return PERSONALIZATION_STEPS[0].options;
  if (key === 'children') return [sampleChildren];

  return [createMagicItem(key)];
};

const inferValue = (key: string): unknown => {
  if (key === 'children') return sampleChildren;
  if (/^on[A-Z]|^set[A-Z]|toggle|press|change|select|remove|skip|next|back|preview|details/i.test(key)) {
    return fallbackFn;
  }
  if (/^(is|has|show|visible|checked|disabled|danger|active|consent)/i.test(key)) {
    return true;
  }
  if (/current|total|step|index|progress|score|rank|streak|level|gems|balance|completion|missionsDone|totalMissions|takeHome|allocated|grossPay|salary|age|delay/i.test(key)) {
    return 3;
  }
  if (/studentId/i.test(key)) return 'NGL-001';
  if (/accentColor|primaryColor|foregroundColor|mutedColor|color|bg|gradient/i.test(key)) {
    return '#B9A7F8';
  }
  if (key === 'speechText') return 'Let us get you set up.';
  if (key === 'filter') return 'all';
  if (key === 'state') return 'balanced';
  if (key === 'variant') return 'pill';
  if (key === 'trailing') return 'On';
  if (key === 'icon' || key === 'illustration') return <Text>Icon</Text>;
  if (key === 'student') return sampleStudent;
  if (key === 'island') return sampleIsland;
  if (key === 'event') return sampleLifeEvent;
  if (key === 'category') return sampleBudgetCategory;
  if (key === 'answer') return sampleQuizAnswer;
  if (key === 'question') return sampleQuizQuestion;
  if (/categories|lines|segments|stats|items|badges|options/i.test(key)) return createMagicArray(key);
  if (/name/i.test(key)) return 'Alex';
  if (/title|label|subtitle|description|placeholder|text|value|jobTitle/i.test(key)) {
    return 'Sample text';
  }

  return 'Sample text';
};

const createProps = (filePath: string) => {
  const relativePath = path.relative(process.cwd(), filePath);

  const overrides: Record<string, unknown> = {
    children: sampleChildren,
  };

  if (relativePath.endsWith(path.join('auth', 'personalization', 'PersonalizationQuestion.tsx'))) {
    overrides.data = PERSONALIZATION_STEPS[0];
    overrides.selectedAnswer = PERSONALIZATION_STEPS[0].options[0]?.key ?? null;
  }

  if (relativePath.endsWith(path.join('student', 'settings', 'SettingSection.tsx'))) {
    overrides.title = 'Profile';
  }

  if (relativePath.endsWith(path.join('teacher', 'settings', 'SettingsSection.tsx'))) {
    overrides.title = 'Settings';
  }

  if (relativePath.endsWith(path.join('teacher', 'settings', 'SettingRow.tsx'))) {
    overrides.icon = <Text>Settings</Text>;
    overrides.label = 'Profile';
    overrides.trailing = 'On';
  }

  if (relativePath.endsWith(path.join('student', 'settings', 'SettingRow.tsx'))) {
    overrides.icon = 'user';
    overrides.label = 'Edit profile';
  }

  if (relativePath.endsWith(path.join('teacher', 'students', 'StudentFilters.tsx'))) {
    overrides.filter = 'all';
  }

  if (relativePath.endsWith(path.join('teacher', 'students', 'SimBadge.tsx'))) {
    overrides.level = 'HIGH';
  }

  if (relativePath.endsWith(path.join('teacher', 'students', 'StudentCard.tsx'))) {
    overrides.student = sampleStudent;
    overrides.index = 0;
  }

  if (relativePath.endsWith(path.join('teacher', 'StudentCard.tsx'))) {
    overrides.student = sampleStudent;
    overrides.index = 0;
  }

  if (relativePath.endsWith(path.join('student', 'islands-map', 'IslandMapHeader.tsx'))) {
    overrides.name = 'Alex';
    overrides.level = 2;
    overrides.streak = 7;
    overrides.gems = 120;
  }

  if (relativePath.endsWith(path.join('student', 'dashboard', 'DashboardGreeting.tsx'))) {
    overrides.name = 'Alex';
    overrides.level = 2;
    overrides.streak = 7;
  }

  if (relativePath.endsWith(path.join('student', 'dashboard', 'ProgressCard.tsx'))) {
    overrides.title = 'Saving Basics';
    overrides.completion = 60;
    overrides.missionsDone = 3;
    overrides.totalMissions = 5;
  }

  if (relativePath.endsWith(path.join('student', 'simulator', 'JobRoleCard.tsx'))) {
    overrides.title = 'Shop Assistant';
    overrides.salary = '£18,000';
    overrides.description = 'A customer-facing starter role.';
    overrides.bg = '#FDE8E4';
  }

  if (relativePath.endsWith(path.join('student', 'payslip', 'PayslipSummaryCard.tsx'))) {
    overrides.grossPay = 2850;
    overrides.lines = sampleLines;
    overrides.takeHome = 2195;
  }

  if (relativePath.endsWith(path.join('student', 'payslip', 'PayslipBreakdownChart.tsx'))) {
    overrides.segments = sampleSegments;
  }

  if (relativePath.endsWith(path.join('student', 'sim-results', 'ResultsBreakdown.tsx'))) {
    overrides.stats = sampleStats;
  }

  if (relativePath.endsWith(path.join('student', 'sim-results', 'ResultsFeedbackList.tsx'))) {
    overrides.items = sampleFeedbackItems;
  }

  if (relativePath.endsWith(path.join('student', 'life-event', 'LifeEventReveal.tsx'))) {
    overrides.event = sampleLifeEvent;
  }

  if (relativePath.endsWith(path.join('student', 'dashboard', 'RecentAchievements.tsx'))) {
    overrides.badges = sampleBadges;
  }

  if (relativePath.endsWith(path.join('student', 'islands-map', 'IslandCard.tsx'))) {
    overrides.island = sampleIsland;
    overrides.index = 0;
  }

  if (relativePath.endsWith(path.join('student', 'budget-builder', 'BudgetBreakdownBar.tsx'))) {
    overrides.categories = [sampleBudgetCategory];
    overrides.takeHome = 1000;
  }

  if (relativePath.endsWith(path.join('student', 'budget-builder', 'BudgetBalanceCard.tsx'))) {
    overrides.takeHome = 1000;
    overrides.allocated = 750;
  }

  if (relativePath.endsWith(path.join('student', 'budget-builder', 'BudgetFeedback.tsx'))) {
    overrides.state = 'balanced';
    overrides.savingsAmount = 200;
  }

  if (relativePath.endsWith(path.join('student', 'budget-builder', 'BudgetSlider.tsx'))) {
    overrides.category = sampleBudgetCategory;
    overrides.index = 0;
    overrides.takeHome = 1000;
  }

  if (relativePath.endsWith(path.join('teacher', 'create-quiz', 'QuizAnswerOption.tsx'))) {
    overrides.answer = sampleQuizAnswer;
    overrides.index = 0;
    overrides.isTrueFalse = false;
  }

  if (relativePath.endsWith(path.join('teacher', 'create-quiz', 'QuizQuestionCard.tsx'))) {
    overrides.question = sampleQuizQuestion;
    overrides.index = 0;
  }

  if (relativePath.endsWith(path.join('student', 'shared', 'MascotCelebration.tsx'))) {
    overrides.size = 120;
  }

  if (relativePath.endsWith(path.join('student', 'lesson', 'IslandLandingScreen.tsx'))) {
    const pathData = LEARNING_PATHS[0];
    if (pathData) {
      overrides.name = pathData.title;
    }
  }

  return new Proxy(overrides, {
    get(target, prop) {
      if (typeof prop !== 'string') {
        return undefined;
      }

      if (prop in target) {
        return target[prop];
      }

      return inferValue(prop);
    },
  });
};

describe('components smoke test coverage', () => {
  it('discovers every component file in src/components', () => {
    expect(componentFiles.length).toBe(107);
  });

  it.each(componentFiles)('%s renders without crashing', (filePath) => {
    const exportName = path.basename(filePath, '.tsx');
    const moduleExports = require(filePath);
    const Component = moduleExports[exportName];

    expect(Component).toBeDefined();

    let tree: TestRenderer.ReactTestRenderer | undefined;

    act(() => {
      tree = TestRenderer.create(<Component {...createProps(filePath)} />);
    });

    act(() => {
      tree?.unmount();
    });
  });
});
