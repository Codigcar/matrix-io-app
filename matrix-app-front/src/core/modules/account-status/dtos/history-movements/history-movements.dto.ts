import {
  object, array, string, InferType,
} from 'yup';

export const HistoryMovementScheme = object({
  id: string().required(),
  period: string().required(),
});

export const HistoryMovementsScheme = array().of(HistoryMovementScheme);
export type HistoryMovementDto = InferType<typeof HistoryMovementScheme>;
export type HistoryMovementsDto = InferType<typeof HistoryMovementsScheme>;
