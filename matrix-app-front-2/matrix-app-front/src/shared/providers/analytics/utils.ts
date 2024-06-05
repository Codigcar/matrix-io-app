import { navigationRef } from 'src/navigators/RootNavigation';
import navigationScreenClasses from '../../../utils/navigationScreenClasses';

export const getCurrentScreenName = (): string | undefined => {
  const currentRoute = navigationRef.current?.getCurrentRoute();
  return currentRoute?.params?.analyticScreen || currentRoute?.name;
};

export const getScreenView = () => {
  const screenName = getCurrentScreenName();
  const screenClass = screenName && navigationScreenClasses[screenName];
  return { screenClass, screenName };
};
