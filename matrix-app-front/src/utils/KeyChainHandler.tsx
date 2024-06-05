/* eslint-disable no-useless-catch */
import * as Keychain from 'react-native-keychain';
import {
  generateKey, generateRandomValue, encryptData, hashValue,
} from './CryptoDataHandler';
import getUID from './DeviceInfoHandler';

const generateCredentials = async (): Promise<any> => {
  try {
    // Generate password
    const key = await generateKey();
    const iv = await generateRandomValue(16);
    return { key, iv };
  } catch (error) {
    // "Doesn't genenerate key and iv 🔑");
    throw error;
  }
};

const setCredentials = async (key: string, iv: string): Promise<void> => {
  try {
    // Store the credentials
    let deviceId = await getUID();
    deviceId = await encryptData({ data: deviceId, key, iv });
    deviceId = await hashValue(deviceId);
    const username = JSON.stringify({ deviceId: JSON.stringify(deviceId) });
    const password = JSON.stringify({ key: JSON.stringify(key), iv: JSON.stringify(iv) });
    await Keychain.setGenericPassword(username, password);
    console.log('Save key and iv 🔑');
  } catch (error) {
    // console.log("Doesn't Save key and iv 🔑");
  }
};

const getValues = async (type: string): Promise<any> => {
  try {
    // Retrieve the credentials
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      if (type === 'keys') {
        const keyValues = JSON.parse(credentials.password);
        return { key: JSON.parse(keyValues.key), iv: JSON.parse(keyValues.iv) };
      }
      if (type === 'device') {
        const deviceValues = JSON.parse(credentials.username);
        return { deviceId: JSON.parse(deviceValues.deviceId) };
      }
    }
    return null;
  } catch (error) {
    // console.log("Keychain couldn't be accessed!", error);
    throw error;
  }
};

const verifyCredentials = async (): Promise<any> => {
  try {
    // Retrieve the credentials
    const credentials = await Keychain.getGenericPassword();
    const hasKeyProperty = credentials && JSON.parse(credentials.password).hasOwnProperty('key');
    if (hasKeyProperty) {
      return true;
    }
    return false;
  } catch (error) {
    // console.log("Keychain couldn't be accessed!", error);
    return false;
  }
};

const resetKeyChain = async (): Promise<void> => {
  await Keychain.resetGenericPassword();
};

export {
  verifyCredentials, getValues, setCredentials, generateCredentials, resetKeyChain
};
