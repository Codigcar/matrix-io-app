import { logCrashlytics } from 'src/utils/Analytics';

export const logResendCode = (error: any) =>
  logCrashlytics({
    scope: 'API',
    fileName: 'auth/enrollment/screens/verify-otp/shared/hooks/forgot-password.presenter.ts',
    service: 'onResendCode',
    error,
  });

export const logExecuteForgotPassword = (error: any) => {
  logCrashlytics({
    scope: 'API',
    fileName: 'auth/enrollment/screens/verify-otp/shared/hooks/forgot-password.interactor.ts',
    service: 'executeForgotPassword',
    error,
  });
};
