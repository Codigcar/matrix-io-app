enum ServicesEnum {
  VALIDATE_OTP = '/v1/auth/validate-recovery-code',
  VALIDATE_EMAIL = '/v1/auth/verify-attribute',
  OBTAIN_CASHBACK = '/v1/me/cashback',
  OBTAIN_CASHBACK_RULE = '/v1/me/cashback/redemptions/rules',
  REFERRAL_CODE = '/v1/me/referrals/code',
  OBTAIN_BENEFITS = '/v1/me/coupons/',
}

export default ServicesEnum;
