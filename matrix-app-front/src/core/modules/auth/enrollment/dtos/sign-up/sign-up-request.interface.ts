interface ISignUpRequest {
  username: string;
  password: string;
  phoneNumber: string;
  email: string;
  referralCode?: string;
  documentNumber: string;
  session: string;
  device: string;
}

export default ISignUpRequest;
