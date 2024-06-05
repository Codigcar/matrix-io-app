/* eslint-disable no-console */
import { ICreditCardDetailRepository } from '../../repository/credit-card-detail.repository';
import { BalancesDto, IPaymentOrderDto } from '../../dtos';

const minimumSchemeMock = {
  amount: 100,
  currency: 'USD',
};

const mockedBalance: BalancesDto = [{
  consumed: {
    amount: 1000,
    currency: 'USD',
    details: [
      {
        amount: 500,
        currency: 'USD',
      },
      {
        amount: 500,
        currency: 'USD',
      },
    ],
  },
  accountId: '12345ABC',
  available: {
    amount: 2000,
    currency: 'USD',
  },
  creditLimit: {
    amount: 3000,
    currency: 'USD',
  },
  isDelinquent: false,
}];

const mockedPaymentOrders: IPaymentOrderDto[] = [
  {
    accountId: '123ABC',
    total: { ...minimumSchemeMock },
    endDate: '2024-01-31',
    dueDate: '2024-02-15',
    pending: { ...minimumSchemeMock },
    statementDate: '2024-01-01',
    id: '987XYZ',
    type: 'Credit',
    minimum: { ...minimumSchemeMock },
    hasPaymentInProgress: true,
    startDate: '2023-12-01',
    status: 'Active',
  },
];

export class CreditCardDetailProviderMock implements ICreditCardDetailRepository {
  async getBalance(): Promise<BalancesDto> {
    console.log('Mock getBalance called');
    return Promise.resolve(mockedBalance);
  }

  async getPaymentOrder(): Promise<IPaymentOrderDto[]> {
    console.log('Mock getPaymentOrder called');
    return Promise.resolve(mockedPaymentOrders);
  }
}
