import React from 'react';
import { Animated } from 'react-native';
import {
  Box, Container,
  Text, Button, TouchableOpacityBox,
} from 'matrix-ui-components';
import {
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { i18n } from 'src/utils/core/MTXStrings';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import { CardPaymentRoutesEnum } from 'src/shared/enums/routes/card-payment-routes.enum';
import { InfoCircleIcon } from 'assets/svgs';
import SelectMountPayment from './components/SelectMountPayment/SelectMountPayment';
import CardsList from './components/CardsList/CardsList';
import ModalSameCurrency from './components/ModalSameCurrency/ModalSameCurrency';
import {
  MIN,
  OTHER,
  TOTAL,
  useCardPaymentPresenter,
} from './payment.presenter';
import { CardType } from '../../shared/types/card-payment.type';
import { useKeyboardPosition } from '../../shared/hooks';

export const CardPayment: React.FC = () => {
  const isOpenKeyboard = useKeyboardPosition();
  const navigation = useNavigation<NavigationProp<any>>();

  const {
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
  } = useCardPaymentPresenter();

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
        <Box testID="cardPayment" flex={1} pt="spacing-m">
          <Animated.View style={{ marginTop: isOpenKeyboard }} />
          <CardsList
            testID="cardsListTestID"
            isFinishDeleteSuccess={isFinishDeleteSuccess}
            isLoadingDelete={isLoadingDelete}
            loading={isLoading}
            cards={cardsPaymentMethods}
            cardSelected={cardSelected}
            onDelete={(card: CardType) => deletePaymentMethod(card.cardId)}
            onSelect={(card: CardType | null) => setCardSelected(card)}
            navigate={() => navigation.navigate(CardPaymentRoutesEnum.ADD_DEBIT_CARD_CULQUI)}
          />
          <Box flex={1} justifyContent="space-between" mx="spacing-m">
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
