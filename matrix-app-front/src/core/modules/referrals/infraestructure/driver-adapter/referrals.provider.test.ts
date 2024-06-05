import HttpImplementation from 'src/core/libraries-implementation/http/http.implementation';

import ReferralsProvider from './referrals.provider';

// Mock para HttpImplementation
jest.mock('src/core/libraries-implementation/http/http.implementation');

const mockHttpImpInstance: any = {
  get: jest.fn(),
};

describe('ReferralsProvider', () => {
  let referralsProvider: ReferralsProvider;
  let mockHttpImpl: jest.Mocked<HttpImplementation>;

  beforeEach(() => {
    mockHttpImpl = mockHttpImpInstance as jest.Mocked<HttpImplementation>;
    referralsProvider = new ReferralsProvider(mockHttpImpl);
  });

  test('should return a response when successful generateCode', async () => {
    const mockResponse = {
      data: {
        code: 'CODE',
      },
      status: 200,
    };

    mockHttpImpl.get.mockResolvedValue(mockResponse);

    const response = await referralsProvider.getReferralCode();
    expect(response).toEqual(mockResponse);
  });
});
