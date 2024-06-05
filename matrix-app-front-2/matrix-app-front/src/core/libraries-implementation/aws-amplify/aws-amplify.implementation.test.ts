/* eslint-env jest */
import { Auth } from 'aws-amplify';
import AwsAmplifyImplementation from './aws-amplify.implementation';

jest.mock('aws-amplify', () => ({
  Auth: {
    forgotPassword: jest.fn(),
    forgotPasswordSubmit: jest.fn(),
    configure: jest.fn(),
    confirmSignUp: jest.fn(),
    signIn: jest.fn(),
    resendSignUp: jest.fn(),
    verifyCurrentUserAttribute: jest.fn(),
    verifyCurrentUserAttributeSubmit: jest.fn(),
    signUp: jest.fn(),
  },
}));

describe('AwsAmplifyImplementation', () => {
  let awsAmplify: AwsAmplifyImplementation;

  beforeEach(() => {
    awsAmplify = new AwsAmplifyImplementation();
  });

  it('should call Auth.forgotPassword with the provided username and clientMetadata', async () => {
    const mockResponse = { status: 'SUCCESS' };
    (Auth.forgotPassword as jest.Mock).mockResolvedValue(mockResponse);

    const username = 'testUser';
    const clientMetadata = { session: 'testToken' };

    const response = await awsAmplify.forgotPassword(username, clientMetadata);

    expect(Auth.forgotPassword).toHaveBeenCalledWith(username, clientMetadata);
    expect(response).toEqual(mockResponse);
  });

  it('should call Auth.forgotPasswordSubmit with the provided username, code, password, and clientMetadata', async () => {
    const username = 'testUser';
    const code = 'testCode';
    const password = 'testPassword';
    const clientMetadata = { session: 'testToken', device: 'device' };

    await awsAmplify.confirmPassword(username, password, code, clientMetadata);

    expect(Auth.forgotPasswordSubmit).toHaveBeenCalledWith(
      username,
      code,
      password,
      clientMetadata,
    );
  });

  it('should call Auth.configure with correct configuration', () => {
    const mockConfig = {
      key: 'testKey',
      secret: 'testSecret',
    };

    awsAmplify.configureAuth(mockConfig);

    expect(Auth.configure).toHaveBeenCalledWith(mockConfig);
  });

  it('should call Auth.confirmSignUp with correct parameters', () => {
    const mockSignUp = {
      username: 'user',
      code: 'CODE123',
    };

    awsAmplify.confirmSignUp(mockSignUp.username, mockSignUp.code);

    expect(Auth.confirmSignUp).toHaveBeenCalledWith(mockSignUp.username, mockSignUp.code);
  });

  it('should call Auth.signIn with correct parameters', () => {
    const mockSignIn = {
      username: 'user',
      password: 'Matrix000.',
      metadata: {
        phone: '+0000000000000000',
      },
    };

    awsAmplify.signIn(mockSignIn.username, mockSignIn.password, mockSignIn.metadata);

    expect(Auth.signIn).toHaveBeenCalledWith(
      mockSignIn.username,
      mockSignIn.password,
      mockSignIn.metadata,
    );
  });

  it('should call Auth.resendSignUp with correct parameters', () => {
    const username = 'user';

    awsAmplify.reSendSignUpCode(username);

    expect(Auth.resendSignUp).toHaveBeenCalledWith(username);
  });

  it('should call Auth.verifyCurrentUserAttributeSubmit with correct parameters', () => {
    const attribute = 'email';
    const code = 'CD0AS3';

    awsAmplify.verifyCurrentUserAttribute(attribute, code);
    expect(Auth.verifyCurrentUserAttributeSubmit).toHaveBeenCalledWith(attribute, code);
  });

  it('should call Auth.verifyCurrentUserAttribute with correct parameters', () => {
    const attribute = 'email';

    awsAmplify.sendVerifyCode(attribute);
    expect(Auth.verifyCurrentUserAttribute).toHaveBeenCalledWith(attribute);
  });

  it('should call Auth.signUp with the required body', async () => {
    const signUpBody = {
      password: '',
      username: '',
      clientMetadata: { key: 'value' },
      attributes: { phone: '' },
    };

    await awsAmplify.signUp(signUpBody);

    expect(Auth.signUp).toHaveBeenCalledWith(signUpBody);
  });
});
