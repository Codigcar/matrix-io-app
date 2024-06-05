import RNShareImplementation from 'src/core/libraries-implementation/react-native-share/react-native-share.implementation';

import ShareProvider from './share.provider';

// Mock para RNShareImplementation
jest.mock('src/core/libraries-implementation/react-native-share/react-native-share.implementation');

const mockRNShareImpInstance: any = {
  open: jest.fn(),
};

describe('ShareProvider', () => {
  let shareProvider: ShareProvider;
  let mockRNShareImpl: jest.Mocked<RNShareImplementation>;

  beforeEach(() => {
    mockRNShareImpl = mockRNShareImpInstance as jest.Mocked<RNShareImplementation>;

    shareProvider = new ShareProvider(mockRNShareImpl);
  });

  test('should return a void when execute shareOptions', async () => {
    const mockOptions = {
      title: 'title',
      subject: 'subject',
      message: 'CODE__',
    };

    mockRNShareImpl.open(mockOptions);

    const response = await shareProvider.shareOptions(mockOptions);
    expect(response).toEqual(undefined);
  });
});
