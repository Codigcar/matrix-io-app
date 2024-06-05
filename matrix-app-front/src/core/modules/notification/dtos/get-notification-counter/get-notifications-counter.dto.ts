import { object, number, InferType } from 'yup';

export const NotificationCounterScheme = object({
  data: object({
    getNewNotificationsCounter: number().required(),
  }),
});

export type NotificationCounterDto = InferType<typeof NotificationCounterScheme>;