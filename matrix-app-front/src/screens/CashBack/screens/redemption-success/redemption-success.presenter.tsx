import { useCallback } from 'react';
import {
  CommonActions, NavigationProp, ParamListBase, useNavigation,
} from '@react-navigation/native';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { useCreditCardBalance } from 'src/shared/hooks';
import { useAppDispatch } from 'src/core/libraries-implementation/state-manager/dispatch';
import { turnOffCashbackModal } from 'src/screens/Welcome/states/welcomeState';
import RedemptionAnalytics from '../../analytics/redemption.analytics';

export const useRedemptionSuccessPresenter = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const { getBalance } = useCreditCardBalance();
  const dispatch = useAppDispatch();

  const closeSoonModal = () => {
    dispatch(turnOffCashbackModal());
  };

  const handleNavigate = useCallback(() => {
    RedemptionAnalytics.onGoToStart();
    getBalance();
    closeSoonModal();
    navigation.dispatch(() =>
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: navigationScreenNames.bottomTabNavigator,
            state: {
              index: 0,
              routes: [{ name: navigationScreenNames.tabHome }],
            },
          },
        ],
      }));
  }, [navigation]);

  return {
    handleNavigate,
  };
};
