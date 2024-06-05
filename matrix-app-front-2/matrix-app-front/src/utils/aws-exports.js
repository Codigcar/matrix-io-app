import awsConsts from 'src/config/config';
import { AWS_PINPOINT_APPLICATION_ID } from './constants';

const awsmobile = {
  aws_cognito_region: awsConsts.region,
  aws_user_pools_id: awsConsts.poolId,
  aws_user_pools_web_client_id: awsConsts.clientId,
  aws_mandatory_sign_in: 'enable',
  endpoint: awsConsts.authBaseUrl,
  Analytics: {
    AWSPinpoint: {
      appId: AWS_PINPOINT_APPLICATION_ID,
      region: awsConsts.region,
      endpoint: {
        optOut: 'NONE',
      },
    },
  },
  PushNotification: {
    requestIOSPermissions: true,
  },
  aws_appsync_graphqlEndpoint: awsConsts.endpointGraphQL,
  aws_appsync_region: awsConsts.regionAppSync,
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
};

export default awsmobile;
