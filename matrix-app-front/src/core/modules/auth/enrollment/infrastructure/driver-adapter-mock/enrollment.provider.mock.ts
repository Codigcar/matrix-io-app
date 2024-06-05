import { SignUpDto } from '../../dtos/sign-up/sign-up.dto';
import { IEnrollmentRepository } from '../../repository/enrollment.repository';

class EnrollmentProviderMock implements IEnrollmentRepository {
  configureAuth(): Promise<void> {
    return Promise.resolve();
  }

  signIn() {
    return Promise.resolve({
      signInUserSession: {
        accessToken: {
          jwtToken: 'TOKEN',
        },
      },
    });
  }

  reSendSignUpCode(): Promise<void> {
    return Promise.resolve();
  }

  verifyUserAttribute(): Promise<void> {
    return Promise.resolve();
  }

  sendVerifyCodeAttribute(): Promise<void> {
    return Promise.resolve();
  }

  confirmSignup(): Promise<void> {
    return Promise.resolve();
  }

  public async signUp(): Promise<SignUpDto> {
    return Promise.resolve({
      userSub: 'test',
      codeDeliveryDetails: {
        DeliveryMedium: 'SMS',
      },
    });
  }
}

export default EnrollmentProviderMock;
