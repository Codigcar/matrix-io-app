import { useState } from 'react';
import { Video, getVideoMetaData, Image } from 'react-native-compressor';
import {
  VIDEO_SIZE,
  VIDEO_MIN_SIZE_MB,
  VIDEO_PASSIVE_SIZE,
  VIDEO_PASSIVE_MIN_SIZE_MB,
  ios,
} from 'src/utils/constants';
import { logCrashlytics } from '../Analytics';

const useCompressed = (passiveMode: boolean = true) => {
  const [progressCrompressing, setProgressCrompressing] = useState<number>(0);

  const compressVideo = async (uri: string): Promise<string> => {
    try {
      const videoCompressed = await Video.compress(
        uri,
        {
          compressionMethod: 'auto',
          maxSize: passiveMode ? VIDEO_PASSIVE_SIZE : VIDEO_SIZE,
          minimumFileSizeForCompress: passiveMode
            ? VIDEO_PASSIVE_MIN_SIZE_MB
            : VIDEO_MIN_SIZE_MB,
        },
        (progress) => {
          setProgressCrompressing(progress);
        },
      );
      setProgressCrompressing(1);
      return ios
        ? videoCompressed.replace('file://', '')
        : videoCompressed.replace(/file:\/\/|ph:\/\//, 'file:///');
    } catch (error) {
      logCrashlytics({
        scope: 'SDK',
        fileName: 'src/utils/compressedMedia/useCompressed.tsx',
        service: 'compressVideo',
        error,
      });
      return '';
    }
  };

  const compressImage = async (uri: string): Promise<string> => {
    const imageCompressed = await Image.compress(uri, {
      compressionMethod: 'auto',
    });
    return imageCompressed;
  };

  const getVideoData = async (uri: string): Promise<any> => {
    try {
      const data = await getVideoMetaData(uri);
      return data;
    } catch (error) {
      return error;
    }
  };

  return {
    compressImage,
    compressVideo,
    getVideoData,
    progressCrompressing,
  };
};

export default useCompressed;
