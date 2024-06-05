import TypeProviderEnum from 'src/core/enums/type-provider.enum';
import { IShareRepository } from 'src/core/modules/share/repository/share.repository';

import ShareProvider from '../driver-adapter/share.provider';
import ShareProviderMock from '../driver-adapter-mock/share.provider.mock';

class ShareFactory {
  static getInstance(typeProvider: string = 'provider'): IShareRepository {
    switch (typeProvider) {
      case TypeProviderEnum.PROVIDER:
        return new ShareProvider();
      case TypeProviderEnum.MOCK:
        return new ShareProviderMock();
      default:
        return new ShareProvider();
    }
  }
}

export default ShareFactory;
