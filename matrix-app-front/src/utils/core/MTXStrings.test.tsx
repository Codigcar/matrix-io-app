import i18next from 'i18next';
import { getString, hasKey } from './MTXStrings';

jest.mock('i18next', () => ({
  exists: jest.fn(),
  t: jest.fn(),
  init: jest.fn(),
}));

describe('Internationalization Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  // Pruebas para hasKey
  test('hasKey should call i18next.exists', () => {
    const key = 'testKey';
    hasKey(key);
    expect(i18next.exists).toHaveBeenCalledWith(key);
  });

  // Pruebas para getString
  test('getString should return translated string', () => {
    const key = 'hello';
    const translatedString = 'Hola';
    (i18next.exists as jest.Mock).mockReturnValue(true);
    (i18next.t as jest.Mock).mockReturnValue(translatedString);

    const result = getString(key);
    expect(result).toBe(translatedString);
    expect(i18next.t).toHaveBeenCalledWith(key);
  });
});
