/* eslint-env jest */

import { RecaptchaSessionDto, RecaptchaSessionSchema } from '../../../../dtos/recaptcha-session/recaptcha-session.dto';
import { IRecaptchaSession } from '../../../../dtos/recaptcha-session/recaptcha-session.interface';
import dtoToRecaptchaSession from './recaptcha-session.deserialize';

describe('dtoToRecaptchaSession', () => {
  it('should return valid IRecaptchaSession with valid input', () => {
    const validDto: RecaptchaSessionDto = {
      id: 'id',
      token: 'token',
    };

    const result: IRecaptchaSession = dtoToRecaptchaSession(validDto);

    expect(RecaptchaSessionSchema.isValidSync(result)).toBe(true);
    expect(result.token).toBe(validDto.token);
  });
});
