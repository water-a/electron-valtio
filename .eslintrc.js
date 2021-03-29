module.exports = {
  extends: ['airbnb-typescript/base', 'prettier'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: 'tsconfig.json',
      },
    },
  ],
  rules: {
    'import/prefer-default-export': 'off',
    'no-param-reassign': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
};
