import { ImageCropData } from '@react-native-community/image-editor';
import { Platform } from 'react-native';

const FULLWIDTH_IMAGE = 375;
const FULLHEIGHT_IMAGE = 812;

type scaleCropParams = {
  originalWidth: number
  originalHeight: number
  width: number
  height: number
  posX: number
  posY: number
  isRev?: boolean
};

export const scaleCrop = ({
  originalWidth,
  originalHeight,
  width,
  height,
  posX,
  posY,
}: scaleCropParams) => {
  const isRev = originalHeight < originalWidth;
  const pWidth = isRev ? originalHeight : originalWidth;
  const pHeight = isRev ? originalWidth : originalHeight;
  const vscale = (pHeight / FULLHEIGHT_IMAGE);
  const scale = (pWidth / FULLWIDTH_IMAGE);
  const widthSize = scale * width;
  const heightSize = vscale * height;
  const x = scale * posX;
  const y = vscale * posY;

  const cropData: ImageCropData = Platform.OS === 'android' ? {
    offset: {
      x: isRev ? Math.round(y) : Math.round(x),
      y: isRev ? Math.round(x) : Math.round(y),
    },
    size: {
      width: isRev ? Math.round(heightSize) : Math.round(widthSize),
      height: isRev ? Math.round(widthSize) : Math.round(heightSize),
    },
  } : {
    offset: {
      x: Math.round(x),
      y: Math.round(y),
    },
    size: {
      width: Math.round(widthSize),
      height: Math.round(heightSize),
    },
  };
  return cropData;
};

export default {
  scaleCrop,
};
