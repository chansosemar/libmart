module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['airbnb', 'prettier', 'prettier/react'],
  plugins: ['@typescript-eslint', 'prettier', 'react-native'],
  rules: {
    'max-lines': ['warn', {max: 500, skipBlankLines: true, skipComments: true}],
    'react/jsx-filename-extension': [1, {extensions: ['.tsx']}],
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {vars: 'all', args: 'after-used', ignoreRestSiblings: false},
    ],
    'no-restricted-imports': ['error', 'lodash'],
    'react/prop-types': 'off',
    'lines-between-class-members': [
      'error',
      'always',
      {exceptAfterSingleLine: true},
    ],
    'react-native/no-inline-styles': 'error',
    'spaced-comment': [
      'error',
      'always',
      {
        line: {
          markers: ['#region', '#endregion'],
        },
      },
    ],
    'react/no-unused-prop-types': 'off',
  },
};
