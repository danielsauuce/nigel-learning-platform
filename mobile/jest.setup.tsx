const mockCreateComponent = (name: string) => {
  const React = require('react');
  const { View } = require('react-native');

  const Component = ({ children, ...props }: Record<string, unknown>) =>
    React.createElement(
      View,
      {
        accessibilityLabel: name,
        ...props,
      },
      children,
    );

  Component.displayName = name;
  return Component;
};

jest.mock('moti', () => {
  const React = require('react');
  const { View } = require('react-native');

  const createAnimatedComponent = (name: string) => {
    const Component = React.forwardRef(
      ({ children, ...props }: Record<string, unknown>, ref: unknown) =>
        React.createElement(
          View,
          {
            ref,
            ...props,
          },
          children,
        ),
    );

    Component.displayName = name;
    return Component;
  };

  return {
    MotiView: createAnimatedComponent('MotiView'),
    MotiText: createAnimatedComponent('MotiText'),
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('expo-router', () => {
  const router = {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    canGoBack: jest.fn(() => true),
  };

  return {
    useRouter: () => router,
    useLocalSearchParams: () => ({
      pathKey: 'saving_basics',
      lessonId: 'sb1',
    }),
    router,
  };
});

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('expo-linear-gradient', () => ({
  LinearGradient: mockCreateComponent('LinearGradient'),
}));

jest.mock('lucide-react-native', () => {
  const React = require('react');
  const { Text } = require('react-native');

  return new Proxy(
    {},
    {
      get: (_target, prop) => {
        if (prop === '__esModule') {
          return true;
        }

        const Component = () => React.createElement(Text, null, String(prop));
        Component.displayName = String(prop);
        return Component;
      },
    },
  );
});

jest.mock('react-native-svg', () => {
  return new Proxy(
    {},
    {
      get: (_target, prop) => {
        if (prop === '__esModule') {
          return true;
        }

        return mockCreateComponent(String(prop));
      },
    },
  );
});

jest.mock('@/context', () => ({
  useTheme: () => ({
    theme: 'light',
    toggle: jest.fn(),
    setTheme: jest.fn(),
  }),
  useAuth: () => ({
    role: 'student',
    hasCompletedOnboarding: false,
    hasAcceptedPrivacy: true,
    setRole: jest.fn(),
    completeOnboarding: jest.fn(),
    acceptPrivacy: jest.fn(),
    reset: jest.fn(),
  }),
  useLearning: () => ({
    completedLessons: new Set(['sb1', 'sb2']),
    earnedBadges: new Set(['first_lesson']),
    streak: 7,
    xp: 150,
    level: 2,
    completeLesson: jest.fn(),
    earnBadge: jest.fn(),
    isLessonUnlocked: jest.fn(() => true),
    isPathUnlocked: jest.fn(() => true),
    isPathCompleted: jest.fn(() => false),
    getPathStatus: jest.fn(() => 'active'),
    getPathProgress: jest.fn(() => ({ completed: 2, total: 8 })),
    getCurrentLesson: jest.fn(() => 'sb3'),
    resetProgress: jest.fn(),
  }),
}));

jest.mock('@/svg/illustrations', () => {
  const React = require('react');
  const { Text } = require('react-native');

  return new Proxy(
    {},
    {
      get: (_target, prop) => {
        if (prop === '__esModule') {
          return true;
        }

        const Component = ({ children }: { children?: React.ReactNode }) =>
          React.createElement(Text, null, children ?? String(prop));
        Component.displayName = String(prop);
        return Component;
      },
    },
  );
});

jest.mock('@/svg/brand', () => {
  const React = require('react');
  const { Text } = require('react-native');

  return new Proxy(
    {},
    {
      get: (_target, prop) => {
        if (prop === '__esModule') {
          return true;
        }

        const Component = () => React.createElement(Text, null, String(prop));
        Component.displayName = String(prop);
        return Component;
      },
    },
  );
});

jest.mock('@/svg/brand/NigelLogo', () => {
  const React = require('react');
  const { Text } = require('react-native');

  return {
    NigelLogo: () => React.createElement(Text, null, 'NigelLogo'),
  };
});

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
  jest.useRealTimers();
});
