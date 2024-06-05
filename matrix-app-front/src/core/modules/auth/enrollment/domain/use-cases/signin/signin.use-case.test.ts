import { AuthConfig } from 'src/core/config/auth.config';
import { IEnrollmentRepository } from '../../../repository/enrollment.repository';
import SignInUseCase from './signin.use-case';

const mockRepository = {
  configureAuth: jest.fn(),
  signIn: jest.fn(),
} as unknown as IEnrollmentRepository;

const signInUseCase = new SignInUseCase(mockRepository);

describe('SignInUseCase', () => {
  describe('execute', () => {
    it('should call repository.sendVerifyCodeAttribute with the correct data', async () => {
      jest
        .spyOn(mockRepository, 'signIn')
        .mockResolvedValue({ signInUserSession: { accessToken: { jwtToken: 'TOKEN' } } });
      const inputData = {
        username: '77777777',
        recaptchaToken: 'TOKEN',
        password: '123123',
        device: 'phone',
      };
      const inputDto = {
        username: inputData.username,
        password: inputData.password,
        metadata: {
          device: inputData.device,
          session: inputData.recaptchaToken,
        },
      };
      const response = await signInUseCase.execute(inputData);
      expect(mockRepository.configureAuth).toHaveBeenCalledWith(AuthConfig);
      expect(mockRepository.signIn).toHaveBeenCalledWith(inputDto);
      expect(response).toEqual({ jwtToken: 'TOKEN' });
    });
  });
});
