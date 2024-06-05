import { serialize } from 'src/core/helpers/transform';
import IConfirmSignUpRequest from '../../../../dtos/confirm-signup/confirm-signup.interface';
import { ConfirmSignUpRequestDto } from '../../../../dtos/confirm-signup/confirm-signup-request.dto';

const confirmSignUpRequestToDto = (entity: IConfirmSignUpRequest): ConfirmSignUpRequestDto =>
  serialize(entity, {
    serializationLogic: (validatedEntity) => ({
      username: validatedEntity.username,
      code: validatedEntity.code,
    }),
    defaultOutput: {} as ConfirmSignUpRequestDto,
  });

export default confirmSignUpRequestToDto;
