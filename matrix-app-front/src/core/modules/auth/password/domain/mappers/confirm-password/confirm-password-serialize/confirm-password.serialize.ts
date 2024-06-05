import { serialize } from 'src/core/helpers/transform';
import {
  ConfirmPasswordRequestDto,
} from '../../../../dtos/confirm-password/confirm-password-request.dto';
import IConfirmPasswordRequest from '../../../../dtos/confirm-password/confirm-password-request.interface';

const confirmPasswordRequestToDto = (entity: IConfirmPasswordRequest): ConfirmPasswordRequestDto =>
  serialize(entity, {
    serializationLogic: (validatedEntity) => ({
      username: validatedEntity.username,
      password: validatedEntity.password,
      code: validatedEntity.code,
      clientMetadata: {
        session: validatedEntity.session,
        device: validatedEntity.device,
      },
    }),
    defaultOutput: {} as ConfirmPasswordRequestDto,
  });

export default confirmPasswordRequestToDto;
