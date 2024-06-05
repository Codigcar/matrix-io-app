import { baseApi } from './index';
import { OnboardingProps, SumaryProps } from './types/onboradingTypes';
import { StartDocumentValidationProps } from './types/documentValidationTypes';
import { StepsProofOfLiveProps } from './types/liveness';
import {
  StartPersonalDataProps,
  AddressDataProps,
  SaveAddressProps,
  WorkDataProps,
  SaveWorkProps,
  DeleteContactDataProps,
} from './types/personalDataTypes';

const onboarding = {
  opportunities: '/v1/me/leads/opportunities',
  summary: '/v1/me/onboarding/summary',
  data: '/v1/me/onboarding',
};
const documentValidation = {
  start: '/v1/me/onboarding/document/upload-intent',
};
const liveness = {
  getSteps: '/v1/me/onboarding/face-recognition/create-validation-face-step',
};
const personalData = {
  start: '/v1/me/onboarding/fulfillment/start',
  address: '/v1/me/onboarding/fulfillment/address',
  work: '/v1/me/onboarding/fulfillment',
};

const onboardingSummary = async (): Promise<SumaryProps> => {
  const { data } = await baseApi.get(onboarding.summary);
  return data;
};

const onboardingData = async (): Promise<OnboardingProps> => {
  const { data } = await baseApi.get(onboarding.data);
  return data;
};

const startDocumentValidation = async (): Promise<StartDocumentValidationProps> => {
  const { data } = await baseApi.post(documentValidation.start);
  return data;
};

const getSteps = async (): Promise<StepsProofOfLiveProps> => {
  const { data } = await baseApi.post<StepsProofOfLiveProps>(liveness.getSteps, undefined, {
    headers: {
      'x-liveness': 'passive',
    },
  });
  if (data.status_code !== 200) {
    throw data;
  }
  return data;
};

const startPersonalData = async (): Promise<StartPersonalDataProps> => {
  const { data } = await baseApi.post(personalData.start);
  return data;
};

const deleteContactData = async (token: string): Promise<DeleteContactDataProps> => {
  const { data } = await baseApi.delete(`${onboarding.opportunities}/${token}`);
  return data;
};

const saveAdress = async (addressData: AddressDataProps): Promise<SaveAddressProps> => {
  const { data } = await baseApi.post(personalData.address, addressData);
  return data;
};

const saveWork = async (workData: WorkDataProps): Promise<SaveWorkProps> => {
  const { data } = await baseApi.post(personalData.work, workData);
  return data;
};

export {
  onboardingSummary,
  onboardingData,
  startDocumentValidation,
  getSteps,
  startPersonalData,
  deleteContactData,
  saveAdress,
  saveWork,
};
