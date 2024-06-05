import { Hub, HubCallback } from '@aws-amplify/core';

const busListeners: {
  [key: string]: HubCallback
} = {};

export const registerListener = (channel: string, name: string, callback: Function) => {
  const previousListener = busListeners[name];
  if (previousListener) {
    Hub.remove(channel, previousListener);
  }
  busListeners[name] = callback;
  Hub.listen(channel, busListeners[name]);
};

export const removeListener = (channel: string, name: string) => {
  const listener = busListeners[name];
  if (listener) {
    Hub.remove(channel, listener);
  }
};
