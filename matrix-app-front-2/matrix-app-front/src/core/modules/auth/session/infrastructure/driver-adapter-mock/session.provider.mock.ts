import { RecaptchaSessionRequestDto } from '../../dtos/recaptcha-session/recaptcha-session-request.dto';
import { RecaptchaSessionDto } from '../../dtos/recaptcha-session/recaptcha-session.dto';
import { ISessionRepository } from '../../repository/session.repository';

class SessionProviderMock implements ISessionRepository {
  async recaptchaSession(data: RecaptchaSessionRequestDto): Promise<RecaptchaSessionDto> {
    // eslint-disable-next-line no-console
    console.table(data);
    return {
      id: 'id',
      token: 'token',
    };
  }
}

export default SessionProviderMock;
