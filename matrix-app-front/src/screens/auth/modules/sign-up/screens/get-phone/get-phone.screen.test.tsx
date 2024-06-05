/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import React from 'react';
import { fireEvent, render, waitFor } from 'jest/test-utils';
import { SignUpRoutesEnum } from 'src/shared/enums/routes/signup-routes.enum';
import { ReactTestInstance, act } from 'react-test-renderer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';
import { ReCaptchaContext } from 'src/screens/auth/providers/recaptcha-v3';
import { DeliveryOptionsEnum } from 'src/shared/enums/constants.enum';
import uuid from 'react-native-uuid';
import GetPhoneScreen from './get-phone.screen';
import * as useGetPhoneInteractor from './get-phone.interactor';

jest.mock('src/shared/providers/remote-config', () => ({
  getCachedRemoteConfigValue: jest.fn().mockReturnValue({
    asBoolean: jest.fn().mockReturnValue(true),
  }),
}));
const AuthStack = createNativeStackNavigator<ReactNavigation.AuthNavigator>();

describe('Repeat password', () => {
  const component = (
    <ReCaptchaContext.Provider
      value={{
        invokeReCaptchaSessionToken: () => 'token',
        actionSignUp: () => {},
        actionForgotPassword: () => {},
        actionLogin: () => {},
      }}
    >
      <AuthStack.Navigator>
        <AuthStack.Screen
          name={SignUpRoutesEnum.GET_PHONE}
          initialParams={{
            password: 'Matrix123.',
            documentNumber: '12345678',
            email: 'test@test.com',
          }}
          component={GetPhoneScreen}
        />
      </AuthStack.Navigator>
    </ReCaptchaContext.Provider>
  );
  const navigate = jest.spyOn(CommonActions, 'navigate');

  async function fillData(
    data: { testID: string; content: string }[],
    find: (id: string) => Promise<ReactTestInstance>,
  ) {
    for (const field of data) {
      const { testID, content } = field;
      const element = await find(testID);
      fireEvent.changeText(element, content);
    }
  }

  it('should allow to navigate to VerifyOTP when field is valid', async () => {
    const getPhoneInteractor = jest.spyOn(useGetPhoneInteractor, 'default');
    getPhoneInteractor.mockReturnValue({
      signUp: jest.fn().mockResolvedValue({
        deliveryMedium: DeliveryOptionsEnum.SMS,
        userSub: 'userSub',
      }),
    });
    const username = uuid.v4().toString();
    const uuidv4 = jest.spyOn(uuid, 'v4');
    uuidv4.mockReturnValue(username);

    const { findByTestId } = render(component);
    const formData = [
      {
        testID: 'phoneInput',
        content: '987234686',
      },
    ];

    await act(async () => {
      await fillData(formData, findByTestId);
    });

    const button = await findByTestId('SubmitButton');

    expect(button.props.accessibilityState.disabled).toBeFalsy();
    fireEvent.press(button);

    await waitFor(() => {
      expect(navigate).toBeCalledWith(SignUpRoutesEnum.VERIFY_OTP, {
        id: username,
        destination: 'celular',
        password: 'Matrix123.',
      });
    });
  });

  it('should navigate to OfferUnavailable when user does not have lead', async () => {
    const getPhoneInteractor = jest.spyOn(useGetPhoneInteractor, 'default');
    getPhoneInteractor.mockReturnValue({
      signUp: jest.fn().mockRejectedValue(new Error('PreSignUp failed with error User is not lead, f25d3e638ee0db8cdcca19d2506c63e94852a495d387e18763eef5a2c09a200ef03e024ee6aca7b099d19086509371de32e2700b5eadb26b4b9bbb8d51e8d8.')),
    });

    const { findByTestId } = render(component);
    const formData = [
      {
        testID: 'phoneInput',
        content: '987234686',
      },
    ];

    await act(async () => {
      await fillData(formData, findByTestId);
    });

    const button = await findByTestId('SubmitButton');

    expect(button.props.accessibilityState.disabled).toBeFalsy();
    fireEvent.press(button);

    await waitFor(() => {
      expect(navigate).toBeCalledWith(SignUpRoutesEnum.OFFER_UNAVAILABLE, {
        token: 'f25d3e638ee0db8cdcca19d2506c63e94852a495d387e18763eef5a2c09a200ef03e024ee6aca7b099d19086509371de32e2700b5eadb26b4b9bbb8d51e8d8',
      });
    });
  });

  it('should not allow to navigate to next screen when field is invalid', async () => {
    const { findByTestId } = render(component);
    const formData = [
      {
        testID: 'phoneInput',
        content: '123345',
      },
    ];

    await act(async () => {
      await fillData(formData, findByTestId);
    });

    const button = await findByTestId('SubmitButton');

    expect(button.props.accessibilityState.disabled).toBeTruthy();
    fireEvent.press(button);

    await waitFor(() => {
      expect(navigate).not.toBeCalled();
    });
  });
});
