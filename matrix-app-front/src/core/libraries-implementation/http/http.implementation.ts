import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios';
import { IHttp } from './http.interface';
import {
  apiAuthInstance, apiInstance, apiMockInstance, defaultHeaders,
} from './http.instance';
import { store } from '../state-manager/store';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

const instances = [apiInstance, apiAuthInstance, apiMockInstance];

instances.forEach((instance) => {
  instance.interceptors.request.use((request) => {
    const accessToken = store.getState().session.token;
    if (request.headers) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }
    return request;
  });
});

const axiosInstances: any = {
  apiInstance,
  apiAuthInstance,
  apiMockInstance,
};

export default class HttpImplementation implements IHttp {
  private readonly REQUEST_TIMEOUT: number = 30000;

  private getInstance(typeApi: string): AxiosInstance {
    return axiosInstances[typeApi];
  }

  public handleError(error: any): never {
    if (axios.isAxiosError(error) && error.response) {
      const customError = new Error('API Error');
      customError.name = 'APIError';

      const errorMessage = error.response.data?.message || error.response.data?.description || 'No message';
      customError.message = errorMessage;

      (customError as any).code = error.response.data?.code || error.response.status;
      (customError as any).data = error.response.data;

      if (error.response.data?.details) {
        (customError as any).details = error.response.data.details;
      }

      throw customError;
    } else {
      throw error;
    }
  }

  public async request<T>(
    typeApi: string,
    method: HttpMethod,
    url: string,
    body?: any,
    responseType: 'json' | 'text' = 'json',
    headers?: AxiosRequestHeaders,
  ): Promise<T> {
    const config: AxiosRequestConfig = {
      url,
      method,
      data: body,
      headers: { ...defaultHeaders, ...headers },
      responseType,
      timeout: this.REQUEST_TIMEOUT,
    };

    try {
      const instance = this.getInstance(typeApi);
      const responseAxios: AxiosResponse<T> = await instance.request(config);
      return responseAxios?.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async get<T>(
    typeApi: string,
    url: string,
    responseType: 'json' | 'text' = 'json',
    headers?: AxiosRequestHeaders,
  ): Promise<T> {
    try {
      return await this.request(typeApi, 'GET', url, undefined, responseType, headers);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async post<T>(
    typeApi: string,
    url: string,
    body?: any,
    responseType: 'json' | 'text' = 'json',
    headers?: AxiosRequestHeaders,
  ): Promise<T> {
    try {
      return await this.request<T>(typeApi, 'POST', url, body, responseType, headers);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async put<T>(
    typeApi: string,
    url: string,
    body?: any,
    responseType: 'json' | 'text' = 'json',
    headers?: AxiosRequestHeaders,
  ): Promise<T> {
    try {
      return await this.request<T>(typeApi, 'PUT', url, body, responseType, headers);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async patch<T>(
    typeApi: string,
    url: string,
    body?: any,
    responseType: 'json' | 'text' = 'json',
    headers?: AxiosRequestHeaders,
  ): Promise<T> {
    try {
      return await this.request(typeApi, 'PATCH', url, body, responseType, headers);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async delete<T>(
    typeApi: string,
    url: string,
    responseType: 'json' | 'text' = 'json',
    headers?: AxiosRequestHeaders,
  ): Promise<T> {
    try {
      return await this.request<T>(typeApi, 'DELETE', url, undefined, responseType, headers);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
