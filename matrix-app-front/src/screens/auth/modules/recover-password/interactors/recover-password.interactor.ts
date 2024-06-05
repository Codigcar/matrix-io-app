import { logCrashlytics } from 'src/utils/Analytics';
import { IUseCase } from 'src/core/contracts/use-case.interface';
import PasswordFactory from 'src/core/modules/auth/password/infrastructure/factory/password.factory';
import IRecoverPasswordRequest from 'src/core/modules/auth/password/dtos/recover-password/recover-password-request.interface';
import IRecoverPassword from 'src/core/modules/auth/password/dtos/recover-password/recover-password.interface';
import ForgotPasswordUseCase from 'src/core/modules/auth/password/domain/use-cases/forgot-password/forgot-password.use-case';

const useRecoverPasswordInteractor = (
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
      logCrashlytics({
        scope: 'API',
        fileName: 'PasswordRecovery/VerifyOTP/hooks/useForgotPasswordOTP.tsx',
        service: 'ForgotPassword',
        error,
      });

      throw error;
    }
  };

  return {
    executeForgotPassword,
  };
};

export default useRecoverPasswordInteractor;
