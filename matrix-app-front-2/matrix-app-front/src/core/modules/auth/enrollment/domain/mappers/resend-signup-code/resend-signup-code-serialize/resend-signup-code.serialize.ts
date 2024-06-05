import { serialize } from 'src/core/helpers/transform';
import IResendSignUpCodeRequest from '../../../../dtos/resend-signup-code/resend-signup-code.interface';
import { ResendSignUpCodeRequestDto } from '../../../../dtos/resend-signup-code/resend-signup-code-request.dto';

const resendSignUpCodeRequestToDto = (
  entity: IResendSignUpCodeRequest,
): ResendSignUpCodeRequestDto =>
  serialize(entity, {
    serializationLogic: (validatedEntity) => ({
      username: validatedEntity.username,
    }),
    defaultOutput: {} as ResendSignUpCodeRequestDto,
  });

export default resendSignUpCodeRequestToDto;
