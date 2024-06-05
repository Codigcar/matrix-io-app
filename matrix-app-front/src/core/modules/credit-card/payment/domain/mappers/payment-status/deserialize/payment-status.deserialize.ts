import { deserialize } from 'src/core/helpers/transform';
import { PaymentStatusDto, PaymentStatusScheme, IPaymentStatus } from '../../../../dtos';

export const dtoToPaymentStatus = (dto: PaymentStatusDto): IPaymentStatus =>
  deserialize(dto, {
    outputSchema: PaymentStatusScheme,
    serializationLogic: (validatedDto) => ({
      id: validatedDto.id,
      amount: validatedDto.amount,
      createAt: validatedDto.createAt,
      updatedAt: validatedDto.updatedAt,
      user: validatedDto.user,
      account: validatedDto.account,
      currency: validatedDto.currency,
      method: validatedDto.method,
      pendingAmount: validatedDto.pendingAmount,
      error: {
        code: validatedDto.error?.code || undefined,
      },
      chargeOperation: validatedDto.chargeOperation,
      status: validatedDto.status as 'FAILED' | 'COMPLETED' | 'APPROVED' | 'DECLINED',
    }),
    defaultOutput: {
      id: '',
      amount: 0,
      createAt: new Date(),
      updatedAt: new Date(),
      user: '',
      account: '',
      currency: '',
      method: '',
      pendingAmount: 0,
      error: {
        code: undefined,
      },
      chargeOperation: '',
      status: 'FAILED',
    },
  });
