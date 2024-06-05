export interface QueryGetNotificationCounter {
  getNewNotificationsCounter: number
}
export interface NotificationStateDate {
  notifications: number;
  widthBadge: number;
}

export type SubscriptionValue = {
  value: {
    data: {
      onUpdateNewNotificationsCounter: {
        value: number
      }
    };
  };
};
