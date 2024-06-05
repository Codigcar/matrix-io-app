import React, { useEffect, useState, useRef } from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useSelector } from 'react-redux';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'matrix-ui-components';
// Constants
import navigationScreenNames from 'src/utils/navigationScreenNames';
import SignInScreen from 'src/screens/auth/modules/sign-in/sign-in.screen';
import MaintenanceScreen from 'src/screens/maintenance/maintenance.screen';
import AppSettings from 'src/screens/AppSettings/AppSettings';
import OnBoardingSlider from 'src/screens/Welcome/Slider/OnBoardingSlider';
import ConfirmModal from 'src/components/confirm-modal';
import { i18n } from 'src/utils/core/MTXStrings';
import GenericError from 'src/components/GenericError/GenericError';
import CardDocumentDetail from 'src/screens/CardOffer/CardDocumentDetail/CardDocumentDetail';

import DocumentDetail from 'src/screens/Enrollment/GetData/DocumentDetail/DocumentDetail';
import useOnboarding from 'src/screens/Welcome/Welcome/hooks/useWelcome';
import { BenefitsRoutesEnum } from 'src/shared/enums/routes/benefits-routes.enum';
import BenefitsStack from 'src/screens/Benefits/index.router';
import CardDocuments from 'src/screens/CardOffer/CardDocuments/CardDocuments';
import AuthStack from 'src/screens/auth/index.router';
import { AuthRoutesEnum } from 'src/shared/enums/routes/auth-routes.enum';
import Config from 'react-native-config';
import FabButton from 'src/components/FabButton/FabButton';
import { EyeBold } from 'assets/icons';
import NetworkErrorScreen from 'src/screens/network/screens/network-error.screen';
import NotificationStack from 'src/screens/Notifications/index.router';
import { InboxRoutesEnum } from 'src/shared/enums/routes/inbox-routes.enum';
import CardPaymentStack from 'src/screens/credit-card-payment/index.router';
import Tutorial from 'src/screens/CustomerCare/Tutorial';
import { RedemptionRoutesEnum } from 'src/shared/enums/routes/redemption-routes-enum';
import RedemptionStack from 'src/screens/CashBack/index.router';
import CardReplacementStack from 'src/screens/card-replacement/index.router';
import { useWalletInAppSetup } from 'src/screens/Wallet/hooks/useWalletInAppSetup';
import RequestCardStack from './RequestCardNavigation';
import EnrollmentNavigator from './EnrollmentNavigation';
import PersonalDataNavigator from './PersonalDataNavigation';
import BottomTabNavigation from './BottomTabNavigation';
import CardOfferNavigation from './CardOfferNavigation';
import ProfileNavigation from './ProfileNavigation';
import BiometricNavigation from './BiometricNavigation';
import TransactionsNavigation from './TransactionsNavigation';
import SettingsNavigation from './SettingsNavigation';
import CancelAccountNavigation from './CancelAccountNavigation';
import EnrollmentDeviceNavigation from './EnrollmentDeviceNavigation';

// Hooks
import useNavigation from './hooks/useNavigation';
import {
  navigate,
  navigationRef,
  onReadyNavigationContainer,
  onStateChangeNavigationContainer,
} from './RootNavigation';
import NetworkLoggerNavigation from './NetworkLoggerNavigation';

const Stack = createNativeStackNavigator();

const defaultConfig = {
  headerShown: false,
};

