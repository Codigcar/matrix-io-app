import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, Theme } from 'matrix-ui-components';
import { ResponsiveValue } from '@shopify/restyle';
import { wp } from 'src/utils/sizes';

type HomeCardWrapperTypeProps = {
  children: React.ReactNode;
  onPress?: Function;
  width?: number;
  rightBorderRadiusHidden?: boolean;
  color?: ResponsiveValue<keyof Theme['colors'], Theme>;
  disabled?: boolean,
  testID?: string,
};

const HomeCardWrapper: React.FC<HomeCardWrapperTypeProps> = ({
  children,
  onPress,
  width,
  rightBorderRadiusHidden,
  color,
  disabled,
  testID,
}: HomeCardWrapperTypeProps) => (
  <Box
    backgroundColor={color || 'white'}
    borderRadius={20}
    padding="spacing-s"
    borderTopRightRadius={rightBorderRadiusHidden ? 0 : 20}
    borderBottomRightRadius={rightBorderRadiusHidden ? 0 : 20}
    width={width}
  >
    <TouchableOpacity testID={testID} disabled={disabled} onPress={onPress}>
      {children}
    </TouchableOpacity>
  </Box>
);

HomeCardWrapper.defaultProps = {
  width: wp(43),
  rightBorderRadiusHidden: false,
  color: undefined,
  disabled: false,
  onPress: () => {},
};

export default HomeCardWrapper;
