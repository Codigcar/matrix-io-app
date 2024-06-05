import { IEnrollmentRepository } from '../../../repository/enrollment.repository';
import ResendSignUpUseCase from './resend-signup-code.use-case';

const mockRepository = {
  reSendSignUpCode: jest.fn(),
} as unknown as IEnrollmentRepository;

const resendSignUpUseCase = new ResendSignUpUseCase(mockRepository);

describe('ResendSignUpUseCase', () => {
  describe('execute', () => {
    it('should call repository.reSendSignUpCode with the correct data', async () => {
      const inputData = {
        username: '77777777',
      };
      const response = await resendSignUpUseCase.execute(inputData);
      expect(response).toBeUndefined();
      expect(mockRepository.reSendSignUpCode).toHaveBeenCalledWith(inputData);
    });
  });
});
