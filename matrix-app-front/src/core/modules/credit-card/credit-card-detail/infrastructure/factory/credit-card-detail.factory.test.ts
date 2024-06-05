import TypeProviderEnum from 'src/core/enums/type-provider.enum';
import { CreditCardDetailProvider } from '../driver-adapter/credit-card-detail.provider';
import { CreditCardDetailProviderMock } from '../driver-adapter-mock/credit-card-detail.provider.mock';
import { CreditCardDetailFactory } from './credit-card-detail.factory';

describe('CreditCardDetailFactory', () => {
  it('should return an instance of CreditCardDetailProvider when PROVIDER is passed', () => {
    const instance = CreditCardDetailFactory.getInstance(TypeProviderEnum.PROVIDER);
    expect(instance).toBeInstanceOf(CreditCardDetailProvider);
  });

  it('should return an instance of CreditCardDetailProviderMock when MOCK is passed', () => {
    const instance = CreditCardDetailFactory.getInstance(TypeProviderEnum.MOCK);
    expect(instance).toBeInstanceOf(CreditCardDetailProviderMock);
  });

  it('should return an instance of CreditCardDetailProvider by default if no parameter is passed', () => {
    const instance = CreditCardDetailFactory.getInstance();
    expect(instance).toBeInstanceOf(CreditCardDetailProvider);
  });

  it('should return an instance of CreditCardDetailProvider for unhandled cases', () => {
    const instance = CreditCardDetailFactory.getInstance('nonExistingType');
    expect(instance).toBeInstanceOf(CreditCardDetailProvider);
  });
});
