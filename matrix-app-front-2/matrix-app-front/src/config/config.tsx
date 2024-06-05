import Config from 'react-native-config';

const {
  AWS_REGION,
  POOL_ID,
  WEB_POOL_ID,
  IDENTITY_POOL_ID,
  AWS_APPSYNC_GRAPHQL_ENDPOINT,
  AUTH_BASE_URL,
} = Config;

type aws = {
  region: string;
  poolId: string;
  clientId: string;
  identityPoolId: string;
  regionAppSync: string;
  endpointGraphQL: string;
  authBaseUrl: string;
};

const awsConsts: aws = {
  region: AWS_REGION,
  poolId: POOL_ID,
  clientId: WEB_POOL_ID,
  identityPoolId: IDENTITY_POOL_ID,
  regionAppSync: AWS_REGION,
  endpointGraphQL: AWS_APPSYNC_GRAPHQL_ENDPOINT,
  authBaseUrl: AUTH_BASE_URL,
};

export default awsConsts;
