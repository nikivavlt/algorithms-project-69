/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,jsx,mjs,cjs}'], // include all JS/JSX files
    languageOptions: {
      globals: { ...globals.node, ...globals.browser },
    },
    plugins: { js },
    extends: ['js/recommended'],
    rules: {
      indent: ['error', 2],
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'no-trailing-spaces': 'error',
      'eol-last': ['error', 'always'],
    },
  },
]);
