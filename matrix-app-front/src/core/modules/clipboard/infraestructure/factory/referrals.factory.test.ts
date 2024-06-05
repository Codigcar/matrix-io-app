import TypeProviderEnum from 'src/core/enums/type-provider.enum';

import ClipboardProvider from '../driver-adapter/clipboard.provider';
import ClipboardProviderMock from '../driver-adapter-mock/clipboard.provider.mock';
import ClipboardFactory from './clipboard.factory';

describe('ClipboardFactory', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return ClipboardProvider instance for PROVIDER', () => {
    const instance = ClipboardFactory.getInstance(TypeProviderEnum.PROVIDER);
    expect(instance).toBeInstanceOf(ClipboardProvider);
  });

  test('should return ClipboardProvider instance for MOCK', () => {
    const instance = ClipboardFactory.getInstance(TypeProviderEnum.MOCK);
    expect(instance).toBeInstanceOf(ClipboardProviderMock);
  });

  test('should return ClipboardProvider instance as default', () => {
    const instance = ClipboardFactory.getInstance('someRandomValue');
    expect(instance).toBeInstanceOf(ClipboardProvider);
  });
});
