import { getUniqueId, getAndroidId } from 'react-native-device-info';
import { Platform } from 'react-native';
import getUID from './DeviceInfoHandler';

// Mocks for react-native-device-info and react-native Platform
jest.mock('react-native-device-info', () => ({
  getUniqueId: jest.fn(),
  getAndroidId: jest.fn(),
}));

jest.mock('react-native', () => ({
  Platform: {
    OS: 'ios',
  },
}));

describe('getUID', () => {
  const mockUniqueId = 'unique-id';
  const mockAndroidId = 'android-id';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return unique ID on iOS', async () => {
    Platform.OS = 'ios';
    (getUniqueId as jest.Mock).mockResolvedValue(mockUniqueId);

    const UID = await getUID();
    expect(UID).toBe(mockUniqueId);
    expect(getUniqueId).toHaveBeenCalled();
    expect(getAndroidId).not.toHaveBeenCalled();
  });

  test('should return unique ID on Android', async () => {
    Platform.OS = 'android';
    (getAndroidId as jest.Mock).mockResolvedValue(mockAndroidId);
    (getUniqueId as jest.Mock).mockResolvedValue(mockUniqueId);

    const UID = await getUID();
    expect(UID).toBe(mockUniqueId);
    expect(getAndroidId).toHaveBeenCalled();
  });

  test('should handle error in getAndroidId on Android', async () => {
    Platform.OS = 'android';
    const error = new Error('Error getting Android ID');
    (getAndroidId as jest.Mock).mockRejectedValue(error);
    (getUniqueId as jest.Mock).mockResolvedValue(mockUniqueId);

    const UID = await getUID();
    expect(UID).toBe(mockUniqueId);
    expect(getAndroidId).toHaveBeenCalled();
  });
});
