import awsConsts from 'src/config/config';

const AuthConfig = {
  aws_cognito_region: awsConsts.region,
  aws_user_pools_id: awsConsts.poolId,
  aws_user_pools_web_client_id: awsConsts.clientId,
  aws_mandatory_sign_in: 'enable',
  authenticationFlowType: 'USER_SRP_AUTH',
  endpoint: awsConsts.authBaseUrl,
  clientMetadata: {
    token: '',
  },
};

const SignUpConfig = {
  aws_cognito_region: awsConsts.region,
  aws_user_pools_id: awsConsts.poolId,
  aws_user_pools_web_client_id: awsConsts.clientId,
  aws_mandatory_sign_in: 'enable',
  authenticationFlowType: 'USER_SRP_AUTH',
  endpoint: awsConsts.authBaseUrl,
  clientMetadata: {
    token: '',
  },
};

const ChallengeAuthConfig = {
  aws_cognito_region: awsConsts.region,
  aws_user_pools_id: awsConsts.poolId,
  aws_user_pools_web_client_id: awsConsts.clientId,
  aws_mandatory_sign_in: 'enable',
  authenticationFlowType: 'CUSTOM_AUTH',
  endpoint: awsConsts.authBaseUrl,
};

export { AuthConfig, ChallengeAuthConfig, SignUpConfig };
