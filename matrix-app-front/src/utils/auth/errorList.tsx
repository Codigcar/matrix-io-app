const amplifyErrorCodes = {
  exceededRequestOTP: 'limit_exceeded_exception',
  attemptLimitExceeded: 'Attempt limit exceeded',
  userBlocked: 'user_blocked',
  secondDevice: 'second_device_not_allowed',
  sessionExpired: 'session_expired',
  securityRisk: 'security_risk',
  unknownError: 'unknow_error',
  invalidCode: 'INVALID_CODE',
};

const authErrorList = ['second_device_not_allowed', 'user_blocked'];

export { amplifyErrorCodes, authErrorList };
