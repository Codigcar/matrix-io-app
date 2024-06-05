import React from 'react';
import {
  render, fireEvent, waitFor, act,
} from 'jest/test-utils';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';
import PushNotificationService from 'src/screens/Notifications/services/PushNotification';
import * as AsyncStorageHandler from 'src/utils/AsyncStorageHandler';
import * as Onboarding from 'src/api/Onboarding';
import VerifyPushServices from 'src/api/VerifyPushServices';
import PersonalDataComplete from './PersonalDataComplete';

const Stack = createNativeStackNavigator();

describe('Personal Data Complete Component', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  const component = (
    <Stack.Navigator>
      <Stack.Screen name="PersonalDataComplete" component={PersonalDataComplete as any} />
    </Stack.Navigator>
  );
  it('should create a factor and polling until we have the succesful state', async () => {
    const updateToken = jest.spyOn(PushNotificationService, 'updateToken');
    const getValue = jest.spyOn(AsyncStorageHandler, 'getValue');
    getValue.mockResolvedValue('test');
    const navigate = jest.spyOn(CommonActions, 'navigate');
    const onboardingSummary = jest.spyOn(Onboarding, 'onboardingSummary');
    const getVerifyPushToken = jest.spyOn(VerifyPushServices, 'getVerifyPushToken');
    onboardingSummary.mockResolvedValue({ status: 'test', updatedAt: '' });
    updateToken.mockResolvedValue({});
    getVerifyPushToken.mockResolvedValue({
      message: {
        code: 'YF200',
        resource: 'test',
        metadata: {
          factorSid: '13',
          identity: '',
          service: '',
          token: '',
        },
      },
    });
    const { findByTestId } = render(component);
    const continueButton = await findByTestId('Continue');
    fireEvent.press(continueButton);
    await act(async () => jest.advanceTimersByTimeAsync(10000));

    onboardingSummary.mockResolvedValue({ status: 'MFA_REGISTERED', updatedAt: '' });

    await waitFor(() => expect(navigate).toBeCalledWith(
      'CardOfferStack',
    ));
  });
});
