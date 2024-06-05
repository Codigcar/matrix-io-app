import CoreServices from 'src/utils/core/CoreServices';
import { BASE_URL, android } from 'src/utils/constants';

const preValidateOtp = '/v1/auth/validate-recovery-code';
interface Body {
  type: string;
  value: string;
  otpCode: string;
}

const VerifyOTPServices = {
  validateOTP: (data: Body, wafToken: String) => {
    const headers = android ? { Cookie: `aws-waf-token=${wafToken}` } : undefined;
    const serviceData = {
      baseURL: BASE_URL,
      url: preValidateOtp,
      headers,
      data,
    };
    return CoreServices.post(serviceData);
  },
  verifyEmail: (accessToken: string, code: string) => {
    const headers = { Authorization: `Bearer ${accessToken}` };
    const verifyEmailURL = '/v1/auth/verify-attribute';
    const serviceData = {
      baseURL: BASE_URL,
      url: verifyEmailURL,
      headers,
      data: { otpCode: code, attribute: 'email' },
    };
    return CoreServices.post(serviceData);
  },
};

export default VerifyOTPServices;
