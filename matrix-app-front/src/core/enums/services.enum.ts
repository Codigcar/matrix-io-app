enum ServicesEnum {
  VALIDATE_OTP = '/v1/auth/validate-recovery-code',
  VALIDATE_EMAIL = '/v1/auth/verify-attribute',
  OBTAIN_CASHBACK = '/v1/me/cashback',
  OBTAIN_CASHBACK_RULE = '/v1/me/cashback/redemptions/rules',
}

export default ServicesEnum;
