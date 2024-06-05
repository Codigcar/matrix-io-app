/* eslint-env jest */
import ForgotPasswordUseCase from './forgot-password.use-case';
import IRecoverPasswordRequest from '../../../dtos/recover-password/recover-password-request.interface';
import IRecoverPassword from '../../../dtos/recover-password/recover-password.interface';
import recoverPasswordRequestToDto from '../../mappers/recover-password/recover-password-serialize/recover-password.serialize';
import dtoToRecoverPassword from '../../mappers/recover-password/recover-password-deserialize/recover-password.deserialize';
import { IPasswordRepository } from '../../../repository/password.repository';

// Mock para el repositorio
jest.mock('../../../repository/password.repository');

describe('ForgotPasswordUseCase', () => {
  let forgotPasswordUseCase: ForgotPasswordUseCase;
  let mockPasswordRepository: jest.Mocked<IPasswordRepository>;

  beforeEach(() => {
    mockPasswordRepository = {
      forgotPassword: jest.fn(),
    } as any;
    forgotPasswordUseCase = new ForgotPasswordUseCase(mockPasswordRepository);
  });

  it('should call repository forgotPassword with serialized request and return the deserialized response', async () => {
    const mockRequest: IRecoverPasswordRequest = {
      username: 'string',
      session: 'string',
    };
    const mockDtoResponse = {
      CodeDeliveryDetails: {
        AttributeName: 'someValue',
        DeliveryMedium: 'someOtherValue',
      },
    };
    const expectedRecoverPassword: IRecoverPassword = dtoToRecoverPassword(mockDtoResponse);

    mockPasswordRepository.forgotPassword.mockResolvedValueOnce(mockDtoResponse);

    const result = await forgotPasswordUseCase.execute(mockRequest);

    const expectedDto = recoverPasswordRequestToDto(mockRequest);
    expect(mockPasswordRepository.forgotPassword).toHaveBeenCalledWith(expectedDto);
    expect(result).toEqual(expectedRecoverPassword);
  });
});
