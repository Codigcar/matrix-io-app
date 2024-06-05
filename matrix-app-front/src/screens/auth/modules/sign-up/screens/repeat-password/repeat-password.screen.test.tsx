/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import React from 'react';
import { fireEvent, render, waitFor } from 'jest/test-utils';
import { SignUpRoutesEnum } from 'src/shared/enums/routes/signup-routes.enum';
import { ReactTestInstance, act } from 'react-test-renderer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';
import RepeatPasswordScreen from './repeat-password.screen';

const AuthStack = createNativeStackNavigator<ReactNavigation.AuthNavigator>();

describe('Repeat password', () => {
  const component = (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name={SignUpRoutesEnum.PASSWORD_REPEAT}
        initialParams={{
          password: 'Matrix123.',
          documentNumber: '12345678',
          email: 'test@test.com',
        }}
        component={RepeatPasswordScreen}
      />
    </AuthStack.Navigator>
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

  it('should allow to navigate to next screen when field is valid', async () => {
    const { findByTestId } = render(component);
    const formData = [
      {
        testID: 'passwordConfirmation',
        content: 'Matrix123.',
      },
    ];

    await act(async () => {
      await fillData(formData, findByTestId);
    });

    const button = await findByTestId('SubmitButton');
    fireEvent.press(button);
    await waitFor(() => expect(navigate).toBeCalledWith(SignUpRoutesEnum.GET_PHONE, {
      email: 'test@test.com',
      documentNumber: '12345678',
      password: 'Matrix123.',
    }));
  });

  it('should not allow to navigate to next screen when field is invalid', async () => {
    const { findByTestId } = render(component);
    const formData = [
      {
        testID: 'passwordConfirmation',
        content: 'invalid_password',
      },
    ];

    await act(async () => {
      await fillData(formData, findByTestId);
    });

    const button = await findByTestId('SubmitButton');
    fireEvent.press(button);

    await waitFor(() => expect(navigate).not.toBeCalled());
  });
});
