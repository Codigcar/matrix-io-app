import axios from 'axios';
import { API_KEY } from '../constants';

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'x-api-key': API_KEY,
};

export type requestType = {
  baseURL: string;
  url: string;
  params?: {};
  headers?: {};
  defaultHeader?: {};
  options?: {};
  data?: {};
};

const CoreServices = {
  async get(data: requestType): Promise<any> {
    const {
      baseURL, url, params, headers,
    } = data;
    try {
      const response = await axios.get(url, {
        ...params,
        baseURL,
        method: 'GET',
        headers: { ...defaultHeaders, ...headers },
      });
      console.log('Rest Service GET %s%s STATUS: ', baseURL, url, response.status);
      console.log('Rest Service GET %s RESPONSE: ', url, response.data);
      return response.data;
    } catch (error) {
      console.log(`Rest Service GET FAILED: ${baseURL}${url}: ${error}`);
      await Promise.reject(error);
    }
    return null;
  },
  async post(postData: requestType): Promise<any> {
    const {
      baseURL, url, data, params, options, headers,
    } = postData;
    console.log('Rest Service POST %s%s', baseURL, url, data, params, options);
    try {
      const response = await axios.post(url, data, {
        ...params,
        baseURL,
        method: 'POST',
        headers: { ...defaultHeaders, ...headers },
      });
      console.log('Rest Service POST %s%s STATUS: ', baseURL, url, response.status);
      console.log('Rest Service POST %s%s RESPONSE: ', url, response.data);
      return response.data;
    } catch (error) {
      console.log('Rest Service POST %s%s FAILED: ', baseURL, url, error.response);
      await Promise.reject({ error: error.response.data, status: error.response.status });
    }
    return null;
  },
  async postData(postData: requestType): Promise<any> {
    const {
      baseURL, url, data, params, options, defaultHeader, headers,
    } = postData;
    console.log('Rest Service POST %s%s', baseURL, url, data, params, options);
    try {
      const response = await axios.post(url, data, {
        baseURL,
        params,
        method: 'POST',
        headers: { ...defaultHeader, ...headers },
        ...options,
      });
      console.log('Rest Service POST %s%s STATUS: ', baseURL, url, response.status);
      console.log('Rest Service POST %s%s RESPONSE: ', url, response.data);
      return response;
    } catch (error) {
      console.log('Rest Service POST %s%s FAILED: ', baseURL, url, error);
      await Promise.reject(error);
    }
    return null;
  },
  async put(putData: requestType): Promise<any> {
    const {
      baseURL, url, data, params, options, defaultHeader, headers,
    } = putData;
    console.log('Rest Service PUT %s%s', baseURL, url, params, options);
    try {
      const response = await axios.put(url, data, {
        baseURL,
        params,
        method: 'PUT',
        headers: { ...defaultHeader, ...headers },
        ...options,
      });
      console.log('Rest Service PUT %s%s STATUS: ', baseURL, url, response.status);
      console.log('Rest Service PUT %s%s RESPONSE: ', url, response.data);
      return response.data;
    } catch (error) {
      console.warn('Rest Service PUT %s%s FAILED: ', baseURL, url, error);
      await Promise.reject(error.response.data);
    }
    return null;
  },
  async delete(putData: requestType): Promise<any> {
    const {
      baseURL, url, data={}, params, options, defaultHeader, headers,
    } = putData;
    try {
      const response = await axios.delete(url, {
        ...params,
        baseURL,
        method: 'DELETE',
        headers: { ...defaultHeaders, ...headers },
        data
      });
      console.log('Rest Service Delete %s%s STATUS: ', baseURL, url, response.status);
      return response;
    } catch (error) {
      console.log('Rest Service Delete %s%s FAILED: ', baseURL, url, error);
      await Promise.reject(error);
    }
    return null;
  },
  async patch(postData: requestType): Promise<any> {
    const {
      baseURL, url, data, params, options, defaultHeader, headers,
    } = postData;
    console.log('Rest Service PATCH %s%s', baseURL, url, data, params, options);
    try {
      const response = await axios.patch(url, data, {
        baseURL,
        params,
        method: 'PATCH',
        headers: { ...defaultHeader, ...headers },
        ...options,
      });
      console.log('Rest Service PATCH %s%s STATUS: ', baseURL, url, response.status);
      console.log('Rest Service PATCH %s%s RESPONSE: ', url, response.data);
      return response;
    } catch (error) {
      console.log('Rest Service PATCH %s%s FAILED: ', baseURL, url, error);
      await Promise.reject(error);
    }
    return null;
  },
};

export default CoreServices;
