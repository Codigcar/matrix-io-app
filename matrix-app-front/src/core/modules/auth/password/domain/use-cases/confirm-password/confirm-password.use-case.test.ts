/* eslint-env jest */
import ConfirmPasswordUseCase from './confirm-password.use-case';
import IConfirmPasswordRequest from '../../../dtos/confirm-password/confirm-password-request.interface';
import confirmPasswordRequestToDto from '../../mappers/confirm-password/confirm-password-serialize/confirm-password.serialize';
import { IPasswordRepository } from '../../../repository/password.repository';

jest.mock('../../../repository/password.repository');

describe('ConfirmPasswordUseCase', () => {
  let confirmPasswordUseCase: ConfirmPasswordUseCase;
  let mockPasswordRepository: jest.Mocked<IPasswordRepository>;

  beforeEach(() => {
    mockPasswordRepository = {
      confirmPassword: jest.fn(),
    } as any;
    confirmPasswordUseCase = new ConfirmPasswordUseCase(mockPasswordRepository);
  });

  it('should call repository confirmPassword with serialized request', async () => {
    const mockRequest: IConfirmPasswordRequest = {
      username: 'string',
      password: 'string',
      code: 'string',
      session: 'string',
      device: 'string',
    };

    const expectedDto = confirmPasswordRequestToDto(mockRequest);

    await confirmPasswordUseCase.execute(mockRequest);

    expect(mockPasswordRepository.confirmPassword).toHaveBeenCalledWith(expectedDto);
  });
});
