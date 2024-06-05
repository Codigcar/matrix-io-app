import { serialize } from 'src/core/helpers/transform';
import { RecoverPasswordRequestDto } from '../../../../dtos/recover-password/recover-password-request.dto';
import IRecoverPasswordRequest from '../../../../dtos/recover-password/recover-password-request.interface';

const recoverPasswordRequestToDto = (entity: IRecoverPasswordRequest): RecoverPasswordRequestDto =>
  serialize(entity, {
    serializationLogic: (validatedEntity) => ({
      username: validatedEntity.username,
      clientMetadata: {
        session: validatedEntity.session,
      },
    }),
    defaultOutput: {} as RecoverPasswordRequestDto,
  });

export default recoverPasswordRequestToDto;
