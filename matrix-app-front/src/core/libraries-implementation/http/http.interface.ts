import { AxiosRequestHeaders } from 'axios';

export interface IHttp {
  request<T>(
    typeApi: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    url: string,
    body?: any,
    responseType?: 'json' | 'text',
    headers?: AxiosRequestHeaders,
  ): Promise<T>;

  get<T>(
    typeApi: string,
    url: string,
    responseType?: 'json' | 'text',
    headers?: AxiosRequestHeaders,
  ): Promise<T>;

  post<T>(
    typeApi: string,
    url: string,
    body?: any,
    responseType?: 'json' | 'text',
    headers?: AxiosRequestHeaders,
  ): Promise<T>;

  put<T>(
    typeApi: string,
    url: string,
    body?: any,
    responseType?: 'json' | 'text',
    headers?: AxiosRequestHeaders,
  ): Promise<T>;

  patch<T>(
    typeApi: string,
    url: string,
    body?: any,
    responseType?: 'json' | 'text',
    headers?: AxiosRequestHeaders,
  ): Promise<T>;

  delete<T>(
    typeApi: string,
    url: string,
    responseType?: 'json' | 'text',
    headers?: AxiosRequestHeaders,
  ): Promise<T>;

  handleError(error: any): never;
}
