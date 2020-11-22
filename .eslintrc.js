module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'operator-linebreak': 'off',
    'import/prefer-default-export': 'off',
    'prefer-promise-reject-errors': 'off',
    'no-async-promise-executor': 'off',
    'implicit-arrow-linebreak': 'off',
    'no-console': 'off',
  },
};
