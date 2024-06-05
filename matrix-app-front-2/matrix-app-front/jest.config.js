module.exports = {
  preset: 'react-native',
  setupFiles: ['./jest-setup-files.js'],
  setupFilesAfterEnv: ['./jest-setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'node'],
  moduleNameMapper: {
    '^uuid$': 'uuid',
    '\\.(jpg|ico|jpeg|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/modules/image.js',
    '\\.(png)$': '<rootDir>/__mocks__/modules/png.js',
  },
  testTimeout: 60000,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}', // Ensure you cover all ts and tsx files
    '!src/**/*.enum.ts', // Exclude all files ending in .enum.ts
    '!src/**/*.types.ts', // Exclude all files ending in .types.ts
    '!src/**/*.interface.ts', // Exclude all files ending in .interface.ts
    '!src/**/*.types.tsx', // Exclude all files ending in .types.tsx
    '!src/**/*.repository.ts', // Exclude all files ending in .repository.ts
  ],
  transformIgnorePatterns: [
    '/node_modules/(?!(@react-native|@aws-amplify/pushnotification|react-native-safe-area-context|react-native-appsflyer|react-native-modalize|react-native-webview|react-native-reanimated|react-native-track-player|aws-amplify|@react-native-community|react-native-push-notification|react-native-skeleton-placeholder|@react-native-masked-view|react-native-permissions|react-native-extended-stylesheet|react-native|react-native-quick-base64|react-native-share)/).*/',
  ],
  clearMocks: true,
};
