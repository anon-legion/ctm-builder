module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    'plugin:import/recommended',
    'plugin:node/recommended',
    'plugin:security/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['import', 'node', 'security', '@typescript-eslint'],
  root: true,
  env: {
    es6: true,
    node: true,
  },
  rules: {
    // severity: 0 = off, 1 = warn, 2 = error
    // "brace-style": ["error", "stroustrup"]
    'import/extensions': [1, 'always'],
    'security/detect-object-injection': 0,
    // turn on errors for missing imports
    'import/no-unresolved': 'error',
    'node/no-unsupported-features/es-syntax': 0,
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      // typescript: {
      //   alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
      // },
      typescript: true,
      node: true,
    },
  },
  ignorePatterns: ['node_modules/', 'dist/'],
};
