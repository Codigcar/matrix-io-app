import CustomAuth from './authClass';

const Auth = new CustomAuth();

const customLogin = async (username: string, password: string): Promise<any> => {
  const response = await Auth.login(username, password);
  return response;
};

const challengeResponse = async (challenge: string): Promise<any> => {
  const response = await Auth.verifyLoginTrial(challenge);
  return response;
};

export { customLogin, challengeResponse };
