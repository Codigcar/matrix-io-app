import { VerifyUserAttributeRequestSchema } from '../../../../dtos/verify-user-attribute/verify-user-attribute.dto';
import verifyCurrentUserAttributeRequestToDto from './verify-current-user-attribute.serialize';

describe('verifyCurrentUserAttributeRequestToDto', () => {
  it('should return valid VerifyUserAttributeRequestDto with valid input', () => {
    const input = { attribute: 'email', code: 'AD3DE4' };
    const result = verifyCurrentUserAttributeRequestToDto(input);

    expect(VerifyUserAttributeRequestSchema.isValidSync(result)).toBe(true);
    expect(result.attribute).toEqual(input.attribute);
    expect(result.code).toEqual(input.code);
  });
});
