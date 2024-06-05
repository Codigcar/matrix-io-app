/* eslint-env jest */
import {
  RecoverPasswordRequestDto,
  RecoverPasswordRequestSchema,
} from '../../../../dtos/recover-password/recover-password-request.dto';
import IRecoverPasswordRequest from '../../../../dtos/recover-password/recover-password-request.interface';
import recoverPasswordRequestToDto from './recover-password.serialize';

describe('recoverPasswordRequestToDto', () => {
  it('should return valid IRecoverPasswordRequest with valid input', () => {
    const validAuthUserSet: IRecoverPasswordRequest = {
      username: 'username',
      session: 'token',
    };

    const result: RecoverPasswordRequestDto = recoverPasswordRequestToDto(validAuthUserSet);

    expect(RecoverPasswordRequestSchema.isValidSync(result)).toBe(true);
    expect(result.username).toBe(validAuthUserSet.username);
  });
});
