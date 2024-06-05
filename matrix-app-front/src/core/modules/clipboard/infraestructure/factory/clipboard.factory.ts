import TypeProviderEnum from 'src/core/enums/type-provider.enum';
import { IClipboardRepository } from 'src/core/modules/clipboard/repository/clipboard.repository';

import ClipboardProvider from '../driver-adapter/clipboard.provider';
import ClipboardProviderMock from '../driver-adapter-mock/clipboard.provider.mock';

class ClipboardFactory {
  static getInstance(typeProvider: string = 'provider'): IClipboardRepository {
    switch (typeProvider) {
      case TypeProviderEnum.PROVIDER:
        return new ClipboardProvider();
      case TypeProviderEnum.MOCK:
        return new ClipboardProviderMock();
      default:
        return new ClipboardProvider();
    }
  }
}

export default ClipboardFactory;
