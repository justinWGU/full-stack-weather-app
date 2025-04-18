import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import pluginReact, { rules } from 'eslint-plugin-react';
import elsintConfigPrettier from 'eslint-config-prettier/flat';
import { ESLint } from 'eslint';

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,jsx}'] },
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  {
    rules: {},
  },
  pluginReact.configs.flat.recommended,
  elsintConfigPrettier,
]);
