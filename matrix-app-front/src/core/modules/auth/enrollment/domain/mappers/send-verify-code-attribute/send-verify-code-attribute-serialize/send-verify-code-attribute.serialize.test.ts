import { SendVerifyCodeAttributeRequestSchema } from '../../../../dtos/send-verify-code-attribute/send-verify-code-attribute-request.dto';
import sendVerifyCodeAttributeRequestToDto from './send-verify-code-attribute.serialize';

describe('sendVerifyCodeAttribute', () => {
  it('should return valid SendVerifyCodeAttributeRequestDto with valid input', () => {
    const input = { attribute: 'email' };
    const result = sendVerifyCodeAttributeRequestToDto(input);

    expect(SendVerifyCodeAttributeRequestSchema.isValidSync(result)).toBe(true);
    expect(result.attribute).toEqual(input.attribute);
  });
});
