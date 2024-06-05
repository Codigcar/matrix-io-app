import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box, Button, Text, Container, rebrandingTheme,
} from 'matrix-ui-components';
import { NavigationPropsType } from 'src/types/types';
import { i18n } from 'src/utils/core/MTXStrings';
import { ThemeProvider } from '@shopify/restyle';
import { BackgroundIconScreen } from 'assets/svgs';
import Helpers from 'src/utils/Helpers';
import { CurrencyInput } from 'src/components/CurrencyInput/CurrencyInput';
import { setAmountEntered } from 'src/screens/CashBack/states/redemptionState';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import useRedemption from '../hooks/useRedemption';

const Redemption = (props: NavigationPropsType) => {
  const { navigation, route } = props;
  const dispatch = useDispatch();
  const {
    onPressBackArrow, onPressContinue, isButtonEnabled, inputRef,
  } = useRedemption(props);
  const amountAvailable = useSelector((state) => state.redemption.accumulatedCashback);
  const minimumAmount = useSelector((state) =>
    (state.redemption.rules.minRedemptionPoints * state.redemption.rules.pointsExchangeRate));
  const [autoFocus, setAutoFocus] = useState(false);
  const [inputErrorMsg, setInputErrorMsg] = useState<string | null>(null);
  const [mountValue, setMountValue] = useState<string | number>('0.00');
  const [paymentSubmitValue, setPaymentSubmitValue] = useState<string | number>(0);
  const formatAmount = Helpers.formatCurrency(minimumAmount, { removeDecimalsWhenRounded: false });
  const [availableMountValue, setAvailableMountValue] = useState(amountAvailable);

  const handleChange = (inputValue: string) => {
    inputRef.current?.focus();
    setAutoFocus(true);
    if (inputErrorMsg) setInputErrorMsg(null);
    setMountValue(inputValue);
    setPaymentSubmitValue(inputValue);
    if (+inputValue < minimumAmount) {
      setInputErrorMsg(i18n.t('cashBack:redemption.pay-my-card.message-error-minimum amount') + formatAmount);
    } else if (+inputValue > amountAvailable) {
      setInputErrorMsg(i18n.t('cashBack:redemption.pay-my-card.message-error-amount-exceeds-available'));
    } else {
      setAvailableMountValue(amountAvailable);
      setPaymentSubmitValue(inputValue);
      dispatch(setAmountEntered(inputValue));
      setInputErrorMsg(null);
    }

    return inputValue;
  };

  const buttonEnableValidations = () => !!inputErrorMsg
  || (+paymentSubmitValue === 0) || isButtonEnabled;

  return (
    <ThemeProvider theme={rebrandingTheme}>
      <BackgroundWrapper>
        <Container
          background={BackgroundIconScreen}
          isHeaderVisible
          goBackNavigate={onPressBackArrow}
          headerTitle={i18n.t('cashBack:redemption.pay-my-card.title')}
          keyboardShouldPersistTaps="handled"
        >
          <Box flex={1} mt="spacing-xxxs" mx="spacing-m" pt="spacing-xxxs" justifyContent="space-between">
            <Box>
              <CurrencyInput
                title={i18n.t('enter-amount')}
                mountMoney={minimumAmount}
                grayText
                warningText={inputErrorMsg}
                autoFocus={autoFocus}
                inputRef={inputRef}
                moneySymbol="S/"
                inputValue={mountValue}
                onChange={(e) => handleChange(e.toString())}
                testID="payCardInput"
              />
              {!inputErrorMsg ? (
                <Box flex={1} flexDirection="row" flexWrap="wrap">
                  <Text color="primary700" mr="spacing-xxxs" pt="spacing-xxs" variant="body13pxRegular">
                    {i18n.t('cashBack:redemption.pay-my-card.first-message-init')}
                  </Text>
                  <Text variant="body13pxRegular" color="complementaryIndigo500" marginRight="spacing-s" pt="spacing-xxs">
                    {Helpers.formatCurrency(
                      availableMountValue,
                      { removeDecimalsWhenRounded: false },
                    )}
                  </Text>
                </Box>
              ) : null}
            </Box>
            <Button
              label={i18n.t('cashBack:redemption.pay-my-card.pay-button')}
              variant={buttonEnableValidations() ? 'disabled' : 'primary'}
              disabled={buttonEnableValidations()}
              onPress={onPressContinue}
              my="spacing-m"
              testID="payCardButton"
            />
          </Box>
        </Container>
      </BackgroundWrapper>
    </ThemeProvider>
  );
};
export default Redemption;
