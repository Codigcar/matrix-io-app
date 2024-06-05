import React from 'react';
import { Box, Text } from 'matrix-ui-components';
import { android } from 'src/utils/constants';

export type SliderItemProps = {
  text: string;
  title?: string;
  image?: React.ReactNode;
};

const SliderItem: React.FC<SliderItemProps> = ({
  text,
  image,
  title,
}) => (
  <Box alignItems="center" justifyContent="center" flex={1}>
    <Box mt="spacing-xxl" mb="spacing-m">
      {image}
    </Box>
    <Text
      textAlign="center"
      mx="spacing-mml"
      mt="spacing-m"
      mb="spacing-m"
      variant="Heading32Medium"
    >
      {title}
    </Text>
    <Text textAlign="center" mx={android ? 'spacing-xl' : 'spacing-mml'} variant="SubTitle16">
      {text}
    </Text>
  </Box>
);

SliderItem.defaultProps = {
  title: undefined,
  image: undefined,
};

export default SliderItem;
