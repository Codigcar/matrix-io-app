import React, { useEffect, useMemo } from 'react';
// Components
import { CodeInput, Box, Container, Text, TouchableOpacityBox } from 'matrix-ui-components';

// Hooks
import { i18n } from 'src/utils/core/MTXStrings';
import { NavigationPropsType } from 'src/types/types';
import { maskData } from 'src/utils/obfuscated/ObfuscatedDataProfile';
import { ToastType, showToast } from 'src/matrix-ui-components/components/toast';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import { vs } from 'src/utils/sizes';
import useMtxVerifyOTP from '../hooks/useMtxVerifyOTP';
import ReCaptchaModalError from 'src/screens/auth/components/AuthModalError';

const VerifyOTPScreen: React.FC<NavigationPropsType> = (props) => {
  const {
    onPressBackArrow,
    onPressReSendCode,
    isSuccess,
    isComplete,
    timeReSendCode,
    hiddenReSendCodeButton,
    messageError,
    resendSuccess,
    destination,
    isError,
    isResendLoading,
    isEnable,
    code,
    handlerCode,
    isExceededOTP,
    blockTimer,
    errorOTP,
    stack,
    phone,
    isChangeDataProcess,
  } = useMtxVerifyOTP(props);

  const codeInputMemo = useMemo(
    () => (
      <CodeInput
        error={isError}
        enable={isEnable && !isExceededOTP}
        success={isSuccess}
        setValue={handlerCode}
        textHelper={messageError}
        reSendCode={resendSuccess}
        complete={isComplete}
        code={code}
      />
    ),
    [
      isError,
      isEnable,
      isExceededOTP,
      isSuccess,
      handlerCode,
      messageError,
      resendSuccess,
      isComplete,
      code,
    ],
  );

  useEffect(() => {
    if (resendSuccess) {
      showToast({
        type: ToastType.TypeInfo,
        title: i18n.t('verifyOTP.resend-success-code_1'),
        message: i18n.t('verifyOTP.resend-success-code_2'),
      });
    }

    if (isExceededOTP && errorOTP) {
      showToast({
        type: ToastType.TypeInfo,
        title: i18n.t('verifyOTP.resend-error-code_1'),
        message: i18n.t('verifyOTP.resend-error-code_2'),
      });
    }
  }, [resendSuccess, errorOTP, isExceededOTP]);

  const isVerifyEmailProcess = stack === 'VerifyEmail';
  const isChangeEmailProcess = stack === 'email';

  const printDestination = isChangeEmailProcess ? 'correo' : destination;

  return (
    <BackgroundWrapper>
      <Container
        withInput
        hasGradient={false}
        imageBackground="none"
        keyboardShouldPersistTaps="handled"
        isHeaderTransparent
        isHeaderVisible
        goBackNavigate={onPressBackArrow}
      >
        <Box flex={1} mx="spacing-m">
          <Box height={vs(74)} />
          <Box mb="spacing-xxs">
            <Text variant="Heading20Medium" color="primary1000">
              {i18n.t('verifyOTP.title')}
            </Text>
          </Box>
          <Box mr="spacing-l" mb="spacing-m">
            <Text
              variant={isChangeEmailProcess ? 'body13Regular' : 'body14Regular'}
              color="primary800"
            >
              {isVerifyEmailProcess || isChangeEmailProcess
                ? i18n.t('verifyOTP.otp-message-email')
                : i18n.t('verifyOTP.otp-message', { destination: printDestination })}
              <Text variant="body14SemiBold" color="primary1000">
                {isVerifyEmailProcess ? maskData(destination, 'email') : null}
                {isChangeEmailProcess ? `${destination}` : null}
                {phone ?? phone}
              </Text>
            </Text>
          </Box>
          {codeInputMemo}
          {!isChangeDataProcess && (
            <TouchableOpacityBox
              flexDirection="column"
              mt="spacing-m"
              onPress={onPressReSendCode}
              disabled={isResendLoading || timeReSendCode !== 0 || isExceededOTP}
            >
              {hiddenReSendCodeButton || timeReSendCode !== 0 || isExceededOTP ? (
                <Text variant="body13SemiBold" color="primary400">
                  {i18n.t('verifyOTP.button-await-text')}
                  <Text variant="body14Regular" color="primary800">
                    {i18n.t('verifyOTP.button-await-en-text')}
                    {blockTimer > 0
                      ? i18n.t('verifyOTP.button-end-min-text', {
                          time: blockTimer,
                        })
                      : i18n.t('verifyOTP.button-end-seg-text', {
                          time: timeReSendCode.toString().slice(0, -3),
                        })}
                  </Text>
                </Text>
              ) : (
                <Text variant="body13SemiBold">{i18n.t('verifyOTP.button-resend-text')}</Text>
              )}
            </TouchableOpacityBox>
          )}
          <Box mt="spacing-l" mb="spacing-xxs">
            <Text textAlign="center" variant="body14SemiBold">
              {isChangeEmailProcess || phone
                ? i18n.t('verifyOTP.feedback-error-update-email-phone')
                : i18n.t('verifyOTP.feedback-error')}
            </Text>
          </Box>
          <Box mb="spacing-s">
            {isChangeEmailProcess || phone ? (
              <Text textAlign="center">
                <Text variant="body14Regular" color="primary800">
                  {i18n.t('verifyOTP.matrix-email')}
                </Text>
              </Text>
            ) : null}
          </Box>
        </Box>
        <ReCaptchaModalError />
      </Container>
    </BackgroundWrapper>
  );
};

export default VerifyOTPScreen;
