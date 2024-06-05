import { logCrashlytics } from 'src/utils/Analytics';
import { IUseCase } from 'src/core/contracts/use-case.interface';
import IConfirmPasswordRequest from 'src/core/modules/auth/password/dtos/confirm-password/confirm-password-request.interface';
import ConfirmPasswordUseCase from 'src/core/modules/auth/password/domain/use-cases/confirm-password/confirm-password.use-case';
import PasswordFactory from 'src/core/modules/auth/password/infrastructure/factory/password.factory';

const useNewPasswordInteractor = (
  confirmPasswordUseCase: IUseCase<IConfirmPasswordRequest, void> = new ConfirmPasswordUseCase(
    PasswordFactory.getInstance(),
  ),
) => {
  const executeConfirmPassword: (data: IConfirmPasswordRequest) => Promise<void> = async (data) => {
    try {
      await confirmPasswordUseCase.execute(data);
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'PasswordRecovery/NewPassword/hooks/useNewPassword.tsx',
        service: 'ConfirmPassword',
        error,
      });

      throw error;
    }
  };
  return { executeConfirmPassword };
};

export default useNewPasswordInteractor;
