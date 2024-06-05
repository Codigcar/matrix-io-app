export interface IAwsAmplify {
  forgotPassword<T>(username: string, clientMetadata: { session: string }): Promise<T>;
  confirmPassword(
    username: string,
    password: string,
    code: string,
    clientMetadata: { session: string, device: string },
  ): Promise<void>;
  configureAuth(data: any): void;
}
