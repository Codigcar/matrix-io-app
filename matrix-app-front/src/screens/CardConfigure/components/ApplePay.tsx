import React from 'react';
// Assets
import { i18n } from 'src/utils/core/MTXStrings';
// Components
import { Text, fonts, Box } from 'matrix-ui-components';
import AppleRectangle from 'assets/svgs/apple_black.svg';
import PayWallet from 'assets/svgs/pay_wallet.svg';
import { Platform, Pressable } from 'react-native';

interface IApplePayProps {
  onPress: () => void;
}

const ApplePay = ({ onPress }: IApplePayProps) => (
  <Pressable onPress={onPress}>
    <Box
      backgroundColor="white"
      borderWidth={1}
      borderRadius={16}
      borderColor="gray100"
      paddingHorizontal="spacing-m"
      pt="spacing-xs"
      pb="spacing-xs"
      shadowColor="primaryMedium"
      shadowOffset={{
        width: 0,
        height: 5,
      }}
      shadowOpacity={0.25}
      shadowRadius={5}
      elevation={5}
    >
      <Box my="spacing-xxs" flexDirection="row" justifyContent="flex-start" alignItems="center">
        {Platform.OS === 'android' ? (
          <PayWallet />
        ) : (
          <AppleRectangle />
        )}
        <Box justifyContent="center" alignItems="flex-start">
          <Text
            textAlign="left"
            ml="spacing-xxs"
            mr="spacing-s"
            paddingHorizontal="spacing-xxxs"
            mt="spacing-xxxxs"
            variant="label"
            fontFamily={fonts.euclidCircularMedium}
            fontSize={14}
            lineHeight={14}
            color="primaryDarkest"
          >
            {i18n.t(Platform.OS === 'ios' ? 'apple-pay' : 'wallet:wallet-flow.pay-with-nfc')}
          </Text>
          <Text
            textAlign="left"
            my="spacing-xxxs"
            ml="spacing-xxs"
            mr="spacing-s"
            paddingHorizontal="spacing-xxxs"
            variant="label"
            fontSize={12}
            lineHeight={12}
            fontFamily={fonts.euclidCircularRegular}
            color="primaryDark"
          >
            {i18n.t('configure-card-2-detail-1')}
          </Text>
        </Box>
      </Box>
    </Box>
  </Pressable>
);

export default ApplePay;
