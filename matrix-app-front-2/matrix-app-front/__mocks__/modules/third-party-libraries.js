/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import * as mockClipboard from '@react-native-clipboard/clipboard/jest/clipboard-mock';
import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock';
import * as reanimatedJestUtils from 'react-native-reanimated/src/reanimated2/jestUtils';

reanimatedJestUtils.setUpTests();

const mockMediaDevices = {
  getUserMedia: jest.fn().mockResolvedValueOnce('fake data'),
};
const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
};

global.navigator = { geolocation: mockGeolocation };

Object.defineProperty(navigator, 'mediaDevices', {
  writable: true,
  value: mockMediaDevices,
});

global.__reanimatedWorkletInit = () => {};
global.ReanimatedDataMock = {
  now: () => 0,
};
jest.mock('react-native-keychain', () => ({
  setGenericPassword: jest.fn(() => Promise.resolve('mockPass')),
  getGenericPassword: jest.fn(() => Promise.resolve('mockPass')),
  resetGenericPassword: jest.fn(() => Promise.resolve(null)),
}));

jest.mock('aws-amplify');
jest.mock('react-native-skeleton-placeholder');

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.NativeModules.Aes = {
    sha256: jest.fn().mockImplementation((x) => Promise.resolve(x)),
  };
  return RN;
});

jest.mock('@react-native-firebase/crashlytics', () => ({
  messaging: jest.fn(() => ({
    hasPermission: jest.fn(() => Promise.resolve(true)),
    subscribeToTopic: jest.fn(),
    unsubscribeFromTopic: jest.fn(),
    requestPermission: jest.fn(() => Promise.resolve(true)),
    getToken: jest.fn(() => Promise.resolve('myMockToken')),
  })),
  notifications: jest.fn(() => ({
    onNotification: jest.fn(),
    onNotificationDisplayed: jest.fn(),
  })),
  analytics: jest.fn(() => ({
    logEvent: jest.fn(),
  })),
}));

jest.mock('react-native-appsflyer', () => (
  {
    logEvent: jest.fn(),
  }
));

jest.mock('@react-native-firebase/remote-config', () => ({
  __esModule: true,
  default: () => ({
    setDefaults: jest.fn(),
    getValue: jest.fn(),
  }),
}));

jest.mock('@react-native-firebase/analytics', () => ({
  messaging: jest.fn(() => ({
    hasPermission: jest.fn(() => Promise.resolve(true)),
    subscribeToTopic: jest.fn(),
    unsubscribeFromTopic: jest.fn(),
    requestPermission: jest.fn(() => Promise.resolve(true)),
    getToken: jest.fn(() => Promise.resolve('myMockToken')),
  })),
  notifications: jest.fn(() => ({
    onNotification: jest.fn(),
    onNotificationDisplayed: jest.fn(),
  })),
  analytics: jest.fn(() => ({
    logEvent: jest.fn(),
  })),
}));

jest.mock('react-native-device-info', () => ({
  getDeviceId: jest.fn(() => ({
    onNotification: jest.fn(),
    onNotificationDisplayed: jest.fn(),
  })),
  getVersion: jest.fn(() => ({
    logEvent: jest.fn(),
  })),
  getDeviceName: jest.fn().mockResolvedValue('Name'),
  getBrand: jest.fn().mockResolvedValue('Brand'),
  getModel: jest.fn().mockResolvedValue('Model'),
  getSystemVersion: jest.fn().mockResolvedValue('1.0.0'),
  getVersion: jest.fn().mockResolvedValue('0.1.0'),
}));

jest.mock('aws-amplify');
jest.mock('react-native-responsive-fontsize', () => ({ RFValue: jest.fn((x) => x) }));
jest.mock('react-native-config', () => ({}));
jest.mock(
  'react-native-linear-gradient',
  () =>
    ({ children }) =>
      children,
);
jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
}));
jest.mock('react-native-localize', () => ({ getLocales: jest.fn(() => []) }));

jest.mock('@twilio/twilio-verify-for-react-native', () => ({
  getAllFactors: jest.fn().mockResolvedValue([]),
  createFactor: jest.fn().mockResolvedValue({ sid: 'sid' }),
  PushFactorPayload: jest.fn(),
  verifyFactor: jest.fn(),
  VerifyPushFactorPayload: jest.fn(),
}), { virtual: true });
jest.mock('react-native-push-notification');
jest.mock('@react-native-community/push-notification-ios');
jest.mock('react-native-compressor', () => ({
  Video: jest.fn(),
  getVideoMetaData: jest.fn(),
  Image: jest.fn(),
}));

// eslint-disable-next-line global-require
jest.mock('react-native-permissions', () => require('react-native-permissions/mock'));

jest.mock('react-native-modalize');
require('node_modules/react-native-gesture-handler/jestSetup.js');

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('react-native-vision-camera');
// eslint-disable-next-line global-require
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);
jest.mock('@react-native-firebase/analytics', () => jest.fn(() => ({ logEvent: jest.fn() })));
jest.mock('@react-native-firebase/crashlytics', () =>
  jest.fn(() => ({
    log: jest.fn(),
    setAttributes: jest.fn(),
    recordError: jest.fn(),
  })),
);
jest.mock('react-native-blob-util', () => ({
  DocumentDir: () => {},
  fetch: () => {},
  base64: () => {},
  android: () => {},
  ios: () => {},
  config: () => {},
  session: () => {},
  fs: {
    dirs: {
      MainBundleDir: () => {},
      CacheDir: () => {},
      DocumentDir: () => {},
    },
  },
  wrap: () => {},
  polyfill: () => {},
  JSONStream: () => {},
}));
jest.mock('react-native-compressor', () => ({
  Video: jest.fn(),
  getVideoMetaData: jest.fn(),
  Image: jest.fn(),
}));

// eslint-disable-next-line global-require
jest.mock('react-native-permissions', () => require('react-native-permissions/mock'));

jest.mock('src/components/I2cSdk/I2CModule', () => ({
  i2cEvents: {
    addListener: jest.fn(),
    removeAllListeners: jest.fn(),
  },
  revealCardInfo: jest.fn(),
}));
jest.mock('react-native-modalize');
jest.mock('react-native-track-player', () => ({ setupPlayer: jest.fn(), add: jest.fn(), play: jest.fn() }));

// eslint-disable-next-line no-underscore-dangle
global.__reanimatedWorkletInit = () => {};
// eslint-disable-next-line global-require

jest.mock('@react-native-clipboard/clipboard', () => mockClipboard);
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native-rsa-native', () => ({
  RSA: {
    encrypt: jest.fn().mockResolvedValue('encryptData'),
  },
}));
