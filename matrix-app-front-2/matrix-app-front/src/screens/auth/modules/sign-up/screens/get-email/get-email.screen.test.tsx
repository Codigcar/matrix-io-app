/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import React from 'react';
import { fireEvent, render, waitFor } from 'jest/test-utils';
import { SignUpRoutesEnum } from 'src/shared/enums/routes/signup-routes.enum';
import { act } from 'react-test-renderer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';
import GetEmailScreen from './get-email.screen';

const AuthStack = createNativeStackNavigator<ReactNavigation.AuthNavigator>();

describe('Get Email', () => {
  const component = (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name={SignUpRoutesEnum.GET_EMAIL}
        initialParams={{
          documentNumber: '12345678',
        }}
        component={GetEmailScreen}
      />
    </AuthStack.Navigator>
  );

  it('should allow to navigate to next screen when fields are valid', async () => {
    const navigate = jest.spyOn(CommonActions, 'navigate');
    const { findByTestId } = render(component);
    const formData = [
      {
        testID: 'emailInput',
        content: 'test@test.com',
      },
      {
        testID: 'emailConfirmInput',
        content: 'test@test.com',
      },
    ];

    async function fillData(data: typeof formData) {
      for (const field of data) {
        const { testID, content } = field;
        const element = await findByTestId(testID);
        fireEvent.changeText(element, content);
      }
    }

    const privacy = await findByTestId('btn-privacy');
    fireEvent.press(privacy);

    await act(async () => {
      await fillData(formData);
    });

    const button = await findByTestId('SubmitButton');
    fireEvent.press(button);
    await waitFor(() =>
      expect(navigate).toBeCalledWith(SignUpRoutesEnum.PASSWORD_VERIFICATION, {
        email: 'test@test.com',
        documentNumber: '12345678',
      }));
  });
});
