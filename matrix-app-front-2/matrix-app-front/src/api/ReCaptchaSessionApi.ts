import { recaptchaAuthApi } from './index';
import { IRecaptchaSessionApi } from './types/reCaptchaSessionTypes';

const recaptchaTokenURL = '/session';

const getReCaptchaSessionToken = async (recaptchaToken: string): Promise<IRecaptchaSessionApi> => {
  const response = await recaptchaAuthApi.post(recaptchaTokenURL, { recaptchaToken });
  return response.data;
};

export default getReCaptchaSessionToken;
