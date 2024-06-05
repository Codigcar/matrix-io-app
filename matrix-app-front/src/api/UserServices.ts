import { baseApi } from './index';
import { UserProps } from './types/userTypes';

const user = {
  info: '/v1/auth/userinfo',
};

const getLastUserStatus = async (): Promise<UserProps> => {
  const { data } = await baseApi.get(user.info);
  return data;
};

export default getLastUserStatus;
