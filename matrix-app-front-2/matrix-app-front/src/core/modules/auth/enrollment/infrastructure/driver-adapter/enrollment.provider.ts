import { SignUpConfig } from 'src/core/config/auth.config';
import AwsAmplifyImplementation from 'src/core/libraries-implementation/aws-amplify/aws-amplify.implementation';
import { IEnrollmentRepository } from '../../repository/enrollment.repository';
import { ConfirmSignUpRequestDto } from '../../dtos/confirm-signup/confirm-signup-request.dto';
import { SignInRequestDto } from '../../dtos/signin/signin-request.dto';
import { ResendSignUpCodeRequestDto } from '../../dtos/resend-signup-code/resend-signup-code-request.dto';
import { VerifyUserAttributeRequestDto } from '../../dtos/verify-user-attribute/verify-user-attribute.dto';
import { SendVerifyCodeAttributeRequestDto } from '../../dtos/send-verify-code-attribute/send-verify-code-attribute-request.dto';
import { SignUpRequestDto } from '../../dtos/sign-up/sign-up-request.dto';
import { SignUpDto } from '../../dtos/sign-up/sign-up.dto';

class EnrollmentProvider implements IEnrollmentRepository {
  private awsAmplifyImpl = new AwsAmplifyImplementation();

  public async confirmSignup(request: ConfirmSignUpRequestDto): Promise<void> {
    return this.awsAmplifyImpl.confirmSignUp(request.username, request.code);
  }

  public async configureAuth(config: any): Promise<void> {
    return this.awsAmplifyImpl.configureAuth(config);
  }

  public async signIn(request: SignInRequestDto) {
    return this.awsAmplifyImpl.signIn(request.username, request.password, request.metadata);
  }

  public async reSendSignUpCode(request: ResendSignUpCodeRequestDto): Promise<void> {
    return this.awsAmplifyImpl.reSendSignUpCode(request.username);
  }

  public async verifyUserAttribute(request: VerifyUserAttributeRequestDto): Promise<void> {
    return this.awsAmplifyImpl.verifyCurrentUserAttribute(request.attribute, request.code);
  }

  public async sendVerifyCodeAttribute(request: SendVerifyCodeAttributeRequestDto): Promise<void> {
    return this.awsAmplifyImpl.sendVerifyCode(request.attribute);
  }

  public async signUp(signUpBody: SignUpRequestDto): Promise<SignUpDto> {
    this.awsAmplifyImpl.configureAuth(SignUpConfig);
    return this.awsAmplifyImpl.signUp(signUpBody);
  }
}

export default EnrollmentProvider;
