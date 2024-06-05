/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { NavigationPropsType } from 'src/types/types';
import CreditCard from 'src/components/CreditCard/CreditCard';
import {
  Box, Divider, rebrandingTheme, SafeAreaBox, ScrollBox,
} from 'matrix-ui-components';
import Animated from 'react-native-reanimated';
import { SafeAreaBottomTabScreen } from 'src/navigators/components/CustomTabBar';
import { ThemeProvider } from '@shopify/restyle';
import CashbackCardSoon from 'src/screens/Soon/CashbackCardSoon';
import VerifyEmailModal from 'src/screens/Profile/VerifyEmail/VerifyEmailModal';
import { useRequestOrders, useRequestBalance } from 'src/screens/AccountStatus/hooks';
import useCardsState from 'src/components/CreditCard/hooks/useCardsState';
import useModalSoon from 'src/screens/Soon/hooks/useModalSoon';
import useNotificationListener from 'src/utils/hooks/notifications/useNotificationListener';
import {
  getBalanceSelector,
} from 'src/screens/AccountStatus/selectors/accountStatusSelectors';
import { useSelector } from 'react-redux';
import CashbackScreen from 'src/screens/Home/components/CashBack/cashback.screen';
import { useShowBalanceSelectors } from 'src/store/selectors/showBalanceSelector';
import HomeTopBar from '../components/HomeTopBar';
import CreditInfo from '../components/CreditInfo';
import Transactions from '../components/Transactions/Transactions';
import Payments from '../components/Payment';
import CardConfiguration from '../components/CardConfiguration';
import useHome from './hooks/useHome';
import styles from './styles/MtxHomeStyle';
import MysteryBox from '../components/MysteryBox/MysteryBox';
import useHomeAnimations from './hooks/useHomeAnimations';
import HomeWrapper from '../components/HomeWrapper';
import { useNotifications } from './hooks/useNotifications';
import PositiveBalanceModal from '../modals/PositiveBalanceModal';
import ErrorServicesHomeModal from '../modals/ErrorServicesHomeModal';
import useDeliquentValues from '../components/hooks/useDelinquentValues';

const Home = (props: NavigationPropsType) => {
  const { navigation } = props;
  const balance = useSelector(getBalanceSelector);
  const [errorServices, setErrorServices] = useState<string[]>([]);
  const { isShowBalance } = useShowBalanceSelectors();
  const { closeVerifyModal, accountCanceled } = useHome(props);
  const { isCashbackModalOpen, closeSoonModal, openCahbackModal } = useModalSoon();
  const isFocused = useIsFocused();

  const { requestNotification, updateToken } = useNotifications();
  const { isLoadingOrders, getPaymentOrders } = useRequestOrders();
  const {
    available,
    consumed,
    creditLimit,
    isLoadingBalance,
    hasErrorBalance,
    isDelinquent,
    getBalance,
  } = useRequestBalance();
  const {
    creditInfoAnimation,
    transactionsAnimation,
    paymentsAnimation,
    cashbackAnimation,
    cardAnimation,
    settingCardAnimation,
  } = useHomeAnimations();
  const { getDelinquency } = useDeliquentValues();
  const { isLoadingCards } = useCardsState();

  const handleGetBalance = () => {
    if (balance.length === 0) {
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

  useFocusEffect(
    useCallback(() => {
      getPaymentOrders();
    }, [getPaymentOrders]),
  );

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
                        availableValue={available}
                        creditValue={creditLimit}
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
                      <Payments
                        navigate={navigation.navigate}
                        isLoading={isLoadingOrders}
                        disabled={isLoadingOrders}
                      />
                    </Animated.View>
                  </View>
                  <Animated.View style={cardAnimation}>
                    <CreditCard
                      disabled={accountCanceled}
                      consumed={consumed?.PEN}
                      balanceLoading={isLoadingBalance}
                      errorServiceBalance={hasErrorBalance}
                      showBalance={isShowBalance}
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
          navigation={navigation}
          balance={available}
          accountCancelled={accountCanceled}
        />
        {isFocused && isCashbackModalOpen && (
          <CashbackCardSoon isVisible onClose={closeSoonModal} />
        )}

        {!accountCanceled && <VerifyEmailModal onClose={closeVerifyModal} />}
        <ErrorServicesHomeModal
          isVisible={errorServices.length > 2}
          onClose={() => setErrorServices([])}
        />
      </HomeWrapper>
    </ThemeProvider>
  );
};

export default Home;
