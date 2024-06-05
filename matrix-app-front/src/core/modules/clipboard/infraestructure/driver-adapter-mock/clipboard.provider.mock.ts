import { IClipboardRepository } from 'src/core/modules/clipboard/repository/clipboard.repository';

class ClipboardProviderMock implements IClipboardRepository {
  public copyText(): void {
    Promise.resolve();
  }
}

export default ClipboardProviderMock;
