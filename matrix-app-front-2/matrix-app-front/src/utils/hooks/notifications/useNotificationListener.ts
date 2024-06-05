import { useEffect, useState, useRef } from 'react';
import { NativeEventEmitter, NativeModules, Platform } from 'react-native';
import { logEventAnalytics } from '../../Analytics';
import { useSelector } from 'react-redux';
import { signInUserNameCognitoSelector } from 'src/utils/auth/selector/authSelector';

const { PushPermissionListenerModule, stopObserving } = NativeModules;

const pushNotificationPermissionEmitter = new NativeEventEmitter(PushPermissionListenerModule);

function useNotificationListener() {
  const [status, setStatus] = useState<boolean | null>(null);
  const previousStatus = useRef<boolean | null>(null);
  const userName = useSelector(signInUserNameCognitoSelector);

  const trackOnAnalytics = (status: boolean | null) => {
    if (status) {
      logEventAnalytics('PushNotifications_ON', { userName });
      return;
    }
    if (status === false) {
      logEventAnalytics('PushNotifications_OFF', { userName });
    }
  };

  useEffect(() => {
    const subscription = pushNotificationPermissionEmitter.addListener(
      'PermissionStatusChanged',
      (isPermissionGranted) => {
        setStatus(isPermissionGranted);
      },
    );

    return () => {
      subscription.remove();
      if (Platform.OS == 'android') {
        stopObserving();
      }
    };
  }, []);

  useEffect(() => {
    if (previousStatus.current !== status) {
      previousStatus.current = status;
      trackOnAnalytics(status);
    }
  }, [status]);

  return status;
}

export default useNotificationListener;
