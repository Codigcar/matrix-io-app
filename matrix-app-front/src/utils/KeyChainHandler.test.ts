import * as Keychain from 'react-native-keychain';
import {
  verifyCredentials, getValues, setCredentials, generateCredentials, resetKeyChain,
} from './KeyChainHandler';
import getUID from './DeviceInfoHandler';

jest.mock('react-native-keychain', () => ({
  setGenericPassword: jest.fn(),
  getGenericPassword: jest.fn(),
  resetGenericPassword: jest.fn(),
}));

jest.mock('./CryptoDataHandler', () => ({
  generateKey: jest.fn().mockResolvedValue('mockKey'),
  generateRandomValue: jest.fn().mockResolvedValue('mockIV'),
  encryptData: jest.fn().mockImplementation(({ data }) => Promise.resolve(`encrypted-${data}`)),
  hashValue: jest.fn().mockResolvedValue('hashedDeviceId'),
}));

jest.mock('./DeviceInfoHandler', () => jest.fn());

describe('Credentials Utilities Tests', () => {
  describe('generateCredentials Function', () => {
    test('returns generated key and iv', async () => {
      const credentials = await generateCredentials();

      expect(credentials).toEqual({ key: 'mockKey', iv: 'mockIV' });
    });

    // Additional error handling tests...
  });

  describe('setCredentials Function', () => {
    beforeEach(() => {
      (getUID as jest.Mock).mockResolvedValue('mockDeviceId');
    });
    test('stores encrypted and hashed device id, key, and iv in Keychain', async () => {
      await setCredentials('key', 'iv');

      expect(Keychain.setGenericPassword).toHaveBeenCalledWith(
        JSON.stringify({ deviceId: JSON.stringify('hashedDeviceId') }),
        JSON.stringify({ key: JSON.stringify('key'), iv: JSON.stringify('iv') }),
      );
    });

    // Additional error handling tests...
  });

  describe('getValues Function', () => {
    beforeEach(() => {
      (Keychain.getGenericPassword as jest.Mock).mockResolvedValue({
        username: JSON.stringify({ deviceId: JSON.stringify('mockDeviceId') }),
        password: JSON.stringify({ key: JSON.stringify('mockKey'), iv: JSON.stringify('mockIV') }),
      });
    });
    test('retrieves credentials from Keychain', async () => {
      const values = await getValues('keys');
      expect(values).toEqual({ key: 'mockKey', iv: 'mockIV' });
    });

    // Additional tests for 'device' type and error handling...
  });

  describe('verifyCredentials Function', () => {
    beforeEach(() => {
      (Keychain.getGenericPassword as jest.Mock).mockResolvedValue({
        password: JSON.stringify({ key: 'mockKey' }),
      });
    });
    test('verifies if credentials exist in Keychain', async () => {
      const verified = await verifyCredentials();

      expect(verified).toBe(true);
    });

    // Additional tests for cases when credentials do not exist...
  });

  describe('resetKeyChain Function', () => {
    test('resets Keychain credentials', async () => {
      await resetKeyChain();

      expect(Keychain.resetGenericPassword).toHaveBeenCalled();
    });
  });
});
