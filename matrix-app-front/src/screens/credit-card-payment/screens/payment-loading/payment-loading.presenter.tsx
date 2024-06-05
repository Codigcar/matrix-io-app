import React, { useCallback, useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import { useInterval } from 'usehooks-ts';
import LottieView from 'lottie-react-native';
import { logCrashlytics } from 'src/utils/Analytics';
import { i18n } from 'src/utils/core/MTXStrings';
import { formatDate } from 'src/utils/date-time/date-time';
import Helpers from 'src/utils/Helpers';
import { ApplyingPayment, CompletingPayment, ValidatingPayment } from 'assets/lottie';
import { NavigationPropsType } from 'src/types/types';
import { PAYMENT_STATUS_POLLING } from 'src/utils/constants';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { IPaymentStatus } from 'src/core/modules/credit-card/payment/dtos';
import { useUserSelectors } from 'src/core/libraries-implementation/state-manager/selectors';
import { CardPaymentProps } from '../../shared/types';
import { usePaymentLoadingInteractor } from './payment-loading.interactor';
import { useErrorsValidation } from '../../shared/hooks';

const backAction = () => true;
const RGX_REPLACE_CARDNUMBER = /[*]{4}\s[0-9]{4}/;

const screensStatus = [
  {
    id: 3,
    title: i18n.t('paymentLoading.completing.title'),
    description: i18n.t('paymentLoading.completing.description'),
    image: CompletingPayment,
    minValue: 66,
  },
  {
    id: 2,
    title: i18n.t('paymentLoading.applying.title'),
    description: i18n.t('paymentLoading.applying.description'),
    image: ApplyingPayment,
    minValue: 33,
  },
  {
    id: 1,
    title: i18n.t('paymentLoading.validating.title'),
    description: i18n.t('paymentLoading.validating.description'),
    image: ValidatingPayment,
    minValue: 0,
  },
];

const getScreenStatus = (progress: number) =>
  screensStatus.find((screen) => progress >= screen.minValue) || screensStatus[2];

export const usePaymentLoading = (props: CardPaymentProps & NavigationPropsType) => {
  const { navigation, ...values } = props;

  const { email } = useUserSelectors();
  const [progress, setProgress] = useState(0);
  const [screenContent, setScreenContent] = useState(screensStatus[0]);
  const { handleError } = useErrorsValidation(navigation.navigate);
  const { executePaymentCreditCard, executeGetPaymentStatus } = usePaymentLoadingInteractor();

  useEffect(() => {
    const newContent = getScreenStatus(progress);
    if (screenContent.id !== newContent.id) {
      setScreenContent(newContent);
    }
  }, [progress]);

  const StatusImage = useCallback(
    () => <LottieView source={screenContent.image} autoPlay loop />,
    [screenContent],
  );

  useInterval(
    () =>
      setProgress((old) => {
        const newValue = old + Math.round(Math.random() * 20);
        return newValue <= 99 ? newValue : 99;
      }),
    progress <= 99 ? 600 : null,
  );

  const navigate = (screen: string, params?: object) => {
    setProgress(100);
    setTimeout(() => navigation.navigate(screen, params), 1000);
  };

  const pollStatus = async (methodId: string): Promise<IPaymentStatus> => {
    const cardStatus = await executeGetPaymentStatus(methodId);
    if (
      cardStatus?.status === PAYMENT_STATUS_POLLING.approved
      || cardStatus?.status === PAYMENT_STATUS_POLLING.failed
      || cardStatus?.status === PAYMENT_STATUS_POLLING.declined
    ) {
      return cardStatus;
    }
    return new Promise((resolve) => {
      setTimeout(() => resolve(pollStatus(methodId)), 600);
    });
  };

  const onSubmit = async () => {
    try {
      const cardInitialPayment = await executePaymentCreditCard(values.route.params.sendPayload);

      const pollingStatusHandler = await pollStatus(cardInitialPayment.id);
      const { status: STATUS, error: ERROR } = pollingStatusHandler;

      if (STATUS === PAYMENT_STATUS_POLLING.approved) {
        navigate(navigationScreenNames.paymentSuccess, {
          date: formatDate(cardInitialPayment.createAt, 'dddd[,] DD [de] MMMM [del] YYYY'),
          hour: formatDate(cardInitialPayment.createAt, 'hh:mm a'),
          amountMoney: Helpers.formatMoney(cardInitialPayment.amount, 'S/'),
          accountNumber:
            values.route.params.cardInfo.cardNumber.match(RGX_REPLACE_CARDNUMBER)?.[0] ?? '',
          operationCode: cardInitialPayment.id,
          email,
        });
        return;
      }

      let code = 'payment_general_error';

      if (STATUS === PAYMENT_STATUS_POLLING.failed) {
        code = 'payment_failed';
      }

      if (STATUS === PAYMENT_STATUS_POLLING.declined && ERROR && ERROR.code) {
        code = ERROR.code;
      }

      handleError({ code, type: 'PAGOS' });
    } catch (err) {
      logCrashlytics({
        scope: 'API',
        fileName: 'CardPayment/hooks/useCardPayment.tsx',
        service: 'GetPaymentMethod.cardPayment',
        error: err,
      });
      handleError({ code: 'payment_general_error', type: 'PAGOS' });
    }
  };

  useEffect(() => {
    onSubmit();
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

  return {
    progress,
    screenContent,
    StatusImage,
  };
};
