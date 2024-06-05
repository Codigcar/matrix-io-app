import React, {
  createContext, useCallback, useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import CustomStatusBar from 'src/components/CustomStatusBar/CustomStatusBar';
import {
  Box, Button, rebrandingTheme, Text,
} from 'matrix-ui-components';
import { Modal } from 'react-native';
import { s } from 'src/utils/sizes';
import { CheckWarning } from 'assets/svgs';
import { i18n } from 'src/utils/core/MTXStrings';
import { EventBusKeys, subscribe, subscribeOnce } from 'src/utils/event-bus';
import TwilioVerify, { ChallengeStatus, UpdatePushChallengePayload } from '@twilio/twilio-verify-for-react-native';
import waitResponsePolling from 'src/utils/polling';
import { ThemeProvider } from '@shopify/restyle';
import VerifyPushServices from 'src/api/VerifyPushServices';
import { useSelector } from 'react-redux';

type ChallengeContextValue = {
  waitForChallenge: null | (() => Promise<any>)
}

const ChallengeContext = createContext<ChallengeContextValue>({
  waitForChallenge: null,
});
const BOUNCE_RATE = 2000;

export const useDebounce = () => {
  const busy = useRef(false);

  const debounce = async (callback: Function) => {
    setTimeout(() => {
      busy.current = false;
    }, BOUNCE_RATE);

    if (!busy.current) {
      busy.current = true;
      callback();
    }
  };

  return { debounce };
};

export const useChallenge = () => useContext(ChallengeContext);

interface ChallengeProps {
  children: React.ReactNode;
}

const ONE_SECOND = 1000;
const TIMEOUT_COUNTER_SECONDS = 45;
const ERROR_TIMEOUT_MINUTES = 60;
const TIMEOUT_COUNTER_MS = TIMEOUT_COUNTER_SECONDS * ONE_SECOND;

export const ERROR_CHALLENGE_CLOSED = 'Closed-Challenge';
export class ChallengeClosed extends Error {
  constructor() {
    super(ERROR_CHALLENGE_CLOSED);
    this.name = ERROR_CHALLENGE_CLOSED;
  }
}
interface TwilioChallengeParams {
  factorSid: string;
  challengeSid: string;
}

const ChallengeProvider: React.FC<ChallengeProps> = ({ children }) => {
  const [counter, setCounter] = useState(TIMEOUT_COUNTER_SECONDS);
  const [retryError, setRetryError] = useState(false);
  const [showConfirmation, setShowConfirmationModal] = useState(false);
  const [loadingTwilio, setLoadingTwilio] = useState(false);
  const { debounce } = useDebounce();

  const reject = useRef<null |((reason?: any) => void)>(null);
  const resolve = useRef<null |((value?: unknown) => void)>(null);
  const promise = useRef<any>(null);
  const interval = useRef<NodeJS.Timeout | null>(null);
  const twilioParams = useRef<TwilioChallengeParams | null>(null);

  const isLoggedIn = useSelector((state) => state.auth.signIn.token);

  const startCounter = useCallback((innerCounter: number) => {
    let lCounter = innerCounter;
    setCounter(lCounter);
    if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
    }
    interval.current = setInterval(() => {
      setCounter(lCounter - 1);
      if (lCounter - 1 <= 0) {
        clearInterval(interval.current!);
      }
      lCounter -= 1;
    }, ONE_SECOND);
  }, []);

  const stopTimer = useCallback(() => {
    if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
    }
  }, []);

  useEffect(() => {
    const twilioSub = subscribe<TwilioChallengeParams>(
      EventBusKeys.PUSH_RECEIVING,
      async (twilioIncomParams) => {
        startCounter(TIMEOUT_COUNTER_SECONDS);
        setShowConfirmationModal(true);
        setRetryError(false);
        twilioParams.current = twilioIncomParams;
      },
    );
    return () => {
      twilioSub.unsubscribe();
    };
  }, [startCounter]);

  const waitForChallenge = useCallback(async () => {
    setShowConfirmationModal(true);
    setLoadingTwilio(true);
    if (!twilioParams.current) {
      await subscribeOnce<TwilioChallengeParams>(
        EventBusKeys.PUSH_RECEIVING,
        TIMEOUT_COUNTER_MS,
      );
    }
    setLoadingTwilio(false);
    setRetryError(false);
    promise.current = new Promise((res, rej) => {
      reject.current = rej;
      resolve.current = res;
    });
    return promise.current;
  }, []);

  const confirmTwilioChallenge = async () => {
    if (loadingTwilio) return;
    stopTimer();
    setLoadingTwilio(true);
    try {
      const { factorSid, challengeSid } = twilioParams.current!;
      await TwilioVerify.updateChallenge(
        new UpdatePushChallengePayload(factorSid, challengeSid, ChallengeStatus.Approved),
      );
      await waitResponsePolling(
        TIMEOUT_COUNTER_MS,
        ONE_SECOND,
        () => VerifyPushServices.verificationChallenge(challengeSid),
        (data) => data.status === 'CHALLENGE_APPROVED',
      );
      setShowConfirmationModal(false);
      setLoadingTwilio(false);
      twilioParams.current = null;
      resolve.current?.();
    } catch (error) {
      setLoadingTwilio(false);
      setShowConfirmationModal(false);
      twilioParams.current = null;
      reject.current?.(error);
    }
  };

  const close = () => {
    reject.current?.(new ChallengeClosed());
    setShowConfirmationModal(false);
    setRetryError(false);
    setLoadingTwilio(false);
    setCounter(TIMEOUT_COUNTER_SECONDS);
    twilioParams.current = null;
    if (interval.current) {
      clearTimeout(interval.current);
    }
  };

  const onRetry = useCallback(async () => {
    try {
      if (twilioParams.current?.challengeSid) {
        await VerifyPushServices.retryChallenge(String(twilioParams.current?.challengeSid));
        twilioParams.current = null;
      }
    } catch (error) {
      twilioParams.current = null;
      setRetryError(true);
    }
  }, []);

  const providerValue = useMemo(() => ({ waitForChallenge }), [waitForChallenge]);

  const enableButton = twilioParams.current !== null && counter !== 0;
  const enableButtonRetry = counter === 0 && !retryError;

  useEffect(() => {
    if (!isLoggedIn) {
      close();
    }
  }, [isLoggedIn]);
  return (
    <ChallengeContext.Provider value={providerValue}>
      {children}
      <ThemeProvider theme={rebrandingTheme}>
        <Modal
          visible={showConfirmation}
          statusBarTranslucent
          onRequestClose={close}
          transparent
        >
          <CustomStatusBar theme="dark" />
          <Box
            flex={1}
            alignItems="center"
            justifyContent="center"
            backgroundColor="blackWithOpacity"
          >
            <Box height={s(422)} pt="spacing-xxxs" width={s(327)} borderRadius={24} backgroundColor="primary000" alignItems="center">
              <Box mt="spacing-xxxm" mb="spacing-m" alignItems="center" justifyContent="center">
                <CheckWarning />
              </Box>
              <Box mt="spacing-xs" mb="spacing-s">
                <Text variant="Heading18Medium" textAlign="center">
                  {i18n.t('card-offer-auth-validation')}
                </Text>
              </Box>

              <Box mb="spacing-s">
                <Text variant="body14Regular" textAlign="center">
                  {
                    retryError
                      ? i18n.t('card-offer-auth-validation-error-retries')
                      : i18n.t('card-offer-auth-validation-message')
                  }
                </Text>
              </Box>
              <Box flexDirection="row">
                <Text
                  testID="retry-action"
                  variant="Link14SemiBold"
                  onPress={enableButtonRetry ? () => debounce(onRetry) : undefined}
                  color={enableButtonRetry ? 'complementaryIndigo600' : 'primary400'}
                  disabled={!enableButtonRetry}
                >
                  {i18n.t('card-offer-auth-validation-enable')}
                </Text>
                <Box ml="spacing-xxxs">
                  <Text variant="body14Regular" color={enableButtonRetry || retryError ? 'primary800' : 'primary400'} textAlign="center">
                    {
                      retryError
                        ? i18n.t('card-offer-auth-validation-counter-min', { counter: ERROR_TIMEOUT_MINUTES })
                        : i18n.t('card-offer-auth-validation-counter', { counter })
                    }
                  </Text>
                </Box>
              </Box>
              <Box px="spacing-m" pb="spacing-xxm" width="100%" flex={1} justifyContent="flex-end">
                {
                  retryError
                    ? (
                      <Button
                        variant="primary"
                        label={i18n.t('card-offer-auth-validation-finish')}
                        width="100%"
                        onPress={close}
                      />
                    )
                    : (
                      <Button
                        variant={enableButton && !loadingTwilio ? 'primary' : 'disabled'}
                        label={i18n.t('card-offer-auth-validation-confirm')}
                        testID="confirm-twilio-button"
                        width="100%"
                        disabled={!(enableButton && !loadingTwilio)}
                        onPress={() => debounce(confirmTwilioChallenge)}
                      />
                    )
                }
              </Box>
            </Box>
          </Box>
        </Modal>
      </ThemeProvider>
    </ChallengeContext.Provider>
  );
};

export default ChallengeProvider;
