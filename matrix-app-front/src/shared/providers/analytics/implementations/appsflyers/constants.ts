import { InitSDKOptions } from 'react-native-appsflyer';
import {
  APPSFLYER_KEY,
  APPLE_ID,
} from 'src/utils/constants';

export const AF_INIT_OPTIONS: InitSDKOptions = {
  isDebug: false,
  devKey: `${APPSFLYER_KEY}`,
  onInstallConversionDataListener: true,
  timeToWaitForATTUserAuthorization: 10,
  onDeepLinkListener: true,
  appId: `${APPLE_ID}`,
};

export default {
  AF_INIT_OPTIONS,
};
