import { IUseCase } from 'src/core/contracts/use-case.interface';
import IRecoverPasswordRequest from 'src/core/modules/auth/password/dtos/recover-password/recover-password-request.interface';
import IRecoverPassword from 'src/core/modules/auth/password/dtos/recover-password/recover-password.interface';
import ForgotPasswordUseCase from 'src/core/modules/auth/password/domain/use-cases/forgot-password/forgot-password.use-case';
import PasswordFactory from 'src/core/modules/auth/password/infrastructure/factory/password.factory';
import { logExecuteForgotPassword } from './verify-otp.analytics';

const useForgotPasswordInteractor = (
  forgotPasswordUseCase: IUseCase<
    IRecoverPasswordRequest,
    IRecoverPassword
  > = new ForgotPasswordUseCase(PasswordFactory.getInstance()),
) => {
  const executeForgotPassword: (
    data: IRecoverPasswordRequest,
  ) => Promise<IRecoverPassword> = async (data) => {
    try {
      return await forgotPasswordUseCase.execute(data);
    } catch (error) {
      logExecuteForgotPassword(error);
      throw error;
    }
  };

  return { executeForgotPassword };
};

export default useForgotPasswordInteractor;
