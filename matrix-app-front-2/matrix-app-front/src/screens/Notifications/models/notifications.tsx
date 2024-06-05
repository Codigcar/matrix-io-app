export interface NotificationType {
  id: string;
  description: string;
  isRead: boolean;
  createdAt: string;
  user: string;
}

export interface NotificationsType {
  nextToken: string;
  items: NotificationType[];
}
