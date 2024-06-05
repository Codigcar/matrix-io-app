import HttpImplementation from 'src/core/libraries-implementation/http/http.implementation';
import ServicesInstanceEnum from 'src/shared/enums/services-instance.enum';
import { ISessionRepository } from '../../repository/session.repository';
import { RecaptchaSessionRequestDto } from '../../dtos/recaptcha-session/recaptcha-session-request.dto';
import { RecaptchaSessionDto } from '../../dtos/recaptcha-session/recaptcha-session.dto';
import { SessionApiEnum } from '../../enums/session-api.enum';

class SessionProvider implements ISessionRepository {
  private httpImpl: HttpImplementation;

  constructor(httpImpl: HttpImplementation = new HttpImplementation()) {
    this.httpImpl = httpImpl;
  }

  async recaptchaSession(data: RecaptchaSessionRequestDto): Promise<RecaptchaSessionDto> {
    return this.httpImpl.post(
      ServicesInstanceEnum.API_AUTH_INSTANCE,
      SessionApiEnum.SESSION,
      data,
    );
  }
}

export default SessionProvider;
