import { AnalyticsManagerProvider, AnalyticsProviderType } from 'src/utils/analytics/analytics-manager-provider';
import FirebaseAnalyticsProvider from './implementations/firebase/FirebaseProvider';
import AppsFlyerAnalyticsProvider from './implementations/appsflyers/AppFlyerProvider';
import { AFLoggerEvents } from './implementations/appsflyers/events.enum';
import { GoogleLoggerEvents } from './implementations/firebase/events.enum';

export const analyticsManagerProvider = new AnalyticsManagerProvider(
  [FirebaseAnalyticsProvider, AppsFlyerAnalyticsProvider],
);

export {
  AnalyticsProviderType, AFLoggerEvents, GoogleLoggerEvents,
};
