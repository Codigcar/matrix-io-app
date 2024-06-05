module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['react-native-reanimated/plugin'],
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['.'],
        extensions: ['.tsx', '.jsx', '.js', '.json', '.ts'],
        alias: {
          'matrix-ui-components': './src/matrix-ui-components',
          // '@src/screens': './src/screens',
          // '@components': './src/components',
          // 'ui-toolkit': './libs/ui-toolkit/*',
        },
      },
    ],
  ],
};
