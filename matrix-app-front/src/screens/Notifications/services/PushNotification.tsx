import { baseApi } from 'src/api';
import { ios } from 'src/utils/constants';
const PushNotificationService = {
  updateToken: async (deviceToken: string) => {
    const pushTokenStoreUrl = '/v1/me/notifications/channels/push/devices';
    const params = {
      address: deviceToken,
      platform: ios ? 'APNS' : 'FCM',
    };

    const { data } = await baseApi.post(pushTokenStoreUrl, params);
    console.log('deviceToken updated: ' + deviceToken, params);
    return data;
  },
};

export default PushNotificationService;
