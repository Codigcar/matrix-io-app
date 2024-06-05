/* eslint-env jest */
import RecaptchaSessionUseCase from './recaptcha-session.use-case';
import { IRecaptchaSessionRequest } from '../../../dtos/recaptcha-session/recaptcha-session-request.interface';
import { IRecaptchaSession } from '../../../dtos/recaptcha-session/recaptcha-session.interface';
import recaptchaSessionRequestToDto from '../../mappers/recaptcha-session/recaptcha-session-serialize/recaptcha-session.serialize';
import dtoToRecaptchaSession from '../../mappers/recaptcha-session/recaptcha-session-deserialize/recaptcha-session.deserialize';
import { ISessionRepository } from '../../../repository/session.repository';
import { RecaptchaVersionEnum } from '../../../enums/recaptcha-version.enum';

// Mock para el repositorio
jest.mock('../../../repository/session.repository');

describe('RecaptchaSessionUseCase', () => {
  let recaptchaSessionUseCase: RecaptchaSessionUseCase;
  let mockSessionRepository: jest.Mocked<ISessionRepository>;

  beforeEach(() => {
    mockSessionRepository = {
      recaptchaSession: jest.fn(),
    } as any;
    recaptchaSessionUseCase = new RecaptchaSessionUseCase(mockSessionRepository);
  });

  it('should call repository recaptchaSession with serialized request and return the deserialized response', async () => {
    const mockRequest: IRecaptchaSessionRequest = {
      recaptchaToken: 'token',
      version: RecaptchaVersionEnum.V2,
    };
    const mockDtoResponse = {
      id: 'id',
      token: 'token',
    };
    const expectedRecaptchaSession: IRecaptchaSession = dtoToRecaptchaSession(mockDtoResponse);

    mockSessionRepository.recaptchaSession.mockResolvedValueOnce(mockDtoResponse);

    const result = await recaptchaSessionUseCase.execute(mockRequest);

    const expectedDto = recaptchaSessionRequestToDto(mockRequest);
    expect(mockSessionRepository.recaptchaSession).toHaveBeenCalledWith(expectedDto);
    expect(result).toEqual(expectedRecaptchaSession);
  });
});
