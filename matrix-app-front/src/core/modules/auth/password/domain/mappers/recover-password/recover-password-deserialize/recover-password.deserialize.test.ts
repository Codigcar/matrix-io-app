/* eslint-env jest */
import {
  RecoverPasswordDto,
  RecoverPasswordSchema,
} from '../../../../dtos/recover-password/recover-password.dto';
import IRecoverPassword from '../../../../dtos/recover-password/recover-password.interface';
import dtoToRecoverPassword from './recover-password.deserialize';

describe('dtoToRecoverPassword', () => {
  it('should return valid IRecoverPassword with valid input', () => {
    const validDto: RecoverPasswordDto = {
      CodeDeliveryDetails: {
        AttributeName: 'email',
        DeliveryMedium: 'email',
      },
    };

    const result: IRecoverPassword = dtoToRecoverPassword(validDto);

    expect(RecoverPasswordSchema.isValidSync(result)).toBe(true);
    expect(result.deliveryMedium).toBe(validDto.CodeDeliveryDetails?.DeliveryMedium);
  });
});
