import { VirtualEventProps } from 'src/types/types';

// TODO: move VirtualEventProps
export interface AnalyticsProvider {
  name: string;
  logEvent: (event: VirtualEventProps, eventName?: string) => void;
}
