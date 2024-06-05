import { Linking } from 'react-native';
import PushNotification from 'react-native-push-notification';

const linkConfig = {
  prefixes: ['ioapp://'],
  config: {
    screens: {
      NotificationStack: {
        screens: {
          NotificationDetail: {
            path: 'notification/:description/:createdAt/:user/:isRead',
          },
        },
      },
    },
  },
  getInitialURL: async (): Promise<string | null> => {
    PushNotification.popInitialNotification((notification) => {
      if (!notification?.data['pinpoint.deeplink']) return;
      const { data = {} } = notification || {};
      Linking.openURL(data['pinpoint.deeplink']);
    });

    return Linking.getInitialURL();
  },
  subscribe: (listener: (url: string) => void) => {
    const onReceiveURL = ({ url }: { url: string }): void => listener(url);
    Linking.addEventListener('url', onReceiveURL);

    return () => Linking.removeEventListener('url', onReceiveURL);
  },
};

export default linkConfig;
