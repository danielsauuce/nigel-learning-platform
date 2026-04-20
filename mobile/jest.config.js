module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.tsx'],
  testMatch: ['<rootDir>/src/**/*.test.ts', '<rootDir>/src/**/*.test.tsx'],
  watchman: false,
  moduleNameMapper: {
    '^react$': '<rootDir>/node_modules/react',
    '^react-test-renderer$': '<rootDir>/../node_modules/react-test-renderer',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
