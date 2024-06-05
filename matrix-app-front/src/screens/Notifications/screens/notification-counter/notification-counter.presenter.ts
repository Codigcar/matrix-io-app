import { useCallback, useEffect, useState } from 'react';
import { logCrashlytics } from 'src/utils/Analytics';
import { useFocusEffect } from '@react-navigation/native';
import { InteractionManager } from 'react-native';
import PushNotification from '@aws-amplify/pushnotification';
import { NotificationStateDate } from '../../interfaces';
import useGetNotificationCounterInteractor from './notification-counter.interactor';

export const useNotificationsCounter = () => {
  const [notificationAmount, setNotificationAmount] = useState<NotificationStateDate>({
    notifications: 0,
    widthBadge: 0,
  });

  const notificationCounter = useGetNotificationCounterInteractor();

  const handleSizes = (amountNotification: number) => {
    let badgeWidth;
    const notificationsCharterLength = amountNotification.toString().length;
    if (notificationsCharterLength === 3) {
      badgeWidth = 28;
    } else if (notificationsCharterLength === 2) {
      badgeWidth = 23;
    } else badgeWidth = 19;
    const notificationsProps = {
      notifications: amountNotification,
      widthBadge: badgeWidth,
    };

    setNotificationAmount(notificationsProps);
  };

  const notificationAmountQuery = useCallback(async () => {
    try {
      const response = await notificationCounter.executeGetNotificationCounter();
      const { data: { getNewNotificationsCounter } } = response;
      handleSizes(getNewNotificationsCounter);
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'hooks/useNotificationsCounter.ts',
        service: 'notification counter',
        error,
      });
    }
  }, []);

  useEffect(() => {
    PushNotification.onNotification(notificationAmountQuery);
  }, []);

  useFocusEffect(
    useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        notificationAmountQuery();
      });
      return () => task.cancel();
    }, []),
  );

  return notificationAmount;
};

export default useNotificationsCounter;
