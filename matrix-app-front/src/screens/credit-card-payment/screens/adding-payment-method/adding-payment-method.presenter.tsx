/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import {
  NavigationProp, ParamListBase, useNavigation, useRoute,
} from '@react-navigation/native';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { logCrashlytics } from 'src/utils/Analytics';
import { i18n } from 'src/utils/core/MTXStrings';
import { CardPaymentRoutesEnum } from 'src/shared/enums/routes/card-payment-routes.enum';
import { usePaymentMethodSelectors } from 'src/core/libraries-implementation/state-manager/selectors';
import { useErrorsValidation, useMethodPayments } from '../../shared/hooks';
import { IErrorBodyPostPaymentMethod } from '../../shared/types';

export const useAddingPaymentMethodPresenter = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const route: any = useRoute();
  const { handleError } = useErrorsValidation(navigation.navigate);
  const { setPaymentMethod } = useMethodPayments();
  const { paymentMethodError, isFinishSetSuccess } = usePaymentMethodSelectors();
  const { token } = route.params;

  const addPaymentMethod = async () => {
    await setPaymentMethod({ token: token.token });
  };

  useEffect(() => {
    if (isFinishSetSuccess) {
      navigation.navigate(navigationScreenNames.paymentError, {
        title: i18n.t('cardPayment.added-payment-method-success-title'),
        description: i18n.t('cardPayment.added-payment-method-success-description'),
        type: 'success',
        primaryAction: {
          label: i18n.t('understood'),
          nextScreen: CardPaymentRoutesEnum.CARD_PAYMENT,
          params: { isNewCardAdded: true },
        },
      });
    }
  }, [isFinishSetSuccess]);

  useEffect(() => {
    if (paymentMethodError) {
      logCrashlytics({
        scope: 'API',
        service: 'useMethodPayments.setPaymentMethod',
        fileName: 'adding-payment-method/adding-payment-method.tsx',
        error: paymentMethodError,
      });
      const error = paymentMethodError as IErrorBodyPostPaymentMethod;
      handleError({ code: error.code, type: 'METODOS_DE_PAGOS' });
    }
  }, [paymentMethodError]);

  useEffect(() => {
    addPaymentMethod();

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => backHandler.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
