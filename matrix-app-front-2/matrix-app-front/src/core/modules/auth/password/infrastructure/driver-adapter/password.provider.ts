import AwsAmplifyImplementation from 'src/core/libraries-implementation/aws-amplify/aws-amplify.implementation';
import { RecoverPasswordDto } from '../../dtos/recover-password/recover-password.dto';
import { IPasswordRepository } from '../../repository/password.repository';
import { RecoverPasswordRequestDto } from '../../dtos/recover-password/recover-password-request.dto';
import { ConfirmPasswordRequestDto } from '../../dtos/confirm-password/confirm-password-request.dto';

class PasswordProvider implements IPasswordRepository {
  public awsAmplifyImpl = new AwsAmplifyImplementation();

  public async forgotPassword(request: RecoverPasswordRequestDto): Promise<RecoverPasswordDto> {
    return this.awsAmplifyImpl.forgotPassword(request.username, request.clientMetadata);
  }

  public async confirmPassword(request: ConfirmPasswordRequestDto): Promise<void> {
    return this.awsAmplifyImpl.confirmPassword(
      request.username,
      request.password,
      request.code,
      request.clientMetadata,
    );
  }
}

export default PasswordProvider;
