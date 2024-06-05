/* eslint-env jest */
import AwsAmplifyImplementation from 'src/core/libraries-implementation/aws-amplify/aws-amplify.implementation';
import PasswordProvider from './password.provider';

jest.mock('src/core/libraries-implementation/aws-amplify/aws-amplify.implementation');

describe('PasswordProvider', () => {
  let passwordProvider: PasswordProvider;
  let mockAmplify: jest.Mocked<AwsAmplifyImplementation>;

  beforeEach(() => {
    passwordProvider = new PasswordProvider();
    mockAmplify = new AwsAmplifyImplementation() as jest.Mocked<AwsAmplifyImplementation>;
    passwordProvider.awsAmplifyImpl = mockAmplify;
  });

  describe('PasswordProvider', () => {
    it('should return a response when successful forgotPassword', async () => {
      const mockRequest = {
        username: 'testUser',
        clientMetadata: {
          session: 'mockTokenValue',
        },
      };
      const mockResponse = { user: 'testUser' };

      mockAmplify.forgotPassword.mockResolvedValue(mockResponse);

      const response = await passwordProvider.forgotPassword(mockRequest);

      expect(response).toEqual(mockResponse);
      expect(mockAmplify.forgotPassword).toHaveBeenCalledWith(
        mockRequest.username,
        mockRequest.clientMetadata,
      );
    });

    it('should resolve without errors when successful confirmPassword', async () => {
      const mockRequest = {
        username: 'testUser',
        password: 'password123',
        code: 'code',
        clientMetadata: {
          session: 'mockTokenValue',
          device: 'device',
        },
      };
      mockAmplify.confirmPassword.mockResolvedValue();

      await passwordProvider.confirmPassword(mockRequest);

      expect(mockAmplify.confirmPassword).toHaveBeenCalledWith(
        mockRequest.username,
        mockRequest.password,
        mockRequest.code,
        mockRequest.clientMetadata,
      );
    });
  });
});
