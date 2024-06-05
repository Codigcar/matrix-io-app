import { ScrollView, ScrollViewProps } from 'react-native';
import {
  layout, createRestyleComponent, spacing, spacingShorthand, BoxProps,
} from '@shopify/restyle';
import { Theme } from '../../theme/themes';

const ScrollBox = createRestyleComponent<
  BoxProps<Theme> &
  ScrollViewProps,
  Theme
>(
  [
    layout,
    spacing,
    spacingShorthand,
  ],
  ScrollView,
);

export { ScrollBox };
export default ScrollBox;
