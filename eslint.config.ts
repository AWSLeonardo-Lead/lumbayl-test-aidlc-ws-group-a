import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import type { Linter } from 'eslint';

const config: Linter.Config[] = [
  {
    ...js.configs.recommended,
    files: ['src/**/*.ts', 'test/**/*.ts'],
    languageOptions: {
      parser: tsParser as Linter.Parser,
    },
    plugins: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      '@typescript-eslint': tsPlugin as any,
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
];

export default config;
