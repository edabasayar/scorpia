module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      files: ['jest.setup.js', 'jest.config.js', '__mocks__/**/*.js'],
      env: { jest: true, node: true },
    },
  ],
};
