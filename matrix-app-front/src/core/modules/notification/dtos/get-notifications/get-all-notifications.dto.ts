import { object, string, array, boolean, InferType } from 'yup';

export const NotificationItemScheme = object({
  id: string().required(),
  title: string().optional(),
  description: string().required(),
  isRead: boolean().required(),
  createdAt: string().required(),
  user: string().required(),
});

export const NotificationsListScheme = object({
  nextToken: string().nullable(),
  items: array(NotificationItemScheme).required(),
});

export const NotificationsDataScheme = object({
  data: object({
    listNotifications: NotificationsListScheme.required(),
  }),
});

export type GetNotificationsDto = InferType<typeof NotificationsDataScheme>;
