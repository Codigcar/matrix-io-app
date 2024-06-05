import { deserialize } from 'src/core/helpers/transform';
import {
  AccountStatementsScheme,
  AccountStatementsDto,
} from '../../../../dtos/account-statements/account-statements.dto';
import { IAccountStatements } from '../../../../dtos/account-statements/account-statements.interface';

export const dtoToAccountStatements = (dto: AccountStatementsDto): IAccountStatements =>
  deserialize(dto, {
    outputSchema: AccountStatementsScheme,
    serializationLogic: (validatedDto) => ({
      id: validatedDto.id,
      url: validatedDto.url,
    }),
    defaultOutput: {
      id: '',
      url: '',
    },
  });
