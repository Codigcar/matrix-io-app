import { logCrashlytics } from 'src/utils/Analytics';
import { IUseCase } from 'src/core/contracts/use-case.interface';
import RecaptchaSessionUseCase from 'src/core/modules/auth/session/domain/use-cases/recaptcha-session/recaptcha-session.use-case';
import { IRecaptchaSession } from 'src/core/modules/auth/session/dtos/recaptcha-session/recaptcha-session.interface';
import SessionFactory from 'src/core/modules/auth/session/infrastructure/factory/session.factory';
import { IRecaptchaSessionRequest } from 'src/core/modules/auth/session/dtos/recaptcha-session/recaptcha-session-request.interface';

const useAuthInteractor = (recaptchaSessionUseCase: IUseCase<IRecaptchaSessionRequest, IRecaptchaSession> = new RecaptchaSessionUseCase(SessionFactory.getInstance()),) => {
  const executeRecaptchaSession: (
    data: IRecaptchaSessionRequest,
  ) => Promise<IRecaptchaSession> = async (data) => {
    try {
      return await recaptchaSessionUseCase.execute(data);
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'auth/interactors/auth.interactor.ts',
        service: 'executeRecaptchaSession',
        error,
      });

      throw error;
    }
  };

  return {
    executeRecaptchaSession,
  };
};

export default useAuthInteractor;
