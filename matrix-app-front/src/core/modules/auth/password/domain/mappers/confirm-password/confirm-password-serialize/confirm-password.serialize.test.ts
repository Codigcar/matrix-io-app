/* eslint-env jest */
import { ConfirmPasswordRequestDto } from '../../../../dtos/confirm-password/confirm-password-request.dto';
import { RecoverPasswordRequestSchema } from '../../../../dtos/recover-password/recover-password-request.dto';
import IConfirmPasswordRequest from '../../../../dtos/confirm-password/confirm-password-request.interface';
import confirmPasswordRequestToDto from './confirm-password.serialize';

describe('confirmPasswordToDto', () => {
  it('should return valid IConfirmPasswordRequest with valid input', () => {
    const validate: IConfirmPasswordRequest = {
      username: 'username',
      password: 'password',
      code: 'code',
      session: 'token',
      device: 'device',
    };

    const result: ConfirmPasswordRequestDto = confirmPasswordRequestToDto(validate);

    expect(RecoverPasswordRequestSchema.isValidSync(result)).toBe(true);
    expect(result.username).toBe(validate.username);
  });
});
