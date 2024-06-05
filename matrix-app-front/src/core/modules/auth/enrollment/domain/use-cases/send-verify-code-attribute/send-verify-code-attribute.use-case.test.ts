import { IEnrollmentRepository } from '../../../repository/enrollment.repository';
import SendVerifyCodeAttributeUseCase from './send-verify-code-attribute.use-case';

const mockRepository = {
  sendVerifyCodeAttribute: jest.fn(),
} as unknown as IEnrollmentRepository;

const sendVerifyCodeAttributeUseCase = new SendVerifyCodeAttributeUseCase(mockRepository);

describe('SendVerifyCodeAttributeUseCase', () => {
  describe('execute', () => {
    it('should call repository.sendVerifyCodeAttribute with the correct data', async () => {
      const inputData = { attribute: 'email' };
      const response = await sendVerifyCodeAttributeUseCase.execute(inputData);
      expect(response).toBeUndefined();
      expect(mockRepository.sendVerifyCodeAttribute).toHaveBeenCalledWith(inputData);
    });
  });
});
