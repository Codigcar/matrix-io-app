import { InferType, object, string } from 'yup';

export const ReplacementCardReissuesScheme = object({
  cardId: string().required(),
});

export type ReplacementCardReissuesRequestDto = InferType<typeof ReplacementCardReissuesScheme>;
