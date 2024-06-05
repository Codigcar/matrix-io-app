import React from 'react';
import { Box, Text } from 'matrix-ui-components';
import { SliderItemProps } from '../../shared/types/components';

const SliderItem: React.FC<SliderItemProps> = (props) => {
  const { item } = props;
  const { text, image, title } = item;

  return (
    <Box alignItems="center" justifyContent="center" flex={1}>
      <Box mt="spacing-l" mb="spacing-m">
        {image}
      </Box>
      <Text marginHorizontal="spacing-s" textAlign="center" variant="Heading24Medium">
        {title}
      </Text>
      <Text
        marginHorizontal="spacing-l"
        marginVertical="spacing-m"
        textAlign="center"
        variant="body14pxRegular"
      >
        {text}
      </Text>
    </Box>
  );
};

export default SliderItem;
