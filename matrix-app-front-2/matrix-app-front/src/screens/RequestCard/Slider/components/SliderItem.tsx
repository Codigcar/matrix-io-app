import React from 'react';
import { Box, Text } from 'matrix-ui-components';

type SliderItemProps = {
  item: {
    id: string;
    text: string;
    type: string;
    title?: string;
    iconName?: string;
    image?: React.ReactNode;
  };
};

const SliderItem = ({ item }: SliderItemProps) => {
  const { text, image, title } = item;

  return (
    <Box
      alignItems="center"
      justifyContent="center"
      flex={1}
    >
      <Box mt="spacing-l" mb="spacing-m">
        {image}
      </Box>
      <Text marginHorizontal="spacing-s" textAlign="center" variant="Heading24Medium">{title}</Text>
      <Text marginHorizontal="spacing-l" marginVertical="spacing-m" textAlign="center" variant="body14pxRegular">{text}</Text>
    </Box>
  );
};

export default SliderItem;
