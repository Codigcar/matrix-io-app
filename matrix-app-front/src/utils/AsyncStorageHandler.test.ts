import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  saveValue, getValue, deleteValue, checkValue,
} from './AsyncStorageHandler';

// Mock for AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('AsyncStorage Functions', () => {
  const testKey = 'testKey';
  const testValue = { a: 1, b: 2 };
  let asyncStorage: jest.Mocked<typeof AsyncStorage>;

  beforeEach(() => {
    jest.clearAllMocks();
    asyncStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;
  });

  // Pruebas para saveValue
  test('saveValue should save a value', async () => {
    await saveValue(testKey, testValue);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(`@${testKey}`, JSON.stringify(testValue));
  });

  test('saveValue should throw an error on failure', async () => {
    const error = new Error('Storage Error');
    asyncStorage.setItem.mockRejectedValue(error);

    await expect(saveValue(testKey, testValue)).rejects.toThrow(error);
  });

  // Pruebas para getValue
  test('getValue should return a value', async () => {
    asyncStorage.getItem.mockResolvedValue(JSON.stringify(testValue));
    const value = await getValue(testKey);
    expect(value).toEqual(testValue);
  });

  test('getValue should return null for non-existent key', async () => {
    asyncStorage.getItem.mockResolvedValue(null);
    const value = await getValue('nonExistentKey');
    expect(value).toBeNull();
  });

  test('getValue should throw an error on failure', async () => {
    const error = new Error('Storage Error');
    asyncStorage.getItem.mockRejectedValue(error);

    await expect(getValue(testKey)).rejects.toThrow(error);
  });

  // Pruebas para deleteValue
  test('deleteValue should remove a value', async () => {
    await deleteValue(testKey);
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(`@${testKey}`);
  });

  test('deleteValue should throw an error on failure', async () => {
    const error = new Error('Storage Error');
    asyncStorage.removeItem.mockRejectedValue(error);

    await expect(deleteValue(testKey)).rejects.toThrow(error);
  });

  // Pruebas para checkValue
  test('checkValue should return true for existing key', async () => {
    asyncStorage.getItem.mockResolvedValue(JSON.stringify(testValue));
    const exists = await checkValue(testKey);
    expect(exists).toBe(true);
  });

  test('checkValue should return false for non-existent key', async () => {
    asyncStorage.getItem.mockResolvedValue(null);
    const exists = await checkValue('nonExistentKey');
    expect(exists).toBe(false);
  });

  test('checkValue should throw an error on failure', async () => {
    const error = new Error('Storage Error');
    asyncStorage.getItem.mockRejectedValue(error);

    await expect(checkValue(testKey)).rejects.toThrow(error);
  });
});
