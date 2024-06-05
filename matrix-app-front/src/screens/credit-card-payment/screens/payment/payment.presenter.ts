import {
  useEffect, useMemo, useRef, useState,
} from 'react';
import { TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import {
  NavigationProp, RouteProp, useNavigation, useRoute,
} from '@react-navigation/native';
import { i18n } from 'src/utils/core/MTXStrings';
import { currentDate } from 'src/utils/date-time/date-time';
import { PAYMENT_MIN_AMOUNT } from 'src/utils/constants';
import { CardPaymentRoutesEnum } from 'src/shared/enums/routes/card-payment-routes.enum';
import {
  accountOrderSelector,
  usePaymentMethodSelectors,
  useUserSelectors,
} from 'src/core/libraries-implementation/state-manager/selectors';
import { CardType } from '../../shared/types';
import { useMethodPayments } from '../../shared/hooks';

export const TOTAL = 'total';
export const MIN = 'min';
export const OTHER = 'other';

export const useCardPaymentPresenter = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { params } = useRoute<RouteProp<any>>();
  const {
    isLoading,
    cardsPaymentMethods,
    isLoadingDelete,
    isFinishDeleteSuccess,
  } = usePaymentMethodSelectors();
  const { accountId } = useUserSelectors();
  const { pendingPaymentOrder, inProgressPaymentOrder } = useSelector(accountOrderSelector);

  const { deletePaymentMethod, getPaymentMethods } = useMethodPayments();

  const inputRef = useRef<TextInput>(null);
  const [paymentSelect, setPaymentSelect] = useState<string | null>(null);
  const [autoFocus, setAutoFocus] = useState(false);
  const [inputErrorMsg, setInputErrorMsg] = useState<string | null>(null);
  const [otherMountValue, setOtherMountValue] = useState<string | number>('0.00');
  const [paymentSubmitValue, setPaymentSubmitValue] = useState<string | number>(0);
  const [wasSendRequestToPay, setWasSendRequestToPay] = useState<boolean>(false);
  const [cardSelected, setCardSelected] = useState<CardType | null>(
    Array.isArray(cardsPaymentMethods) && cardsPaymentMethods.length > 0
      ? cardsPaymentMethods[0]
      : null,
  );
  const [showModalCurrency, setShowModalCurrency] = useState<boolean>(false);

  const handleToPay = () => {
    setWasSendRequestToPay(true);
    navigation.navigate(CardPaymentRoutesEnum.PAYMENT_LOADING, {
      cardInfo: cardSelected,
      sendPayload: {
        method: cardSelected?.cardId,
        amount: +paymentSubmitValue,
        currency: 'PEN',
        account: accountId,
      },
    });
  };

  const handleChange = (inputValue: string) => {
    if (inputErrorMsg) setInputErrorMsg(null);
    setOtherMountValue(inputValue);
    setPaymentSubmitValue(inputValue);
    if (+inputValue < PAYMENT_MIN_AMOUNT) {
      setInputErrorMsg(i18n.t('cardPayment.remember-minimum-amount-pay'));
    }
    return inputValue;
  };

  const selectMountPayment = (paymentTypeSelected: string, paymentTypeValue: string | number) => {
    if (inputErrorMsg) setInputErrorMsg(null);

    const checkSelectionUnderOneSolWithError = +paymentTypeValue < PAYMENT_MIN_AMOUNT
      && (paymentTypeSelected === TOTAL || paymentTypeSelected === MIN);

    const selectSection = paymentTypeSelected !== paymentSelect;
    const deselectSection = paymentTypeSelected === TOTAL
      || paymentTypeSelected === MIN
      || paymentTypeSelected === OTHER;

    if (checkSelectionUnderOneSolWithError) {
      setInputErrorMsg(i18n.t('cardPayment.guide-error-amount-pay'));
    }
    if (selectSection) {
      setPaymentSelect(paymentTypeSelected);
      setPaymentSubmitValue(paymentTypeValue);
      setOtherMountValue('0.00');
    } else if (deselectSection) {
      setPaymentSelect(null);
      setPaymentSubmitValue(0);
    } else {
      setPaymentSelect(paymentTypeSelected);
      setPaymentSubmitValue(paymentTypeValue);
    }
  };

  const isDisabledBtnSubmit = () => {
    const hasInputsInvalid = !paymentSelect
      || !!inputErrorMsg
      || !cardSelected?.cardId
      || +paymentSubmitValue < 1;

    return hasInputsInvalid || wasSendRequestToPay;
  };

  const isBillingCycleStarted = currentDate().isSameOrBefore(inProgressPaymentOrder?.endDate, 'dates')
    && currentDate().isSameOrAfter(inProgressPaymentOrder?.startDate, 'dates');

  const billingCycleToPay = !isBillingCycleStarted ? inProgressPaymentOrder : pendingPaymentOrder;

  const pendingAmount = billingCycleToPay?.pending?.amount ?? 0;
  const minimumAmount = billingCycleToPay?.minimum?.amount ?? 0;

  useEffect(() => {
    let TimeChip: NodeJS.Timeout;

    if (params?.isNewCardAdded) {
      TimeChip = setTimeout(() => {
        setShowModalCurrency(true);
      }, 1500);
    }
    return () => {
      clearTimeout(TimeChip);
    };
  }, [params]);

  useMemo(async () => {
    await getPaymentMethods();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    accountId,
    isFinishDeleteSuccess,
    isLoadingDelete,
    isLoading,
    cardsPaymentMethods,
    cardSelected,
    setCardSelected,
    pendingAmount,
    minimumAmount,
    paymentSelect,
    selectMountPayment,
    autoFocus,
    setAutoFocus,
    inputRef,
    inputErrorMsg,
    otherMountValue,
    isDisabledBtnSubmit,
    handleToPay,
    showModalCurrency,
    setShowModalCurrency,
    handleChange,
    deletePaymentMethod,
  };
};
