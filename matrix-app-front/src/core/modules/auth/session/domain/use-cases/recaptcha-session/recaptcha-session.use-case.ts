import { IUseCase } from 'src/core/contracts/use-case.interface';
import { IRecaptchaSessionRequest } from '../../../dtos/recaptcha-session/recaptcha-session-request.interface';
import { IRecaptchaSession } from '../../../dtos/recaptcha-session/recaptcha-session.interface';
import { ISessionRepository } from '../../../repository/session.repository';
import recaptchaSessionRequestToDto from '../../mappers/recaptcha-session/recaptcha-session-serialize/recaptcha-session.serialize';
import dtoToRecaptchaSession from '../../mappers/recaptcha-session/recaptcha-session-deserialize/recaptcha-session.deserialize';

class RecaptchaSessionUseCase implements IUseCase<IRecaptchaSessionRequest, IRecaptchaSession> {
  public repository: ISessionRepository;

  constructor(repository: ISessionRepository) {
    this.repository = repository;
  }

  public async execute(data: IRecaptchaSessionRequest): Promise<IRecaptchaSession> {
    const request = recaptchaSessionRequestToDto(data);

    const response = await this.repository.recaptchaSession(request);

    return dtoToRecaptchaSession(response);
  }
}

export default RecaptchaSessionUseCase;
