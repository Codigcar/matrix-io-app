const reactNativePreset = require('react-native/jest-preset');

module.exports = {
  ...reactNativePreset,
  setupFiles: [require.resolve('./save-promise.js')]
    .concat(reactNativePreset.setupFiles)
    .concat([require.resolve('./restore-promise.js')]),
};
