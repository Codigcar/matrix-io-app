import React from 'react';
import { Text, Box } from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';

const Title = (): JSX.Element => {

  return (
    <Box position={'absolute'} top={60} width={'100%'}>
      <Text variant="Heading20Medium" textAlign="center" color={'white'}>
        {i18n.t(`chat:customer-care.tutorial-title`)}
      </Text>
    </Box>
  )

}

export default Title;


