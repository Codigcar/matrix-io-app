import React, { useEffect, useRef, useState } from 'react';
import { Animated, TextInput } from 'react-native';
import {
  Box, Container,
  Text, Button, TouchableOpacityBox,
} from 'matrix-ui-components';
import { useSelector } from 'react-redux';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { i18n } from 'src/utils/core/MTXStrings';
import { currentDate } from 'src/utils/date-time/date-time';
import { PAYMENT_MIN_AMOUNT } from 'src/utils/constants';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import { InfoCircleIcon } from 'assets/svgs';
import SelectMountPayment from './components/SelectMountPayment';
import CardsList from './components/CardsList';
import useListMethodPayments from './hooks/useListMethodPayments';
import { accountIDSelector } from './selectors/paymentSelector';
import { CardProps } from './types/types';
import { accountOrderSelector } from '../AccountStatus/selectors/accountStatusSelectors';
import useKeyboardPosition from './hooks/useKeyboard';
import { ModalSameCurrency } from './components';

const TOTAL = 'total';
const MIN = 'min';
const OTHER = 'other';

const CardPayment: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { params } = useRoute<RouteProp<any>>();

  const { loading, cardsData } = useListMethodPayments();
  const { pendingPaymentOrder, inProgressPaymentOrder } = useSelector(accountOrderSelector);
  const isOpenKeyboard = useKeyboardPosition();

  const accountId = useSelector(accountIDSelector);
  const [paymentSelect, setPaymentSelect] = useState<string | null>(null);
  const [autoFocus, setAutoFocus] = useState(false);
  const [inputErrorMsg, setInputErrorMsg] = useState<string | null>(null);
  const [otherMountValue, setOtherMountValue] = useState<string | number>('0.00');
  const [paymentSubmitValue, setPaymentSubmitValue] = useState<string | number>(0);
  const [cardSelected, setCardSelected] = useState<CardProps | null>(cardsData[0]);
  const [wasSendRequestToPay, setWasSendRequestToPay] = useState<boolean>(false);
  const [showModalCurrency, setShowModalCurrency] = useState<boolean>(false);

  const inputRef = useRef<TextInput>(null);

  const handleToPay = () => {
    setWasSendRequestToPay(true);
    navigation.navigate(navigationScreenNames.paymentLoading, {
      cardInfo: cardSelected,
      sendPayload: {
        method: cardSelected?.cardId,
        amount: +paymentSubmitValue,
        currency: 'PEN',
        account: accountId,
      },
    });
    setTimeout(() => {
      setWasSendRequestToPay(false);
    }, 500);
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
    || paymentTypeSelected === MIN || paymentTypeSelected === OTHER;

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
    const hasInputsInvalid = !paymentSelect || !!inputErrorMsg
    || !cardSelected?.cardId || +paymentSubmitValue < 1;
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

  return (
    <BackgroundWrapper>
      <Container
        imageBackground="none"
        hasGradient={false}
        isHeaderVisible
        goBackNavigate={navigation.goBack}
        headerTitle={i18n.t('cardPayment.title')}
        isScrollable
        keyboardShouldPersistTaps="handled"
      >
        <Box testID="cardPaymentContainer" flex={1} pt="spacing-m">
          <Animated.View style={{ marginTop: isOpenKeyboard }} />
          <CardsList
            testID="cardContainerNavigate"
            loading={loading}
            cards={cardsData}
            cardSelected={cardSelected!}
            onSelect={(card: CardProps | null) => setCardSelected(card)}
            navigate={() => navigation.navigate(navigationScreenNames.addDebitCardCulqi)}
          />

          <Box testID="card0" flex={1} justifyContent="space-between" mx="spacing-m">
            <Box>
              <Box alignItems="center" flexDirection="row">
                <Box mt="spacing-s" flex={1} flexDirection="row" justifyContent="flex-start">
                  <Text variant="Subtitle18Medium" mb="spacing-s">
                    {i18n.t('cardPayment.select-payment-method')}
                  </Text>
                </Box>
                <Box flexDirection="row" justifyContent="flex-end">
                  <TouchableOpacityBox testID="infoIconTestID" onPress={() => setShowModalCurrency(true)}>
                    <InfoCircleIcon />
                  </TouchableOpacityBox>
                </Box>
              </Box>
              <SelectMountPayment
                title={i18n.t('cardPayment.total-payment-month')}
                mountMoney={pendingAmount}
                onPress={() => selectMountPayment(TOTAL, pendingAmount)}
                isSelected={paymentSelect === TOTAL}
                moneySymbol="S/"
                disabled={+pendingAmount === 0}
                testID="pendingAmountPayment"
              />
              <Box mt="spacing-s" />
              <SelectMountPayment
                title={i18n.t('cardPayment.min-payment')}
                mountMoney={minimumAmount}
                onPress={() => selectMountPayment(MIN, minimumAmount)}
                isSelected={paymentSelect === MIN}
                moneySymbol="S/"
                disabled={+minimumAmount === 0}
                testID="minimumAmountPayment"
              />
              <Box mt="spacing-s" />
              <SelectMountPayment
                title={i18n.t('cardPayment.other-amount')}
                mountMoney={minimumAmount}
                onPress={() => {
                  setAutoFocus(true);
                  selectMountPayment(OTHER, '0.00');
                  inputRef.current?.focus();
                }}
                isSelected={paymentSelect === OTHER}
                grayText
                warningText={inputErrorMsg}
                autoFocus={autoFocus}
                inputRef={inputRef}
                moneySymbol="S/"
                inputValue={otherMountValue}
                onChange={(e) => handleChange(e.toString())}
              />
            </Box>
            <Box my="spacing-m">
              <Button
                variant={isDisabledBtnSubmit() ? 'disabled' : 'primary'}
                label={i18n.t('cardPayment.make-payment')}
                onPress={handleToPay}
                disabled={isDisabledBtnSubmit()}
                testID="continuePaymentButton"
              />
            </Box>
          </Box>
        </Box>
      </Container>
      <ModalSameCurrency
        isVisible={showModalCurrency}
        onClose={() => setShowModalCurrency(false)}
      />
    </BackgroundWrapper>
  );
};
export default CardPayment;
