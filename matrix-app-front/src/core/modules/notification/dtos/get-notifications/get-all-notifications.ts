interface IGetNotifications extends Array<INotificationData>{}

export interface INotificationItem {
  id: string;
  title: string;
  description: string;
  isRead: boolean;
  createdAt: string;
  user: string;
}

export interface IListNotifications {
  nextToken: null | string;
  items: INotificationItem[];
}

export interface INotificationData {
  data: {
    listNotifications: IListNotifications;
  };
}

export default IGetNotifications;