import { AxiosRequestConfig } from 'axios';
import { Buffer } from 'buffer';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { ios } from 'src/utils/constants';
import CoreServices from '../../../utils/core/CoreServices';

const kycServices = {
  uploadDocumentImage: async (
    uploadUrl: string,
    filePath: string,
    baseHeader: Object,
    options?: AxiosRequestConfig,
  ) => {
    const path = ios ? filePath.replace('file:', '') : filePath;
    const base64data = await ReactNativeBlobUtil.fs.readFile(path, 'base64');
    const bufferData = Buffer.from(base64data, 'base64');
    const serviceData = {
      baseURL: uploadUrl,
      url: '',
      data: bufferData,
      baseHeader,
      ...options,
    };
    return CoreServices.put(serviceData);
  },
  uploadLivenessVideo: async (
    uploadUrl: string,
    filePath: string,
    baseHeader: Object,
    options?: AxiosRequestConfig,
  ) => {
    const base64data = await ReactNativeBlobUtil.fs.readFile(filePath, 'base64');
    const bufferData = Buffer.from(base64data, 'base64');
    const serviceData = {
      baseURL: uploadUrl,
      url: '',
      data: bufferData,
      headers: baseHeader,
      ...options,
    };
    return CoreServices.put(serviceData);
  },
};

export default kycServices;
