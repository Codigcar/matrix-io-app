import React from 'react';
import { Text, fonts, Box } from 'matrix-ui-components';
import AppleRectangle from 'assets/svgs/apple_black.svg';
import PayWallet from 'assets/svgs/pay_wallet.svg';
import { Platform } from 'react-native';
import { i18n } from 'src/utils/core/MTXStrings';

const CardState = () => (
  <Box
    backgroundColor="white"
    borderWidth={1}
    borderRadius={16}
    borderColor="gray100"
    paddingHorizontal="spacing-m"
    paddingVertical="spacing-xs"
    mt="spacing-s"
    shadowColor="primaryMedium"
    shadowOffset={{
      width: 0,
      height: 5,
    }}
    shadowOpacity={0.25}
    shadowRadius={5}
    elevation={5}
  >
    <Box my="spacing-xxs" flexDirection="row">
      {Platform.OS === 'android' ? (
        <PayWallet />
      ) : (
        <AppleRectangle />
      )}
      <Box flex={1}>
        <Text
          ml="spacing-xs"
          mr="spacing-s"
          variant="label"
          fontFamily={fonts.euclidCircularMedium}
          fontSize={16}
        >
          {i18n.t(Platform.OS === 'ios' ? 'apple-pay' : 'wallet-flow.pay-with-nfc')}
        </Text>
        <Box flexDirection="row" justifyContent="space-between">
          <Text
            ml="spacing-xs"
            variant="label"
            fontSize={14}
            fontFamily={fonts.euclidCircularRegular}
            color="success"
          >
            {i18n.t('wallet-flow.affiliate')}
          </Text>
          <Text
            textAlign="right"
            ml="spacing-xs"
            variant="label"
            fontSize={14}
            fontFamily={fonts.euclidCircularRegular}
            color="gray400"
          >
            {i18n.t('wallet-flow.card-io').concat('***2354')}
          </Text>
        </Box>
      </Box>
    </Box>
  </Box>
);

export default CardState;
