/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NavigationPropsType } from 'src/types/types';
import CreditCard from 'src/components/CreditCard/CreditCard';
import { Box, Divider, rebrandingTheme, SafeAreaBox, ScrollBox } from 'matrix-ui-components';
import Animated from 'react-native-reanimated';
import { SafeAreaBottomTabScreen } from 'src/navigators/components/CustomTabBar';
import { ThemeProvider } from '@shopify/restyle';
import CashbackCardSoon from 'src/screens/Soon/CashbackCardSoon';
import VerifyEmailModal from 'src/screens/Profile/VerifyEmail/VerifyEmailModal';
import useCardsState from 'src/components/CreditCard/hooks/useCardsState';
import CashbackScreen from 'src/screens/Home/components/CashBack/cashback.screen';
import useModalSoon from 'src/screens/Soon/hooks/useModalSoon';
import useNotificationListener from 'src/utils/hooks/notifications/useNotificationListener';
import { usePaymentOrder, useCreditCardBalance } from 'src/shared/hooks';
import { useBalanceSelectors } from 'src/core/libraries-implementation';
import useWalletConfiguration from 'src/screens/Wallet/hooks/useWalletConfiguration';
import { useInAppWalletRedirect } from 'src/screens/Wallet/hooks/useInAppWalletRedirect';
import HomeTopBar from '../components/HomeTopBar';
import CreditInfo from '../components/CreditInfo';
import Transactions from '../components/Transactions/Transactions';
import CardConfiguration from '../components/CardConfiguration';
import useHome from './hooks/useHome';
import styles from './styles/MtxHomeStyle';
import MysteryBox from '../components/MysteryBox/MysteryBox';
import useHomeAnimations from './hooks/useHomeAnimations';
import HomeWrapper from '../components/HomeWrapper';
import { useNotifications } from './hooks/useNotifications';
import PositiveBalanceModal from '../modals/PositiveBalanceModal';
import ErrorServicesHomeModal from '../modals/ErrorServicesHomeModal';
import PaymentScreen from '../components/Payment/payment.screen';
import useDeliquentValues from '../components/hooks/useDelinquentValues';
import FraudBlockModal from '../modals/FraudBlockModal';
import BottomSheetPayWithIO from '../components/BottomSheetPayWithIO';

const Home = (props: NavigationPropsType) => {
  const { navigation } = props;
  const navigationHook = useNavigation();
  const { balance } = useBalanceSelectors();
  const [errorServices, setErrorServices] = useState<string[]>([]);
  const { closeVerifyModal, accountCanceled, closeFraudBlockModal, isLoading } = useHome(props);
  const { getDelinquency } = useDeliquentValues();
  const { isCashbackModalOpen, closeSoonModal, openCahbackModal } = useModalSoon();
  const isFocused = useIsFocused();

  const { requestNotification, updateToken } = useNotifications();
  const { isLoadingOrders, getPaymentOrders } = usePaymentOrder();
  const { isLoadingBalance, hasErrorBalance, isDelinquent, getBalance } = useCreditCardBalance();
  const {
    creditInfoAnimation,
    transactionsAnimation,
    paymentsAnimation,
    cashbackAnimation,
    cardAnimation,
    settingCardAnimation,
  } = useHomeAnimations();

  const { isWalletActive } = useWalletConfiguration();

  const { isLoadingCards } = useCardsState();

  useInAppWalletRedirect();

  const handleGetBalance = () => {
    if (balance?.available?.PEN.currency !== 'PEN') {
      getBalance();
    }
  };

  useEffect(() => {
    requestNotification(updateToken);
  }, []);

  useEffect(() => {
    if (isDelinquent) {
      getDelinquency();
    }
  }, [isDelinquent]);

  useEffect(() => {
    if (hasErrorBalance) {
      setErrorServices([...errorServices.filter((item) => item !== 'balance'), 'balance']);
      return;
    }
    setErrorServices(errorServices.filter((item) => item !== 'balance'));
  }, [isLoadingBalance]);

  useEffect(() => {
    const onScreenFocus = () => {
      getPaymentOrders();
    };

    navigationHook.addListener('focus', onScreenFocus);

    return () => {
      navigationHook.removeListener('focus', onScreenFocus);
    };
  }, [navigationHook, getBalance, getPaymentOrders]);

  useNotificationListener();

  return (
    <ThemeProvider theme={rebrandingTheme}>
      <HomeWrapper>
        <SafeAreaBox flex={1}>
          <ScrollBox flex={1} showsVerticalScrollIndicator={false}>
            <SafeAreaBottomTabScreen>
              <MysteryBox />
              <Box mt="spacing-m" />
              <HomeTopBar />
              <View style={styles.boxLayoutContainer}>
                <View style={styles.layoutRowContainer}>
                  <View>
                    <Animated.View style={creditInfoAnimation}>
                      <CreditInfo
                        isLoading={isLoadingBalance}
                        availableValue={balance?.available?.PEN?.amount ?? 0}
                        creditValue={balance?.creditLimit?.PEN?.amount ?? 0}
                        disabled={accountCanceled}
                        errorServiceBalance={hasErrorBalance}
                        onPress={handleGetBalance}
                        getBalance={getBalance}
                      />
                      <Divider height={24} />
                    </Animated.View>
                    <Animated.View style={transactionsAnimation}>
                      <Transactions />
                      <Divider height={24} />
                    </Animated.View>
                    <Animated.View style={paymentsAnimation}>
                      <PaymentScreen isLoading={isLoadingOrders} disabled={isLoadingOrders} />
                    </Animated.View>
                  </View>
                  <Animated.View style={cardAnimation}>
                    <CreditCard
                      disabled={accountCanceled}
                      consumed={
                        balance?.consumed ?? {
                          PEN: {
                            amount: 0,
                            currency: 'PEN',
                          },
                          USD: {
                            amount: 0,
                            currency: 'USD',
                          },
                        }
                      }
                      balanceLoading={isLoadingBalance}
                      errorServiceBalance={hasErrorBalance}
                      isLoadingCards={isLoadingCards}
                    />
                  </Animated.View>
                </View>
                <Divider height={24} />
                <View style={styles.alignItemsRowStart}>
                  <Animated.View style={cashbackAnimation}>
                    <CashbackScreen
                      disabled={accountCanceled}
                      onPress={openCahbackModal}
                      errorServices={errorServices}
                      setErrorServices={setErrorServices}
                    />
                  </Animated.View>
                  <Animated.View style={settingCardAnimation}>
                    <CardConfiguration isLoadingCards={isLoadingCards} />
                  </Animated.View>
                </View>
              </View>
            </SafeAreaBottomTabScreen>
          </ScrollBox>
        </SafeAreaBox>
        <PositiveBalanceModal
          navigation={navigation as any}
          balance={balance?.available.PEN.amount ?? 0}
          accountCancelled={accountCanceled}
        />
        {isFocused && isCashbackModalOpen && (
          <CashbackCardSoon isVisible onClose={closeSoonModal} />
        )}

        {!isLoading ? (
          <>
            {isWalletActive && <BottomSheetPayWithIO navigation={navigation} />}
            {!accountCanceled && <VerifyEmailModal onClose={closeVerifyModal} />}
          </>
        ) : null}

        <ErrorServicesHomeModal
          isVisible={errorServices.length > 2}
          onClose={() => setErrorServices([])}
        />
        <FraudBlockModal navigation={navigation as any} onClose={closeFraudBlockModal} />
      </HomeWrapper>
    </ThemeProvider>
  );
};

export default Home;
