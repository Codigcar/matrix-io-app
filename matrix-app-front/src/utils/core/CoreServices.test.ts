import axios from 'axios';
import CoreServices from './CoreServices';

// Mock for axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CoreServices', () => {
  const baseURL = 'https://api.example.com';
  const url = '/test';
  const testData = { key: 'value' };
  const mockResponse = { data: testData };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Pruebas para get
  test('get should handle a GET request', async () => {
    mockedAxios.get.mockResolvedValue(mockResponse);

    const result = await CoreServices.get({ baseURL, url });
    expect(result).toEqual(testData);
    expect(mockedAxios.get).toHaveBeenCalledWith(url, expect.any(Object));
  });

  // Pruebas para post
  test('post should handle a POST request', async () => {
    mockedAxios.post.mockResolvedValue(mockResponse);

    const result = await CoreServices.post({ baseURL, url, data: testData });
    expect(result).toEqual(testData);
    expect(mockedAxios.post).toHaveBeenCalledWith(url, testData, expect.any(Object));
  });

  // Pruebas para put
  test('put should handle a PUT request', async () => {
    mockedAxios.put.mockResolvedValue(mockResponse);

    const result = await CoreServices.put({ baseURL, url, data: testData });
    expect(result).toEqual(testData);
    expect(mockedAxios.put).toHaveBeenCalledWith(url, testData, expect.any(Object));
  });

  // Pruebas para delete
  test('delete should handle a DELETE request', async () => {
    mockedAxios.delete.mockResolvedValue(mockResponse);

    const result = await CoreServices.delete({ baseURL, url });
    expect(result).toEqual(mockResponse);
    expect(mockedAxios.delete).toHaveBeenCalledWith(url, expect.any(Object));
  });

  // Pruebas para patch
  test('patch should handle a PATCH request', async () => {
    mockedAxios.patch.mockResolvedValue(mockResponse);

    const result = await CoreServices.patch({ baseURL, url, data: testData });
    expect(result).toEqual(mockResponse);
    expect(mockedAxios.patch).toHaveBeenCalledWith(url, testData, expect.any(Object));
  });

  // Pruebas adicionales para manejar errores
  test('get should handle an error', async () => {
    const error = new Error('Network Error');
    mockedAxios.get.mockRejectedValue(error);

    await expect(CoreServices.get({ baseURL, url })).rejects.toThrow(error);
  });
});
