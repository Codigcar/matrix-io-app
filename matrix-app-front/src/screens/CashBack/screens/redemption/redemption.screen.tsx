import React from 'react';
import {
  Box, Button, Text, Container,
} from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import { BackgroundIconScreen } from 'assets/svgs';
import Helpers from 'src/utils/Helpers';
import { CurrencyInput } from 'src/components/CurrencyInput/CurrencyInput';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import { useRedemptionPresenter } from './redemption.presenter';

export const RedemptionScreen: React.FC = () => {
  const {

    minimumAmount,
    autoFocus,
    mountValue,
    inputRef,
    inputErrorMsg,
    handleChange,
    onPressContinue,
    onPressBackArrow,
    availableMountValue,
    buttonEnableValidations,
  } = useRedemptionPresenter();

  return (
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
  );
};
