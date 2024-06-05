import PushNotification from '@aws-amplify/pushnotification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotificationFG, {
  ReceivedNotification,
  PushNotificationObject,
} from 'react-native-push-notification';
import { APPLICATION_ID, android, ios } from '../constants';
import { EventBusKeys, publish } from '../event-bus';
import { Appearance } from 'react-native';

const handleVerifyPush = (payload: any) => {
  const challengeSid = payload.challenge_sid;
  const factorSid = payload.factor_sid;
  const { type } = payload;

  if (!(type === 'verify_push_challenge' && factorSid && challengeSid)) return false;

  publish(EventBusKeys.PUSH_RECEIVING, {
    factorSid,
    challengeSid,
  });
  return true;
};

class PushNotificationsHandler {
  colorScheme: string | null | undefined;

  constructor() {
    
    this.colorScheme = Appearance.getColorScheme();
    Appearance.addChangeListener((preferences) => {
      this.colorScheme = preferences.colorScheme;
    });

    PushNotification.onNotification(
      (notification: ReceivedNotification & { _data?: Record<string, any> }) => {
        const isTwilio = handleVerifyPush(notification._data ?? notification.data);

        if (isTwilio) return;

        if (android) {
          PushNotificationFG.localNotification({
            channelId: APPLICATION_ID,
            message: notification.body,
            title: notification.title,
            smallIcon: 'ic_stat_ic_notification',
            color: this.colorScheme == 'dark' ? '#FFFFFF' : '#000000',
          });
        }

        if (ios) {
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        }
      },
    );

    PushNotification.onNotificationOpened((notification: PushNotificationObject) => {});
  }
}

export default PushNotificationsHandler;
