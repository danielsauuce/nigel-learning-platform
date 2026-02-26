<<<<<<< HEAD
// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const tseslint = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const prettier = require('eslint-plugin-prettier');
=======
// @ts-check
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
>>>>>>> v5

module.exports = defineConfig([
  expoConfig,

  {
<<<<<<< HEAD
    ignores: ['dist/*', 'node_modules/*', '.expo/*', 'expo-env.d.ts'],
=======
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
>>>>>>> v5
  },

  {
    files: ['**/*.ts', '**/*.tsx'],
<<<<<<< HEAD
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier,
    },
    rules: {
      'react-native/no-inline-styles': 'off', // NativeWind uses className
      'react-native/split-platform-components': 'off',

      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',

=======
    rules: {
      // NativeWind uses inline styles alongside className — allow both
      'react-native/no-inline-styles': 'off',

      // Allow Platform.select patterns
      'react-native/split-platform-components': 'off',

      // TypeScript
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',

      // Import ordering (plugin provided by eslint-config-expo)
>>>>>>> v5
      'import/order': [
        'warn',
        {
          groups: [['builtin', 'external'], ['internal'], ['parent', 'sibling']],
          'newlines-between': 'always',
<<<<<<< HEAD
        },
      ],

      'prettier/prettier': 'warn',
=======
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
>>>>>>> v5
    },
  },
]);
