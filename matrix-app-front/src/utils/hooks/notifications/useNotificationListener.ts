import { useEffect, useState, useRef } from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';
import { useSelector } from 'react-redux';
import { signInUserNameCognitoSelector } from 'src/utils/auth/selector/authSelector';
import { logEventAnalytics } from '../../Analytics';

const { PushPermissionListenerModule } = NativeModules;

const pushNotificationPermissionEmitter = new NativeEventEmitter(PushPermissionListenerModule);

function useNotificationListener() {
  const [status, setStatus] = useState<boolean | null>(null);
  const previousStatus = useRef<boolean | null>(null);
  const userName = useSelector(signInUserNameCognitoSelector);

  const trackOnAnalytics = (statusParams: boolean | null) => {
    if (statusParams) {
      logEventAnalytics('PushNotifications_ON', { userName });
      return;
    }
    if (statusParams === false) {
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
