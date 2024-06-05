enum ReCaptchaErrorsEnum {
  SECURITY_RISK = 'security_risk',
  SESSION_EXPIRED = 'session_expired',
  UNKNOWN_ERROR = 'unknown_error',
}

enum ScreenCurrentEnum {
  LOGIN = 'login',
  PASSWORD_RECOVERY = 'password_recovery',
  SIGN_UP = 'signup',
  AUTO_SIGN_IN = 'auto_signin',
}

enum AuthErrorCodeEnum {
  ATTEMPTS_EXCEEDED = 'attempts_exceeded',
  INVALID_OTP = 'invalid_otp',
  UNEXPECTED_ERROR = 'unexpected_error',
  NO_AUTHORIZED_EXCEPTION = 'NotAuthorizedException'
}

export {
  ReCaptchaErrorsEnum, AuthErrorCodeEnum, ScreenCurrentEnum,
};
