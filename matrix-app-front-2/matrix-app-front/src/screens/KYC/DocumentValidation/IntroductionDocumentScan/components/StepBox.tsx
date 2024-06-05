import React from 'react';
import { StepBoxTypeProps } from 'src/types/types';
import { Box, Text, fonts, Chip } from 'matrix-ui-components';

const StepBox = ({ chipText, descFirstText, boldText, descSecondText, icon }: StepBoxTypeProps) => {
  const Icon = icon;
  return (
    <Box flexDirection={'row'} alignItems="center">
      <Box mr={'spacing-s'}>
        <Icon />
      </Box>
      <Box flexShrink={1}>
        <Box alignSelf={'flex-start'}>
          <Chip label={chipText} />
        </Box>
        <Text marginTop={'spacing-xxs'} variant="body" color="black">
          {descFirstText}
          <Text variant="body" fontFamily={fonts.euclidCircularBold}>
            {boldText}
          </Text>
          {descSecondText}
        </Text>
      </Box>
    </Box>
  );
};

export default StepBox;
