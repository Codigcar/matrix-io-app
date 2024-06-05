/* eslint-env jest */
import HttpImplementation from 'src/core/libraries-implementation/http/http.implementation';
import SessionProvider from './session.provider';
import { RecaptchaSessionRequestDto } from '../../dtos/recaptcha-session/recaptcha-session-request.dto';
import { RecaptchaSessionDto } from '../../dtos/recaptcha-session/recaptcha-session.dto';
import { RecaptchaVersionEnum } from '../../enums/recaptcha-version.enum';

jest.mock('src/core/libraries-implementation/http/http.implementation');

describe('SessionProvider', () => {
  let sessionProvider: SessionProvider;
  let mockHttpImplementation: jest.Mocked<HttpImplementation>;

  beforeEach(() => {
    mockHttpImplementation = new HttpImplementation() as jest.Mocked<HttpImplementation>;
    sessionProvider = new SessionProvider(mockHttpImplementation); // Inyecta el mock aquí
  });

  describe('SessionProvider', () => {
    it('should make a POST request and return session data', async () => {
      const mockRequest: RecaptchaSessionRequestDto = {
        recaptchaToken: 'token',
        version: RecaptchaVersionEnum.V2,
        authFlow: 'signup',
      };
      const mockResponse: RecaptchaSessionDto = {
        id: 'id',
        token: 'token',
      };

      mockHttpImplementation.post.mockResolvedValue(mockResponse);

      const response = await sessionProvider.recaptchaSession(mockRequest);

      expect(mockHttpImplementation.post).toHaveBeenCalled();
      expect(response).toEqual(mockResponse);
    });
  });
});
