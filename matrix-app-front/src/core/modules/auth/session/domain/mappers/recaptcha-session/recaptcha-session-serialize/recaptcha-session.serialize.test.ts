import { RecaptchaSessionRequestDto, RecaptchaSessionRequestSchema } from '../../../../dtos/recaptcha-session/recaptcha-session-request.dto';
import { IRecaptchaSessionRequest } from '../../../../dtos/recaptcha-session/recaptcha-session-request.interface';
import { RecaptchaVersionEnum } from '../../../../enums/recaptcha-version.enum';
import recaptchaSessionRequestToDto from './recaptcha-session.serialize';

describe('recaptchaSessionRequestToDto', () => {
  // eslint-disable-next-line no-undef
  it('should return valid IRecaptchaSessionRequest with valid input', () => {
    const validAuthUserSet: IRecaptchaSessionRequest = {
      recaptchaToken: 'token',
      version: RecaptchaVersionEnum.V2,
      authFlow: 'signup',
    };

    const result: RecaptchaSessionRequestDto = recaptchaSessionRequestToDto(validAuthUserSet);

    expect(RecaptchaSessionRequestSchema.isValidSync(result)).toBe(true);
    expect(result.recaptchaToken).toBe(validAuthUserSet.recaptchaToken);
  });
});
