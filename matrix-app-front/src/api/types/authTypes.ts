export interface SignupProps {
  username: string | number[];
  password: any;
  attributes?: {
    phone_number: string;
    email: any;
    'custom:document_number': any;
  };
  autoSignIn?: {
    enabled: boolean;
  };
}

export interface CustomAuthProps {
  ChallengeName: string;
  challengeParam: {
    s3SignedUrl: string;
    validationId: string;
  };
  Session: string;
  client: any;
  keyPrefix: any;
  pool: any;
  signInUserSession: any;
  storage: any;
  userDataKey: any;
  username: any;
}
