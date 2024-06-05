import { btoa } from 'react-native-quick-base64';
import { ios } from './constants';
import {
  getDeviceBrand,
  getDeviceModel,
  getOSVersion,
  getAppVersion,
} from './seed/deviceInfo';

const getDeviceMetadata = async () => {
  const brand = await getDeviceBrand();
  const model = await getDeviceModel();
  const osVersion = await getOSVersion();
  const appVersion = await getAppVersion();
  const os = ios ? 'iOS' : 'Android';
  const device = {
    platform: {
      so: os,
      version: osVersion,
    },
    device: {
      model,
      brand,
    },
    appVersion,
  };
  return btoa(JSON.stringify(device));
};

export default getDeviceMetadata;
