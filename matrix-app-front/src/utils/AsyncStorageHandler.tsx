import AsyncStorage from '@react-native-async-storage/async-storage';

const saveValue = async (key: string, value: any): Promise<void> => {
  try {
    await AsyncStorage.setItem(`@${key}`, JSON.stringify(value));
  } catch (error) {
    // console.log(`🚨 Error was saving ${key}`);
    throw error;
  }
};

const getValue = async (key: string): Promise<any> => {
  try {
    const value = await AsyncStorage.getItem(`@${key}`);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {
    // console.log(`🚨 Error was getting ${key}`);
    throw error;
  }
  return null;
};

const deleteValue = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(`@${key}`);
    // console.log(`⚠️ ${key} was deleted`);
  } catch (error) {
    // console.log(`🚨 Error was deleting ${key}`);
    throw error;
  }
};

const checkValue = async (key: string): Promise<any> => {
  try {
    const value = await AsyncStorage.getItem(`@${key}`);
    if (value !== null) {
      return true;
    }
    return false;
  } catch (error) {
    // console.log(`🚨 Error was getting ${key}`);
    throw error;
  }
};

export {
  saveValue, getValue, deleteValue, checkValue,
};
