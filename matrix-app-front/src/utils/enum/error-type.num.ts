enum ErrorTypeEnum {
  UNKNOWN_RECAPTCHA_ERROR = 'unknow_error',
}

enum ReCaptchaActionsEnum {
  LOGIN = 'login',
  PASSWORD_RECOVERY = 'password_recovery',
  SIGNUP = 'signup',
}

enum ReCaptchaErrorsEnum {
  LOGIN = 'login',
  PASSWORD_RECOVERY = 'password_recovery',
  SIGN_UP = 'signup',
  AUTO_SIGN_IN = 'auto_signin',
  FORGOT_PASSWORD = 'forgot_password',
  SECURITY_RISK = 'security_risk',
  UNKNOWN_ERROR = 'unknown_error',
  SESSION_EXPIRED = 'session_expired',
}

export { ErrorTypeEnum, ReCaptchaActionsEnum, ReCaptchaErrorsEnum };
