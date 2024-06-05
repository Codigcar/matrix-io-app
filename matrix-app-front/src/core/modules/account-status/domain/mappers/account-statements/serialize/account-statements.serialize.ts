import { serialize } from 'src/core/helpers/transform';
import {
  IAccountStatementsRequest,
  AccountStatementsRequestDto,
} from 'src/core/modules/account-status/dtos';

export const accountStatementsToDto = (
  dto: IAccountStatementsRequest,
): AccountStatementsRequestDto =>
  serialize(dto, {
    serializationLogic: (validatedDto) => ({
      dateId: validatedDto.dateId,
      isEncrypted: validatedDto.isEncrypted,
    }),
    defaultOutput: {
      dateId: '',
      isEncrypted: false,
    },
  });
