import TypeProviderEnum from 'src/core/enums/type-provider.enum';
import SessionProvider from '../driver-adapter/session.provider';
import { ISessionRepository } from '../../repository/session.repository';
import SessionProviderMock from '../driver-adapter-mock/session.provider.mock';

class SessionFactory {
  static getInstance(typeProvider: string = 'provider'): ISessionRepository {
    switch (typeProvider) {
      case TypeProviderEnum.PROVIDER:
        return new SessionProvider();
      case TypeProviderEnum.MOCK:
        return new SessionProviderMock();
      default:
        return new SessionProvider();
    }
  }
}

export default SessionFactory;
