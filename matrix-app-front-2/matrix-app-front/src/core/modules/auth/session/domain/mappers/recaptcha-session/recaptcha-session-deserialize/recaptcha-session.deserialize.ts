import { deserialize } from 'src/core/helpers/transform';
import {
  RecaptchaSessionDto,
  RecaptchaSessionSchema,
} from '../../../../dtos/recaptcha-session/recaptcha-session.dto';
import { IRecaptchaSession } from '../../../../dtos/recaptcha-session/recaptcha-session.interface';

const dtoToRecaptchaSession = (dto: RecaptchaSessionDto): IRecaptchaSession =>
  deserialize(dto, {
    outputSchema: RecaptchaSessionSchema,
    serializationLogic: (validatedDto) => ({
      id: validatedDto.id,
      token: validatedDto.token,
    }),
    defaultOutput: {} as IRecaptchaSession,
  });

export default dtoToRecaptchaSession;
