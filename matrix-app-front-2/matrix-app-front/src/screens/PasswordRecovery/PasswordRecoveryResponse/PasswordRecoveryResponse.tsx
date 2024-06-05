import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { resetNavigation } from 'src/utils/navigationHandler';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { i18n } from 'src/utils/core/MTXStrings';
import { NavigationPropsType } from 'src/types/types';
import {
  Container, Text, Box, Button, rebrandingTheme,
} from 'matrix-ui-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { ThemeProvider } from '@shopify/restyle';
import { BackgroundAltScreen, CheckDanger } from 'assets/svgs';
import LottieView from 'lottie-react-native';
import { ConfirmationCheck } from 'assets/lottie';
import { s } from 'src/utils/sizes';
import { logVirtualEventAnalytics } from 'src/utils/Analytics';
import { AuthRoutesEnum } from 'src/shared/enums/routes/auth-routes.enum';

const MtxPasswordRecoveryResponse = (props: NavigationPropsType) => {
  const {
    navigation,
    route: { params },
  } = props;
  const { isOkResponse } = params;

  useEffect(() => {
    logVirtualEventAnalytics({
      screenName: 'RecoveryResponse',
      subZona: isOkResponse ? 'Final' : 'ModalError',
    });

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => backHandler.remove();
  }, []);

  const onGoToLoginPress = () => resetNavigation(navigation, AuthRoutesEnum.SIGN_IN);

  const onRetryPress = () => navigation.navigate(navigationScreenNames.recoveryPassword.stack, {
    screen: navigationScreenNames.recoveryPassword.getDNI,
  });

  return (
    <ThemeProvider theme={rebrandingTheme}>
      <Container
        background={BackgroundAltScreen}
        isHeaderVisible={false}
        isScrollable={false}
        withInput={false}
      >
        <Box flex={1} alignItems="center">
          <Box flex={1} alignItems="center" justifyContent="center">
            <Box width={s(68)} height={s(68)}>
              {isOkResponse ? (
                <LottieView source={ConfirmationCheck} autoPlay loop />
              ) : (
                <CheckDanger />
              )}
            </Box>
            <Text mt={isOkResponse ? 'spacing-m' : 'spacing-xl'} variant="Heading28Medium" textAlign="center">
              {i18n.t(`recoveryPassword-passwordResponse-${isOkResponse ? 'title' : 'fail-title'}`)}
            </Text>
            <Box alignSelf="center" mt="spacing-s" maxWidth={s(210)}>
              <Text variant="SubTitle18Regular" textAlign="center">
                {i18n.t(
                  `recoveryPassword-passwordResponse-${isOkResponse ? 'message' : 'fail-message'}`,
                )}
              </Text>
            </Box>
            {!isOkResponse && (
              <Box alignSelf="center" maxWidth="64%" mt="spacing-m">
                <Text
                  variant="body14Regular"
                  mb="spacing-l"
                  textAlign="center"
                >
                  {i18n.t(
                    `recoveryPassword-passwordResponse-${isOkResponse ? 'title' : 'fail-description'
                    }`,
                  )}
                </Text>
              </Box>
            )}
          </Box>
          <Box width="100%" bottom={RFValue(32)} position="absolute" paddingHorizontal="spacing-m">
            {!isOkResponse && (
              <Button
                label={i18n.t('recoveryPassword-passwordResponse-failFirstButton-label')}
                onPress={onRetryPress}
                testID="RetryButton"
                mb="spacing-s"
              />
            )}
            <Button
              label={i18n.t(
                `recoveryPassword-passwordResponse-${isOkResponse ? 'startButton-label' : 'failSecondButton-label'
                }`,
              )}
              variant={isOkResponse ? 'primary' : 'secondary'}
              onPress={onGoToLoginPress}
              testID="StartButton"
            />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default MtxPasswordRecoveryResponse;
