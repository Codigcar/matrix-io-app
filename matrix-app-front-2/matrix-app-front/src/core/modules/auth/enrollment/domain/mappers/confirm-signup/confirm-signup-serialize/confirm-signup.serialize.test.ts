import { ConfirmSignUpRequestSchema } from '../../../../dtos/confirm-signup/confirm-signup-request.dto';
import confirmSignUpRequestToDto from './confirm-signup.serialize';

describe('confirmSignUpToDto', () => {
  it('should return valid ConfirmSignUpRequestDto with valid input', () => {
    const requestInfo = {
      code: '123456',
      username: 'XXXX',
    };
    const result = confirmSignUpRequestToDto(requestInfo);
    expect(ConfirmSignUpRequestSchema.isValidSync(result)).toBe(true);
    expect(result.code).toBe(requestInfo.code);
    expect(result.username).toBe(requestInfo.username);
  });
});
