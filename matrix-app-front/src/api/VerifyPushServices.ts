import { baseApi } from './index';
import { RetryChallengeResponse, VerifyChallenge, VerifyPushGetToken } from './types/verifyPushTypes';

const VERIFY_PUSH_ROUTE = '/v1/me/verifications/verifications/tokens';
const VERIFY_UPDATE_ROUTE = '/v1/me/verifications/verifications/';
const VERIFY_RETRY_ROUTE = '/v1/me/verifications/';

const VerifyPushServices = {
  getVerifyPushToken: async () => {
    try {
      const { data } = await baseApi.get<VerifyPushGetToken>(VERIFY_PUSH_ROUTE);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  verificationChallenge: async (challengeId: string) => {
    try {
      const { data } = await baseApi.get<VerifyChallenge>(`${VERIFY_UPDATE_ROUTE}${challengeId}`);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  retryChallenge: async (challengeId: string) => {
    try {
      const { data } = await baseApi.post<RetryChallengeResponse>(`${VERIFY_RETRY_ROUTE}${challengeId}/retry`);
      if (data.errorMessage) {
        throw new Error(data.errorMessage);
      }
      return data;
    } catch (error) {
      throw Promise.reject(error);
    }
  },
};

export default VerifyPushServices;
