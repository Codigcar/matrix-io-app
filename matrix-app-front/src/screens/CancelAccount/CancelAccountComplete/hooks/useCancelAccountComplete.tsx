import { useEffect } from 'react';
import { NavigationPropsType } from 'src/types/types';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { useDispatch } from 'react-redux';
import { setAccountState } from 'src/core/libraries-implementation/state-manager/states';
import { CardPaymentRoutesEnum } from 'src/shared/enums/routes/card-payment-routes.enum';

const useCancelAccountComplete = (props: NavigationPropsType) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const onPressContinue = () => {
    navigation.navigate(navigationScreenNames.bottomTabNavigator);
  };
  const onPressPayment = () => {
    navigation.navigate(CardPaymentRoutesEnum.CardPaymentStack);
  };
  const onPressChat = () => {
    navigation.navigate(navigationScreenNames.bottomTabNavigator, { screen: 'Support' });
  };
  const onPressBackArrow = () => {
    navigation.goBack();
  };
  useEffect(() => {
    dispatch(setAccountState('PENDING'));
  }, []);
  return {
    onPressContinue,
    onPressBackArrow,
    onPressChat,
    onPressPayment,
  };
};

export default useCancelAccountComplete;
