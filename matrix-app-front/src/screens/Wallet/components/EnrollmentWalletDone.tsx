import React from 'react'
import { ios } from 'src/utils/constants';
import { ThemeProvider } from '@shopify/restyle';
import { Container, Box, Button,Text, rebrandingTheme } from 'matrix-ui-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { BackgroundIconScreen , GPay, ApplePay } from 'assets/svgs';
import { i18n } from 'src/utils/core/MTXStrings';
import { s } from 'src/utils/sizes';
import InfoCardWallet from './InfoCardWallet';
import { NavigationPropsType } from 'src/types/types';

const EnrollmentWalletDone = (props:NavigationPropsType) => {

  const { navigation } = props;
  const paymentCardDummy = '*** 2354';

  const onPressBackArrow = () => {
    navigation.navigate('Home');
  };

  return (
    <ThemeProvider theme={rebrandingTheme}>
      <Container
        background={BackgroundIconScreen}
        isHeaderVisible
        goBackNavigate={onPressBackArrow}
        headerTitle={i18n.t('wallet:wallet-flow.google-pay')}
      >
        <Box flex={1} px="spacing-m" pt="spacing-s">

          <Box alignSelf="center" mb="spacing-m" mt="spacing-m" pt="spacing-l">
            {ios ? <ApplePay/> : <GPay  width={s(200)} height={s(100)} />}
          </Box>

          <Box alignSelf="center" mt="spacing-s">
            <Text variant="Heading24Medium">
              {i18n.t('wallet:wallet-flow.googlePay.affiliate.congratulations')}
            </Text>
          </Box>

          <Box maxWidth={s(260)} alignSelf="center" mb="spacing-xs">
            <Text mt="spacing-xs" textAlign="center" variant="body14Regular">
              {i18n.t('wallet:wallet-flow.your-card')}
              <Text mt="spacing-xs" textAlign="center" variant="body14SemiBold">
                {i18n.t('wallet:wallet-flow.io')}
                <Text mt="spacing-xs" textAlign="center" variant="body14Regular">
                  {ios ? i18n.t('wallet:wallet-flow.applePay.affiliate.added') :i18n.t('wallet:wallet-flow.googlePay.affiliate.added')}
                </Text>
              </Text>
            </Text>
          </Box>

          <InfoCardWallet
            testID='info-card-wallet'
            cardStatus={i18n.t('wallet:wallet-flow.googlePay.affiliate.active')}
            paymentMaskedCard={paymentCardDummy}
          />

          <Box
            backgroundColor="complementaryIndigo050"
            borderRadius={RFValue(16)}
            padding="spacing-sm"
            py="spacing-s"
            mt="spacing-s"
          >
            <Text
              textAlign="left"
              my="spacing-none"
              variant="body13Regular"
            >
              {ios ? i18n.t('wallet:wallet-flow.applePay.affiliate.delete') : i18n.t('wallet:wallet-flow.googlePay.affiliate.delete')}
              <Text
                  mb="spacing-s"
                  variant="body13Regular"
                  mx="spacing-ml"
                  color={'FeedbackInformative600'}
              >
                  {ios ? i18n.t('wallet:wallet-flow.applePay.wallet-app'):  i18n.t('wallet:wallet-flow.googlePay.wallet-app')}
              </Text>
            </Text>
          </Box>

          <Box position="absolute" width="100%" bottom={RFValue(20)} alignSelf="center">
            <Button
              variant="primary"
              mt="spacing-s"
              mb="spacing-s"
              onPress={() => onPressBackArrow()}
              label={i18n.t('wallet:wallet-flow.end')}
            />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default EnrollmentWalletDone;