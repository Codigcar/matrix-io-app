import { IEnrollmentRepository } from '../../../repository/enrollment.repository';
import VerifyCurrentUserAttributeUseCase from './verify-current-user-attribute.use-case';

const mockRepository = {
  verifyUserAttribute: jest.fn(),
} as unknown as IEnrollmentRepository;

const verifyCurrentUserAttributeUseCase = new VerifyCurrentUserAttributeUseCase(mockRepository);

describe('VerifyCurrentUserAttributeUseCase', () => {
  describe('execute', () => {
    it('should call repository.sendVerifyCodeAttribute with the correct data', async () => {
      const inputData = { attribute: 'email', code: 'ASB2VD' };
      const response = await verifyCurrentUserAttributeUseCase.execute(inputData);
      expect(response).toBeUndefined();
      expect(mockRepository.verifyUserAttribute).toHaveBeenCalledWith(inputData);
    });
  });
});
