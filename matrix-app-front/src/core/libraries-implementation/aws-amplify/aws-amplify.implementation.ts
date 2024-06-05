import { ClientMetadata, ISignUpResult } from 'amazon-cognito-identity-js';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { Observable } from '@reduxjs/toolkit';
import { IAwsAmplify } from './aws-amplify.interface';

type SignInReturnType = ReturnType<(typeof Auth)['signIn']>;
type SignUpParams = Parameters<(typeof Auth)['signUp']>[0];
export default class AwsAmplifyImplementation implements IAwsAmplify {
  public async forgotPassword(username: string, clientMetadata: { session: string }): Promise<any> {
    return Auth.forgotPassword(username, clientMetadata);
  }

  public async confirmPassword(
    username: string,
    password: string,
    code: string,
    clientMetadata: { session: string; device: string },
  ): Promise<void> {
    await Auth.forgotPasswordSubmit(username, code, password, clientMetadata);
  }

  public configureAuth(authConfig: any): void {
    Auth.configure(authConfig);
  }

  public async confirmSignUp(username: string, code: string) {
    await Auth.confirmSignUp(username, code);
  }

  public async signIn(
    username: string,
    password: string,
    metadata: ClientMetadata,
  ): SignInReturnType {
    return Auth.signIn(username, password, metadata);
  }

  public async reSendSignUpCode(username: string): Promise<void> {
    await Auth.resendSignUp(username);
  }

  public async verifyCurrentUserAttribute(attribute: string, code: string) {
    await Auth.verifyCurrentUserAttributeSubmit(attribute, code);
  }

  public async sendVerifyCode(attribute: string) {
    await Auth.verifyCurrentUserAttribute(attribute);
  }

  public async signUp(body: SignUpParams): Promise<ISignUpResult> {
    return Auth.signUp(body);
  }

  public graphqlQuery<T>(operation: Function | string, variables?: {} | undefined)
   : Promise<T> | Observable<object> {
    if (typeof operation === 'function') {
      const query = operation();
      return API.graphql(graphqlOperation(query)) as Promise<T>;
    } if (typeof operation === 'string') {
      return API.graphql(graphqlOperation(operation, variables)) as unknown as Observable<object>;
    }
    throw new Error('Operación no válida');
  }
}
