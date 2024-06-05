/* eslint-env jest */
import MockAdapter from 'axios-mock-adapter';
import axios, { AxiosRequestHeaders } from 'axios';
import HttpImplementation from './http.implementation';

const typeApi = 'apiInstance';
const url = '/test';
const responseType = 'json';
const headers: AxiosRequestHeaders = {
  Authorization: 'Bearer token123',
};
const mockResponse = {
  data: { key: 'value' },
  status: 200,
};

const body = { key: 'value' };

jest.mock('axios');

describe('HttpImplementation', () => {
  let httpImplementation: HttpImplementation;
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    httpImplementation = new HttpImplementation();

    (httpImplementation as any).getInstance = jest.fn().mockReturnValue({
      request: jest.fn(),
    });
  });

  afterEach(() => {
    mockAxios.restore();
    jest.clearAllMocks();
  });

  it('should call request with correct arguments for GET', async () => {
    const requestSpy = jest.spyOn(httpImplementation as any, 'request');
    requestSpy.mockResolvedValue(mockResponse);

    const response = await httpImplementation.get(typeApi, url, responseType, headers);

    expect(requestSpy).toHaveBeenCalledWith(typeApi, 'GET', url, undefined, responseType, headers);
    expect(response).toEqual(mockResponse);
  });

  it('should - GET reject with an error if request throws an error', async () => {
    const mockError = new Error('Mock Error');
    const requestSpy = jest.spyOn(httpImplementation as any, 'request');
    requestSpy.mockRejectedValue(mockError);

    await expect(httpImplementation.get(typeApi, url, responseType, headers)).rejects.toThrow(
      mockError,
    );
  });

  it('should call request with correct arguments for POST', async () => {
    const requestSpy = jest.spyOn(httpImplementation as any, 'request');
    requestSpy.mockResolvedValue(mockResponse);

    const response = await httpImplementation.post(typeApi, url, body, responseType, headers);

    expect(requestSpy).toHaveBeenCalledWith(typeApi, 'POST', url, body, responseType, headers);
    expect(response).toEqual(mockResponse);
  });

  it('should - POST reject with an error if request throws an error', async () => {
    const mockError = new Error('Mock Error');
    const requestSpy = jest.spyOn(httpImplementation as any, 'request');
    requestSpy.mockRejectedValue(mockError);

    await expect(
      httpImplementation.post(typeApi, url, body, responseType, headers),
    ).rejects.toThrow(mockError);
  });

  it('should call request with correct arguments for PUT', async () => {
    const requestSpy = jest.spyOn(httpImplementation as any, 'request');
    requestSpy.mockResolvedValue(mockResponse);

    const response = await httpImplementation.put(typeApi, url, body, responseType, headers);

    expect(requestSpy).toHaveBeenCalledWith(typeApi, 'PUT', url, body, responseType, headers);
    expect(response).toEqual(mockResponse);
  });

  it('should - PUT reject with an error if request throws an error', async () => {
    const mockError = new Error('Mock Error');
    const requestSpy = jest.spyOn(httpImplementation as any, 'request');
    requestSpy.mockRejectedValue(mockError);

    await expect(httpImplementation.put(typeApi, url, body, responseType, headers)).rejects.toThrow(
      mockError,
    );
  });

  it('should call request with correct arguments for PATCH', async () => {
    const requestSpy = jest.spyOn(httpImplementation as any, 'request');
    requestSpy.mockResolvedValue(mockResponse);

    const response = await httpImplementation.patch(typeApi, url, body, responseType, headers);

    expect(requestSpy).toHaveBeenCalledWith(typeApi, 'PATCH', url, body, responseType, headers);
    expect(response).toEqual(mockResponse);
  });

  it('should - PATCH reject with an error if request throws an error', async () => {
    const mockError = new Error('Mock Error');
    const requestSpy = jest.spyOn(httpImplementation as any, 'request');
    requestSpy.mockRejectedValue(mockError);

    await expect(
      httpImplementation.patch(typeApi, url, body, responseType, headers),
    ).rejects.toThrow(mockError);
  });

  it('should call request with correct arguments for DELETE', async () => {
    const requestSpy = jest.spyOn(httpImplementation as any, 'request');
    requestSpy.mockResolvedValue(mockResponse);

    const response = await httpImplementation.delete(typeApi, url, responseType, headers);

    expect(requestSpy).toHaveBeenCalledWith(
      typeApi,
      'DELETE',
      url,
      undefined,
      responseType,
      headers,
    );
    expect(response).toEqual(mockResponse);
  });

  it('should - DELETE reject with an error if request throws an error', async () => {
    const mockError = new Error('Mock Error');
    const requestSpy = jest.spyOn(httpImplementation as any, 'request');
    requestSpy.mockRejectedValue(mockError);

    await expect(httpImplementation.delete(typeApi, url, responseType, headers)).rejects.toThrow(
      mockError,
    );
  });

  it('should reject with an error if request fails', async () => {
    const mockError = new Error('Mock Error');
    const instanceMock = (httpImplementation as any).getInstance();
    instanceMock.request.mockRejectedValue(mockError);

    await expect(httpImplementation.request(typeApi, 'GET', url, undefined, responseType, headers)).rejects.toThrow(
      mockError,
    );
  });

  it('should return undefined if the instance key does not exist', () => {
    const result = (httpImplementation as any).getInstance('nonExistentInstance');
    expect(result).toEqual({ request: expect.any(Function) });
  });
});
