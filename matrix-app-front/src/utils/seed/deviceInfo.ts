import DeviceInfo from 'react-native-device-info';
import { GetUser, UpdateCustomAttribute } from 'src/api/AuthServices';

const getDeviceName = async (): Promise<string | boolean> => {
  try {
    const device = await DeviceInfo.getDeviceName();
    return device;
  } catch (error) {
    return false;
  }
};

const getDeviceBrand = async (): Promise<string> => {
  const brand = await DeviceInfo.getBrand();
  return brand;
};

const getDeviceModel = async (): Promise<string> => {
  const deviceModel = await DeviceInfo.getModel();
  return deviceModel;
};

const getOSVersion = async (): Promise<string> => {
  const osVersion = await DeviceInfo.getSystemVersion();
  return osVersion;
};

const getAppVersion = async (): Promise<string> => {
  const appVersion = await DeviceInfo.getVersion();
  return appVersion;
};

const saveDeviceName = async () => {
  try {
    const deviceName = await getDeviceName();
    const currentUser = await GetUser();
    await UpdateCustomAttribute(currentUser, { 'custom:device_name': deviceName });
  } catch (error) {
    console.log('It does not save device name: ', error);
  }
};

const getDeviceNameSaved = async (): Promise<string | null> => {
  try {
    const currentUser = await GetUser();
    return currentUser.attributes['custom:device_name'];
  } catch (error) {
    console.log('Error while get device name from cognito: ', error);
    return null;
  }
};

const checkDeviceSaved = async () => {
  try {
    const currentUser = await getDeviceNameSaved();
    if (!currentUser) saveDeviceName();
  } catch (error) {
    console.log('Error while saving device name: ', error);
  }
};

export {
  saveDeviceName,
  getDeviceName,
  getDeviceBrand,
  getDeviceNameSaved,
  checkDeviceSaved,
  getDeviceModel,
  getOSVersion,
  getAppVersion,
};
