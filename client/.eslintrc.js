module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: `${__dirname}/'tsconfig.json')`,
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    rules: {
      "import/prefer-default-export": 0,
      "react/function-component-definition": [
        2,
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],
    },
  },
  ignorePatterns: ["build/", "node_modules/", ".eslintrc.js"],
};
