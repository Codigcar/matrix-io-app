import { Image, ImageProps } from 'react-native';
import {
  layout, createRestyleComponent, spacing, spacingShorthand, BoxProps,
} from '@shopify/restyle';
import { Theme } from '../../theme/themes';

const ImageBox = createRestyleComponent<
  BoxProps<Theme> &
  ImageProps,
  Theme
>(
  [
    layout,
    spacing,
    spacingShorthand,
  ],
  Image,
);

export { ImageBox };
export default ImageBox;
