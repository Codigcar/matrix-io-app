import { VirtualEventProps } from 'src/types/types';
import { AnalyticsProviderType } from './analytics-provider.enum';
import { AnalyticsProvider } from './analytics-provider.interface';

class AnalyticsManagerProvider {
  providers: AnalyticsProvider[];

  constructor(providers: AnalyticsProvider[]) {
    this.providers = providers;
  }

  logEvent(event: VirtualEventProps, eventName?: string) {
    this.providers.forEach((provider: AnalyticsProvider) => {
      provider.logEvent(event, eventName);
    });
  }

  logEventWithType(
    event: VirtualEventProps,
    providerType: AnalyticsProviderType,
    eventName?: string,
  ) {
    const selectedProvider = this.providers.filter(
      (providerItem) => (providerItem.name === providerType),
    );
    if (selectedProvider.length) selectedProvider[0].logEvent(event, eventName);
  }
}

export { AnalyticsManagerProvider, AnalyticsProviderType };
