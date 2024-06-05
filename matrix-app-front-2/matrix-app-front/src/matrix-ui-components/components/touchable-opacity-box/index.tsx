import {
  TouchableOpacity, TouchableOpacityProps,
} from 'react-native';
import {
  layout,
  createRestyleComponent,
  border,
  spacing,
  spacingShorthand,
  BoxProps,
  backgroundColorShorthand,
  backgroundColor,
  BorderProps,
} from '@shopify/restyle';
import { Theme } from '../../theme/themes';

const TouchableOpacityBox = createRestyleComponent<
  BorderProps<Theme> &
  BoxProps<Theme> &
  TouchableOpacityProps,
  Theme
>(
  [
    border,
    layout,
    spacing,
    spacingShorthand,
    backgroundColorShorthand,
    backgroundColor,
  ],
  TouchableOpacity,
);

export { TouchableOpacityBox };
export default TouchableOpacityBox;
