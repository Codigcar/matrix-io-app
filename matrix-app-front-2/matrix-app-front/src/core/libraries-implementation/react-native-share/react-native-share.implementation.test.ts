/* eslint-env jest */
import RNShare from 'react-native-share';
import RNShareImplementation from './react-native-share.implementation';

jest.mock('react-native-share', () => ({
  open: jest.fn(),
}));

describe('RNShareImplementation', () => {
  let rnShare: RNShareImplementation;
  beforeEach(() => {
    rnShare = new RNShareImplementation();
  });

  it('Should call Share.open with the provided options', () => {
    const openSpy = jest.spyOn(RNShare, 'open');
    const shareOptions = { title: 'title', message: 'message', subject: 'subject' };
    rnShare.open(shareOptions);

    expect(openSpy).toHaveBeenCalledWith(shareOptions);
  });
});
