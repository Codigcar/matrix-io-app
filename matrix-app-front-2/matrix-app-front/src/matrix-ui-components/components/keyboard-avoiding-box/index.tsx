/* eslint-disable react/jsx-props-no-spreading */
import { KeyboardAvoidingViewProps, KeyboardAvoidingView } from 'react-native';
import { layout, createRestyleComponent, spacing, spacingShorthand, BoxProps } from '@shopify/restyle';
import { Theme } from '../../theme/themes';

const KeyboardAvoidingBox = createRestyleComponent<
    BoxProps<Theme> &
    KeyboardAvoidingViewProps & {
      disabled?: boolean;
    },
  Theme
>(
  [
    layout,
    spacing,
    spacingShorthand,
  ],
  KeyboardAvoidingView,
);

export default KeyboardAvoidingBox;
