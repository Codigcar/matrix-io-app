import TypeProviderEnum from 'src/core/enums/type-provider.enum';
import CardOfferFactory from './card-offer.factory';
import CardOfferProvider from '../driver-adapter/card-offer.provider';
import CardOfferProviderMock from '../driver-adapter-mock/card-offer.provider.mock';

jest.mock('../driver-adapter/card-offer.provider');
jest.mock('../driver-adapter-mock/card-offer.provider.mock');

describe('CardOfferFactory', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return CardOfferProvider instance for PROVIDER', () => {
    const instance = CardOfferFactory.getInstance(TypeProviderEnum.PROVIDER);
    expect(instance).toBeInstanceOf(CardOfferProvider);
  });

  it('should return CardOfferProviderMock instance for MOCK', () => {
    const instance = CardOfferFactory.getInstance(TypeProviderEnum.MOCK);
    expect(instance).toBeInstanceOf(CardOfferProviderMock);
  });

  it('should return CardOfferProvider instance as default', () => {
    const instance = CardOfferFactory.getInstance('someRandomValue');
    expect(instance).toBeInstanceOf(CardOfferProvider);
  });
});
