import { object, InferType , string, boolean } from 'yup';

export const ReadNotificationsScheme = object({
  data: object({
    updateNotification: object({
      id: string().required(),
      title: string().optional(),
      description: string().required(),
      isRead: boolean().required(),
      createdAt: string().required(),
      user: string().required(),
    })
  }),
});

export type ReadNotificationsDto = InferType<typeof ReadNotificationsScheme>;