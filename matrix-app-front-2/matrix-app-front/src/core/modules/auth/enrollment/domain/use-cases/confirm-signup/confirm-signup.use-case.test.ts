import { IEnrollmentRepository } from '../../../repository/enrollment.repository';
import ConfirmSignUpUseCase from './confirm-signup.use-case';

const mockRepository = {
  confirmSignup: jest.fn(),
} as unknown as IEnrollmentRepository;

const confirmSignUpUseCase = new ConfirmSignUpUseCase(mockRepository);

describe('ConfirmSignUpUseCase', () => {
  describe('execute', () => {
    it('should call repository.confirmSignup with the correct data', async () => {
      const inputData = { code: 'ASASAS', username: 'USER' };
      const response = await confirmSignUpUseCase.execute(inputData);
      expect(response).toBeUndefined();
      expect(mockRepository.confirmSignup).toHaveBeenCalledWith(inputData);
    });
  });
});
