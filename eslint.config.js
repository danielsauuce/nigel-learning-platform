// @ts-check
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,

  {
    ignores: [
      'dist/*',
      'node_modules/*',
      '.expo/*',
      'expo-env.d.ts',
      'babel.config.js',
      'metro.config.js',
      'tailwind.config.js',
      'scripts/*',
    ],
  },

  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      // NativeWind uses inline styles alongside className — allow both
      'react-native/no-inline-styles': 'off',

      // Allow Platform.select patterns
      'react-native/split-platform-components': 'off',

      // TypeScript
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',

      // Import ordering (plugin provided by eslint-config-expo)
      'import/order': [
        'warn',
        {
          groups: [['builtin', 'external'], ['internal'], ['parent', 'sibling']],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
]);
