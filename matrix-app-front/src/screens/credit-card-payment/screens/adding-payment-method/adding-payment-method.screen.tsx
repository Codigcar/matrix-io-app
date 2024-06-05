import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import LottieView from 'lottie-react-native';
import { Box, Text } from 'matrix-ui-components';
import { NavigationPropsType } from 'src/types/types';
import { ValidatingPayment } from 'assets/lottie';
import { i18n } from 'src/utils/core/MTXStrings';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import { useAddingPaymentMethodPresenter } from './adding-payment-method.presenter';

export const AddingPaymentMethod: React.FC<NavigationPropsType> = () => {
  useAddingPaymentMethodPresenter();

  return (
    <BackgroundWrapper>
      <Box testID="adding-payment-method" flex={1} justifyContent="center" alignItems="center">
        <Box width={RFValue(120)} height={RFValue(160)} mb="spacing-xxxm">
          <LottieView source={ValidatingPayment} autoPlay loop />
        </Box>
        <Text variant="Heading20Medium" mb="spacing-m" textAlign="center">
          {i18n.t('paymentMethod.adding-payment-method.title')}
        </Text>
        <Text variant="SubTitle16" textAlign="center">
          {i18n.t('paymentMethod.adding-payment-method.subtitle')}
        </Text>
      </Box>
    </BackgroundWrapper>
  );
};
