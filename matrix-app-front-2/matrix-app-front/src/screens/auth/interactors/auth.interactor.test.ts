/* eslint-env jest */
import { renderHook } from '@testing-library/react-native';
import RecaptchaSessionUseCase from 'src/core/modules/auth/session/domain/use-cases/recaptcha-session/recaptcha-session.use-case';
import { logCrashlytics } from 'src/utils/Analytics';
import useAuthInteractor from './auth.interactor';

jest.mock(
  'src/core/modules/auth/session/domain/use-cases/recaptcha-session/recaptcha-session.use-case',
);
jest.mock('src/utils/Analytics');

describe('useAuthInteractor', () => {
  it('should successfully execute recaptcha session', async () => {
    const mockExecute = jest.fn().mockResolvedValue({
      sessionData: 'testSessionData',
    });

    (
      RecaptchaSessionUseCase as jest.MockedClass<typeof RecaptchaSessionUseCase>
    ).prototype.execute = mockExecute;

    const { result } = renderHook(() => useAuthInteractor());

    const mockRequest = {
      recaptchaToken: 'testToken',
      version: 'testVersion',
    };

    const response = await result.current.executeRecaptchaSession(mockRequest);

    expect(response).toEqual({ sessionData: 'testSessionData' });
    expect(mockExecute).toHaveBeenCalledWith(mockRequest);
  });

  it('should handle an error during recaptcha session execution', async () => {
    const mockError = new Error('Failed to execute recaptcha session');

    (
      RecaptchaSessionUseCase as jest.MockedClass<typeof RecaptchaSessionUseCase>
    ).prototype.execute = jest.fn().mockRejectedValue(mockError);

    const { result } = renderHook(() => useAuthInteractor());

    const mockRequest = {
      recaptchaToken: 'testToken',
      version: 'testVersion',
    };

    await expect(result.current.executeRecaptchaSession(mockRequest)).rejects.toEqual(mockError);
    expect(logCrashlytics).toHaveBeenCalledWith({
      scope: 'API',
      fileName: 'auth/interactors/auth.interactor.ts',
      service: 'executeRecaptchaSession',
      error: mockError,
    });
  });
});
