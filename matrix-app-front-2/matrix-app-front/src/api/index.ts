import Axios from 'axios';
import Config from 'react-native-config';
import store from 'src/store/store';

const { BASE_URL, API_KEY, AUTH_BASE_URL } = Config;

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'x-api-key': API_KEY,
};

export const baseApi = Axios.create({
  baseURL: BASE_URL,
  headers: defaultHeaders,
});

export const authApi = Axios.create({
  baseURL: AUTH_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-amz-target': 'AWSCognitoIdentityProviderService.RevokeToken',
  },
});

export const meUpdateApi = Axios.create({
  baseURL: BASE_URL,
  headers: {
    ...defaultHeaders,
    'X-Amz-Target': 'AWSCognitoIdentityProviderService.UpdateUserAttribute',
  },
});

export const recaptchaAuthApi = Axios.create({
  baseURL: AUTH_BASE_URL,
  headers: defaultHeaders,
});

const instances = [baseApi, meUpdateApi];
instances.forEach((instance) => {
  instance.interceptors.request.use((request) => {
    const accessToken = store.getState().session.token;
    if (request.headers) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }
    return request;
  });
});
