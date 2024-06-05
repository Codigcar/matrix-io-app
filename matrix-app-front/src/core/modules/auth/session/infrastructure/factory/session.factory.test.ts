import TypeProviderEnum from 'src/core/enums/type-provider.enum';
import SessionProviderMock from '../driver-adapter-mock/session.provider.mock';
import SessionFactory from './session.factory';
import SessionProvider from '../driver-adapter/session.provider';

jest.mock('../driver-adapter/session.provider');
jest.mock('../driver-adapter-mock/session.provider.mock');

describe('SessionFactory', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return SessionProvider instance for PROVIDER', () => {
    const instance = SessionFactory.getInstance(TypeProviderEnum.PROVIDER);
    expect(instance).toBeInstanceOf(SessionProvider);
  });

  it('should return SessionProviderMock instance for MOCK', () => {
    const instance = SessionFactory.getInstance(TypeProviderEnum.MOCK);
    expect(instance).toBeInstanceOf(SessionProviderMock);
  });

  it('should return SessionProvider instance as default', () => {
    const instance = SessionFactory.getInstance('someRandomValue');
    expect(instance).toBeInstanceOf(SessionProvider);
  });
});
