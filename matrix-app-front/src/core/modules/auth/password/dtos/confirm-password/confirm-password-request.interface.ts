interface IConfirmPasswordRequest {
  username: string;

  password: string;

  code: string;

  session: string;

  device: string
}

export default IConfirmPasswordRequest;
