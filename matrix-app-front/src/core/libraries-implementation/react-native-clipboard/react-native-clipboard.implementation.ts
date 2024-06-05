import Clipboard from '@react-native-clipboard/clipboard';

import { IRNClipboard } from './react-native-clipboard.interface';

export default class RNClipboardImplementation implements IRNClipboard {
  public setString(text: string): void {
    Clipboard.setString(text);
  }
}
