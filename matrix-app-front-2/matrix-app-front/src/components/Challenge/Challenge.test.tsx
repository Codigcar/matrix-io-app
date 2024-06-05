import React, { useState } from 'react';
import { fireEvent, render, waitFor } from 'jest/test-utils';
import {
  Text, View, Pressable, DeviceEventEmitter,
} from 'react-native';
import PushNotificationsHandler from 'src/utils/notifications/PushNotificationsHandler';
import VerifyPushServices from 'src/api/VerifyPushServices';
import { RetryChallengeResponse } from 'src/api/types/verifyPushTypes';
import { act } from 'react-test-renderer';
import { ChallengeClosed, useChallenge } from './Challenge';

jest.mock('@twilio/twilio-verify-for-react-native');
jest.mock('axios');

jest.mock(
  '@twilio/twilio-verify-for-react-native',
  () => ({
    default: {
      updateChallenge: jest.fn(),
    },
    ChallengeStatus: {
      Approved: 'app',
    },
    updateChallenge: jest.fn(),
    UpdatePushChallengePayload: jest.fn(),
  }),
  { virtual: true },
);

const TestComponent = ({ createChallenge }: { createChallenge: () => Promise<any> | void }) => {
  const { waitForChallenge } = useChallenge();
  const [status, setStatus] = useState<
    'loaded' | 'general-error' | 'challenge-error' | 'loading' | 'approved' | 'rejected'
  >('loaded');
  return (
    <View>
      <Pressable
        testID="create-challenge"
        onPress={async () => {
          try {
            setStatus('loading');
            await createChallenge();
            await waitForChallenge?.();
            setStatus('approved');
          } catch (error) {
            if (error instanceof ChallengeClosed) {
              setStatus('challenge-error');
            } else {
              setStatus('general-error');
            }
          }
        }}
      />
      <Text testID="status">{status}</Text>
    </View>
  );
};

describe('Challenge', () => {
  const verifChallenge = jest.spyOn(VerifyPushServices, 'verificationChallenge');
  const retry = jest.spyOn(VerifyPushServices, 'retryChallenge');
  beforeAll(() => {
    jest.useFakeTimers();
  });
  it('should be able to approve challenge', async () => {
    // eslint-disable-next-line no-new
    new PushNotificationsHandler();
    const { findByTestId } = render(
      <TestComponent
        createChallenge={() => {
          const REMOTE_NOTIFICATION_RECEIVED = 'remoteNotificationReceived';
          DeviceEventEmitter.emit(REMOTE_NOTIFICATION_RECEIVED, {
            title: 'pinpoint.notification.title',
            body: 'pinpoint.notification.body',
            userInfo: {
              challenge_sid: 'YC',
              factor_sid: 'YF',
              type: 'verify_push_challenge',
            },
            foreground: {},
          });
        }}
      />,
    );
    const button = await findByTestId('create-challenge');
    const status = await findByTestId('status');
    await waitFor(() => expect(status).toHaveTextContent('loaded'));
    fireEvent.press(button);
    await waitFor(() => expect(status).toHaveTextContent('loading'));
    const confirmTwilio = await findByTestId('confirm-twilio-button');
    await waitFor(() => expect(confirmTwilio.props.accessibilityState.disabled).toBe(false));
    fireEvent.press(confirmTwilio);
    verifChallenge.mockResolvedValue({
      status: 'CHALLENGE_APPROVED',
      challengeId: 'cid',
      user: '',
    });

    await waitFor(() => expect(status).toHaveTextContent('approved'));
  });
  it('should close modal when push is not coming', async () => {
    // eslint-disable-next-line no-new
    new PushNotificationsHandler();
    const { findByTestId } = render(
      <TestComponent
        createChallenge={() => {
          const REMOTE_NOTIFICATION_RECEIVED = 'remoteNotificationReceived';
          DeviceEventEmitter.emit(REMOTE_NOTIFICATION_RECEIVED, {
            title: 'pinpoint.notification.title',
            body: 'pinpoint.notification.body',
            userInfo: {
              challenge_sid: 'YC',
              factor_sid: 'YF',
              type: 'verify_push_challenge',
            },
            foreground: {},
          });
        }}
      />,
    );
    const button = await findByTestId('create-challenge');
    const status = await findByTestId('status');
    await waitFor(() => expect(status).toHaveTextContent('loaded'));
    fireEvent.press(button);
    await waitFor(() => expect(status).toHaveTextContent('loading'));
    const confirmTwilio = await findByTestId('confirm-twilio-button');
    await waitFor(() => expect(confirmTwilio.props.accessibilityState.disabled).toBe(false));
    fireEvent.press(confirmTwilio);
    verifChallenge.mockResolvedValue({ status: 'CHALLENGE_CREATED', challengeId: 'cid', user: '' });
    await act(async () => {
      await jest.advanceTimersByTimeAsync(47000);
    });
    await waitFor(() => expect(status).toHaveTextContent('general-error'));
  });
  it('should be able to retry', async () => {
    // eslint-disable-next-line no-new
    new PushNotificationsHandler();
    const { findByTestId } = render(
      <TestComponent
        createChallenge={() => {
          const REMOTE_NOTIFICATION_RECEIVED = 'remoteNotificationReceived';
          DeviceEventEmitter.emit(REMOTE_NOTIFICATION_RECEIVED, {
            title: 'pinpoint.notification.title',
            body: 'pinpoint.notification.body',
            userInfo: {
              challenge_sid: 'YC',
              factor_sid: 'YF',
              type: 'verify_push_challenge',
            },
            foreground: {},
          });
        }}
      />,
    );
    const button = await findByTestId('create-challenge');
    const status = await findByTestId('status');
    await waitFor(() => expect(status).toHaveTextContent('loaded'));
    fireEvent.press(button);
    await waitFor(() => expect(status).toHaveTextContent('loading'));
    const confirmTwilio = await findByTestId('confirm-twilio-button');
    await waitFor(() => expect(confirmTwilio.props.accessibilityState.disabled).toBe(false));
    const retryButton = await findByTestId('retry-action');
    await act(async () => {
      await jest.advanceTimersByTimeAsync(45000);
    });
    await waitFor(() => expect(retryButton).toHaveProp('disabled', false));
    retry.mockResolvedValue({} as RetryChallengeResponse);
    fireEvent.press(retryButton);
    await jest.runAllTimersAsync();
    act(() => {
      const REMOTE_NOTIFICATION_RECEIVED = 'remoteNotificationReceived';
      DeviceEventEmitter.emit(REMOTE_NOTIFICATION_RECEIVED, {
        title: 'pinpoint.notification.title',
        body: 'pinpoint.notification.body',
        userInfo: {
          challenge_sid: 'YC',
          factor_sid: 'YF',
          type: 'verify_push_challenge',
        },
        foreground: {},
      });
    });
    await waitFor(() => expect(confirmTwilio.props.accessibilityState.disabled).toBe(false));
    fireEvent.press(confirmTwilio);
    jest.runAllTicks();
    verifChallenge.mockResolvedValue({
      status: 'CHALLENGE_APPROVED',
      challengeId: 'cid',
      user: '',
    });
    await act(async () => {
      await jest.advanceTimersByTimeAsync(50000);
    });
    await waitFor(() => expect(status).toHaveTextContent('approved'));
  });
});
