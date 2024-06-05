/* eslint-disable no-undef */
import { recaptchaAuthApi } from '../index';
import setSessionToken from '../ReCaptchaSessionApi';
import { IRecaptchaSessionApi } from '../types/reCaptchaSessionTypes';

jest.mock('src/utils/Analytics', () => ({
  logCrashlytics: jest.fn(),
}));

jest.mock('../index', () => ({
  recaptchaAuthApi: {
    post: jest.fn(),
  },
}));

xdescribe('setSessionToken', () => {
  it('should fetch successfully data from an API', async () => {
    const recaptchaToken = 'sampleToken';
    const response: IRecaptchaSessionApi = { id: 'id', token: 'token' };

    (recaptchaAuthApi.post as jest.Mock).mockResolvedValue({ data: { data: response } });

    const result = await setSessionToken(recaptchaToken);

    expect(recaptchaAuthApi.post).toHaveBeenCalledWith('/session', { recaptchaToken });
    expect(result).toEqual(response);
  });
});
