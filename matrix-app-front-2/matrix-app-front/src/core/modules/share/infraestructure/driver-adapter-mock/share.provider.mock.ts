import { IShareRepository } from 'src/core/modules/share/repository/share.repository';

class ShareProviderMock implements IShareRepository {
  public async shareOptions(): Promise<void> {
    return Promise.resolve();
  }
}

export default ShareProviderMock;
