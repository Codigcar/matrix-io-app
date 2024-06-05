import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';
import { getVersion, getDeviceId } from 'react-native-device-info';
import { navigationRef } from 'src/navigators/RootNavigation';
import { VirtualEventProps } from 'src/types/types';
import navigationScreenClasses from './navigationScreenClasses';

export type EventCrashType = {
  scope: 'API' | 'SDK';
  fileName: string;
  service?: string;
  sdk?: 'I2C' | 'Thales' | 'Zendesk' | '';
  error?: any;
  extraData?: { [name: string]: string };
};

export const crashApp = () => crashlytics().crash();

export const logCrashlytics = ({
  scope,
  fileName,
  service = '',
  error,
  sdk = '',
  extraData,
}: EventCrashType) => {
  const attributes = {
    scope,
    fileName,
    error: JSON.stringify(error),
    appVersion: getVersion(),
    deviceId: getDeviceId(),
    ...extraData,
  };
  crashlytics().log(scope);
  crashlytics().setAttributes(
    scope === 'API' ? { ...attributes, service } : { ...attributes, sdk },
  );
  crashlytics().recordError(new Error(error));
};

export const getCurrentScreenName = (): string | undefined => {
  const currentRoute = navigationRef.current?.getCurrentRoute();
  return currentRoute?.params?.analyticScreen || currentRoute?.name;
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
  if (screen && Object.keys(navigationScreenClasses).includes(screen)) {
    const value = valor?.slice(0, 80)?.trim();
    logEventAnalytics(eventName ?? 'virtualEventApp', {
      ...navigationScreenClasses[screen],
      ...params,
      ...(value ? { valor: value } : {}),
    });
  }
};

export const setAnalyticRoute = (screenName: string) => {
  navigationRef.current?.setParams({ analyticScreen: screenName });
};
