import { useEffect, useState } from 'react';
import remoteConfig from '@react-native-firebase/remote-config';
import { logCrashlytics } from 'src/utils/Analytics';
import defaults from './base/defaults';
import { TKeysFirebase } from './base/keys';

export const initRemoteConfig = async () => {
  const FetchDataCacheInSeconds = 300;

  try {
    await remoteConfig().setConfigSettings({
      minimumFetchIntervalMillis: FetchDataCacheInSeconds,
    });
    await remoteConfig().setDefaults(defaults);
    const fetchedRemotely = await remoteConfig().fetchAndActivate();
    if (fetchedRemotely) await remoteConfig().fetch(FetchDataCacheInSeconds);
  } catch (err) {
    logCrashlytics({
      scope: 'SDK',
      fileName: 'src/firebase/remote-config/index.ts',
      service: 'firebase/remote-config',
      error: err,
    });
  }
};

export default function useRemoteConfigSetup() {
  initRemoteConfig();
}

export function useRemoteConfigGetValue<K extends keyof TKeysFirebase>(
  key: K,
): { value: TKeysFirebase[K] | undefined } {
  const [value, setValue] = useState<TKeysFirebase[K] | undefined>();

  const getValue = async () => {
    const remoteConfigInstance = remoteConfig();
    try {
      await remoteConfigInstance.fetchAndActivate();
      const configValue = await remoteConfigInstance.getValue(key);
      setValue(configValue);
    } catch (err) {
      logCrashlytics({
        scope: 'SDK',
        fileName: 'src/firebase/remote-config/index.ts',
        service: 'firebase/remote-config',
        error: err,
      });
    }
  };

  useEffect(() => {
    getValue();
  }, []);

  return { value };
}

export function getCachedRemoteConfigValue(key: string) {
  return remoteConfig().getValue(key);
}
