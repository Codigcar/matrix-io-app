import React, { useEffect } from 'react';
import {
  Box,
  Text,
  Button,
  SafeAreaBox,
} from 'matrix-ui-components';
import { NavigationPropsType } from 'src/types/types';
import { RFValue } from 'react-native-responsive-fontsize';
import { i18n } from 'src/utils/core/MTXStrings';
import { CheckDanger, CheckWarning } from 'assets/svgs';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import { SvgProps } from 'react-native-svg';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { useDispatch } from 'react-redux';
import { turnOffCashbackModal } from 'src/screens/Welcome/states/welcomeState';
import { logout } from 'src/utils/auth/states/signInStates';
import { SignOut } from 'src/api/AuthServices';
import useOnboarding from 'src/screens/Welcome/Welcome/hooks/useWelcome';
import { BackHandler } from 'react-native';

type RedemptionErrorRouteProps = {
  title?: string;
  subtitle?: string;
  type?: keyof typeof icons;
  errorBlocked?: boolean;
};

const icons = {
  error: <CheckDanger />,
  warning: <CheckWarning />,
};

const RedemptionError: React.FC<NavigationPropsType> = ({
  navigation: { navigate },
  route: { params },
}: NavigationPropsType) => {
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

  const dispatch = useDispatch();
  const { handleLoginPress } = useOnboarding();
  const closeSoonModal = () => {
    dispatch(turnOffCashbackModal());
  };
  const goToHome = () => {
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

  return (
    <BackgroundWrapper>
      <SafeAreaBox flex={1} justifyContent="space-between" mx="spacing-m">
        <Box flex={1} alignItems="center" justifyContent="center" mt="spacing-ml" mx="spacing-m">
          <Icon width={RFValue(64)} height={RFValue(64)} />
        </Box>
        <Box flex={1} mx="spacing-m">
          <Text variant="Heading28Medium" textAlign="center">
            {title}
          </Text>
          <Text variant="SubTitle18Regular" mt="spacing-s" textAlign="center">
            {subtitle}
          </Text>
          {errorBlocked ? (
            <Text variant="body14Regular" mt="spacing-xxm" textAlign="center">
              {i18n.t('cashBack:redemptionError.detail-general-error-blocked')}
            </Text>
          )
            : (
              <Text variant="body14Regular" mt="spacing-xxm" textAlign="center">
                {i18n.t('cashBack:redemptionError.its-not-you')}
              </Text>
            )}
        </Box>
        <Box>
          {errorBlocked ? (
            <Button
              variant="primary"
              label={i18n.t('cashBack:redemptionError.finish')}
              onPress={signOut}
              mb="spacing-m"
              testID="understood-button"
            />
          )
            : (
              <Button
                variant="primary"
                label={i18n.t('cashBack:redemptionError.understood')}
                onPress={goToHome}
                mb="spacing-m"
                testID="understood-button"
              />
            )}

        </Box>
      </SafeAreaBox>
    </BackgroundWrapper>
  );
};

export default RedemptionError;
