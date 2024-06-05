import { useCallback } from 'react';
import {
  CommonActions, NavigationProp, ParamListBase, useNavigation,
} from '@react-navigation/native';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { useCreditCardBalance } from 'src/shared/hooks';

export const usePaymentSuccessPresenter = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const { getBalance } = useCreditCardBalance();

  const handleNavigate = useCallback(() => {
    getBalance();
    navigation.dispatch(() =>
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: navigationScreenNames.bottomTabNavigator,
            state: {
              index: 0,
              routes: [
                { name: navigationScreenNames.tabHome },
              ],
            },
          },
        ],
      }));
  }, [navigation]);

  return {
    handleNavigate,
  };
};
