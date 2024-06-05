/* eslint-env jest */
import SignUpUseCase from './sign-up.use-case';
import ISignUpRequest from '../../../dtos/sign-up/sign-up-request.interface';
import signUpRequestToDto from '../../mappers/sign-up/sign-up-serialize/sign-up.serialize';
import { IEnrollmentRepository } from '../../../repository/enrollment.repository';

jest.mock('../../../repository/enrollment.repository');

describe('SignUpUseCase', () => {
  let signUpUseCase: SignUpUseCase;
  let mockEnrollmentRepository: jest.Mocked<IEnrollmentRepository>;

  beforeEach(() => {
    mockEnrollmentRepository = {
      signUp: jest.fn().mockResolvedValue({
        codeDeliveryDetails: { DeliveryMedium: 'SMS' },
        userSub: 'USER',
      }),
    } as any;
    signUpUseCase = new SignUpUseCase(mockEnrollmentRepository);
  });

  it('should call repository signUp with serialized request', async () => {
    const mockRequest: ISignUpRequest = {
      username: 'string',
      password: 'string',
      session: 'string',
      device: 'string',
      documentNumber: '12341234',
      email: 'mail@mail.com',
      phoneNumber: '938383888',
      referralCode: 'ASDASD',
    };

    const expectedDto = signUpRequestToDto(mockRequest);
    await signUpUseCase.execute(mockRequest);

    expect(mockEnrollmentRepository.signUp).toHaveBeenCalledWith(expectedDto);
  });
});
