import { MutableRefObject, createRef } from 'react';
import {
  NavigationContainerRef,
  PartialState,
  NavigationState,
} from '@react-navigation/native';
import { logScreenView } from 'src/utils/Analytics';

export const navigationRef:
  MutableRefObject<NavigationContainerRef<any> | null> = createRef<NavigationContainerRef<any>>();

export const routeRef: MutableRefObject<any | null> = createRef<any>();

export function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}

export function reset(params: NavigationState | PartialState<NavigationState>) {
  navigationRef.current?.reset(params);
}

export const onReadyNavigationContainer = () => {
  routeRef.current = navigationRef.current?.getCurrentRoute();
};

export const onStateChangeNavigationContainer = () => {
  const previousRoute = routeRef.current;
  const currentRoute = navigationRef.current?.getCurrentRoute();

  // Only log when route name or custom parameter for this is changed
  if (previousRoute?.name !== currentRoute?.name
   || previousRoute?.params?.analyticScreen !== currentRoute?.params?.analyticScreen) {
    logScreenView();

    // Save the current route name for later comparision
    routeRef.current = currentRoute;
  }
};
