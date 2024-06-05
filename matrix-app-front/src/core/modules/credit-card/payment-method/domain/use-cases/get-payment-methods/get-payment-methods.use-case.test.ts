import { IPaymentMethod } from '../../../dtos';
import { IPaymentMethodRepository } from '../../../repository/payment-method.repository';
import { dtosToPaymentMethods } from '../../mappers/payment-method/deserialize/payment-method.deserialize';
import { GetPaymentMethodUseCase } from './get-payment-methods.use-case';

jest.mock('../../../repository/payment-method.repository');

describe('GetPaymentMethodUseCase', () => {
  let paymentMethodUseCase: GetPaymentMethodUseCase;
  let mockPaymentMethodRepository: jest.Mocked<IPaymentMethodRepository>;

  beforeEach(() => {
    mockPaymentMethodRepository = {
      getPaymentMethod: jest.fn(),
    } as any;
    paymentMethodUseCase = new GetPaymentMethodUseCase(mockPaymentMethodRepository);
  });

  it('should call repository setPaymentMethod with serialized request and return the deserialized response', async () => {
    const mockDtoResponse = [
      {
        alias: 'test',
        brand: 'test',
        id: 'test',
        provider: 'test',
        type: 'test',
      },
      {
        alias: 'test2',
        brand: 'test2',
        id: 'test2',
        provider: 'test2',
        type: 'test2',
      },
    ];
    const expectedPaymentMethods: IPaymentMethod[] = dtosToPaymentMethods(mockDtoResponse);

    mockPaymentMethodRepository.getPaymentMethod.mockResolvedValueOnce(mockDtoResponse);

    const result = await paymentMethodUseCase.execute();
    expect(result).toEqual(expectedPaymentMethods);
  });
});
