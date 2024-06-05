import React from 'react';
import { Box,Text } from 'matrix-ui-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { i18n } from 'src/utils/core/MTXStrings';
import {GooglePayBordered , ApplePayCard} from 'assets/svgs';
import { ios } from 'src/utils/constants';

type CardWalletPropsType = {
  cardStatus: string;
  paymentMaskedCard: string;
};

const InfoCardWallet: React.FC<CardWalletPropsType> = ({
  cardStatus,
  paymentMaskedCard
}) => {

  const renderIcon = () => {
    if (ios) {
      return <ApplePayCard />;
    }
    return <GooglePayBordered/>
  };

  return (
    <Box
        flexDirection="row"
        backgroundColor="primary100"
        borderRadius={RFValue(24)}
        padding="spacing-sm"
        mt={"spacing-s"}
        alignItems="center"
        testID='info-card-wallet'
      >
        <Box
          alignItems="center"
          justifyContent="center"
          width={48}
          height={48}
          borderRadius={12}
        >
          {renderIcon()}
        </Box>
        <Box
          flex={1}
          mx="spacing-s"
        >
          <Text
            numberOfLines={1}
            variant="body14Medium"
            color="primaryDark"
          >
            {ios ? i18n.t('wallet:wallet-flow.applePay.label') : i18n.t('wallet:wallet-flow.googlePay.label')}
          </Text>
          <Text
            numberOfLines={1}
            variant="body13Regular"
            color="complementaryMint700"
            testID='cardStatus'
          >
            {cardStatus}
          </Text>
        </Box>
        <Box paddingTop="spacing-s">
          <Text
            numberOfLines={1}
            variant="body13Regular"
            color={'primary500'}
            my="spacing-xxxs"
            testID='paymentMaskedCard'
          >
            {i18n.t('wallet:wallet-flow.card-io')}{paymentMaskedCard}
          </Text>
        </Box>
      </Box>
  )
}

export default InfoCardWallet;