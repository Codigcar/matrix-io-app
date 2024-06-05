import { object, InferType , string, number } from 'yup';

export const ResetNotificationMutationScheme = object({
  data: object({
    resetNewNotificationsCounter: object({
      time: string().required(),
      user: string().required(),
      value: number().required(),
    })
  })
});

export type ResetNotificationMutationDto = InferType<typeof ResetNotificationMutationScheme>;