/* eslint-env jest */
import { renderHook } from '@testing-library/react-native';
import IRecoverPasswordRequest from 'src/core/modules/auth/password/dtos/recover-password/recover-password-request.interface';
import ForgotPasswordUseCase from 'src/core/modules/auth/password/domain/use-cases/forgot-password/forgot-password.use-case';
import useRecoverPasswordInteractor from './recover-password.interactor';

const request: IRecoverPasswordRequest = {
  username: 'test',
  session: 'test123.',
};

jest.mock('src/core/modules/auth/password/domain/use-cases/forgot-password/forgot-password.use-case');

describe('useRecoverPasswordInteractor', () => {
  it('should handle successful password recovery', async () => {
    const mockExecute = jest.fn().mockResolvedValue({
      user: 'userTest',
    });

    (ForgotPasswordUseCase as
      jest.MockedClass<typeof ForgotPasswordUseCase>).prototype.execute = mockExecute;

    const { result } = renderHook(() => useRecoverPasswordInteractor());

    const response = await result.current.executeForgotPassword(request);

    expect(response).toEqual({ user: 'userTest' });
    expect(mockExecute).toHaveBeenCalledWith(request);
  });

  it('should handle an error during password recovery', async () => {
    const mockError = new Error('Failed to recover password');

    (ForgotPasswordUseCase as jest.MockedClass<typeof ForgotPasswordUseCase>
    ).prototype.execute = jest.fn().mockRejectedValue(mockError);

    const { result } = renderHook(() => useRecoverPasswordInteractor());

    await expect(result.current.executeForgotPassword(request)).rejects.toEqual(mockError);
  });
});
