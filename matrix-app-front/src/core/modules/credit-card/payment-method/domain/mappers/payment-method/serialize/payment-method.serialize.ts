import { serialize } from 'src/core/helpers/transform';
import { IPaymentMethodRequest, PaymentMethodRequestDto } from '../../../../dtos';

export const paymentMethodRequestToDto = (entity: IPaymentMethodRequest): PaymentMethodRequestDto =>
  serialize(entity, {
    serializationLogic: (validatedEntity) => ({
      token: validatedEntity.token,
    }),
    defaultOutput: {} as PaymentMethodRequestDto,
  });
