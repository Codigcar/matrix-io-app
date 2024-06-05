import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useDispatch } from 'react-redux';
import { RFValue } from 'react-native-responsive-fontsize';
import LottieView from 'lottie-react-native';

import { Box, Text } from 'matrix-ui-components';
import { NavigationPropsType } from 'src/types/types';
import { logCrashlytics } from 'src/utils/Analytics';
import { ValidatingPayment } from 'assets/lottie';
import { i18n } from 'src/utils/core/MTXStrings';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import PaymentMethod from './services/getPaymentMethodStatus';
import { addNewPaymentMethod, addNewPaymentMethodErr } from './states/paymentState';
import useErrorsValidation from './hooks/useErrorsValidation';
import { IErrorPostPaymentMethod } from './types/types';

const AddingPaymentMethod: React.FC<NavigationPropsType> = ({
  navigation: { navigate },
  route,
}) => {
  const dispatch = useDispatch();
  const { handleError } = useErrorsValidation(navigate);
  const { token } = route.params;

  const addPaymentMethod = async () => {
    try {
      const cardAdded = await PaymentMethod.postPaymentMethod(token.token);
      dispatch(addNewPaymentMethod(cardAdded));
      navigate(navigationScreenNames.paymentError, {
        title: i18n.t('cardPayment.added-payment-method-success-title'),
        description: i18n.t('cardPayment.added-payment-method-success-description'),
        type: 'success',
        primaryAction: {
          label: i18n.t('understood'),
          nextScreen: navigationScreenNames.cardPayment,
          params: { isNewCardAdded: true },
        },
      });
    } catch (err: any) {
      const errorCatch = err as IErrorPostPaymentMethod;
      logCrashlytics({
        scope: 'API',
        service: 'PaymentMethod.postPaymentMethod',
        fileName: 'CardPayment/AddingPaymentMethod.tsx',
        error: err,
      });
      dispatch(addNewPaymentMethodErr(errorCatch));
      handleError({ code: errorCatch.error.code, type: 'METODOS_DE_PAGOS' });
    }
  };

  useEffect(() => {
    addPaymentMethod();

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => backHandler.remove();
  }, []);

  return (
    <BackgroundWrapper>
      <Box flex={1} justifyContent="center" alignItems="center">
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

export default AddingPaymentMethod;
