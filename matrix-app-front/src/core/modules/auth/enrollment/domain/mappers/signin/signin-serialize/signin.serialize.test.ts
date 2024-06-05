import { SignInRequestSchema } from '../../../../dtos/signin/signin-request.dto';
import signInRequestToDto from './signin.serialize';

describe('signInRequestToDto', () => {
  it('should return valid SignInRequestDto with valid input', () => {
    const input = {
      device: 'mobile',
      username: '77777777',
      recaptchaToken: 'TOKEN',
      password: 'XXXXXXXX',
    };
    const result = signInRequestToDto(input);

    expect(SignInRequestSchema.isValidSync(result)).toBe(true);
    expect(result.username).toEqual(input.username);
    expect(result.password).toEqual(input.password);
    expect(result.metadata).toEqual({
      device: input.device,
      session: input.recaptchaToken,
    });
  });
});
