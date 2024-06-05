import { baseApi } from './index';
import { ProfileProps } from './types/profileTypes';

const profile = {
  data: '/v1/me/customers/profile',
};

const getProfileData = async (): Promise<ProfileProps> => {
  const { data } = await baseApi.get(profile.data);
  return data.data;
};

export default getProfileData;
