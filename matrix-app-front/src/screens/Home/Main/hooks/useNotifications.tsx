import { useCallback, useEffect } from 'react';
import {
  ResponseType,
  checkNotificationPermission,
  requestNotificationPermission,
} from 'src/shared/providers/permission-provider';
import PushNotificationService from 'src/screens/Notifications/services/PushNotification';

import PushNotification from '@aws-amplify/pushnotification';
import { getValue, saveValue } from 'src/utils/AsyncStorageHandler';

import { Linking, NativeModules } from 'react-native';
import PushNotificationFG, { Importance } from 'react-native-push-notification';
import { APPLICATION_ID, android, ios } from 'src/utils/constants';
import { logCrashlytics } from 'src/utils/Analytics';
import { ToastType, showToast } from 'src/matrix-ui-components/components/toast';
import { i18n } from 'src/utils/core/MTXStrings';

export const useNotifications = () => {
  const openSettings = () => {
    if (ios) {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };

  const isNotRequestPermissionAllowed = (checkPermissionType: ResponseType) =>
    checkPermissionType === ResponseType.DENIED || checkPermissionType === ResponseType.BLOCKED;

  const requestNotification = useCallback((onSuccess: Function) => {
    checkNotificationPermission().then((checkPermissionType: ResponseType) => {
      if (isNotRequestPermissionAllowed(checkPermissionType)) {
        requestNotificationPermission().then((requestPermissionType: ResponseType) => {
          if (requestPermissionType === ResponseType.SUCCESS) {
            onSuccess();
          } else {
            showToast({
              type: ToastType.TypeWarning,
              title: i18n.t('notification.permissions.title'),
              message: i18n.t('notification.permissions.message'),
              onPress: openSettings,
            });
          }
        });
      }
      if (checkPermissionType === ResponseType.SUCCESS) {
        onSuccess();
      }
    });
  }, []);

  const updateToken = useCallback(async () => {
    const deviceToken = await getValue('deviceToken');
    if (deviceToken) {
      await PushNotificationService.updateToken(deviceToken);
    }
  }, []);

  const storeAndSendToken = async (deviceToken: string) => {
    await saveValue('deviceToken', deviceToken);
    updateToken();
  };

  const init = () => {
    if (ios) {
      PushNotification.onRegister(storeAndSendToken);
    }

    if (android) {
      PushNotificationFG.createChannel(
        {
          channelId: APPLICATION_ID,
          channelName: APPLICATION_ID,
          playSound: true,
          soundName: 'default',
          importance: Importance.HIGH,
          vibrate: true,
        },
        () => {},
      );
      NativeModules.RNPushNotification.getToken(
        (token: string) => storeAndSendToken(token),
        (err: string) => {
          logCrashlytics({
            scope: 'API',
            fileName: 'src/screens/Home/Main/hooks/useNotifications.tsx',
            error: err,
          });
        },
      );
    }
  };

  useEffect(() => {
    init();
  }, []);

  return {
    requestNotification,
    updateToken,
    openSettings,
  };
};

export default useNotifications;
