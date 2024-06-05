import { FirebaseRemoteConfigTypes } from '@react-native-firebase/remote-config';

export type TKeysFirebase = {
  CancelAccountEnabled: FirebaseRemoteConfigTypes.ConfigValue;
  loginButton: FirebaseRemoteConfigTypes.ConfigValue;
  newAccountButton: FirebaseRemoteConfigTypes.ConfigValue;
  physicalCardAlert: FirebaseRemoteConfigTypes.ConfigValue;
  isActiveUpdateDataUser: FirebaseRemoteConfigTypes.ConfigValue;
  forceUpdateEnabled: FirebaseRemoteConfigTypes.ConfigValue;
  forceUpdatedValues: FirebaseRemoteConfigTypes.ConfigValue;
  isMaintenanceApp: FirebaseRemoteConfigTypes.ConfigValue;
  enableReferralCode: FirebaseRemoteConfigTypes.ConfigValue;
};
