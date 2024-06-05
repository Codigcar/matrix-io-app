import { ISignUpResult } from 'amazon-cognito-identity-js';
import AwsAmplifyImplementation from 'src/core/libraries-implementation/aws-amplify/aws-amplify.implementation';
import EnrollmentProvider from './enrollment.provider';
import { ConfirmSignUpRequestDto } from '../../dtos/confirm-signup/confirm-signup-request.dto';

// Mock the AwsAmplifyImplementation class
jest.mock('src/core/libraries-implementation/aws-amplify/aws-amplify.implementation');

describe('EnrollmentProvider', () => {
  let enrollmentProvider: EnrollmentProvider;

  beforeEach(() => {
    enrollmentProvider = new EnrollmentProvider();
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should confirm signup', async () => {
    const confirmSignUpSpy = jest.spyOn(AwsAmplifyImplementation.prototype, 'confirmSignUp');

    const request: ConfirmSignUpRequestDto = {
      username: 'testUsername',
      code: '123456',
    };

    await enrollmentProvider.confirmSignup(request);
    expect(AwsAmplifyImplementation).toHaveBeenCalledWith();
    expect(confirmSignUpSpy).toHaveBeenCalledWith(request.username, request.code);
  });

  it('should configure auth', async () => {
    const configureAuthSpy = jest.spyOn(AwsAmplifyImplementation.prototype, 'configureAuth');
    const config = {
      aws_cognito_region: 'PERU',
      aws_user_pools_id: 'ID_1',
      aws_user_pools_web_client_id: 'ID_1',
      aws_mandatory_sign_in: 'enable',
      authenticationFlowType: 'USER_SRP_AUTH',
      endpoint: 'localhost',
      clientMetadata: {
        token: '',
      },
    };
    await enrollmentProvider.configureAuth(config);
    expect(configureAuthSpy).toHaveBeenCalledWith(config);
  });

  it('should signIn', async () => {
    const signInSpy = jest.spyOn(AwsAmplifyImplementation.prototype, 'signIn');
    const signInInput = {
      username: 'TEST',
      password: 'TEST',
      metadata: { device: 'phone', session: 'captcha' },
    };
    await enrollmentProvider.signIn(signInInput);
    expect(signInSpy).toHaveBeenCalledWith(
      signInInput.username,
      signInInput.password,
      signInInput.metadata,
    );
  });

  it('should reSendSignUpCode', async () => {
    const reSendSignUpCodeSpy = jest.spyOn(AwsAmplifyImplementation.prototype, 'reSendSignUpCode');
    const reSendSignUpCodeInput = { username: 'TEST' };
    await enrollmentProvider.reSendSignUpCode(reSendSignUpCodeInput);
    expect(reSendSignUpCodeSpy).toHaveBeenCalledWith(reSendSignUpCodeInput.username);
  });

  it('should reSendSignUpCode', async () => {
    const reSendSignUpCodeSpy = jest.spyOn(AwsAmplifyImplementation.prototype, 'reSendSignUpCode');
    const reSendSignUpCodeInput = { username: 'TEST' };
    await enrollmentProvider.reSendSignUpCode(reSendSignUpCodeInput);
    expect(reSendSignUpCodeSpy).toHaveBeenCalledWith(reSendSignUpCodeInput.username);
  });

  it('should verifyUserAttribute', async () => {
    const verifyUserAttributeSpy = jest.spyOn(
      AwsAmplifyImplementation.prototype,
      'verifyCurrentUserAttribute',
    );
    const verifyUserAttributeInput = { attribute: 'email', code: 'ASB2VD' };
    await enrollmentProvider.verifyUserAttribute(verifyUserAttributeInput);
    expect(verifyUserAttributeSpy).toHaveBeenCalledWith(
      verifyUserAttributeInput.attribute,
      verifyUserAttributeInput.code,
    );
  });

  it('should sendVerifyCodeAttribute', async () => {
    const sendVerifyCodeAttributeSpy = jest.spyOn(
      AwsAmplifyImplementation.prototype,
      'sendVerifyCode',
    );
    const sendVerifyCodeAttributeInput = { attribute: 'email' };
    await enrollmentProvider.sendVerifyCodeAttribute(sendVerifyCodeAttributeInput);
    expect(sendVerifyCodeAttributeSpy).toHaveBeenCalledWith(sendVerifyCodeAttributeInput.attribute);
  });

  it('should return a response when successful signUp', async () => {
    const mockRequest = {
      username: 'TEST',
      password: 'SECURE',
      attributes: {
        email: 'mail@mail.com',
        phone_number: '999999999',
        'custom:document_number': '77777777',
        'custom:referralCode': 'AAABBB',
      },
      clientMetadata: {
        device: 'A',
        session: 'B',
      },
    };
    const mockResponse = {
      userSub: 'TEST',
      codeDeliveryDetails: { DeliveryMedium: 'SMS' },
    } as ISignUpResult;
    const signUpSpy = jest
      .spyOn(AwsAmplifyImplementation.prototype, 'signUp')
      .mockResolvedValue(mockResponse);
    const response = await enrollmentProvider.signUp(mockRequest);
    expect(response).toEqual(mockResponse);
    expect(signUpSpy).toHaveBeenCalledWith(mockRequest);
  });
});
