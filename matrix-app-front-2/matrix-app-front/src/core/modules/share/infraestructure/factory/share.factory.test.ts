import TypeProviderEnum from 'src/core/enums/type-provider.enum';

import ShareProvider from '../driver-adapter/share.provider';
import ShareProviderMock from '../driver-adapter-mock/share.provider.mock';
import ShareFactory from './share.factory';

describe('ShareFactory', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return ShareProvider instance for PROVIDER', () => {
    const instance = ShareFactory.getInstance(TypeProviderEnum.PROVIDER);
    expect(instance).toBeInstanceOf(ShareProvider);
  });

  test('should return ShareProvider instance for MOCK', () => {
    const instance = ShareFactory.getInstance(TypeProviderEnum.MOCK);
    expect(instance).toBeInstanceOf(ShareProviderMock);
  });

  test('should return ShareProvider instance as default', () => {
    const instance = ShareFactory.getInstance('someRandomValue');
    expect(instance).toBeInstanceOf(ShareProvider);
  });
});
