import React, { useEffect } from 'react';
import { CheckDanger, CheckWarning } from 'assets/svgs';
import { useRoute } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { navigate } from 'src/navigators/RootNavigation';
import { i18n } from 'src/utils/core/MTXStrings';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import useOnboarding from 'src/screens/Welcome/Welcome/hooks/useWelcome';
import { logout } from 'src/utils/auth/states/signInStates';
import { SignOut } from 'src/api/AuthServices';
import { useAppDispatch } from 'src/core/libraries-implementation/state-manager/dispatch';
import { turnOffCashbackModal } from 'src/screens/Welcome/states/welcomeState';
import RedemptionAnalytics from '../../analytics/redemption.analytics';

type RedemptionErrorRouteProps = {
  title?: string;
  subtitle?: string;
  type?: keyof typeof icons;
  errorBlocked?: boolean;
};

export const icons = {
  error: <CheckDanger />,
  warning: <CheckWarning />,
};

export const useRedemptionErrorPresenter = () => {
  const route: any = useRoute();
  const { params } = route;
  const dispatch = useAppDispatch();
  const { handleLoginPress } = useOnboarding();
  const {
    title = i18n.t('cashBack:redemptionError.ups'),
    subtitle = i18n.t('cashBack:redemptionError.detail-invalid-redemption'),
    errorBlocked = false,
    type = 'warning',
  } = (params as RedemptionErrorRouteProps) || {};

  const Icon = (props: SvgProps) => {
    const IconComponent = icons[type];
    return React.cloneElement(IconComponent, { ...props });
  };

  const closeSoonModal = () => {
    dispatch(turnOffCashbackModal());
  };

  const goToHome = () => {
    RedemptionAnalytics.onUnderstoodError(type);
    navigate(navigationScreenNames.bottomTabNavigator);
    closeSoonModal();
  };

  const signOut = async () => {
    await handleLoginPress();
    SignOut();
    dispatch(logout());
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => backHandler.remove();
  }, []);

  return {
    Icon,
    signOut,
    goToHome,
    title,
    subtitle,
    errorBlocked,
    type,
  };
};
