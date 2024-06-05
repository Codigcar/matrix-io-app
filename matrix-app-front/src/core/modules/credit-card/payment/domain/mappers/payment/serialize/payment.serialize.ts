import { serialize } from 'src/core/helpers/transform';
import { IPaymentRequest } from '../../../../dtos/payment/payment-request.interface';
import { PaymentRequestDto } from '../../../../dtos/payment/payment-request.dto';

export const paymentRequestToDto = (entity: IPaymentRequest): PaymentRequestDto =>
  serialize(entity, {
    serializationLogic: (validatedEntity) => ({
      amount: validatedEntity.amount,
      card: validatedEntity.card,
      account: validatedEntity.account,
      method: validatedEntity.method,
      currency: validatedEntity.currency,
    }),
    defaultOutput: {} as PaymentRequestDto,
  });
