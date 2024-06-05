import React from 'react';
import { Container } from 'matrix-ui-components';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import ReCaptchaModalError from 'src/screens/auth/components/AuthModalError';
import { i18n } from 'src/utils/core/MTXStrings';
import OtpCode from 'src/components/OtpCode/otp-code';
import { TIME_RESEND_CODE } from 'src/utils/constants';
import useVerifyOtpPresenter from './verify-otp.presenter';

const VerifyOtpScreen = () => {
  const {
    onSubmit, afterSubmitSuccess, onError, onResendCode, onPressBackArrow,
  } = useVerifyOtpPresenter();

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
        <OtpCode
          retryTimeOut={TIME_RESEND_CODE}
          onSubmit={onSubmit}
          afterSubmitSuccess={afterSubmitSuccess}
          onError={onError}
          onResendCode={onResendCode}
          successAnimationTimeout={1250}
          retryKey="verifyOtpTimeToBlock"
          title={i18n.t('verifyOTP.title')}
          subtitle={i18n.t('verifyOTP.otp-message', { destination: i18n.t('email').toLowerCase() })}
          awaitText={i18n.t('verifyOTP.button-await-text')}
          footerTitle={i18n.t('verifyOTP.problems-recovering-password')}
          footerSubtitle={i18n.t('verifyOTP.matrix-email')}
        />
        <ReCaptchaModalError />
      </Container>
    </BackgroundWrapper>
  );
};

export default VerifyOtpScreen;
