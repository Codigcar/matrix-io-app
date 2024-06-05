import { Dimensions, PixelRatio } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const widthPercentageToDP = (widthPercent: number | string) => {
  const elemWidth = typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel(screenWidth * (elemWidth / 100));
};

const heightPercentageToDP = (heightPercent: number | string) => {
  const elemHeight = typeof heightPercent === 'number' ? heightPercent : parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel(screenHeight * (elemHeight / 100));
};

export const wp = widthPercentageToDP;
export const hp = heightPercentageToDP;

const { width, height } = Dimensions.get('window');
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];

// Default guideline sizes are based on figma
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const scale = (size:number) => (shortDimension / guidelineBaseWidth) * size;
export const verticalScale = (size:number) => (longDimension / guidelineBaseHeight) * size;
export const moderateScale = (size:number, factor = 0.5) => size + (scale(size) - size) * factor;
// eslint-disable-next-line max-len
export const moderateVerticalScale = (size:number, factor = 0.5) => size + (verticalScale(size) - size) * factor;
export const getFontSize = (size: number) => size / PixelRatio.getFontScale();

export const s = scale;
export const vs = verticalScale;
export const ms = moderateScale;
export const mvs = moderateVerticalScale;
export const f = getFontSize;

export default {
  wp: widthPercentageToDP,
  hp: heightPercentageToDP,
};
