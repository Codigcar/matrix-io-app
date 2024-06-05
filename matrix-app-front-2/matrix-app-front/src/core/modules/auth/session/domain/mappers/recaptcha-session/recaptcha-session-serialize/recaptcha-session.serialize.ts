import { serialize } from 'src/core/helpers/transform';
import { IRecaptchaSessionRequest } from '../../../../dtos/recaptcha-session/recaptcha-session-request.interface';
import { RecaptchaSessionRequestDto } from '../../../../dtos/recaptcha-session/recaptcha-session-request.dto';

const recaptchaSessionRequestToDto = (
  entity: IRecaptchaSessionRequest,
): RecaptchaSessionRequestDto =>
  serialize(entity, {
    serializationLogic: (validatedEntity) => ({
      recaptchaToken: validatedEntity.recaptchaToken,
      version: validatedEntity.version,
      authFlow: validatedEntity.authFlow,
    }),
    defaultOutput: {} as RecaptchaSessionRequestDto,
  });

export default recaptchaSessionRequestToDto;
