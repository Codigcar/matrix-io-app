const {defaults: tsjPreset} = require('ts-jest/presets');

module.exports = {
  setupFiles:['./jest.setup.js'],
  testEnvironment:"jsdom",
  preset: 'react-native',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.spec.json',
    },
  },
  // moduleDirectories: ['node_modules', 'src',],
  transform: {
    '^.+\\.jsx$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
    // "^.+\\.js$": "<rootDir>/node_modules/react-native/jest/preprocessor.js"
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // moduleNameMapper: {
  //   '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
  // },
  // transformIgnorePatterns: [],
  transformIgnorePatterns: ['node_modules/(?!(jest-)?@react-native|react-native|react-native-elements/*)',],
};
