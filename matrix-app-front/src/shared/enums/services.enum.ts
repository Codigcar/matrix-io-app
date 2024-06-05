enum ServicesEnum {
  VALIDATE_OTP = '/v1/auth/validate-recovery-code',
  VALIDATE_EMAIL = '/v1/auth/verify-attribute',
  OBTAIN_CASHBACK = '/v1/me/cashback',
  REFERRAL_CODE = '/v1/me/referrals/code',
  OBTAIN_CASHBACK_RULE = '/v1/me/cashback/redemptions/rules',
  OBTAIN_BENEFITS = '/v1/me/coupons/',
  REDEMPTION_PROCESSING = '/v1/me/cashback/redemptions',
  REDEMPTION_STATUS = '/v1/me/cashback/redemptions/',
}

export default ServicesEnum;
