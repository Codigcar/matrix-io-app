import RNClipboardImplementation from 'src/core/libraries-implementation/react-native-clipboard/react-native-clipboard.implementation';
import { IClipboardRepository } from 'src/core/modules/clipboard/repository/clipboard.repository';

class ClipboardProvider implements IClipboardRepository {
  private rnClipboard: RNClipboardImplementation;

  constructor(
    rnShareImpInstance = new RNClipboardImplementation(),
  ) {
    this.rnClipboard = rnShareImpInstance;
  }

  public copyText(text: string): void {
    this.rnClipboard.setString(text);
  }
}

export default ClipboardProvider;
