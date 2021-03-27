module.exports = {
  extends: ['airbnb-typescript/base', 'prettier'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'import/prefer-default-export': 'off',
    'no-param-reassign': 'off',
  },
};
