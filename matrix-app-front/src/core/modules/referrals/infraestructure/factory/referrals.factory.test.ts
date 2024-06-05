import TypeProviderEnum from 'src/core/enums/type-provider.enum';

import ReferralsProvider from '../driver-adapter/referrals.provider';
import ReferralsProviderMock from '../driver-adapter-mock/referrals.provider.mock';
import ReferralsFactory from './referrals.factory';

describe('ReferralsFactory', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return ReferralsProvider instance for PROVIDER', () => {
    const instance = ReferralsFactory.getInstance(TypeProviderEnum.PROVIDER);
    expect(instance).toBeInstanceOf(ReferralsProvider);
  });

  test('should return ReferralsProvider instance for MOCK', () => {
    const instance = ReferralsFactory.getInstance(TypeProviderEnum.MOCK);
    expect(instance).toBeInstanceOf(ReferralsProviderMock);
  });

  test('should return ReferralsProvider instance as default', () => {
    const instance = ReferralsFactory.getInstance('someRandomValue');
    expect(instance).toBeInstanceOf(ReferralsProvider);
  });
});
