import { RecaptchaSessionRequestDto } from '../dtos/recaptcha-session/recaptcha-session-request.dto';
import { RecaptchaSessionDto } from '../dtos/recaptcha-session/recaptcha-session.dto';

export interface ISessionRepository {
  recaptchaSession(data: RecaptchaSessionRequestDto): Promise<RecaptchaSessionDto>;
}
