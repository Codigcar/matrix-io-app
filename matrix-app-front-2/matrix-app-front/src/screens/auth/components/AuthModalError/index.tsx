import {
  Box, Button, Modal, Text, rebrandingTheme,
} from 'matrix-ui-components';
import React from 'react';
import { i18n } from 'src/utils/core/MTXStrings';
import { ImageBackground, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { BgModal } from 'assets/images';
import { ThemeProvider } from '@shopify/restyle';
import { ScreenCurrentEnum } from 'src/utils/enum/error-type.enum';
import CheckError from 'assets/svgs/check-error.svg';
import CheckWarning from 'assets/svgs/check-warning2.svg';
import useReCaptchaModalError from './use-auth-modal-error';

const parseErrorCode: any = {
  unknown_error: 'unknownError',
  session_expired: 'sessionExpired',
  attempts_exceeded: 'attemptsExceeded',
  unexpected_error: 'unexpectedError',
  security_risk: 'securityRisk',
};

/**
 * Component for displaying a ReCaptcha error modal.
 *
 * This component displays a ReCaptcha error modal
 * with options to close it and an error message.
 */
const ReCaptchaModalError = () => {
  const {
    authErrorModal, closeModalError, errorObject, typeAuthErrorModal, screenCurrentModal,
  } = useReCaptchaModalError();

  const isForgotPasswordOrSignUp = screenCurrentModal === ScreenCurrentEnum.AUTO_SIGN_IN
    || screenCurrentModal === ScreenCurrentEnum.PASSWORD_RECOVERY;

  return (
    <ThemeProvider theme={rebrandingTheme}>
      <Modal
        animationType="fade"
        transparent
        visible={authErrorModal}
        onRequestClose={closeModalError}
      >
        <Box justifyContent="center" flex={1} height="100%" width="100%" position="absolute">
          <ImageBackground source={BgModal} style={StyleSheet.absoluteFill} resizeMode="stretch" />
          <Box paddingHorizontal="spacing-m">
            <Box
              padding="spacing-m"
              backgroundColor="white"
              borderRadius={RFValue(24)}
              justifyContent="center"
              alignItems="center"
            >
              {isForgotPasswordOrSignUp ? (
                <CheckWarning width={RFValue(68)} height={RFValue(68)} />
              ) : (
                <CheckError width={RFValue(68)} height={RFValue(68)} />
              )}
              <Text mt="spacing-xm" variant="Heading18Medium" numberOfLines={1}>
                {i18n.t(
                  errorObject[parseErrorCode[typeAuthErrorModal]].title,
                )}
              </Text>
              <Text mt="spacing-s" variant="body14pxRegular" textAlign="center">
                {i18n.t(
                  errorObject[parseErrorCode[typeAuthErrorModal]].message,
                )}
              </Text>
              <Button
                width="100%"
                label={i18n.t('session-error.server.submit')}
                variant="primary"
                onPress={closeModalError}
                mt="spacing-xm"
              />
            </Box>
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default ReCaptchaModalError;
