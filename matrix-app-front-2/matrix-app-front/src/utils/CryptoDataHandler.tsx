import { NativeModules } from 'react-native';
import { saveValue, getValue } from './AsyncStorageHandler';
import { getValues } from './KeyChainHandler';
import { RSA } from 'react-native-rsa-native';
import { PUBLIC_KEY } from './constants';

const { Aes } = NativeModules;

type cryptType = {
  data: string;
  key: string;
  iv: string;
};

const generateRandomValue = (keyLength: number): Promise<any> =>
  new Promise((resolve, reject) => {
    Aes.randomKey(keyLength)
      .then((iv: any) => resolve(iv))
      .catch((error: any) => reject(error));
  });

const generateKey = async (): Promise<any> => {
  const password = await generateRandomValue(8);
  const salt = await generateRandomValue(4);
  return new Promise((resolve, reject) => {
    Aes.pbkdf2(password, salt, 5000, 256)
      .then((key: any) => resolve(key))
      .catch((error: any) => reject(error));
  });
};

const encryptData = async ({ data, key, iv }: cryptType): Promise<any> =>
  new Promise((resolve, reject) =>
    Aes.encrypt(data, key, iv, 'aes-256-cbc')
      .then((value: any) => resolve(value))
      .catch((error: any) => reject(error)),
  );

const decryptData = async ({ data, key, iv }: cryptType): Promise<any> =>
  new Promise((resolve, reject) =>
    Aes.decrypt(data, key, iv, 'aes-256-cbc')
      .then((value: any) => resolve(value))
      .catch((error: any) => reject(error)),
  );

const hashValue = async (text: string): Promise<any> =>
  new Promise((resolve, reject) =>
    Aes.sha256(text)
      .then((value: any) => resolve(value))
      .catch((error: any) => reject(error)),
  );

const saveValueCipher = async (key: string, value: string): Promise<void> => {
  try {
    const cryptoKeys = await getValues('keys');
    const cipher = await encryptData({ data: value, key: cryptoKeys.key, iv: cryptoKeys.iv });
    await saveValue(key, cipher);
  } catch (error) {
    // console.log('Error was saving value in Storage', error);
  }
};

const getValueDecrypt = async (key: string): Promise<any> => {
  try {
    const cryptoKeys = await getValues('keys');
    const cipher = await getValue(key);
    const value = await decryptData({ data: cipher, key: cryptoKeys.key, iv: cryptoKeys.iv });
    return value;
  } catch (error) {
    // console.log('Error was getting value in Storage', error);
    throw error;
  }
};

const cryptPwd = async (pwd: string): Promise<string> => {
  try {
    let pwdCrypt = await RSA.encrypt(pwd, PUBLIC_KEY);
    return pwdCrypt.replace(/\n/g, '')
  } catch (error) {
    // console.log('Error was encrypting value with RSA', error);
    throw error;
  }
};

export {
  encryptData,
  decryptData,
  saveValueCipher,
  getValueDecrypt,
  generateKey,
  generateRandomValue,
  hashValue,
  cryptPwd,
};
