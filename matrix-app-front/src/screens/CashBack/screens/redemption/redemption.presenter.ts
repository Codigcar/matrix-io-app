import {
  NavigationProp, useNavigation,
} from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native';
import { setAmountEntered } from 'src/core/libraries-implementation/state-manager/states/credit-card/cashback/redemption.state';
import { RedemptionRoutesEnum } from 'src/shared/enums/routes/redemption-routes-enum';
import { logCrashlytics } from 'src/utils/Analytics';
import Helpers from 'src/utils/Helpers';
import { i18n } from 'src/utils/core/MTXStrings';
import { useAppDispatch } from 'src/core/libraries-implementation/state-manager/dispatch';
import { useCashBackSelectors } from 'src/core/libraries-implementation/state-manager/selectors';
import RedemptionAnalytics from '../../analytics/redemption.analytics';

export const useRedemptionPresenter = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const {
    account,
    amountEntered,
    accumulatedCashback,
    minRedemptionPoints,
    pointsExchangeRate,
  } = useCashBackSelectors();
  const amountAvailable = accumulatedCashback;
  const minimumAmount = minRedemptionPoints * pointsExchangeRate;
  const inputRef = useRef<TextInput>(null);
  const [autoFocus, setAutoFocus] = useState(false);
  const [inputErrorMsg, setInputErrorMsg] = useState<string | null>(null);
  const [mountValue, setMountValue] = useState<string | number>('0.00');
  const [paymentSubmitValue, setPaymentSubmitValue] = useState<string | number>(0);
  const formatAmount = Helpers.formatCurrency(minimumAmount, { removeDecimalsWhenRounded: false });
  const [availableMountValue, setAvailableMountValue] = useState(amountAvailable);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const buttonEnableValidations = () => !!inputErrorMsg
  || (+paymentSubmitValue === 0) || isButtonEnabled;

  const handleChange = (inputValue: string) => {
    inputRef.current?.focus();
    setAutoFocus(true);
    if (inputErrorMsg) setInputErrorMsg(null);
    setMountValue(inputValue);
    setPaymentSubmitValue(inputValue);
    if (+inputValue < minimumAmount) {
      RedemptionAnalytics.onErrorMinimumAmmount();
      setInputErrorMsg(i18n.t('cashBack:redemption.pay-my-card.message-error-minimum amount') + formatAmount);
    } else if (+inputValue > amountAvailable) {
      RedemptionAnalytics.onErrorExceedsAmmount();
      setInputErrorMsg(i18n.t('cashBack:redemption.pay-my-card.message-error-amount-exceeds-available'));
    } else {
      setAvailableMountValue(amountAvailable);
      setPaymentSubmitValue(inputValue);
      dispatch(setAmountEntered(inputValue));
      setInputErrorMsg(null);
    }

    return inputValue;
  };

  const onPressContinue = async () => {
    try {
      RedemptionAnalytics.onPayIoCard();
      const params = { account, points: (amountEntered / pointsExchangeRate) };
      navigation.navigate(RedemptionRoutesEnum.REDEMPTION_LOADING, {
        send: params,
      });
      setIsButtonEnabled(true);
    } catch (err) {
      logCrashlytics({
        scope: 'API',
        fileName: 'CashBack/screens/redemption/redemption.presenter.ts',
        service: 'redemptionProcessing',
        error: err,
      });
      navigation.navigate(RedemptionRoutesEnum.REDEMPTION_ERROR, {
        type: 'warning',
        errorBlocked: false,
      });
    }
  };

  const onPressBackArrow = () => {
    RedemptionAnalytics.onGoBack();
    navigation.goBack();
  };

  return {
    minimumAmount,
    autoFocus,
    mountValue,
    inputRef,
    inputErrorMsg,
    handleChange,
    onPressContinue,
    onPressBackArrow,
    buttonEnableValidations,
    availableMountValue,
  };
};
