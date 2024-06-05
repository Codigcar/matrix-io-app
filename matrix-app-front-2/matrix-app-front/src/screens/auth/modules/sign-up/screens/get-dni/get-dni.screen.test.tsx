/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import React from 'react';
import { fireEvent, render, waitFor } from 'jest/test-utils';
import { SignUpRoutesEnum } from 'src/shared/enums/routes/signup-routes.enum';
import { act } from 'react-test-renderer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';
import GetDniScreen from './get-dni.screen';

const AuthStack = createNativeStackNavigator<ReactNavigation.AuthNavigator>();

describe('Get DNI', () => {
  const component = (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name={SignUpRoutesEnum.GET_DNI}
        component={GetDniScreen}
      />
    </AuthStack.Navigator>
  );

  it('should allow to navigate to next screen when fields are valid', async () => {
    const navigate = jest.spyOn(CommonActions, 'navigate');
    const { findByTestId } = render(component);
    const formData = [
      {
        testID: 'dniInput',
        content: '12345678',
      },
    ];

    async function fillData(data: typeof formData) {
      for (const field of data) {
        const { testID, content } = field;
        const element = await findByTestId(testID);
        fireEvent.changeText(element, content);
      }
    }

    await act(async () => {
      await fillData(formData);
    });

    const button = await findByTestId('SubmitButton');
    fireEvent.press(button);
    await waitFor(() =>
      expect(navigate).toBeCalledWith(SignUpRoutesEnum.GET_EMAIL, {
        documentNumber: '12345678',
      }));
  });
});
