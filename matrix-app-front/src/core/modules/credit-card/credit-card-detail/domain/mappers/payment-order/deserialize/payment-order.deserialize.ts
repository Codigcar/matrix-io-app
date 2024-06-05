import { deserialize } from 'src/core/helpers/transform';
import {
  IPaymentOrder, IPaymentOrderDto, IPaymentOrdersDto, PaymentOrderScheme,
} from '../../../../dtos';

export const dtoToPaymentOrder = (dto: IPaymentOrderDto): IPaymentOrder =>
  deserialize(dto, {
    outputSchema: PaymentOrderScheme,
    serializationLogic: (validatedDto) => ({
      accountId: validatedDto.accountId,
      total: validatedDto.total,
      endDate: validatedDto.endDate,
      dueDate: validatedDto.dueDate,
      pending: validatedDto.pending,
      statementDate: validatedDto.statementDate,
      id: validatedDto.id,
      type: validatedDto.type,
      minimum: validatedDto?.minimum,
      hasPaymentInProcess: validatedDto.hasPaymentInProgress,
      startDate: validatedDto.startDate,
      status: validatedDto.status,
    }),
    defaultOutput: {
      accountId: '',
      total: {
        amount: 0,
        currency: 'PEN',
      },
      endDate: '',
      dueDate: '',
      pending: {
        amount: 0,
        currency: 'PEN',
      },
      statementDate: '',
      id: '',
      type: '',
      minimum: {
        amount: 0,
        currency: 'PEN',
      },
      hasPaymentInProcess: false,
      startDate: '',
      status: '',
    },
  });

export const dtoToPaymentOrders = (dtos: IPaymentOrdersDto): IPaymentOrder[] =>
  (dtos || []).map((dto) => dtoToPaymentOrder(dto));
