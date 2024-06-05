import { CommonActions } from '@react-navigation/native';

const resetNavigation = (navigation: any, stack: string, params?: any): void => {
  // Temporary setTimeout Fix for React Native Screens Issue:
  // https://github.com/software-mansion/react-native-screens/pull/1704
  setTimeout(() => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: stack, params: params || {} }],
      }),
    );
  }, 0);
};

const resetNavigationToScreen = (navigation: any, stack: string[], params?: any): void => {
  const maxLength = stack.length - 1;
  let navigationStack: any;
  for (let i = maxLength; i >= 0; i--) {
    if (i === maxLength) {
      navigationStack = { name: stack[i], params: params || {} };
    } else {
      const soon: any = navigationStack;
      navigationStack = { name: stack[i], state: { routes: [soon] } };
    }
  }
  // Temporary setTimeout Fix for React Native Screens Issue:
  // https://github.com/software-mansion/react-native-screens/pull/1704
  setTimeout(() => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [navigationStack],
      }),
    );
  }, 0);
};

export { resetNavigation, resetNavigationToScreen };