const sessionSelector = (state: any) => state.session;
const MainNavigation = () => {
  const { sliderHasBeenSeen, logout } = useNavigation();
  const { token: accessToken, sessionExpired } = useSelector(sessionSelector);
  const prevTokenRef = useRef();
  const [isVisible, setVisible] = useState<boolean>(false);
  const { handleLoginPress } = useOnboarding();
  const { APP_ENVIRONMENT } = Config;

  const handleStateChange = () => {
    onStateChangeNavigationContainer();
  };

  useWalletInAppSetup();

  useEffect(() => {
    if (sliderHasBeenSeen) handleLoginPress();
  }, []);

  useEffect(() => {
    if (accessToken !== null) {
      prevTokenRef.current = accessToken;
    }
    if (prevTokenRef.current && sessionExpired) {
      setVisible(true);
      logout(navigationRef);
    }
  }, [sessionExpired]);

  return (
    <>
      <NavigationContainer
        ref={navigationRef}
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: 'white',
          },
        }}
        onStateChange={handleStateChange}
        onReady={onReadyNavigationContainer}
      >
        <Stack.Navigator
          screenOptions={defaultConfig}
          initialRouteName={!sliderHasBeenSeen ? 'Slider' : AuthRoutesEnum.AUTH_STACK}
        >
          {!sliderHasBeenSeen && <Stack.Screen name="Slider" component={OnBoardingSlider} />}
          <Stack.Screen name="Welcome" component={SignInScreen} />
          <Stack.Screen name="Enrollment" component={EnrollmentNavigator} />
          <Stack.Screen name={AuthRoutesEnum.AUTH_STACK} component={AuthStack} />
          <Stack.Screen name={navigationScreenNames.maintenance} component={MaintenanceScreen} />
          <Stack.Screen
            name={navigationScreenNames.bottomTabNavigator}
            component={BottomTabNavigation}
          />

          <Stack.Screen name={navigationScreenNames.genericError} component={GenericError} />
          <Stack.Screen name="CardOfferStack" component={CardOfferNavigation} />
          <Stack.Screen name="SettingsStack" component={SettingsNavigation} />
          <Stack.Screen name={BenefitsRoutesEnum.BENEFITS_STACK} component={BenefitsStack} />

          <Stack.Screen name={navigationScreenNames.documentDetail} component={DocumentDetail} />

          <Stack.Screen
            name={navigationScreenNames.personalDataStack}
            component={PersonalDataNavigator}
          />
          <Stack.Screen name="ProfileStack" component={ProfileNavigation} />
          <Stack.Screen name="CancelAccountStack" component={CancelAccountNavigation} />
          <Stack.Screen name="TransactionsStack" component={TransactionsNavigation} />
          <Stack.Screen name={navigationScreenNames.networkError} component={NetworkErrorScreen} />
          <Stack.Screen name={InboxRoutesEnum.NOTIFICATION_STACK} component={NotificationStack} />
          <Stack.Screen
            name="CardPaymentStack"
            component={CardPaymentStack}
            options={{
              gestureEnabled: false,
            }}
          />
          <Stack.Screen name="CardDocumentDetail" component={CardDocumentDetail} />
          <Stack.Screen name={navigationScreenNames.cardDocuments} component={CardDocuments} />
          <Stack.Screen name="BiometricNavigation" component={BiometricNavigation} />
          <Stack.Screen name={navigationScreenNames.appSettings} component={AppSettings} />
          <Stack.Screen
            name={navigationScreenNames.cardReplacement.stack}
            component={CardReplacementStack}
          />
          <Stack.Screen name="EnrollmentDevice" component={EnrollmentDeviceNavigation} />
          <Stack.Screen name="NetworkLoggerStack" component={NetworkLoggerNavigation} />
          <Stack.Screen
            name={navigationScreenNames.physicalCard.stack}
            component={RequestCardStack}
          />
          <Stack.Screen
            name={RedemptionRoutesEnum.REDEMPTION}
            component={RedemptionStack}
            options={{
              gestureEnabled: false,
            }}
          />
          <Stack.Screen name="Tutorial" component={Tutorial} />
        </Stack.Navigator>
      </NavigationContainer>
      {(APP_ENVIRONMENT === 'quality' || APP_ENVIRONMENT === 'development') && (
        <FabButton icon={EyeBold} onPress={() => navigate('NetworkLoggerStack')} />
      )}
      <ThemeProvider theme={rebrandingTheme}>
        <ConfirmModal
          type="warning"
          title={i18n.t('home-title-session-expired')}
          description={i18n.t('home-text-session-expired')}
          isVisible={isVisible}
          confirmButton={{
            label: i18n.t('understood'),
            onPress: () => setVisible(false),
          }}
        />
      </ThemeProvider>
    </>
  );
};

export default MainNavigation;