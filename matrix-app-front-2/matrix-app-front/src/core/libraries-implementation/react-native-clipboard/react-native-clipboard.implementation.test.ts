/* eslint-env jest */
import RNClipboard from '@react-native-clipboard/clipboard';
import RNClipboardImplementation from './react-native-clipboard.implementation';

jest.mock('@react-native-clipboard/clipboard', () => ({
  setString: jest.fn(),
}));

describe('RNClipboardImplementation', () => {
  let rnClipboard: RNClipboardImplementation;
  beforeEach(() => {
    rnClipboard = new RNClipboardImplementation();
  });

  it('Should call Clipboard.setString with some text', () => {
    const openSpy = jest.spyOn(RNClipboard, 'setString');
    const text = 'LRA55O';
    rnClipboard.setString(text);

    expect(openSpy).toHaveBeenCalledWith(text);
  });
});
