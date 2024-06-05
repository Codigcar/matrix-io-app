import Config from 'react-native-config';
import { startNetworkLogging } from 'react-native-network-logger';

function startNetworkLog() {
  const { APP_ENVIRONMENT } = Config;
  if (APP_ENVIRONMENT === 'quality' || APP_ENVIRONMENT === 'development') {
    startNetworkLogging({ forceEnable: true, ignoredHosts: ['10.0.2.2'] });
  }
}
export default startNetworkLog;
