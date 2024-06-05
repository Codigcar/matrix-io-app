import IPaymentMethodRequest from '../../../dtos/payment-method/payment-method-request.interface';
import IPaymentMethod from '../../../dtos/payment-method/payment-method.interface';
import { IPaymentMethodRepository } from '../../../repository/payment-method.repository';
import { dtoToPaymentMethod } from '../../mappers/payment-method/deserialize/payment-method.deserialize';
import { paymentMethodRequestToDto } from '../../mappers/payment-method/serialize/payment-method.serialize';
import { SetPaymentMethodUseCase } from './set-payment-method.use-case';

jest.mock('../../../repository/payment-method.repository');

describe('SetPaymentMethodUseCase', () => {
  let paymentMethodTransactionCase: SetPaymentMethodUseCase;
  let mockPaymentMethodRepository: jest.Mocked<IPaymentMethodRepository>;

  beforeEach(() => {
    mockPaymentMethodRepository = {
      setPaymentMethod: jest.fn(),
    } as any;
    paymentMethodTransactionCase = new SetPaymentMethodUseCase(mockPaymentMethodRepository);
  });

  it('should call repository setPaymentMethod with serialized request and return the deserialized response', async () => {
    const mockRequest: IPaymentMethodRequest = {
      token: 'someToken',
    };
    const mockDtoResponse = {
      alias: 'test',
      brand: 'test',
      id: 'test',
      provider: 'test',
      type: 'test',
    };
    const expectedRecoverPassword: IPaymentMethod = dtoToPaymentMethod(mockDtoResponse);

    mockPaymentMethodRepository.setPaymentMethod.mockResolvedValueOnce(mockDtoResponse);

    const result = await paymentMethodTransactionCase.execute(mockRequest);

    const expectedDto = paymentMethodRequestToDto(mockRequest);
    expect(mockPaymentMethodRepository.setPaymentMethod).toHaveBeenCalledWith(expectedDto);
    expect(result).toEqual(expectedRecoverPassword);
  });
});
