import { SafeAreaView, ViewProps } from 'react-native';
import {
  layout, createRestyleComponent, spacing, spacingShorthand, BoxProps,
} from '@shopify/restyle';
import { Theme } from '../../theme/themes';

const SafeAreaBox = createRestyleComponent<
    BoxProps<Theme> &
    ViewProps & {
      disabled?: boolean;
    },
  Theme
>(
  [
    layout,
    spacing,
    spacingShorthand,
  ],
  SafeAreaView,
);

export { SafeAreaBox };
export default SafeAreaBox;
