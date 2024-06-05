import Config from 'react-native-config';

const { AWS_REGION, POOL_ID, WEB_POOL_ID, AUTH_BASE_URL } = Config;

const AuthConfig = {
  aws_cognito_region: AWS_REGION,
  aws_user_pools_id: POOL_ID,
  aws_user_pools_web_client_id: WEB_POOL_ID,
  aws_mandatory_sign_in: 'enable',
  authenticationFlowType: 'USER_SRP_AUTH',
  endpoint: AUTH_BASE_URL,
  clientMetadata: {
    token: '',
  },
};

const SignUpConfig = {
  aws_cognito_region: AWS_REGION,
  aws_user_pools_id: POOL_ID,
  aws_user_pools_web_client_id: WEB_POOL_ID,
  aws_mandatory_sign_in: 'enable',
  authenticationFlowType: 'USER_SRP_AUTH',
  endpoint: AUTH_BASE_URL,
  clientMetadata: {
    token: '',
  },
};

const ChallengeAuthConfig = {
  aws_cognito_region: AWS_REGION,
  aws_user_pools_id: POOL_ID,
  aws_user_pools_web_client_id: WEB_POOL_ID,
  aws_mandatory_sign_in: 'enable',
  authenticationFlowType: 'CUSTOM_AUTH',
  endpoint: AUTH_BASE_URL,
};

export { AuthConfig, ChallengeAuthConfig, SignUpConfig };
