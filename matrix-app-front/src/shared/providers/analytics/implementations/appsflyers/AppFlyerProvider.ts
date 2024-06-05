import appsFlyer from 'react-native-appsflyer';
import { Platform } from 'react-native';
import { VirtualEventProps } from 'src/types/types';
import { AnalyticsProvider } from '../../../../../utils/analytics/analytics-provider.interface';
import { getScreenView } from '../../utils';
import { AnalyticsProviderType } from '../../../../../utils/analytics/analytics-provider.enum';
import { AF_INIT_OPTIONS } from './constants';
import { AFLoggerEvents } from './events.enum';

export function FlyerInit() {
  if (Platform.OS === 'ios') {
    appsFlyer.setCurrentDeviceLanguage('EN');
  }
  appsFlyer.initSdk(AF_INIT_OPTIONS, () => {}, () => {});
}

export function onDeepLinkCanceller() {
  appsFlyer.onDeepLink(() => {});
}

export function FlyerScreenLog() {
  const screenView = getScreenView();

  if (screenView.screenClass) {
    appsFlyer.logEvent(AFLoggerEvents.screenViewLog, {
      screen_name: screenView.screenName,
      screen_class: Object.values(screenView.screenClass)
        .filter((i) => i !== '(not available)')
        .join(':'),
    }, () => {}, () => {});
  }
}

export const FlyerLogEvent = (eventName: string, params?: Record<string, any>) => {
  appsFlyer.logEvent(eventName, { ...params }, () => {}, () => {});
};

export const FlyerVirtualEvent = ({
  eventName,
  valor,
  ...params
}: VirtualEventProps) => {
  const value = valor?.slice(0, 80)?.trim();
  FlyerLogEvent(eventName ?? 'virtualEventApp', {
    ...params,
    ...(value ? { valor: value } : {}),
  });
};

const AppsFlyerAnalyticsProvider: AnalyticsProvider = {
  name: AnalyticsProviderType.appsFlyer,
  logEvent(event: VirtualEventProps, eventName?: string) {
    if (eventName) {
      FlyerVirtualEvent({ eventName, ...event });
    } else {
      FlyerScreenLog();
    }
  },
};

export default AppsFlyerAnalyticsProvider;
