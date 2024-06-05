import { NavigationPropsType } from 'src/types/types';
import { useState } from 'react';
// Selectors
import { logCrashlytics } from 'src/utils/Analytics';
import HomeServices from 'src/api/HomeServices';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import Helpers from 'src/utils/Helpers';
import { CommonActions } from '@react-navigation/native';
import { string } from '../../strings/string';

const useCancelAccountWaiting = (props: NavigationPropsType) => {
  const { navigation, route } = props;
  const {
    requestTime, maskedCard, requestDate, pendingCreditBalance,
  } = route.params;
  const [isLoading, setIsLoading] = useState(false);

  const goToGenericError = () =>
    navigation.navigate(navigationScreenNames.genericError, {
      nextScreen: navigationScreenNames.bottomTabNavigator,
      title: string.cancelAccountWaitingWaitingErrorTitle,
      subtitle: string.cancelAccountWaitingWaitingErrorSubtitle,
      text: string.cancelAccountWaitingWaitingErrorDescription,
      buttonLabel: string.cancelAccountWaitingWaitingErrorButtonLabel,
    });

  const onCancelAccount = async () => {
    let pendingPayment = '';
    let diff = 0;

    try {
      setIsLoading(true);
      const balanceResponse = await HomeServices.getBalance();
      diff = balanceResponse[0].available.amount - balanceResponse[0].creditLimit.amount;
      if (diff < 0) {
        pendingPayment = Helpers.formatCurrency(Math.abs(diff), {
          removeDecimalsWhenRounded: true,
        });
      }
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: navigationScreenNames.cancelAccountComplete,
              params: {
                requestTime,
                maskedCard,
                requestDate,
                pendingPayment,
                pendingCreditBalance,
              },
            },
          ],
        }),
      );
    } catch (error) {
      goToGenericError();
      logCrashlytics({
        scope: 'API',
        fileName: 'useCancelAccountSurvey.tsx',
        service: 'getBalanceRequest',
        error,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    onCancelAccount,
    isLoading,
  };
};

export default useCancelAccountWaiting;
