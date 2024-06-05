export interface IOncreateNotification {
  _subscriber: (() => void) | null;
}