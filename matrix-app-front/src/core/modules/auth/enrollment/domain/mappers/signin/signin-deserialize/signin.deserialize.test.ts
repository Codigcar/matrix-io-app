/* eslint-env jest */

import { SignInSchema } from '../../../../dtos/signin/signin.dto';
import dtoToSignIn from './signin.deserialize';

describe('dtoToSignIn', () => {
  it('should return valid ISignIn with valid input', () => {
    const input = {
      signInUserSession: { accessToken: { jwtToken: 'TOKEN' } },
    };

    const result = dtoToSignIn(input);
    expect(SignInSchema.isValidSync(input)).toBe(true);
    expect(result.jwtToken).toBe(input.signInUserSession.accessToken.jwtToken);
  });
});
