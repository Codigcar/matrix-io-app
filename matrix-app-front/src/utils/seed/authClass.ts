import { Auth } from 'aws-amplify';
import { CustomAuthProps } from 'src/api/types/authTypes';
import { ChallengeAuthConfig } from '../auth/config';
import getDeviceMetadata from '../metadataClient';

export default class CustomAuth {
  session: any;

  constructor() {
    this.session = {};
  }

  async login(username: string, password: string) {
    Auth.configure(ChallengeAuthConfig);
    const response: CustomAuthProps = await Auth.signIn(username, password);
    this.session.cognitoUser = response;
    return response;
  }

  async verifyLoginTrial(validationId: string) {
    Auth.configure(ChallengeAuthConfig);
    const user: any = this.session.cognitoUser;
    const device = await getDeviceMetadata();
    const response: any = await Auth.sendCustomChallengeAnswer(user, validationId, { device });
    delete this.session.cognitoUser;
    return response;
  }
}
