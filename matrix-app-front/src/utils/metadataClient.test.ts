import { btoa } from 'react-native-quick-base64';
import getDeviceMetadata from './metadataClient';

jest.mock('react-native-quick-base64', () => ({
  btoa: jest.fn().mockImplementation((input) => `encoded-${input}`),
}));

jest.mock('./seed/deviceInfo', () => ({
  getDeviceBrand: jest.fn().mockResolvedValue('Brand'),
  getDeviceModel: jest.fn().mockResolvedValue('Model'),
  getOSVersion: jest.fn().mockResolvedValue('OSVersion'),
  getAppVersion: jest.fn().mockResolvedValue('AppVersion'),
}));

jest.mock('./constants', () => ({
  ios: true,
}));

describe('getDeviceMetadata Function', () => {
  test('returns encoded device metadata string', async () => {
    const metadata = await getDeviceMetadata();

    expect(metadata).toBe('encoded-{"platform":{"so":"iOS","version":"OSVersion"},"device":{"model":"Model","brand":"Brand"},"appVersion":"AppVersion"}');
    expect(btoa).toHaveBeenCalledWith(JSON.stringify({
      platform: {
        so: 'iOS',
        version: 'OSVersion',
      },
      device: {
        model: 'Model',
        brand: 'Brand',
      },
      appVersion: 'AppVersion',
    }));
  });
});
