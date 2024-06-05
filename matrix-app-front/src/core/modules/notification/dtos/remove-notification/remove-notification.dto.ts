import { object, InferType , string, boolean } from 'yup';

export const RemoveNotificationsScheme = object({
  data: object({
    deleteNotification: object({
      id: string().required(),
      title: string().optional(),
      description: string().required(),
      isRead: boolean().required(),
      createdAt: string().required(),
      user: string().required(),
    })
  }),
});

export type RemoveNotificationsDto = InferType<typeof RemoveNotificationsScheme>;