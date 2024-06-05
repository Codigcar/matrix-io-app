import {
  checkNotifications,
  requestNotifications,
  RESULTS,
} from 'react-native-permissions';

export enum ResponseType {
  BLOCKED,
  DENIED,
  SUCCESS,
  UNAVAILABLE,
}

/**
 * Check notifications permission status and get response type value.
 *
 */
export const checkNotificationPermission = async (): Promise<ResponseType> => {
  const result = await checkNotifications();
  switch (result.status) {
    case RESULTS.GRANTED:
    case RESULTS.LIMITED:
      return ResponseType.SUCCESS;
    case RESULTS.DENIED:
      return ResponseType.DENIED;
    case RESULTS.BLOCKED:
      return ResponseType.BLOCKED;
    default:
      return ResponseType.UNAVAILABLE;
  }
};

/**
 * Request notifications permission status and get response type value.
 *
 */
export const requestNotificationPermission = async (): Promise<ResponseType> => {
  const result = await requestNotifications([
    'alert',
    'badge',
    'sound',
    'providesAppSettings',
  ]);
  switch (result.status) {
    case RESULTS.GRANTED:
    case RESULTS.LIMITED:
      return ResponseType.SUCCESS;
    case RESULTS.DENIED:
      return ResponseType.DENIED;
    case RESULTS.BLOCKED:
      return ResponseType.BLOCKED;
    default:
      return ResponseType.UNAVAILABLE;
  }
};
