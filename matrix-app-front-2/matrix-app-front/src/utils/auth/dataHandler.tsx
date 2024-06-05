import { hashValue } from 'src/utils/CryptoDataHandler';
import { saveValue, getValue, deleteValue } from 'src/utils/AsyncStorageHandler';
import Config from 'react-native-config';

export const { APPLICATION_ID } = Config;

const saveSignUpData = async (id: string, user: string, sub: string): Promise<void> => {
  const phrase = user + APPLICATION_ID;
  const hash = await hashValue(phrase);
  await saveValue('id', id);
  await saveValue('sub', sub);
  await saveValue('user', hash);
};

const changeUserForId = async (user: string): Promise<any> => {
  const phrase = user + APPLICATION_ID;
  const hash = await hashValue(phrase);
  const userSaved = await getValue('user');
  const userId = await getValue('id');
  return userSaved === hash ? userId : false;
};

const getSub = async (user: string): Promise<any> => {
  const phrase = user + APPLICATION_ID;
  const hash = await hashValue(phrase);
  const userSaved = await getValue('user');
  const userSub = await getValue('sub');
  return userSaved === hash ? userSub : false;
};

const deleteUser = async (): Promise<void> => {
  await deleteValue('id');
  await deleteValue('user');
};

export {
  saveSignUpData, changeUserForId, deleteUser, getSub,
};
