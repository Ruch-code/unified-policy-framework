import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  js.configs.recommended,
  {
    files: ['src/**/*.{js,jsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        process: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        fetch: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        FormData: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        React: 'readonly',
        Blob: 'readonly',
        CustomEvent: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
        location: 'readonly',
        IntersectionObserver: 'readonly',
        FileReader: 'readonly',
        Image: 'readonly',
        AbortController: 'readonly',
        performance: 'readonly',
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      'react/jsx-no-undef': 'error',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'no-undef': 'error',
      'no-empty': 'off',
      'no-useless-assignment': 'off',
      'no-unused-vars': 'off',
      'react-hooks/rules-of-hooks': 'off',
      'react-hooks/exhaustive-deps': 'off',
    },
  },
  {
    ignores: ['dist/', 'node_modules/', 'tests/', 'src/components/TableOfContents.jsx', 'src/pages/Products.jsx', 'src/utils/green-cursor.js'],
  },
];
