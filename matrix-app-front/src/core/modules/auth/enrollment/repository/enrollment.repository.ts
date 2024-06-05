import { ConfirmSignUpRequestDto } from '../dtos/confirm-signup/confirm-signup-request.dto';
import { ResendSignUpCodeRequestDto } from '../dtos/resend-signup-code/resend-signup-code-request.dto';
import { SendVerifyCodeAttributeRequestDto } from '../dtos/send-verify-code-attribute/send-verify-code-attribute-request.dto';
import { SignUpRequestDto } from '../dtos/sign-up/sign-up-request.dto';
import { SignUpDto } from '../dtos/sign-up/sign-up.dto';
import { SignInRequestDto } from '../dtos/signin/signin-request.dto';
import { SignInDto } from '../dtos/signin/signin.dto';
import { VerifyUserAttributeRequestDto } from '../dtos/verify-user-attribute/verify-user-attribute.dto';
import { SignUpRequestDto } from '../dtos/sign-up/sign-up-request.dto';
import { SignUpDto } from '../dtos/sign-up/sign-up.dto';

export interface IEnrollmentRepository {
  confirmSignup(data: ConfirmSignUpRequestDto): Promise<void>;
  configureAuth(config: any): Promise<void>;
  signIn(data: SignInRequestDto): Promise<SignInDto>;
  reSendSignUpCode(username: ResendSignUpCodeRequestDto): Promise<void>;
  verifyUserAttribute(data: VerifyUserAttributeRequestDto): Promise<void>;
  sendVerifyCodeAttribute(attribute: SendVerifyCodeAttributeRequestDto): Promise<void>;
  signUp(data: SignUpRequestDto): Promise<SignUpDto>;
}
