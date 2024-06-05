/* eslint-env jest */
import TypeProviderEnum from 'src/core/enums/type-provider.enum';
import PasswordFactory from './password.factory';
import PasswordProviderMock from '../driver-adapter-mock/password.provider.mock';
import PasswordProvider from '../driver-adapter/password.provider';

jest.mock('../driver-adapter/password.provider');
jest.mock('../driver-adapter-mock/password.provider.mock');

describe('PasswordFactory', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return PasswordProvider instance for PROVIDER', () => {
    const instance = PasswordFactory.getInstance(TypeProviderEnum.PROVIDER);
    expect(instance).toBeInstanceOf(PasswordProvider);
  });

  it('should return PasswordProviderMock instance for MOCK', () => {
    const instance = PasswordFactory.getInstance(TypeProviderEnum.MOCK);
    expect(instance).toBeInstanceOf(PasswordProviderMock);
  });

  it('should return PasswordProvider instance as default', () => {
    const instance = PasswordFactory.getInstance('someRandomValue');
    expect(instance).toBeInstanceOf(PasswordProvider);
  });
});
