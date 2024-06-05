/* eslint-env jest */
import { SignUpDto, SignUpSchema } from '../../../../dtos/sign-up/sign-up.dto';
import ISignUp from '../../../../dtos/sign-up/sign-up.interface';
import dtoToSignUp from './sign-up.deserialize';

describe('dtoToSignUp', () => {
  it('should return valid ISignUp with valid input', () => {
    const validDto: SignUpDto = {
      codeDeliveryDetails: {
        DeliveryMedium: 'TEST',
      },
      userSub: 'USER',
    };

    const result: ISignUp = dtoToSignUp(validDto);

    expect(SignUpSchema.isValidSync(result)).toBe(true);
    expect(result.deliveryMedium).toBe(validDto.codeDeliveryDetails.DeliveryMedium);
    expect(result.userSub).toBe(validDto.userSub);
  });
});
