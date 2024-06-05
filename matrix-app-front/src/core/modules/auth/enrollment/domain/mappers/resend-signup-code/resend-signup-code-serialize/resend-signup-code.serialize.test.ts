import { ResendSignUpCodeRequestSchema } from '../../../../dtos/resend-signup-code/resend-signup-code-request.dto';
import resendSignUpCodeRequestToDto from './resend-signup-code.serialize';

describe('resendSignUpCodeRequestToDto', () => {
  it('should return valid ResendSignUpCodeRequestDto with valid input', () => {
    const input = { username: 'XXXXXXXXXXXXX' };
    const result = resendSignUpCodeRequestToDto(input);

    expect(ResendSignUpCodeRequestSchema.isValidSync(result)).toBe(true);
    expect(result.username).toEqual(input.username);
  });
});
