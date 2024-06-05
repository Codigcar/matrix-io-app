import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { act, fireEvent, render, waitFor } from 'jest/test-utils';
import { i18n } from 'src/utils/core/MTXStrings';
import { ReCaptchaContext } from 'src/screens/auth/providers/recaptcha-v3';
import ForgotPasswordUseCase from 'src/core/modules/auth/password/domain/use-cases/forgot-password/forgot-password.use-case';
import VerifyOtpScreen from './verify-otp.screen';

jest.mock('src/screens/auth/providers/recaptcha-v3');
jest.mock(
  'src/core/modules/auth/password/domain/use-cases/forgot-password/forgot-password.use-case',
);

const AuthStack = createNativeStackNavigator();

describe('OTP code verification, forgotPassword flow', () => {
  const component = (
    <ReCaptchaContext.Provider
      value={{ invokeReCaptchaSessionToken: jest.fn().mockResolvedValue('TOKEN_RECAPTCHA') }}
    >
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="VerifyOtp"
          component={VerifyOtpScreen}
          initialParams={{ documentNumber: '99999999' }}
        />
      </AuthStack.Navigator>
    </ReCaptchaContext.Provider>
  );
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should not show an error if code is correct', async () => {
    const { findByTestId, queryByText } = render(component);
    const codeInput = await findByTestId('otp-input');
    fireEvent.changeText(codeInput, '123123');

    await waitFor(() => {
      const errorMessage = queryByText(i18n.t('verifyOTP.otp-error-incorrect'));
      expect(errorMessage).toBeFalsy();
    });
  });

  it('resend code should be disabled at start', async () => {
    const { queryByTestId } = render(component);
    await waitFor(() => {
      const text = queryByTestId('resendCode');
      expect(text).toBeDisabled();
    });
  });

  it('resend code should be enabled after 45 seconds', async () => {
    const { queryByTestId } = render(component);
    act(() => {
      jest.runAllTimers();
    });
    await waitFor(() => {
      const text = queryByTestId('resendCode');
      expect(text).not.toBeDisabled();
    });
  });

  it('after resending the code the resend code should be disabled', async () => {
    jest
      .spyOn(ForgotPasswordUseCase.prototype, 'execute')
      .mockResolvedValue({ deliveryMedium: '' });
    const { queryByTestId, findByTestId } = render(component);
    act(() => {
      jest.runAllTimers();
    });
    await waitFor(() => {
      const text = queryByTestId('resendCode');
      expect(text).not.toBeDisabled();
    });
    const resendCodeButton = await findByTestId('resendCode');
    fireEvent.press(resendCodeButton);
    await waitFor(() => {
      const text = queryByTestId('resendCode');
      expect(text).toBeDisabled();
    });
    expect(ForgotPasswordUseCase.prototype.execute).toHaveBeenCalled();
  });
});
