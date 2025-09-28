import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],  // include all JS/JSX files
    languageOptions: {
      globals: { ...globals.node, ...globals.browser }, // Node + browser
    },
    plugins: { js },
    extends: ['js/recommended'],
    rules: {
      indent: ['error', 2],               // 2 spaces
      semi: ['error', 'always'],          // require semicolons
      quotes: ['error', 'single'],        // single quotes
      'no-trailing-spaces': 'error',      // no trailing spaces
      'eol-last': ['error', 'always'],    // newline at EOF
    },
  },
]);
