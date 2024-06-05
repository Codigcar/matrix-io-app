import { deserialize } from 'src/core/helpers/transform';
import {
  IPaymentMethod,
  PaymentMethodDto,
  PaymentMethodScheme,
  PaymentMethodsDto,
} from '../../../../dtos';

export const dtoToPaymentMethod = (dto: PaymentMethodDto): IPaymentMethod =>
  deserialize(dto, {
    outputSchema: PaymentMethodScheme,
    serializationLogic: (validatedDto) => ({
      alias: validatedDto.alias,
      brand: validatedDto.brand,
      id: validatedDto.id,
      provider: validatedDto.provider,
      type: validatedDto.type,
    }),
    defaultOutput: {
      alias: '',
      brand: '',
      id: '',
      provider: '',
      type: '',
    },
  });

export const dtosToPaymentMethods = (dtos: PaymentMethodsDto): IPaymentMethod[] =>
  (dtos || []).map((dto) => dtoToPaymentMethod(dto));
