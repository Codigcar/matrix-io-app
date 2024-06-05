import { API, graphqlOperation } from 'aws-amplify';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { signInUserNameCognitoSelector } from 'src/utils/auth/selector/authSelector';
import { notificationCounter, notificationCounterSubscription } from '../../graphql/schema';
import { NotificationStateDate, QueryGetNotificationCounter, SubscriptionValue } from '../../interfaces';
import { logCrashlytics } from 'src/utils/Analytics';
import { useFocusEffect } from '@react-navigation/native';
import { InteractionManager } from 'react-native';
import PushNotification from '@aws-amplify/pushnotification';

export const useNotificationsCounter = () => {
  const userName = useSelector(signInUserNameCognitoSelector);
  const [notificationAmount, setNotificationAmount] = useState<NotificationStateDate>({
    notifications: 0,
    widthBadge: 0,
  });

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
      const { data: { getNewNotificationsCounter } } = await API.graphql(
        graphqlOperation(notificationCounter)) as {
          data: QueryGetNotificationCounter
        };
      handleSizes(getNewNotificationsCounter)
    } catch (error) {
      logCrashlytics({
        scope: 'API', 
        fileName: 'hooks/useNotificationsCounter.ts', 
        service: 'notification counter', error,
      });
    }
  }, []);

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(notificationCounterSubscription, {
        filter: {
          type: { user: userName },
        },
      }),
    )?.subscribe?.({
      next: ({ value }: SubscriptionValue) => {
        handleSizes(value?.data?.onUpdateNewNotificationsCounter?.value || 0);
      },
      error: (error: object) => {
        logCrashlytics({
          scope: 'API', 
          fileName: 'hooks/useNotificationsCounter.ts', 
          service: 'notification counter subscribe', error,
        });
      },
    });

    return () => subscription?.unsubscribe?.();
  }, []);

  useEffect(()=> {
    PushNotification.onNotification(notificationAmountQuery);
  }, []);

  useFocusEffect(
    useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        notificationAmountQuery();
      });
  
      return () => task.cancel();
    }, [])
  );

  return notificationAmount;
};

export default useNotificationsCounter;
