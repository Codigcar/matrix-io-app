import { AxiosRequestHeaders } from 'axios';

export interface IHttp {
  get<T>(
    typeApi: string,
    url: string,
    responseType?: string,
    headers?: AxiosRequestHeaders,
  ): Promise<T>;
  post(
    typeApi: string,
    url: string,
    body?: any,
    responseType?: string,
    headers?: AxiosRequestHeaders,
  ): Promise<any>;
  patch(
    typeApi: string,
    url: string,
    body?: any,
    responseType?: string,
    headers?: AxiosRequestHeaders,
  ): Promise<any>;
  put(
    typeApi: string,
    url: string,
    body?: any,
    responseType?: string,
    headers?: AxiosRequestHeaders,
  ): Promise<any>;
  delete(
    typeApi: string,
    url: string,
    responseType?: string,
    headers?: AxiosRequestHeaders,
  ): Promise<any>;
}
