/* eslint-env jest */

import {
  SignUpRequestDto,
  SignUpRequestSchema,
} from '../../../../dtos/sign-up/sign-up-request.dto';
import ISignUpRequest from '../../../../dtos/sign-up/sign-up-request.interface';
import signUpRequestToDto from './sign-up.serialize';

describe('signUpRequestToDto', () => {
  it('should return valid ISignUpRequest with valid input', () => {
    const validAuthUserSet: ISignUpRequest = {
      username: 'USER',
      device: 'DEVICE',
      documentNumber: '99999999',
      email: 'email@mail.com',
      password: '1234',
      phoneNumber: '999999999',
      session: 'sdf',
      referralCode: 'ASDFGF',
    };

    const result: SignUpRequestDto = signUpRequestToDto(validAuthUserSet);

    expect(SignUpRequestSchema.isValidSync(result)).toBe(true);
  });
});
