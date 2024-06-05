import axios from 'axios';
import Config from 'react-native-config';

const {
  BASE_URL,
  API_KEY, AUTH_BASE_URL,
} = Config;

export const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'x-api-key': API_KEY as string,
};

export const apiInstance = axios.create({
  baseURL: BASE_URL,
  headers: defaultHeaders,
});

export const apiAuthInstance = axios.create({
  baseURL: AUTH_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-amz-target': 'AWSCognitoIdentityProviderService.RevokeToken',
  },
});

export const apiMockInstance = axios.create({
  baseURL: '',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
