/* eslint-disable no-console */
import { IPasswordRepository } from '../../repository/password.repository';
import { RecoverPasswordRequestDto } from '../../dtos/recover-password/recover-password-request.dto';
import { ConfirmPasswordRequestDto } from '../../dtos/confirm-password/confirm-password-request.dto';

type RecoverPasswordDto = {
  CodeDeliveryDetails: {
    AttributeName: string;
    DeliveryMedium: string;
  };
};

class PasswordProviderMock implements IPasswordRepository {
  public async forgotPassword(request: RecoverPasswordRequestDto): Promise<RecoverPasswordDto> {
    console.table(request);
    return {
      CodeDeliveryDetails: {
        AttributeName: 'mockedAttributeName',
        DeliveryMedium: 'mockedDeliveryMedium',
      },
    };
  }

  public async confirmPassword(request: ConfirmPasswordRequestDto): Promise<void> {
    console.table({ username: request.username, code: request.code });
    return Promise.resolve();
  }
}

export default PasswordProviderMock;
