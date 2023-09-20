module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [
      2,
      'always',
      ['lower-case', 'upper-case', 'start-case', 'camel-case'],
    ],
  },
};
