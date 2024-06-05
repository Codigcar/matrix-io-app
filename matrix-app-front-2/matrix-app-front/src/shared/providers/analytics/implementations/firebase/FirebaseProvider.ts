import analytics from '@react-native-firebase/analytics';
import { VirtualEventProps } from 'src/types/types';
import navigationScreenClasses from '../../../../../utils/navigationScreenClasses';
import { getCurrentScreenName } from '../../utils';
import { AnalyticsProvider } from '../../../../../utils/analytics/analytics-provider.interface';
import { AnalyticsProviderType } from '../../../../../utils/analytics/analytics-provider.enum';

export const logEventAnalytics = (eventName: string, params?: Record<string, any>) => {
  analytics().logEvent(eventName, params);
};

export const logVirtualEventAnalytics = ({
  eventName,
  screenName,
  valor,
  ...params
}: VirtualEventProps) => {
  const screen = screenName ?? getCurrentScreenName();
  const navigationState = (
    screen && Object.keys(navigationScreenClasses).includes(screen)
  ) ? navigationScreenClasses[screen] : {};
  const value = valor?.slice(0, 80)?.trim();
  logEventAnalytics(eventName ?? 'virtualEventApp', {
    ...navigationState,
    ...params,
    ...(value ? { valor: value } : {}),
  });
};

export const logScreenView = () => {
  const screenName = getCurrentScreenName();
  const screenClass = screenName && navigationScreenClasses[screenName];

  if (screenClass) {
    analytics().logScreenView({
      screen_name: screenName,
      screen_class: Object.values(screenClass)
        .filter((i) => i !== '(not available)')
        .join(':'),
    });
  }
};

const FirebaseAnalyticsProvider: AnalyticsProvider = {
  name: AnalyticsProviderType.firebase,
  logEvent(event: VirtualEventProps, eventName?: string) {
    if (eventName) {
      logVirtualEventAnalytics({ eventName, ...event });
    } else {
      logScreenView();
    }
  },
};

export default FirebaseAnalyticsProvider;
