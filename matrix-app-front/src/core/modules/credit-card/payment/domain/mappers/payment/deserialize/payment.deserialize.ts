import { deserialize } from 'src/core/helpers/transform';
import { PaymentDto, PaymentScheme } from '../../../../dtos/payment/payment.dto';
import { IPayment } from '../../../../dtos/payment/payment.interface';

export const dtoToPayment = (dto: PaymentDto): IPayment =>
  deserialize(dto, {
    outputSchema: PaymentScheme,
    serializationLogic: (validatedDto) => ({
      id: validatedDto.id,
      amount: validatedDto.amount,
      createAt: validatedDto.createAt,
    }),
    defaultOutput: {} as PaymentDto,
  });
