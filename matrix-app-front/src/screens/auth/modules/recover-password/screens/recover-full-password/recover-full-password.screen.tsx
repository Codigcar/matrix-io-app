import React from 'react';
import { i18n } from 'src/utils/core/MTXStrings';
import {
  Container, Text, Box, Button, rebrandingTheme,
} from 'matrix-ui-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { ThemeProvider } from '@shopify/restyle';
import { BackgroundAltScreen, CheckDanger } from 'assets/svgs';
import { ConfirmationCheck } from 'assets/lottie';
import { s } from 'src/utils/sizes';
import LottieView from 'lottie-react-native';
import { AuthErrorCodeEnum } from 'src/utils/enum/error-type.enum';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import useRecoverFullPasswordPresenter from './recover-full-password.presenter';

export const RecoverFullPasswordScreen: React.FC<
CompositeScreenProps<
  NativeStackScreenProps<ReactNavigation.PasswordRecoveryNavigator, 'RecoverFullPassword'>,
  NativeStackScreenProps<ReactNavigation.RootStackParamList>
>> = (props) => {
  const isOkResponse = props?.route?.params?.isOkResponse || false;
  const code = props?.route?.params?.code;
  const { onRetryPress, onGoToLoginPress, getResponseKey } = useRecoverFullPasswordPresenter(props);

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
            <Text
              mt={isOkResponse ? 'spacing-m' : 'spacing-xl'}
              variant="Heading28Medium"
              textAlign="center"
            >
              {i18n.t(getResponseKey('title'))}
            </Text>
            <Box alignSelf="center" mt="spacing-s" maxWidth={s(210)}>
              <Text variant="SubTitle18Regular" textAlign="center">
                {i18n.t(getResponseKey('message'))}
              </Text>
            </Box>
            {!isOkResponse && (
              <Box alignSelf="center" maxWidth="64%" mt="spacing-m">
                <Text variant="body14Regular" mb="spacing-l" textAlign="center">
                  {i18n.t(getResponseKey('description'))}
                </Text>
              </Box>
            )}
          </Box>
          <Box width="100%" bottom={RFValue(32)} position="absolute" paddingHorizontal="spacing-m">
            {!isOkResponse && (
              <Button
                label={i18n.t(getResponseKey('buttonLabel'))}
                onPress={onRetryPress}
                testID="RetryButton"
                mb="spacing-s"
              />
            )}
            {(isOkResponse || code === AuthErrorCodeEnum.INVALID_OTP) && (
              <Button
                label={i18n.t('recoveryPassword-passwordResponse-startButton-label')}
                variant={isOkResponse ? 'primary' : 'secondary'}
                onPress={onGoToLoginPress}
                testID="StartButton"
              />
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default RecoverFullPasswordScreen;
