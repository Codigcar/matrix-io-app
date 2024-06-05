import React from 'react';
import { i18n } from 'src/utils/core/MTXStrings';
import { Text, fonts, Box } from 'matrix-ui-components';

const TyCNFC = () => (
  <Box
    backgroundColor="white"
    borderWidth={1}
    borderRadius={16}
    borderColor="gray100"
    p="spacing-m"
    pb="spacing-m"
    shadowColor="primaryMedium"
    shadowOffset={{
      width: 0,
      height: 5,
    }}
    shadowOpacity={0.25}
    shadowRadius={5}
    elevation={5}
  >
    <Text
      textAlign="left"
      variant="body"
      fontFamily={fonts.euclidCircularSemibold}
      fontSize={16}
      lineHeight={16}
    >
      {i18n.t('wallet-flow.pay-with_nfc_tyc_title')}
    </Text>
    <Text
      textAlign="left"
      variant="body"
      mt="spacing-m"
      fontFamily={fonts.euclidCircularLight}
      fontSize={12}
      lineHeight={16}
    >
      {i18n.t('wallet-flow.pay-with_nfc_tyc')}
    </Text>
  </Box>
);

export default TyCNFC;
