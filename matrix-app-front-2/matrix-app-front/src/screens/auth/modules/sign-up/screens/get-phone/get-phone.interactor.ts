import ISignUpRequest from 'src/core/modules/auth/enrollment/dtos/sign-up/sign-up-request.interface';
import SignUpUseCase from 'src/core/modules/auth/enrollment/domain/use-cases/sign-up/sign-up.use-case';
import ISignUp from 'src/core/modules/auth/enrollment/dtos/sign-up/sign-up.interface';
import EnrollmentFactory from 'src/core/modules/auth/enrollment/infrastructure/factory/enrollment.factory';
import { IUseCase } from 'src/core/contracts/use-case.interface';
import { logCrashlytics } from 'src/utils/Analytics';

const useGetPhoneInteractor = (
  signUpUseCase: IUseCase<ISignUpRequest, ISignUp> = new SignUpUseCase(
    EnrollmentFactory.getInstance(),
  ),
) => {
  const signUp = (signUpBody: ISignUpRequest) => {
    try {
      return signUpUseCase.execute(signUpBody);
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'auth/enrollment/screens/get-phone/get-phone.interactor.ts',
        service: 'signUp',
        error,
      });
      throw error;
    }
  };

  return {
    signUp,
  };
};
export default useGetPhoneInteractor;
